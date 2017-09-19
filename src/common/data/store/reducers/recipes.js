import { RecipesAction } from "../actions/creators/recipes"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case RecipesAction.Success:
            return { ...state, data: action.payload, error: null }
        case RecipesAction.Loading:
            return { ...state, loading: true }
        case RecipesAction.Loaded:
            return { ...state, loading: false }
        case RecipesAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
