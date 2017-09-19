export const GenericOffersAction = {
    Success: "generic-offers:success",
    Error: "generic-offers:error",
    Loading: "generic-offers:loading",
    Loaded: "generic-offers:loaded",
    SetTotalHits: "generic-offers:set-total",
    SetPage: "generic-offers:set-page",
    SetFilter: "generic-offers:set-filter",
    SetAggregation: "generic-offers:set-aggregation",
    ClearAggregations: "generic-offers:clear-aggregations",
    ClearFilter: "generic-offers:clear-filter",
    Clear: "generic-offers:clear",
}

export function setAggregation(key, list) {
    return {
        type: GenericOffersAction.SetAggregation,
        payload: { key, list }
    }
}

export function clearAggregations() {
    return {
        type: GenericOffersAction.ClearAggregations
    }
}

export function clear() {
    return {
        type: GenericOffersAction.Clear
    }
}

export function setFilter(filter) {
    return {
        type: GenericOffersAction.SetFilter,
        payload: filter
    }
}

export function clearFilter() {
    return {
        type: GenericOffersAction.ClearFilter
    }
}

export function success(data, append) {
    return {
        type: GenericOffersAction.Success,
        payload: { data, append }
    }
}

export function setPage(page) {
    return {
        type: GenericOffersAction.SetPage,
        payload: page
    }
}

export function setTotalHits(totalHits) {
    return {
        type: GenericOffersAction.SetTotalHits,
        payload: totalHits
    }
}

export function error(error) {
    return {
        type: GenericOffersAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: GenericOffersAction.Loaded
    }
}

export function loading() {
    return {
        type: GenericOffersAction.Loading
    }
}
