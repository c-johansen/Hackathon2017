import * as storeActions from "./creators/store"
import Request from "../../Request"
import Logger from "../../Logger"

export function get(id) {
    return async function (dispatch, getState) {
        let { stores: { data } } = getState()
        let cached = data.find(s => s.id == id)

        if (cached) {
            dispatch(storeActions.success(cached))
        } else {
            dispatch(storeActions.loading())

            try {
                let result = await Request.get(`/api/FindStore/stores/1300?store_id=${id}`)

                dispatch(storeActions.success(result))
            } catch (e) {
                dispatch(storeActions.error(e))
                Logger.error("actions/store/get()", id, e)
            } finally {
                dispatch(storeActions.loaded())
            }
        }
    }
}

export function clear() {
    return function (dispatch) {
        dispatch(storeActions.clear())
    }
}

