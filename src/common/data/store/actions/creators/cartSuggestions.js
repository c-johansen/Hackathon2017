export const CartSuggestionsAction = {
    Success: "cart-suggestions:success",
    Error: "cart-suggestions:error",
    Loading: "cart-suggestions:loading",
    Loaded: "cart-suggestions:loaded",
    Clear: "cart-suggestions:clear"
}

export function success(data) {
    return {
        type: CartSuggestionsAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: CartSuggestionsAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: CartSuggestionsAction.Loaded
    }
}

export function loading() {
    return {
        type: CartSuggestionsAction.Loading
    }
}

export function clear() {
    return {
        type: CartSuggestionsAction.Clear
    }
}
