export const MostPurchasedProductsAction = {
    SetIsUserSpecific: "most-purchased-products:set-is-user-specific",
    Success: "most-purchased-products:success",
    Error: "most-purchased-products:error",
    Loading: "most-purchased-products:loading",
    Loaded: "most-purchased-products:loaded",
    SetPage: "most-purchased-products:set-page",
    SetTotalHits: "most-purchased-products:set-total-hits",
    SetFilter: "most-purchased-products:set-filter",
    ClearFilter: "most-purchased-products:clear-filter",
    SetAggregation: "most-purchased-products:set-aggregation",
    ClearAggregations: "most-purchased-products:clear-aggregations"
}

export function setAggregation(key, list) {
    return {
        type: MostPurchasedProductsAction.SetAggregation,
        payload: { key, list }
    }
}

export function clearAggregations() {
    return {
        type: MostPurchasedProductsAction.ClearAggregations
    }
}

export function setFilter(filter) {
    return {
        type: MostPurchasedProductsAction.SetFilter,
        payload: filter
    }
}

export function clearFilter() {
    return {
        type: MostPurchasedProductsAction.ClearFilter
    }
}

export function setTotalHits(totalHits) {
    return {
        type: MostPurchasedProductsAction.SetTotalHits,
        payload: totalHits
    }
}

export function setPage(page) {
    return {
        type: MostPurchasedProductsAction.SetPage,
        payload: page
    }
}

export function setIsUserSpecific(value) {
    return {
        type: MostPurchasedProductsAction.SetIsUserSpecific,
        payload: value
    }
}

export function success(data, append) {
    return {
        type: MostPurchasedProductsAction.Success,
        payload: {data, append}
    }
}

export function error(error) {
    return {
        type: MostPurchasedProductsAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: MostPurchasedProductsAction.Loaded
    }
}

export function loading() {
    return {
        type: MostPurchasedProductsAction.Loading
    }
}
