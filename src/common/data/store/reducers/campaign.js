import { CampaignAction } from "../actions/creators/campaign"

const init = {
    loading: false,
    data: {
        products: [],
        campaign: {}
    },
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case CampaignAction.Success:
            return {
                ...state,
                data: action.payload,
                error: null
            }
        case CampaignAction.Loading:
            return { ...state, loading: true }
        case CampaignAction.Loaded:
            return { ...state, loading: false }
        case CampaignAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
