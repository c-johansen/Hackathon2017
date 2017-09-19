import * as productActions from "./creators/product"
import * as appActions from "./app"
import { Product } from "@ng-mw/framework-productsearch"
import Logger from "../../Logger"

export function get(id) {
    return async function (dispatch, getStore) {
        const { products, mostPurchasedProducts, cartSuggestions, cart } = getStore()
        const cached = [
            ...products.data,
            ...mostPurchasedProducts.data,
            ...cartSuggestions.data,
            ...cart.items.map(i => i.product)
        ].find(i => i.ean === id)

        dispatch(productActions.setId(id))
        dispatch(appActions.showProductPopup())

        if (cached) {
            dispatch(productActions.success(cached))
        } else {
            dispatch(productActions.clear())
            dispatch(productActions.loading())

            try {
                let result = await Product.get(id, {})

                dispatch(productActions.success(result))
            } catch (e) {
                dispatch(productActions.error(e))
                Logger.error("actions/product/get()", e, id)
            } finally {
                dispatch(productActions.loaded())
            }
        }
    }
}
