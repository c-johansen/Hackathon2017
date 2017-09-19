import * as storesActions from "./creators/stores"
import Request from "../../Request"
import GeoPosition from "../../GeoPosition"
import Logger from "../../Logger"

export function all() {
    return async function (dispatch) {
        dispatch(storesActions.loading())

        try {
            let result = await Request.get("/api/FindStore/stores/1300")

            dispatch(storesActions.success(result))
        } catch (e) {
            dispatch(storesActions.error(e))
            Logger.error("actions/stores/all()", e)
        } finally {
            dispatch(storesActions.loaded())
        }
    }
}

export function closestToMe() {
    return async function (dispatch) {
        dispatch(storesActions.loading())

        try {
            let { coords: { latitude, longitude } } = await GeoPosition.get()
            let result = await Request.get(`/api/FindStore/StoresClosestToMe/1300?longitude=${longitude}&latitude=${latitude}`)

            result = result.map(s => { return { distance: s.distance, ...s.store } })

            dispatch(storesActions.success(result))
        } catch (e) {
            dispatch(storesActions.error(e))
            Logger.error("actions/stores/closestToMe()", e)
        } finally {
            dispatch(storesActions.loaded())
        }
    }
}
