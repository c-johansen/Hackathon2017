export const OfferCampaignAction = {
    Loading: "offer-campaign:loading",
    Loaded: "offer-campaign:loaded",
    Success: "offer-campaign:success",
    Error: "offer-campaign:error",
    SetFilter: "offer-campaign:set-filter",
    SetTotalHits: "offer-campaign:set-total",
    SetPage: "offer-campaign:set-page",
    SetAggregation: "offer-campaign:set-aggregation",
    ClearAggregations: "offer-campaign:clear-aggregations",
    ClearFilter: "offer-campaign:clear-filter",
    Clear: "offer-campaign:clear",
}

export function setAggregation(key, list) {
    return {
        type: OfferCampaignAction.SetAggregation,
        payload: { key, list }
    }
}

export function clearAggregations() {
    return {
        type: OfferCampaignAction.ClearAggregations
    }
}

export function setFilter(filter) {
    return {
        type: OfferCampaignAction.SetFilter,
        payload: filter
    }
}

export function clearFilter() {
    return {
        type: OfferCampaignAction.ClearFilter
    }
}

export function clear() {
    return {
        type: OfferCampaignAction.Clear
    }
}

export function setPage(page) {
    return {
        type: OfferCampaignAction.SetPage,
        payload: page
    }
}

export function setTotalHits(totalHits) {
    return {
        type: OfferCampaignAction.SetTotalHits,
        payload: totalHits
    }
}

export function success(data, append) {
    return {
        type: OfferCampaignAction.Success,
        payload: {data, append}
    }
}

export function error(error) {
    return {
        type: OfferCampaignAction.Error,
        payload: error
    }
}

export function loading() {
    return {
        type: OfferCampaignAction.Loading
    }
}

export function loaded() {
    return {
        type: OfferCampaignAction.Loaded
    }
}
