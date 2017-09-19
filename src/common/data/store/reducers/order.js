import { OrderAction } from "../actions/creators/order"

const init = {
    loading: false,
    data: null,
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case OrderAction.Success:
            return { ...state, data: action.payload, error: null }
        case OrderAction.Update:
            return { ...state, data: { ...state.data, ...action.payload } }
        case OrderAction.Loading:
            return { ...state, data: null, loading: true }
        case OrderAction.Loaded:
            return { ...state, loading: false }
        case OrderAction.Error:
            return { ...state, error: action.payload }
        case OrderAction.Invalidate:
            return {
                loading: false,
                data: null,
                error: null
            }
        case OrderAction.UpdateStatus:
            return { ...state, data: { ...state.data, status: action.payload } }
        default:
            return state
    }
}
