export const OfferCampaignsAction = {
    Loading: "offer-campaigns:loading",
    Loaded: "offer-campaigns:loaded",
    Success: "offer-campaigns:success",
    Error: "offer-campaigns:error"
}

export function success(data) {
    return {
        type: OfferCampaignsAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: OfferCampaignsAction.Error,
        payload: error
    }
}

export function loading() {
    return {
        type: OfferCampaignsAction.Loading
    }
}

export function loaded() {
    return {
        type: OfferCampaignsAction.Loaded
    }
}
