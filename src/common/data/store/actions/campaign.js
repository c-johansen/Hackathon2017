import * as campaignActions from "./creators/campaign"
import { performRESTRequest, Settings, Environment } from "@ng-mw/framework-core"
import Logger from "../../Logger"

export function get(campaignId) {
    return async function (dispatch, getState ) {
        let gln =  getState().user.data.store.gln

        // for user without selected store, default store will not do for getting
        // campaigns, these are hardcoded proper fallbacks for campaigns
        if (!parseInt(gln)) {
            switch (Settings.env) {
                case Environment.PREPRODUCTION:
                    gln = 7080001296346
                    break
                case Environment.PRODUCTION:
                    gln = 7080000886050
                    break
                default:
                    gln = 7080001296346
            }
        }

        dispatch(campaignActions.loading())

        try {
            let [campaign, products] = await Promise.all([
                performRESTRequest({ path: `/api/products/1300/${gln}/campaigns/${campaignId}?full_response=true`, method: "GET" }),
                performRESTRequest({ path: `/api/products/1300/${gln}`, method: "GET", qs: { campaign_id: campaignId } })
            ])

            dispatch(campaignActions.success(campaign._source, products.hits))
        } catch (e) {
            dispatch(campaignActions.error(e))
            Logger.error("actions/campaign/get()", e, campaignId, gln)
        } finally {
            dispatch(campaignActions.loaded())
        }
    }
}
