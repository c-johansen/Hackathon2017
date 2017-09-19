import * as handoverWindowsActions from "./creators/handoverWindows"
import { performRESTRequest, Settings } from "@ng-mw/framework-core"
import Logger from "../../Logger"

let currentlyLoadingPath = null

export function getHandoverWindows(order) {
    return async function (dispatch, getStore) {
        const user = getStore().user.data
        const handoverType = user.handoverInfo.handoverType
        const store = user.store

        let path, qs = {}

        if (handoverType === "HJEM") {
            // Home delivery
            path = `/api/handoverwindows/delivery/${Settings.chainID}/${user.handoverInfo.deliveryInfo.postalCode}`
            qs = { weight: order && order.totals.totalWeight || 1 }
        } else if (handoverType === "BUTIKK" && store.gln !== store.pickupGln) {
            // Pickup point (Esso/Deli de Luca)
            if (!store || !store.pickupGln || store.pickupGln === "0") {
                dispatch(handoverWindowsActions.handoverWindowsError())
                return
            }
            path = `/api/handoverwindows/pickuppoint/${Settings.chainID}/${store.pickupGln}`
        } else {
            // Normal store
            if (!store || !store.gln || store.gln === "0") {
                dispatch(handoverWindowsActions.handoverWindowsError())
                return
            }
            path = `/api/handoverwindows/store/${Settings.chainID}/${store.gln}`
        }

        if (path === currentlyLoadingPath) {
            // Prevent multiple components from loading the same set of handoverwindows
            return
        }

        try {
            dispatch(handoverWindowsActions.handoverWindowsLoading())

            currentlyLoadingPath = path

            let result = await performRESTRequest({
                path,
                qs,
                method: "GET",
            })

            currentlyLoadingPath = null

            dispatch(handoverWindowsActions.handoverWindowsSuccess(result))
        } catch (e) {
            dispatch(handoverWindowsActions.handoverWindowsError(e))
            Logger.error("actions/handoverWindows/getHandoverWindows()", e)
        } finally {
            dispatch(handoverWindowsActions.handoverWindowsLoaded())
        }
    }
}
