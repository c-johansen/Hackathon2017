export const StoresAction = { 
    Success: "stores:success",
    Error: "stores:error",
    Loading: "stores:loading",
    Loaded: "stores:loaded"
} 

export function success(data) {
    return {
        type: StoresAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: StoresAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: StoresAction.Loaded
    }
}

export function loading() {
    return {
        type: StoresAction.Loading
    }
}
