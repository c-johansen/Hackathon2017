import * as recipesActions from "./creators/recipes"
import { performRESTRequest as fwPerformRESTRequest } from "@ng-mw/framework-core"
import Logger from "../../Logger"

export function all() {
    return async function (dispatch) {
        dispatch(recipesActions.loading())

        try {
            let result = await fwPerformRESTRequest({ method: "GET", path: "/api/recipes2/1300", qs: { channels: "web", onlyPromoted: true } })

            dispatch(recipesActions.success(result.hits.slice(1, 7)))
        } catch (e) {
            dispatch(recipesActions.error(e))
            Logger.error("actions/recipes/all()", e)
        } finally {
            dispatch(recipesActions.loaded())
        }
    }
}
