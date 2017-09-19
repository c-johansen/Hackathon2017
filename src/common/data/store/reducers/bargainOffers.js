import { BargainOffersAction } from "../actions/creators/bargainOffers"

const init = {
    loading: false,
    totalHits: 0,
    page: 1,
    filter: {
        category: null
    },
    aggregations: {
        categories: [],
        allergens: [],
        offers: []
    },
    data: [],
    error: null
}

export default function (state = init, action) {
    switch (action.type) {
        case BargainOffersAction.Clear:
            return { ...state, data: [], error: null }
        case BargainOffersAction.SetFilter:
            return { ...state, filter: { ...state.filter, ...action.payload } }
        case BargainOffersAction.ClearFilter:
            return { ...state, filter: { ...init.filter } }
        case BargainOffersAction.SetAggregation:
            return { ...state, aggregations: { ...state.aggregations, [action.payload.key]: action.payload.list } }
        case BargainOffersAction.ClearAggregation:
            return { ...state, aggregations: { categories: [], allergens: [], offers: [] } }
        case BargainOffersAction.SetPage:
            return { ...state, page: action.payload }
        case BargainOffersAction.SetTotalHits:
            return { ...state, totalHits: action.payload }
        case BargainOffersAction.Success:
            return {
                ...state,
                data: action.payload.append ? [...state.data, ...action.payload.data] : action.payload.data,
                error: null
            }
        case BargainOffersAction.Loading:
            return { ...state, loading: true }
        case BargainOffersAction.Loaded:
            return { ...state, loading: false }
        case BargainOffersAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
