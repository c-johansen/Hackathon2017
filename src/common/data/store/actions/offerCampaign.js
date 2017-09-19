import * as offerCampaignActions from "./creators/offerCampaign"
import { performRESTRequest } from "@ng-mw/framework-core"
import patchStore from "../../parsers/patch-store"
import Logger from "../../Logger"

export function get(campaignId, page = 1, append = false) {
    return async function (dispatch, getStore) {
        let { filter } = getStore().offerCampaign

        dispatch(offerCampaignActions.loading())
        dispatch(offerCampaignActions.setPage(page))

        try {
            let storeId = await patchStore()
            let result = await performRESTRequest({
                path: `/api/products/1300/${storeId}`,
                method: "GET",
                qs: {
                    full_response: true,
                    fieldset: "maximal",
                    page_size: 20,
                    page,
                    facets: "Category",
                    facet: filter.category ? `Categories:${filter.category}` : null,
                    campaign_id: campaignId
                }
            })
            let categories = result.aggregations.Categories.buckets.map(i => ({ name: i.key, count: i.doc_count }))

            dispatch(offerCampaignActions.clearAggregations())
            dispatch(offerCampaignActions.setAggregation("categories", categories))
            dispatch(offerCampaignActions.setTotalHits(result.hits.total))

            dispatch(offerCampaignActions.success(result.hits.hits.map(i => i._source), append))
        } catch (e) {
            dispatch(offerCampaignActions.error(e))
            Logger.error("actions/offerCampaign/get()", e, campaignId, page, append)
        } finally {
            dispatch(offerCampaignActions.loaded())
        }
    }
}

export function loadMore(campaignId) {
    return async function (dispatch, getStore) {
        let { page, totalHits, data } = getStore().offerCampaign
        let nextPage = page + 1

        if (totalHits === data.length) {
            return
        }

        dispatch(get(campaignId, nextPage, true))
    }
}


export function setFilter(filter) {
    return function (dispatch) {
        dispatch(offerCampaignActions.setFilter(filter))
    }
}

export function clearFilter() {
    return function (dispatch) {
        dispatch(offerCampaignActions.clearFilter())
    }
}

export function clear() {
    return function (dispatch) {
        dispatch(offerCampaignActions.clear())
    }
}
