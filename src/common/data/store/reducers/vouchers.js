import { VouchersAction } from "../actions/creators/vouchers"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case VouchersAction.Success:
            return { ...state, data: action.payload, error: null }
        case VouchersAction.UpdateVoucher:
            return {
                ...state,
                data: [
                    ...state.data.filter(i => i.strekkode != action.payload.barcode),
                    {
                        ...state.data.find(i => i.strekkode == action.payload.barcode),
                        ...action.payload.props
                    }
                ]
            }
        case VouchersAction.Loading:
            return { ...state, loading: true }
        case VouchersAction.Loaded:
            return { ...state, loading: false }
        case VouchersAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
