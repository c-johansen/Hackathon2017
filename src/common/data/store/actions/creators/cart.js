export const CartAction = {
    CartReady: "cart:cart-ready",
    CartError: "cart:cart-error",
    CartUpdate: "cart:cart-update",
    CalculatorUpdateStarted: "cart:calculator-update-started",
    CalculatorUpdateSuccess: "cart:calculator-update-success",
    CalculatorUpdateFailed: "cart:calculator-update-failed",
    Loading: "cart:loading",
    Loaded: "cart:loaded"
}

export function cartReady(cart) {
    return {
        type: CartAction.CartReady,
        payload: cart
    }
}

export function cartError(error) {
    return {
        type: CartAction.CartError,
        error
    }
}

export function cartUpdate(cart) {
    return {
        type: CartAction.CartUpdate,
        payload: cart
    }
}

export function loading() {
    return {
        type: CartAction.Loading
    }
}

export function loaded() {
    return {
        type: CartAction.Loaded
    }
}

export function calculatorUpdateStarted() {
    return {
        type: CartAction.CalculatorUpdateStarted
    }
}

export function calculatorUpdateSuccess() {
    return {
        type: CartAction.CalculatorUpdateSuccess
    }
}

export function calculatorUpdateFailed() {
    return {
        type: CartAction.CalculatorUpdateFailed
    }
}
