export const ProductSuggestionsAction = {
    Activate: "product-suggestions:activate",
    Disable: "product-suggestions:disable",
    SetProduct: "product-suggestions:set-product",
    Success: "product-suggestions:success",
    Error: "product-suggestions:error",
    Loading: "product-suggestions:loading",
    Loaded: "product-suggestions:loaded",
    Clear: "product-suggestions:clear",
    Show: "product-suggestions:show",
    Hide: "product-suggestions:hide",
    ToggleVisible: "product-suggestions:toggle-visible"
}

export function setProduct(productId, denomination) {
    return {
        type: ProductSuggestionsAction.SetProduct,
        payload: { productId, denomination }
    }
}

export function activate() {
    return {
        type: ProductSuggestionsAction.Activate
    }
}

export function disable() {
    return {
        type: ProductSuggestionsAction.Disable
    }
}

export function success(data) {
    return {
        type: ProductSuggestionsAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: ProductSuggestionsAction.Error,
        payload: error
    }
}

export function toggleVisible() {
    return {
        type: ProductSuggestionsAction.ToggleVisible
    }
}

export function loaded() {
    return {
        type: ProductSuggestionsAction.Loaded
    }
}

export function loading() {
    return {
        type: ProductSuggestionsAction.Loading
    }
}

export function clear() {
    return {
        type: ProductSuggestionsAction.Clear
    }
}

export function show() {
    return {
        type: ProductSuggestionsAction.Show
    }
}

export function hide() {
    return {
        type: ProductSuggestionsAction.Hide
    }
}
