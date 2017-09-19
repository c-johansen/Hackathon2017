export const ProductAction = {
    Success: "product:success",
    Error: "product:error",
    Clear: "product:clear",
    Loading: "product:loading",
    Loaded: "product:loaded",
    SetId: "product:set-id"
}

export function success(data) {
    return {
        type: ProductAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: ProductAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: ProductAction.Loaded
    }
}

export function loading() {
    return {
        type: ProductAction.Loading
    }
}

export function clear() {
    return {
        type: ProductAction.Clear
    }
}

export function setId(id) {
    return {
        type: ProductAction.SetId,
        payload: id
    }
}
