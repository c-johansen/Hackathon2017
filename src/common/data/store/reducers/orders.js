import { OrdersAction } from "../actions/creators/orders"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case OrdersAction.Success:
            return { ...state, data: action.payload, error: null }
        case OrdersAction.Loading:
            return { ...state, loading: true }
        case OrdersAction.Loaded:
            return { ...state, loading: false }
        case OrdersAction.Error:
            return { ...state, error: action.payload }
        case OrdersAction.Update: {
            const foundOrder = state.data.find(i => i.ngOrderId == action.payload.ngOrderId)

            if (!foundOrder) {
                return { ...state }
            }

            return {
                ...state,
                data: [
                    ...state.data.filter(i => i.ngOrderId != action.payload.ngOrderId),
                    {
                        ...foundOrder,
                        ...action.payload.data
                    }
                ]
            }
        }
        case OrdersAction.Remove:
            return { ...state, data: state.data.filter(i => i.ngOrderId !== action.payload) }
        default:
            return state
    }
}
