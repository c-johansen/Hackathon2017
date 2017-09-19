import { MostPurchasedProductsAction } from "../actions/creators/mostPurchasedProducts"

const init = {
    loading: false,
    data: [],
    filter: {
        category: null
    },
    aggregations: {
        categories: [],
        allergens: [],
        offers: []
    },
    error: null,
    totalHits: 0,
    page: 1,
    isUserSpecific: null
}

export default function (state = init, action) {
    switch (action.type) {
        case MostPurchasedProductsAction.SetQuery:
            return { ...state, query: action.payload }
        case MostPurchasedProductsAction.ClearQuery:
            return { ...state, query: "", data: [] }
        case MostPurchasedProductsAction.SetFilter:
            return { ...state, filter: { ...state.filter, ...action.payload } }
        case MostPurchasedProductsAction.ClearFilter:
            return { ...state, filter: { ...init.filter } }
        case MostPurchasedProductsAction.SetAggregation:
            return { ...state, aggregations: { ...state.aggregations, [action.payload.key]: action.payload.list } }
        case MostPurchasedProductsAction.ClearAggregation:
            return { ...state, aggregations: { categories: [], allergens: [], offers: [] } }
        case MostPurchasedProductsAction.Success:
            return {
                ...state,
                data: action.payload.append ? [...state.data, ...action.payload.data] : action.payload.data,
                error: null
            }
        case MostPurchasedProductsAction.Loading:
            return { ...state, loading: true }
        case MostPurchasedProductsAction.Loaded:
            return { ...state, loading: false }
        case MostPurchasedProductsAction.SetPage:
            return { ...state, page: action.payload }
        case MostPurchasedProductsAction.SetTotalHits:
            return { ...state, totalHits: action.payload }
        case MostPurchasedProductsAction.Error:
            return { ...state, error: action.payload }
        case MostPurchasedProductsAction.SetIsUserSpecific:
            return { ...state, isUserSpecific: action.payload }
        default:
            return state
    }
}
