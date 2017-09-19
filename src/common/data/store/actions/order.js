import * as orderActions from "./creators/order"
import * as ordersActions from "./creators/orders"
import OrderStatus from "../../const/OrderStatus"
import { performRESTRequest, getInfoForCurrentUser, Settings } from "@ng-mw/framework-core"
import Logger from "../../Logger"

export function cancel(ngOrderId, optimistic = false) {
    return async function (dispatch, getState) {
        let memberId = getState().user.data.currentMember.memberId

        if (optimistic) {
            dispatch(orderActions.update({ status: OrderStatus.Deleted }))
            dispatch(ordersActions.update(ngOrderId, { status: OrderStatus.Deleted }))
        }

        try {
            await performRESTRequest({
                path: `/order/1300/${memberId}/${ngOrderId}`,
                method: "DELETE"
            })

            if (!optimistic) {
                dispatch(orderActions.update({ status: OrderStatus.Deleted }))
                dispatch(ordersActions.update(ngOrderId, { status: OrderStatus.Deleted }))
            }
        } catch (e) {
            dispatch(orderActions.error(e))
            Logger.error("actions/order/cancel()", e, ngOrderId, optimistic)
        }
    }
}

export function get(orderId) {
    return async function (dispatch, getState) {
        let memberId = getState().user.data.currentMember.memberId

        dispatch(orderActions.loading())

        try {
            let data = await performRESTRequest({
                path: `/api/order/1300/${memberId}/${orderId}`,
                method: "GET"
            })

            // TODO: Remove when fallbacks are implemented server-side
            data.handoverInfo.customerPickupFrom = data.handoverInfo.customerPickupFrom || data.handoverInfo.from
            data.handoverInfo.customerPickupTo = data.handoverInfo.customerPickupTo || data.handoverInfo.to

            dispatch(orderActions.success(data))
        } catch (e) {
            dispatch(orderActions.error(e))
            Logger.error("actions/order/get()", e, orderId)
        } finally {
            dispatch(orderActions.loaded())
        }
    }
}

// Order confirmation

export function send(order, memberId = null) {
    return async function (dispatch) {
        dispatch(orderActions.loading())

        try {
            memberId = memberId || getInfoForCurrentUser().memberId
            const storeGln = order.store.gln

            if (!order) {
                throw "Required argument is missing: order"
            }

            if (!memberId) {
                throw "Required argument is missing: memberId"
            }

            if (!storeGln) {
                throw "Required argument is missing: store"
            }

            let data = await performRESTRequest({
                path: `/order/${Settings.chainID}/${storeGln}/${memberId}`,
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                //qs: { method: "create" },
                body: order
            })

            // TODO: Remove when fallbacks are implemented server-side
            data.handoverInfo.customerPickupFrom = data.handoverInfo.customerPickupFrom || data.handoverInfo.from
            data.handoverInfo.customerPickupTo = data.handoverInfo.customerPickupTo || data.handoverInfo.to

            dispatch(orderActions.success(data))
        } catch (e) {
            dispatch(orderActions.error(e))
            Logger.error("actions/order/send()", e, null, order)
        } finally {
            dispatch(orderActions.loaded())
        }
    }
}

export function invalidate() {
    return function (dispatch) {
        dispatch(orderActions.invalidate())
    }
}
