import {
    cartReady,
    cartError,
    cartUpdate,
    loading,
    loaded,
    calculatorUpdateStarted,
    calculatorUpdateSuccess,
    calculatorUpdateFailed,
} from "../store/actions/cart"
import { getShoppingCart, ListEvent } from "@ng-mw/framework-shoppinglists"

export default async function (store) {
    try {
        store.dispatch(loading())

        let cart = await getShoppingCart()

        cart.on(ListEvent.ADD, () => store.dispatch(cartUpdate()))
        cart.on(ListEvent.UPDATE, () => store.dispatch(cartUpdate()))
        cart.on(ListEvent.REMOVE, () => store.dispatch(cartUpdate()))
        cart.on(ListEvent.MERGED, () => store.dispatch(cartUpdate()))
        cart.on(ListEvent.EMPTY, () => store.dispatch(cartUpdate()))
        cart.on(ListEvent.CLEAR, () => store.dispatch(cartUpdate()))
        cart.on(ListEvent.CALCULATOR_UPDATE_STARTED, () => store.dispatch(calculatorUpdateStarted()))
        cart.on(ListEvent.CALCULATOR_UPDATE_COMPLETE, () => store.dispatch(calculatorUpdateSuccess()))
        cart.on(ListEvent.CALCULATOR_UPDATE_FAILED, () => store.dispatch(calculatorUpdateFailed()))

        store.dispatch(cartReady(cart))
    } catch (e) {
        store.dispatch(cartError(e))
    } finally {
        store.dispatch(loaded())
    }
}
