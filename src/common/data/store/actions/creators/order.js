export const OrderAction = {
    Loading: "order:loading",
    Loaded: "order:loaded",
    Success: "order:success",
    Error: "order:error",
    Update: "order:update",
    Invalidate: "order:invalidate",
}

export function loading() {
    return {
        type: OrderAction.Loading
    }
}

export function loaded() {
    return {
        type: OrderAction.Loaded
    }
}

export function success(data) {
    return {
        type: OrderAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: OrderAction.Error,
        payload: error
    }
}

export function update(data) {
    return {
        type: OrderAction.Update,
        payload: data
    }
}

export function invalidate() {
    return {
        type: OrderAction.Invalidate
    }
}
