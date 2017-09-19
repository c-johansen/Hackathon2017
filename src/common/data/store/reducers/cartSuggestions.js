import { CartSuggestionsAction } from "../actions/creators/cartSuggestions"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case CartSuggestionsAction.Success:
            return { ...state, data: action.payload, error: null }
        case CartSuggestionsAction.Loading:
            return { ...state, loading: true }
        case CartSuggestionsAction.Loaded:
            return { ...state, loading: false }
        case CartSuggestionsAction.Error:
            return { ...state, error: action.payload }
        case CartSuggestionsAction.Clear:
            return { ...state, data: [] }
        default:
            return state
    }
}
