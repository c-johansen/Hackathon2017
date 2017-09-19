import { CampaignsAction } from "../actions/creators/campaigns"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case CampaignsAction.Success:
            return {
                ...state,
                data: action.payload,
                error: null
            }
        case CampaignsAction.Loading:
            return { ...state, loading: true }
        case CampaignsAction.Loaded:
            return { ...state, loading: false }
        case CampaignsAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
