import { StoreAction } from "../actions/creators/store"

const init = {
    loading: false,
    data: {},
    error: null
}

export default function (state = init, action) {
    switch (action.type) { 
        case StoreAction.Success: 
            return { ...state, data: action.payload, error: null }
        case StoreAction.Loading:
            return { ...state, loading: true }
        case StoreAction.Loaded:
            return { ...state, loading: false }
        case StoreAction.Error: 
            return { ...state, error: action.payload }
        case StoreAction.Clear: 
            return { ...state, data: {} }
        default:
            return state
    }
}
