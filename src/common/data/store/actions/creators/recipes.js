export const RecipesAction = {
    Success: "recepies:success",
    Error: "recepies:error",
    Loading: "recepies:loading",
    Loaded: "recepies:loaded"
}

export function success(data) {
    return {
        type: RecipesAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: RecipesAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: RecipesAction.Loaded
    }
}

export function loading() {
    return {
        type: RecipesAction.Loading
    }
}
