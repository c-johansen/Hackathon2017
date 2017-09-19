export const ProductsAction = {
    SetQuery: "products:set-query",
    Success: "products:success",
    Error: "products:error",
    Loading: "products:loading",
    Loaded: "products:loaded",
    SetTotalHits: "products:set-total",
    SetPage: "products:set-page",
    Cache: "products:cache",
    ClearQuery: "products:clear-query",
    SetFilter: "products:set-filter",
    SetAggregation: "products:set-aggregation",
    ClearAggregations: "products:clear-aggregations",
    ClearFilter: "products:clear-filter",
    SetAutocomplete: "products:set-autocomplete",
    ClearAutocomplete: "products:clear-autocomplete"
}

export function setAutocomplete(original, suggestion) {
    return {
        type: ProductsAction.SetAutocomplete,
        payload: { original, suggestion }
    }
}

export function clearAutocomplete() {
    return {
        type: ProductsAction.ClearAutocomplete
    }
}

export function setAggregation(key, list) {
    return {
        type: ProductsAction.SetAggregation,
        payload: { key, list }
    }
}

export function clearAggregations() {
    return {
        type: ProductsAction.ClearAggregations
    }
}

export function setFilter(filter) {
    return {
        type: ProductsAction.SetFilter,
        payload: filter
    }
}

export function clearFilter() {
    return {
        type: ProductsAction.ClearFilter
    }
}

export function setQuery(query) {
    return {
        type: ProductsAction.SetQuery,
        payload: query
    }
}

export function clearQuery() {
    return {
        type: ProductsAction.ClearQuery
    }
}

export function setPage(page) {
    return {
        type: ProductsAction.SetPage,
        payload: page
    }
}

export function setTotalHits(totalHits) {
    return {
        type: ProductsAction.SetTotalHits,
        payload: totalHits
    }
}

export function success(data, append) {
    return {
        type: ProductsAction.Success,
        payload: { data, append }
    }
}

export function cache(query, data) {
    return {
        type: ProductsAction.Cache,
        payload: { query, data }
    }
}

export function error(error) {
    return {
        type: ProductsAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: ProductsAction.Loaded
    }
}

export function loading() {
    return {
        type: ProductsAction.Loading
    }
}
