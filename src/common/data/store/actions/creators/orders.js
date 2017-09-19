export const OrdersAction = {
    Loading: "orders:loading",
    Loaded: "orders:loaded",
    Success: "orders:success",
    Error: "orders:error",
    Update: "orders:update",
    Remove: "orders:remove"
}

export function success(data) {
    return {
        type: OrdersAction.Success,
        payload: data
    }
}

export function remove(orderId) {
    return {
        type: OrdersAction.Remove,
        payload: orderId
    }
}

export function update(ngOrderId, data) {
    return {
        type: OrdersAction.Update,
        payload: { ngOrderId, data }
    }
}

export function error(error) {
    return {
        type: OrdersAction.Error,
        payload: error
    }
}

export function loading() {
    return {
        type: OrdersAction.Loading
    }
}

export function loaded() {
    return {
        type: OrdersAction.Loaded
    }
}
