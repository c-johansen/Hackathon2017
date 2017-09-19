import * as offerCampaignsActions from "./creators/offerCampaigns"
import OfferCampaignType from "../../const/OfferCampaignType"
import { performRESTRequest } from "@ng-mw/framework-core"
import patchStore from "../../parsers/patch-store"
import Logger from "../../Logger"

export function all() {
    return async function (dispatch) {
        dispatch(offerCampaignsActions.loading())

        try {
            let storeId = await patchStore()
            let [generic, bargain] = await Promise.all([
                performRESTRequest({
                    path: `/api/products/1300/${storeId}/campaigns`,
                    qs: {
                        tags: "tilbud,banner",
                        full_response: true,
                        page_size: 20
                    },
                    method: "GET"
                }),
                performRESTRequest({
                    path: `/api/products/1300/${storeId}/campaigns`,
                    qs: {
                        tags: "knallkjøp,banner",
                        full_response: true,
                        page_size: 20
                    },
                    method: "GET"
                })
            ])
            let all = [
                ...(generic.hits.hits || []).map(i => ({ ...i._source, offerType: OfferCampaignType.Generic })),
                ...(bargain.hits.hits || []).map(i => ({ ...i._source, offerType: OfferCampaignType.Bargain }))
            ]

            dispatch(offerCampaignsActions.success(all))
        } catch (e) {
            dispatch(offerCampaignsActions.error(e))
            Logger.error("actions/offerCampaigns/all()", e)
        } finally {
            dispatch(offerCampaignsActions.loaded())
        }
    }
}
