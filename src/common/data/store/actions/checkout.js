import moment from "moment"
import * as checkoutActions from "./creators/checkout"
import * as handoverWindowsActions from "./creators/handoverWindows"
import * as userActions from "./user"
import { performRESTRequest as fWPerformRESTRequest, Settings as fwSettings } from "@ng-mw/framework-core"
import HandoverTypeHelper from "../../../helpers/HandoverTypeHelper"
import cardNameParser from "../../parsers/card-name"
import Logger from "../../Logger"

export function resetCheckoutProcess() {
    return function (dispatch) {
        dispatch(checkoutActions.resetStepStatus())
        dispatch(checkoutActions.handoverOptionsClear())
        dispatch(handoverWindowsActions.handoverWindowsInvalidate())
        dispatch(checkoutActions.paymentAgreementsClear())
    }
}

// Step-status

export function updateStepStatus(status) {
    return function (dispatch) {
        dispatch(checkoutActions.updateStepStatus(status))
    }
}

export function resetStepStatus() {
    return function (dispatch) {
        dispatch(checkoutActions.resetStepStatus())
    }
}

// Handover-options

export function getHandoverOptions(order) {
    return async function (dispatch) {
        dispatch(checkoutActions.handoverOptionsLoading())

        try {
            let data = await fWPerformRESTRequest({
                path: `/api/handoveroptions/${fwSettings.chainID}`,
                method: "GET",
            })

            // Verify that the order's handover-option is still available
            if (order && !HandoverTypeHelper.handoverTypeOnOrderIsValid(order, data)) {
                // Reset handover-type and location on cart
                dispatch(userActions.setHandoverTypeAndLocation(null, null))
            }

            // Verify that the user's store is corresponding with home delivery address
            if (order && !HandoverTypeHelper.deliveryStoreOnOrderIsValid(order, data)) {
                // Save correct address+store to user
                dispatch(userActions.setHandoverTypeAndLocation(order.handoverInfo.handoverType, HandoverTypeHelper.getDeliveryLocation(order, data)))
            }

            dispatch(checkoutActions.handoverOptionsSuccess(data))
        } catch (e) {
            dispatch(checkoutActions.handoverOptionsError(e))
            Logger.error("actions/checkout/getHandoverOptions()", e, order)
        } finally {
            dispatch(checkoutActions.handoverOptionsLoaded())
        }
    }
}

// Payment-agreements

export function getPaymentAgreements(activeOnly) {
    return async function (dispatch) {
        dispatch(checkoutActions.paymentAgreementsLoading())

        try {
            let data = await fWPerformRESTRequest({
                path: `/api/agreements/${fwSettings.chainID}`,
                method: "GET",
            })

            if (activeOnly) {
                data = data.filter((agreement) => moment(agreement.expires).isAfter())
            }

            data.map((agreement) => {
                agreement.expires = moment(agreement.expires).subtract(12, "hours").toDate()
                agreement.lastTimeUsed = new Date(agreement.lastTimeUsed)
                agreement.name = cardNameParser(agreement.typeOfCreditCard)
            })

            dispatch(checkoutActions.paymentAgreementsSuccess(data))

            // Preselect card if only one
            if (data.length === 1) {
                dispatch(setPaymentAgreement(data[0].internalId))
            } else {
                // Reset
                dispatch(setPaymentAgreement(null))
            }
        } catch (e) {
            dispatch(checkoutActions.paymentAgreementsError(e))
            Logger.error("actions/checkout/getPaymentAgreements()", e, activeOnly)
        } finally {
            dispatch(checkoutActions.paymentAgreementsLoaded())
        }
    }
}

// ToS

export function getTos() {
    return async function (dispatch) {
        dispatch(checkoutActions.tosLoading())

        try {
            let data = await fWPerformRESTRequest({
                path: `/api/dynamic-content/${fwSettings.chainID}/app_tos`,
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })

            dispatch(checkoutActions.tosSuccess(data))
        } catch (e) {
            dispatch(checkoutActions.tosError(e))
            Logger.error("actions/checkout/getTos()", e)
        } finally {
            dispatch(checkoutActions.tosLoaded())
        }
    }
}

// Checkout-order

export function setSubstitutePreference(preference) {
    return function (dispatch) {
        dispatch(checkoutActions.setSubstitutePreference(preference))
    }
}

export function setSubstituteComment(comment) {
    return function (dispatch) {
        dispatch(checkoutActions.setSubstituteComment(comment))
    }
}

export function setPaymentAgreement(internalId) {
    return function (dispatch) {
        dispatch(checkoutActions.setPaymentAgreement(internalId))
    }
}
