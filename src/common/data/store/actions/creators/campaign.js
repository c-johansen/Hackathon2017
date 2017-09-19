export const CampaignAction = {
    Loading: "campaign:loading",
    Loaded: "campaign:loaded",
    Success: "campaign:success",
    Error: "campaign:error"
}

export function success(campaign, products) {
    return {
        type: CampaignAction.Success,
        payload: { campaign, products }
    }
}

export function error(error) {
    return {
        type: CampaignAction.Error,
        payload: error
    }
}

export function loading() {
    return {
        type: CampaignAction.Loading
    }
}

export function loaded() {
    return {
        type: CampaignAction.Loaded
    }
}
