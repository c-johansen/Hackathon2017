import { ProductsAction } from "../actions/creators/products"
import moment from "moment"

const init = {
    loading: false,
    autocomplete: {
        original: null,
        suggestion: null
    },
    filter: {
        category: null,
        specificCategory: null
    },
    aggregations: {
        categories: [],
        allergens: [],
        offers: []
    },
    totalHits: 0,
    page: 1,
    cache: {},
    data: [],
    error: null,
    query: null
}

export default function (state = init, action) {
    switch (action.type) {
        case ProductsAction.SetQuery:
            return { ...state, query: action.payload }
        case ProductsAction.SetAutocomplete:
            return { ...state, autocomplete: action.payload }
        case ProductsAction.ClearAutocomplete:
            return { ...state, autocomplete: { original: null, suggestion: null } }
        case ProductsAction.ClearQuery:
            return { ...state, query: null, data: [] }
        case ProductsAction.SetFilter:
            return { ...state, filter: { ...state.filter, ...action.payload } }
        case ProductsAction.ClearFilter:
            return { ...state, filter: { ...init.filter } }
        case ProductsAction.SetAggregation:
            return { ...state, aggregations: { ...state.aggregations, [action.payload.key]: action.payload.list } }
        case ProductsAction.ClearAggregation:
            return { ...state, aggregations: { categories: [], allergens: [], offers: [] } }
        case ProductsAction.Success:
            return {
                ...state,
                data: action.payload.append ? [...state.data, ...action.payload.data] : action.payload.data,
                error: null
            }
        case ProductsAction.Loading:
            return { ...state, loading: true }
        case ProductsAction.Loaded:
            return { ...state, loading: false }
        case ProductsAction.SetPage:
            return { ...state, page: action.payload }
        case ProductsAction.SetTotalHits:
            return { ...state, totalHits: action.payload }
        case ProductsAction.Error:
            return { ...state, error: action.payload }
        case ProductsAction.Cache:
            return {
                ...state,
                cache: {
                    ...state.cache,
                    [action.payload.query]: {
                        query: action.payload.query,
                        expiresAt: moment().add(1, "hour").toDate(),
                        data: action.payload.data
                    }
                }
            }
        default:
            return state
    }
}
