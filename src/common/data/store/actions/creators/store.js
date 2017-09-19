export const StoreAction = { 
    Success: "store:success",
    Error: "store:error",
    Clear: "store:clear",
    Loading: "store:loading",
    Loaded: "store:loaded"
}
 

export function success(data) {
    return {
        type: StoreAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: StoreAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: StoreAction.Loaded
    }
}

export function loading() {
    return {
        type: StoreAction.Loading
    }
}

export function clear() {
    return {
        type: StoreAction.Clear
    }
}
