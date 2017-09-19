import * as mostPurchasedProductsActions from "./creators/mostPurchasedProducts"
import { Product } from "@ng-mw/framework-productsearch"
import ProductSearchResultType from "../../const/ProductSearchResultType"
import Logger from "../../Logger"
import Cacher from "../../Cacher"

export function all(page = 1, append = false) {
    return async function (dispatch, getStore) {
        let { filter, isUserSpecific } = getStore().mostPurchasedProducts
        let cached = await Cacher.get("mostPurchasedProducts", { ...filter, page })

        dispatch(mostPurchasedProductsActions.setPage(page))

        if (cached) {
            dispatch(mostPurchasedProductsActions.clearAggregations())
            dispatch(mostPurchasedProductsActions.setAggregation("categories", cached.aggregations.categories))
            dispatch(mostPurchasedProductsActions.setTotalHits(cached.totalHits))
            dispatch(mostPurchasedProductsActions.setIsUserSpecific(cached.isUserSpecific))

            dispatch(mostPurchasedProductsActions.success(cached.data, false))
        } else {
            dispatch(mostPurchasedProductsActions.loading())

            try {
                let result = await Product.search("", {
                    pageSize: 20,
                    page,
                    facet: filter.category ? `Categories:${filter.category}` : null,
                    full_response: true,
                    facets: "Category",
                    purchased: !isUserSpecific && filter.category ? null : true,
                    ignore_purchased: true,
                })

                dispatch(mostPurchasedProductsActions.clearAggregations())
                dispatch(mostPurchasedProductsActions.setAggregation("categories", result.aggregations.Categories.buckets.map(i => ({ name: i.key, count: i.doc_count }))))
                dispatch(mostPurchasedProductsActions.setTotalHits(result.totalHits))
                dispatch(mostPurchasedProductsActions.setIsUserSpecific(result.searchType === ProductSearchResultType.Personal))

                dispatch(mostPurchasedProductsActions.success(result.hits, append))

                Cacher.cache("mostPurchasedProducts", { ...filter, page }, { ...getStore().mostPurchasedProducts })
            } catch (e) {
                dispatch(mostPurchasedProductsActions.error(e))
                Logger.error("actions/mostPurchasedProducts/all()", e, page, append)
            } finally {
                dispatch(mostPurchasedProductsActions.loaded())
            }
        }
    }
}

export function loadMore() {
    return async function (dispatch, getStore) {
        let { page, totalHits, data } = getStore().mostPurchasedProducts

        if (totalHits === data.length) {
            return
        }

        dispatch(all(page + 1, true))
    }
}

export function setFilter(filter) {
    return async function (dispatch) {
        dispatch(mostPurchasedProductsActions.setFilter(filter))
    }
}

export function clearFilter() {
    return async function (dispatch) {
        dispatch(mostPurchasedProductsActions.clearFilter())
        dispatch(all())
    }
}
