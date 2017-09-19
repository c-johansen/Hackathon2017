import { ProductSuggestionsAction } from "../actions/creators/productSuggestions"

const init = {
    productId: null,
    active: false,
    denomination: null,
    visible: true,
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case ProductSuggestionsAction.Success:
            return { ...state, data: action.payload, error: null }
        case ProductSuggestionsAction.Activate:
            return { ...state, active: true }
        case ProductSuggestionsAction.Disable:
            return { ...state, active: false }
        case ProductSuggestionsAction.Loading:
            return { ...state, loading: true }
        case ProductSuggestionsAction.Loaded:
            return { ...state, loading: false }
        case ProductSuggestionsAction.Error:
            return { ...state, error: action.payload }
        case ProductSuggestionsAction.SetProduct:
            return { ...state, productId: action.payload.productId, denomination: action.payload.denomination }
        case ProductSuggestionsAction.Clear:
            return { ...state, productId: null, data: [] }
        case ProductSuggestionsAction.Show:
            return { ...state, visible: true }
        case ProductSuggestionsAction.Hide:
            return { ...state, visible: false }
        case ProductSuggestionsAction.ToggleVisible:
            return { ...state, visible: !state.visible }
        default:
            return state
    }
}
