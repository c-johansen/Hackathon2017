import { HandoverWindowsAction } from "../actions/creators/handoverWindows"

const init = {
    loading: false,
    error: null,
    data: {
        days: [],
        firstAvailableWindow: null,
    },
}

export default function (state = init, action) {
    switch (action.type) {
        case HandoverWindowsAction.HandoverWindowsSuccess:
            return { ...state, data: action.payload, error: null }
        case HandoverWindowsAction.HandoverWindowsLoading:
            return { ...state, loading: true }
        case HandoverWindowsAction.HandoverWindowsLoaded:
            return { ...state, loading: false }
        case HandoverWindowsAction.HandoverWindowsError:
            return { ...state, data: init.data, error: action.payload }
        case HandoverWindowsAction.HandoverWindowsInvalidate:
            return { loading: false, data: init.data, error: null }
        default:
            return state
    }
}
