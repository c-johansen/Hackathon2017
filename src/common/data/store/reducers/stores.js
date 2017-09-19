import { StoresAction } from "../actions/creators/stores"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) { 
        case StoresAction.Success:
            return { ...state, data: action.payload, error: null }
        case StoresAction.Loading:
            return { ...state, loading: true }
        case StoresAction.Loaded:
            return { ...state, loading: false }
        case StoresAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
