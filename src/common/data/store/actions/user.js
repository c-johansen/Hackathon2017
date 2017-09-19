import moment from "moment"
import { removeUserToken as fwRemoveUserToken, setUserToken as fwSetUserToken, getExtendedUser as fwGetExtendedUser } from "@ng-mw/framework-core"
import * as userActions from "./creators/user"
import * as transformers from "./transformers/user"
import { all as allMostPurchasedProducts } from "./mostPurchasedProducts"
import { clear as clearOrders } from "./orders"
import LocalStorage from "../../LocalStorage"
import App from "../../const/App"
import Logger from "../../Logger"

export const ChangeTrigger = {
    Local: "LOCAL",
    Sync: "SYNC"
}
let fwExtendedUser = null

export function logOut() {
    return async (dispatch) => {
        fwRemoveUserToken()
        LocalStorage.remove(App.LocalStorage.UserToken)
        LocalStorage.remove(App.LocalStorage.UserSeenWelcomeScreen)

        dispatch(userActions.logOut())
        dispatch(loadBaseData())
        dispatch(clearOrders())
    }
}

export function setToken(token = "") {
    return async (dispatch) => {
        token = (token.includes("Bearer") || token.includes("Simplified")) ? token : "Bearer " + token

        dispatch(userActions.loading())

        try {
            await fwSetUserToken(token)

            dispatch(userActions.setToken(token))

            await dispatch(getExtendedUser())
            await dispatch(loadBaseData())

            if (!LocalStorage.get(App.LocalStorage.UserSeenWelcomeScreen)) {
                dispatch(userActions.showWelcomeScreen())
                LocalStorage.set(App.LocalStorage.UserSeenWelcomeScreen, true)
            }

            LocalStorage.set(App.LocalStorage.UserToken, token)
        } catch (e) {
            dispatch(userActions.error(e))

            LocalStorage.remove(App.LocalStorage.UserToken)
            Logger.error("actions/user/setToken()", e, null)
        } finally {
            dispatch(userActions.loaded())
        }
    }
}

export function clearError() {
    return async (dispatch) => {
        dispatch(userActions.clearError())

    }
}

export function hideWelcomeScreen() {
    return async (dispatch) => {
        dispatch(userActions.hideWelcomeScreen())

    }
}

export function extendedUserHasChanged(changeTrigger = ChangeTrigger.Local, prefferedStoreDidChange) {
    return async function (dispatch) {

        if (changeTrigger === ChangeTrigger.Sync) {
            dispatch(getExtendedUser())
        }
        if (prefferedStoreDidChange) {
            dispatch(loadBaseData())
        }
    }
}

export function getExtendedUser() {
    return async function (dispatch) {
        try {
            dispatch(userActions.extendedUserLoading())

            fwExtendedUser = await fwGetExtendedUser()

            const extendedUser = fwExtendedUser.toJSON()

            // Default to store-pickup
            if (!extendedUser.handoverInfo || (extendedUser.handoverInfo.handoverType === "HJEM" && !extendedUser.handoverInfo.deliveryInfo)) {
                extendedUser.handoverInfo = {
                    handoverType: "BUTIKK",
                }
            }

            dispatch(userActions.extendedUserSuccess(extendedUser))

            // Verify that we're not after deadline
            if (extendedUser.handoverInfo &&
                extendedUser.handoverInfo.deadline &&
                moment().diff(extendedUser.handoverInfo.deadline) >= 0) {
                // Reset window on user
                dispatch(resetHandoverWindow())
            }
        } catch (e) {
            dispatch(userActions.extendedUserError(e))
            Logger.error("actions/user/getExtendedUser()", e, null)
        } finally {
            dispatch(userActions.extendedUserLoaded())
        }
    }
}

export function saveExtendedUserHousehold() {
    return function (dispatch, getState) {
        const { user } = getState()

        storeAndHandoverInfoUpdated(user.data, dispatch)
    }
}

export function loadBaseData() {
    return async (dispatch) => {
        let additionalData = []

        switch (process.env.PLATFORM) {
            case App.Platform.Mobile:
                additionalData.push(dispatch(allMostPurchasedProducts()))
                break
        }

        await Promise.all(additionalData)
    }
}

export function setHandoverInfoAndStore(handoverInfo, store, localOnly) {
    return async function (dispatch, getState) {
        const { user } = getState()

        const extendedUserHousehold = transformers.setHandoverInfoAndStore(user.data, handoverInfo, store)

        storeAndHandoverInfoUpdated(extendedUserHousehold, dispatch, localOnly)
    }
}

export function setHandoverTypeAndLocation(handoverType, location, localOnly) {
    return async function (dispatch, getState) {
        const { user } = getState()

        const extendedUserHousehold = transformers.setHandoverTypeAndLocation(user.data, handoverType, location)

        storeAndHandoverInfoUpdated(extendedUserHousehold, dispatch, localOnly)
    }
}

export function setHandoverWindow(handoverWindow, localOnly) {
    return function (dispatch, getState) {
        const { user } = getState()

        const extendedUserHousehold = transformers.setHandoverWindow(user.data, handoverWindow)

        storeAndHandoverInfoUpdated(extendedUserHousehold, dispatch, localOnly)
    }
}

export function updateHandoverWindowData(handoverWindow) {
    return function (dispatch, getState) {
        const { user } = getState()

        const extendedUserHousehold = transformers.updateHandoverWindowData(user.data, handoverWindow)

        storeAndHandoverInfoUpdated(extendedUserHousehold, dispatch)
    }
}

export function resetHandoverWindow() {
    return function (dispatch, getState) {
        const { user } = getState()

        const extendedUserHousehold = transformers.resetHandoverWindow(user.data)

        storeAndHandoverInfoUpdated(extendedUserHousehold, dispatch)
    }
}

function storeAndHandoverInfoUpdated(extendedUserHousehold, dispatch, localOnly) {
    // Be optimistic!
    dispatch(userActions.extendedUserUpdateSuccess(extendedUserHousehold))

    if (localOnly) {
        return
    }

    saveStoreAndHandoverInfo(extendedUserHousehold, dispatch)
}

async function saveStoreAndHandoverInfo(extendedUserHousehold, dispatch) {
    try {
        const requestBody = {
            ...extendedUserHousehold.household
        }

        delete requestBody.store
        delete requestBody.members
        delete requestBody.children
        delete requestBody.householdCryptoKey

        if (extendedUserHousehold.store) {
            requestBody.prefferedStoreId = extendedUserHousehold.store.gln
            requestBody.pickupStoreId = extendedUserHousehold.store.pickupGln
        }

        if (extendedUserHousehold.handoverInfo) {
            requestBody.handoverInfo = extendedUserHousehold.handoverInfo
        }
        /*
        dispatch(userActions.extendedUserUpdate({
            storeGln: extendedUserHousehold.store.gln,
            pickupPointGln: extendedUserHousehold.store.pickupGln,
            handoverInfo: extendedUserHousehold.handoverInfo
        }))
        */
        await fwExtendedUser.updateStoreAndHandoverInfo({
            storeGln: extendedUserHousehold.store.gln,
            pickupPointGln: extendedUserHousehold.store.pickupGln,
            handoverInfo: extendedUserHousehold.handoverInfo
        })
    } catch (e) {
        dispatch(userActions.extendedUserUpdateError(e))
        Logger.error("actions/user/saveStoreAndHandoverInfo()", e, null)
    }
}
