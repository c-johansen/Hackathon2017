import * as genericOffersActions from "./creators/genericOffers"
import { Product } from "@ng-mw/framework-productsearch"
import patchStore from "../../parsers/patch-store"
import Logger from "../../Logger"
import Cacher from "../../Cacher"

export function all(page = 1, append = false) {
    return async function (dispatch, getStore) {
        let { filter } = getStore().genericOffers
        let storeId = await patchStore()
        let cached = await Cacher.get("genericOffers", { page, ...filter, storeId })

        if (cached) {
            dispatch(genericOffersActions.setPage(cached.page))
            dispatch(genericOffersActions.clearAggregations())
            dispatch(genericOffersActions.setAggregation("categories", cached.aggregations.categories))
            dispatch(genericOffersActions.setTotalHits(cached.totalHits))

            dispatch(genericOffersActions.success(cached.data, false))
        } else {
            dispatch(genericOffersActions.loading())
            dispatch(genericOffersActions.setPage(page))

            try {
                let result = await Product.search("", {
                    pageSize: 20,
                    page,
                    full_response: true,
                    facets: "Category",
                    facet: [
                        "IsOffer:true",
                        filter.category ? `Categories:${filter.category}` : ""
                    ].join(";")
                }, undefined, storeId)
                let categories = result.aggregations.Categories.buckets.map(i => ({ name: i.key, count: i.doc_count }))

                dispatch(genericOffersActions.clearAggregations())
                dispatch(genericOffersActions.setAggregation("categories", categories))
                dispatch(genericOffersActions.setTotalHits(result.totalHits))

                dispatch(genericOffersActions.success(result.hits, append))

                Cacher.cache("genericOffers", { page, ...filter, storeId }, { ...getStore().genericOffers })
            } catch (e) {
                dispatch(genericOffersActions.error(e))
                Logger.error("actions/genericOffers/all()", e, page, append)
            } finally {
                dispatch(genericOffersActions.loaded())
            }
        }
    }
}

export function loadMore() {
    return async function (dispatch, getStore) {
        let { page, totalHits, data } = getStore().genericOffers
        let nextPage = page + 1

        if (totalHits === data.length) {
            return
        }

        dispatch(all(nextPage, true))
    }
}

export function setFilter(filter) {
    return function (dispatch) {
        dispatch(genericOffersActions.setFilter(filter))
    }
}

export function clearFilter() {
    return function (dispatch) {
        dispatch(genericOffersActions.clearFilter())
    }
}

export function reset() {
    return function (dispatch) {
        dispatch(genericOffersActions.clear())
        dispatch(genericOffersActions.clearAggregations())
        dispatch(genericOffersActions.clearFilter())
        dispatch(genericOffersActions.all())
    }
}
