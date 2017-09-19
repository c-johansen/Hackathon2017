import * as cartActions from "./creators/cart"
import { get as getProductSuggestions } from "./productSuggestions"
import Logger from "../../Logger"

let cart = null

export function cartReady(receivedCart) {
    cart = receivedCart

    return function (dispatch) {
        dispatch(cartActions.cartReady(cart))
        dispatch(cartActions.cartUpdate(cart))
    }
}

export function cartError(error) {
    return function (dispatch) {
        dispatch(cartActions.cartError(error))
    }
}

export function cartUpdate() {
    return function (dispatch) {
        dispatch(cartActions.cartUpdate(cart))
    }
}

export function calculate() {
    return async function () {
        try {
            await cart.updateItemsFromCalculatorService()
        } catch (e) {
            Logger.error("actions/cart/calculate()", e)
        }
    }
}

export function calculatorUpdateStarted() {
    return function (dispatch) {
        dispatch(cartActions.calculatorUpdateStarted())
    }
}

export function calculatorUpdateSuccess() {
    return function (dispatch) {
        dispatch(cartActions.calculatorUpdateSuccess())
    }
}

export function calculatorUpdateFailed() {
    return function (dispatch) {
        dispatch(cartActions.calculatorUpdateFailed())
    }
}

export function addProduct(product) {
    return function (dispatch) {
        dispatch(getProductSuggestions(product.ean, product.title))
        cart.add(product)
    }
}

export function addCartItem(cartItem) {
    return function () {
        cart.add(cartItem)
    }
}

export function addCartItems(cartItems) {
    return function (dispatch) {
        cartItems.forEach((cartItem) => dispatch(addCartItem(cartItem)))
    }
}

export function increaseCartItem(cartItem) {
    return function () {
        let item = cart.getItemById(cartItem.product.ean)

        if (item) {
            item.increment()
        }
    }
}

export function decreaseCartItem(cartItem) {
    return function () {
        let item = cart.getItemById(cartItem.product.ean)

        if (item) {
            item.decrement()
        }
    }
}

export function removeCartItem(cartItem) {
    return function () {
        let item = cart.getItemById(cartItem.product.ean)

        if (item) {
            item.remove()
        }
    }
}

export function removeCartItems(cartItems) {
    return function (dispatch) {
        cartItems.forEach((cartItem) => dispatch(removeCartItem(cartItem)))
    }
}

export function empty() {
    return function () {
        cart.empty()
    }
}

export function reset() {
    return function () {
        cart.empty()
    }
}

export function loaded() {
    return function (dispatch) {
        dispatch(cartActions.loaded())
    }
}

export function loading() {
    return function (dispatch) {
        dispatch(cartActions.loading())
    }
}
