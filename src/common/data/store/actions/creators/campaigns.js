export const CampaignsAction = {
    Loading: "campaigns:loading",
    Loaded: "campaigns:loaded",
    Success: "campaigns:success",
    Error: "campaigns:error"
}

export function success(data) {
    return {
        type: CampaignsAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: CampaignsAction.Error,
        payload: error
    }
}

export function loading() {
    return {
        type: CampaignsAction.Loading
    }
}

export function loaded() {
    return {
        type: CampaignsAction.Loaded
    }
}
