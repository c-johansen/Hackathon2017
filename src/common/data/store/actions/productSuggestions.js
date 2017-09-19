import * as productSuggestionsActions from "./creators/productSuggestions"
import { Product } from "@ng-mw/framework-productsearch"
import Logger from "../../Logger"

export function get(productId, productTitle) {
    return async function (dispatch, getStore) {
        let { productSuggestions, cart } = getStore()

        if (productId === productSuggestions.productId || !productSuggestions.active) {
            return
        }

        dispatch(productSuggestionsActions.setProduct(productId, productTitle))
        dispatch(productSuggestionsActions.loading())

        try {
            let result = await Product.suggest(productId, cart.items.map(i => i.product.ean))

            dispatch(productSuggestionsActions.success(result))
        } catch (e) {
            dispatch(productSuggestionsActions.error(e))
            Logger.error("actions/productSuggestions/get()", e, productId)
        } finally {
            dispatch(productSuggestionsActions.loaded())
        }
    }
}

export function clear() {
    return async function (dispatch) {
        dispatch(productSuggestionsActions.clear())
    }
}

export function hide() {
    return async function (dispatch) {
        dispatch(productSuggestionsActions.hide())
    }
}

export function show() {
    return async function (dispatch) {
        dispatch(productSuggestionsActions.show())
    }
}

export function activate() {
    return async function (dispatch) {
        dispatch(productSuggestionsActions.activate())
    }
}

export function disable() {
    return async function (dispatch) {
        dispatch(productSuggestionsActions.disable())
    }
}

export function toggleVisible() {
    return async function (dispatch) {
        dispatch(productSuggestionsActions.toggleVisible())
    }
}
