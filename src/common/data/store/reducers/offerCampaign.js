import { OfferCampaignAction } from "../actions/creators/offerCampaign"

const init = {
    loading: false,
    data: [],
    error: null,
    page: 1,
    filter: {
        category: null
    },
    aggregations: {
        categories: [],
        allergens: [],
        offers: []
    },
    totalHits: 0,
}

export default function (state = init, action) {
    switch (action.type) {
        case OfferCampaignAction.SetFilter:
            return { ...state, filter: { ...state.filter, ...action.payload } }
        case OfferCampaignAction.ClearFilter:
            return { ...state, filter: { ...init.filter } }
        case OfferCampaignAction.Clear:
            return { ...state, filter: { ...init.filter }, data: [] }
        case OfferCampaignAction.SetAggregation:
            return { ...state, aggregations: { ...state.aggregations, [action.payload.key]: action.payload.list } }
        case OfferCampaignAction.ClearAggregation:
            return { ...state, aggregations: { categories: [], allergens: [], offers: [] } }
        case OfferCampaignAction.Success:
            return {
                ...state,
                data: action.payload.append ? [...state.data, ...action.payload.data] : action.payload.data,
                error: null
            }
        case OfferCampaignAction.SetPage:
            return { ...state, page: action.payload }
        case OfferCampaignAction.SetTotalHits:
            return { ...state, totalHits: action.payload }
        case OfferCampaignAction.Loading:
            return { ...state, loading: true }
        case OfferCampaignAction.Loaded:
            return { ...state, loading: false }
        case OfferCampaignAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
