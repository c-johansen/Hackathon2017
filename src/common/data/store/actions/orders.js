import * as ordersActions from "./creators/orders"
import { performRESTRequest, getInfoForCurrentUser } from "@ng-mw/framework-core"
import Logger from "../../Logger"

export function all(page = 1) {
    return async function (dispatch, getState) {
        let { user } = getState()

        dispatch(ordersActions.loading())

        try {
            let { memberId } = await getInfoForCurrentUser()
            let result = await performRESTRequest({
                path: `/api/order/search/1300/${user.data.store.gln}/${memberId}`,
                qs: {
                    fieldset: "minimal",
                    page,
                    sort: "status,handoverInfo.from",
                    size: 100
                },
                method: "GET",
            })

            // TODO: Remove when fallbacks are implemented server-side
            result = result.map((order) => {
                order.handoverInfo.customerPickupFrom = order.handoverInfo.customerPickupFrom || order.handoverInfo.from
                order.handoverInfo.customerPickupTo = order.handoverInfo.customerPickupTo || order.handoverInfo.to
                return order
            })

            dispatch(ordersActions.success(result.reverse()))
        } catch (e) {
            dispatch(ordersActions.error(e))
            Logger.error("actions/orders/all()", e, page)
        } finally {
            dispatch(ordersActions.loaded())
        }
    }
}

export function update(orderId, data) {
    return async function (dispatch) {
        dispatch(ordersActions.update(orderId, data))
    }
}

export function clear() {
    return async function (dispatch) {
        dispatch(ordersActions.success([]))
    }
}
