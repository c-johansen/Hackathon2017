import * as bargainOffersActions from "./creators/bargainOffers"
import { Product } from "@ng-mw/framework-productsearch"
import patchStore from "../../parsers/patch-store"
import Logger from "../../Logger"
import Cacher from "../../Cacher"

export function all(page = 1, append = false) {
    return async function (dispatch, getStore) {
        let { filter } = getStore().bargainOffers
        let storeId = await patchStore()
        let cached = await Cacher.get("bargianOffers", { page, ...filter, storeId })

        if (cached) {
            dispatch(bargainOffersActions.setPage(cached.page))
            dispatch(bargainOffersActions.clearAggregations())
            dispatch(bargainOffersActions.setAggregation("categories", cached.aggregations.categories))
            dispatch(bargainOffersActions.setTotalHits(cached.totalHits))

            dispatch(bargainOffersActions.success(cached.data, false))
        } else {
            dispatch(bargainOffersActions.loading())
            dispatch(bargainOffersActions.setPage(page))

            try {
                let result = await Product.search("", {
                    pageSize: 20,
                    page,
                    full_response: true,
                    facets: "Category",
                    facet: [
                        "IsBargain:true",
                        filter.category ? `Categories:${filter.category}` : ""
                    ].join(";")
                }, undefined, storeId)
                let categories = result.aggregations.Categories.buckets.map(i => ({ name: i.key, count: i.doc_count }))

                dispatch(bargainOffersActions.clearAggregations())
                dispatch(bargainOffersActions.setAggregation("categories", categories))
                dispatch(bargainOffersActions.setTotalHits(result.totalHits))

                dispatch(bargainOffersActions.success(result.hits, append))

                Cacher.cache("bargianOffers", { page, ...filter, storeId }, { ...getStore().bargainOffers })
            } catch (e) {
                dispatch(bargainOffersActions.error(e))
                Logger.error("actions/bargainOffers/all()", e, page, append)
            } finally {
                dispatch(bargainOffersActions.loaded())
            }
        }
    }
}

export function loadMore() {
    return async function (dispatch, getStore) {
        let { page, totalHits, data } = getStore().bargainOffers
        let nextPage = page + 1

        if (totalHits === data.length) {
            return
        }

        dispatch(all(nextPage, true))
    }
}

export function setFilter(filter) {
    return function (dispatch) {
        dispatch(bargainOffersActions.setFilter(filter))
    }
}

export function clearFilter() {
    return function (dispatch) {
        dispatch(bargainOffersActions.clearFilter())
    }
}

export function reset() {
    return function (dispatch) {
        dispatch(bargainOffersActions.clear())
        dispatch(bargainOffersActions.clearAggregations())
        dispatch(bargainOffersActions.clearFilter())
        dispatch(all())
    }
}
