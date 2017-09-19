export const BargainOffersAction = {
    Success: "bargain-offers:success",
    Error: "bargain-offers:error",
    Loading: "bargain-offers:loading",
    Loaded: "bargain-offers:loaded",
    SetTotalHits: "bargain-offers:set-total",
    SetPage: "bargain-offers:set-page",
    SetFilter: "bargain-offers:set-filter",
    SetAggregation: "bargain-offers:set-aggregation",
    ClearAggregations: "bargain-offers:clear-aggregations",
    ClearFilter: "bargain-offers:clear-filter",
    Clear: "bargain-offers:clear",
}

export function setAggregation(key, list) {
    return {
        type: BargainOffersAction.SetAggregation,
        payload: { key, list }
    }
}

export function clearAggregations() {
    return {
        type: BargainOffersAction.ClearAggregations
    }
}

export function clear() {
    return {
        type: BargainOffersAction.Clear
    }
}

export function setFilter(filter) {
    return {
        type: BargainOffersAction.SetFilter,
        payload: filter
    }
}

export function clearFilter() {
    return {
        type: BargainOffersAction.ClearFilter
    }
}

export function success(data, append) {
    return {
        type: BargainOffersAction.Success,
        payload: {data, append}
    }
}

export function setPage(page) {
    return {
        type: BargainOffersAction.SetPage,
        payload: page
    }
}

export function setTotalHits(totalHits) {
    return {
        type: BargainOffersAction.SetTotalHits,
        payload: totalHits
    }
}

export function error(error) {
    return {
        type: BargainOffersAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: BargainOffersAction.Loaded
    }
}

export function loading() {
    return {
        type: BargainOffersAction.Loading
    }
}
