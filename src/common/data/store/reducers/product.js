import { ProductAction } from "../actions/creators/product"

const init = {
    loading: false,
    id: null,
    data: {},
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case ProductAction.Success:
            return { ...state, data: action.payload, error: null }
        case ProductAction.Loading:
            return { ...state, loading: true }
        case ProductAction.Loaded:
            return { ...state, loading: false }
        case ProductAction.Error:
            return { ...state, error: action.payload }
        case ProductAction.Clear:
            return { ...state, data: {} }
        case ProductAction.SetId:
            return { ...state, id: action.payload }
        default:
            return state
    }
}
