import * as campaignsActions from "./creators/campaigns"
import { performRESTRequest } from "@ng-mw/framework-core"
import patchGln from "../../../helpers/patch-gln"
import Logger from "../../Logger"

export function all() {
    return async function (dispatch, getState) {
        let gln = await patchGln(getState().user.data.store.gln)

        dispatch(campaignsActions.loading())

        try {
            let result = await performRESTRequest({
                path: `/api/products/1300/${gln}/campaigns?full_response=true&tags=temaforside&page_size=5`,
                qs: {
                    tags: "",
                    full_response: false,
                    page_size: 100,
                },
                method: "GET",
            })

            dispatch(campaignsActions.success(result.hits.hits.map(i => i._source)))
        } catch (e) {
            dispatch(campaignsActions.error(e))
            Logger.error("actions/campaigns/all()", e)
        } finally {
            dispatch(campaignsActions.loaded())
        }
    }
}
