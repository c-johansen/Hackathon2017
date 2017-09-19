import { GenericOffersAction } from "../actions/creators/genericOffers"

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
        case GenericOffersAction.Clear:
            return { ...state, data: [], error: null }
        case GenericOffersAction.SetFilter:
            return { ...state, filter: { ...state.filter, ...action.payload } }
        case GenericOffersAction.ClearFilter:
            return { ...state, filter: { ...init.filter } }
        case GenericOffersAction.SetAggregation:
            return { ...state, aggregations: { ...state.aggregations, [action.payload.key]: action.payload.list } }
        case GenericOffersAction.ClearAggregation:
            return { ...state, aggregations: { categories: [], allergens: [], offers: [] } }
        case GenericOffersAction.SetPage:
            return { ...state, page: action.payload }
        case GenericOffersAction.SetTotalHits:
            return { ...state, totalHits: action.payload }
        case GenericOffersAction.Success:
            return {
                ...state,
                data: action.payload.append ? [...state.data, ...action.payload.data] : action.payload.data,
                error: null
            }
        case GenericOffersAction.Loading:
            return { ...state, loading: true }
        case GenericOffersAction.Loaded:
            return { ...state, loading: false }
        case GenericOffersAction.Error:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
