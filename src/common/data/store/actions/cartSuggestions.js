import * as cartSuggestionsActions from "./creators/cartSuggestions"
import { Product } from "@ng-mw/framework-productsearch"
import Logger from "../../Logger"

export function getCartSuggestions(cartItems) {
    return async function (dispatch) {
        dispatch(cartSuggestionsActions.loading())

        try {
            let productIds = cartItems.reduce(function (prev, curr) {
                return [...prev, curr.product.ean]
            }, [])

            let result = []

            if (cartItems.length) {
                result = await Product.cartSuggest(productIds)
            }

            dispatch(cartSuggestionsActions.success(result))
        } catch (e) {
            dispatch(cartSuggestionsActions.error(e))
            Logger.error("actions/cartSuggestions/getCartSuggestions()", e)
        } finally {
            dispatch(cartSuggestionsActions.loaded())
        }
    }
}
