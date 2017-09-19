import * as productsActions from "./creators/products"
import parseProductAutocomplete from "../../parsers/parse-product-autocomplete"
import { Product } from "@ng-mw/framework-productsearch"
import Logger from "../../Logger"
import Cacher from "../../Cacher"

export function search(query = "", page = 1, append = false) {
    return async function (dispatch, getStore) {
        let { filter } = getStore().products
        query = query.toString().trim()
        let cached = await Cacher.get("products", { page, query, ...filter })

        dispatch(productsActions.setQuery(query))
        dispatch(productsActions.setPage(page))

        if (cached) {
            dispatch(productsActions.clearAggregations())
            dispatch(productsActions.setAggregation("categories", cached.aggregations.categories))
            dispatch(productsActions.setAggregation("allergens", cached.aggregations.allergens))
            dispatch(productsActions.setAggregation("offers", cached.aggregations.offers))
            dispatch(productsActions.setTotalHits(cached.totalHits))

            if (cached.autocomplete.suggestion) {
                dispatch(productsActions.setAutocomplete(query, cached.autocomplete.suggestion))
            } else {
                dispatch(productsActions.clearAutocomplete())
            }

            dispatch(productsActions.success(cached.data, false))
        } else {
            dispatch(productsActions.loading())

            try {
                let result = await Product.search(query, {
                    pageSize: 20,
                    page,
                    facet: [
                        filter.category ? `Categories:${filter.category}` : "",
                        filter.specificCategory ? `ShoppingListGroupsLeaf:${filter.specificCategory}` : ""
                    ].join(";"),
                    suggest: true,
                    full_response: true
                })
                let autocomplete = parseProductAutocomplete(result)
                let categories = result.aggregations.Categories.buckets.map(i => ({ name: i.key, count: i.doc_count }))
                let allergens = result.aggregations.Allergens.buckets.map(i => ({ name: i.key, count: i.doc_count }))
                let offers = result.aggregations.IsOffer.buckets.map(i => ({ isOffer: !!i.key, count: i.doc_count }))

                dispatch(productsActions.clearAggregations())
                dispatch(productsActions.setAggregation("categories", categories))
                dispatch(productsActions.setAggregation("allergens", allergens))
                dispatch(productsActions.setAggregation("offers", offers))
                dispatch(productsActions.setTotalHits(result.totalHits))

                if (autocomplete) {
                    dispatch(productsActions.setAutocomplete(query, autocomplete))
                } else {
                    dispatch(productsActions.clearAutocomplete())
                }

                dispatch(productsActions.success(result.hits, append))

                Cacher.cache("products", { query, page, ...filter }, { ...getStore().products })
            } catch (e) {
                dispatch(productsActions.error(e))
                Logger.error("actions/products/search()", e, query, page, append)
            } finally {
                dispatch(productsActions.loaded())
            }
        }
    }
}

export function loadMore() {
    return async function (dispatch, getStore) {
        let { query, page, totalHits, data } = getStore().products
        let nextPage = page + 1

        if (totalHits === data.length) {
            return
        }

        dispatch(search(query, nextPage, true))
    }
}

export function setQuery(query) {
    return function (dispatch) {
        dispatch(productsActions.setQuery(query))
    }
}

export function setFilter(filter) {
    return function (dispatch) {
        dispatch(productsActions.setFilter(filter))
    }
}

export function clearFilter() {
    return function (dispatch) {
        dispatch(productsActions.clearFilter())
    }
}

export function clearQuery() {
    return function (dispatch) {
        dispatch(productsActions.clearQuery())
    }
}

