import { OfferCampaignsAction } from "../actions/creators/offerCampaigns"

const init = {
    loading: false,
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case OfferCampaignsAction.Success:
            return {
                ...state,
                data: action.payload,
                error: null
            }
        case OfferCampaignsAction.Loading:
            return { ...state, loading: true }
        case OfferCampaignsAction.Loaded:
            return { ...state, loading: false }
        case OfferCampaignsAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
