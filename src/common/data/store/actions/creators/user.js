export const UserAction = {
    SetToken: "user:set-token",
    SetKey: "user:set-key",
    SetStandardStore: "user:set-standard-store",
    Error: "user:error",
    Loaded: "user:loaded",
    Loading: "user:loading",
    LogOut: "user:log-out",
    ClearError: "user:clear-error",
    ShowWelcomeScreen: "user:show-welcome-screen",
    HideWelcomeScreen: "user:hide-welcome-screen",
    ExtendedUserLoading: "user:extended-user-loading",
    ExtendedUserSuccess: "user:extended-user-success",
    ExtendedUserLoaded: "user:extended-user-loaded",
    ExtendedUserError: "user:extended-user-error",
    ExtendedUserUpdate: "user:extended-user-update",
    ExtendedUserUpdateSuccess: "user:extended-user-update-success",
    ExtendedUserUpdateError: "user:extended-user-update-error",
    // Extended-user-settings
    SetHandoverInfoAndStore: "user:set-handover-info-and-store",
    SetHandoverTypeAndLocation: "user:set-handover-type-and-location",
    SetHandoverWindow: "user:set-handover-window",
    UpdateHandoverWindowData: "user:update-handover-window-data",
    ResetHandoverWindow: "user:reset-handover-window",
}

export function setToken(token) {
    return {
        type: UserAction.SetToken,
        payload: token
    }
}

export function clearError() {
    return {
        type: UserAction.ClearError
    }
}

export function showWelcomeScreen() {
    return {
        type: UserAction.ShowWelcomeScreen
    }
}

export function hideWelcomeScreen() {
    return {
        type: UserAction.HideWelcomeScreen
    }
}

export function logOut() {
    return {
        type: UserAction.LogOut
    }
}

export function setKey(key) {
    return {
        type: UserAction.SetKey,
        payload: key
    }
}

export function error(e) {
    return {
        type: UserAction.Error,
        payload: e
    }
}

export function loading() {
    return {
        type: UserAction.Loading
    }
}

export function loaded() {
    return {
        type: UserAction.Loaded
    }
}

export function setStandardStore(payload) {
    return {
        type: UserAction.SetStandardStore,
        payload
    }
}

export function extendedUserLoading() {
    return {
        type: UserAction.ExtendedUserLoading
    }
}

export function extendedUserUpdate(payload) {
    return {
        type: UserAction.ExtendedUserUpdate,
        payload
    }
}

export function extendedUserSuccess(data) {
    if (data.handoverInfo) {
        const { from, to, customerPickupFrom, customerPickupTo, deadline } = data.handoverInfo

        data.handoverInfo.from = from ? new Date(from) : null
        data.handoverInfo.to = to ? new Date(to) : null
        data.handoverInfo.customerPickupFrom = customerPickupFrom ? new Date(customerPickupFrom) : null
        data.handoverInfo.customerPickupTo = customerPickupTo ? new Date(customerPickupTo) : null
        data.handoverInfo.deadline = deadline ? new Date(deadline) : null
    }

    return {
        type: UserAction.ExtendedUserSuccess,
        payload: data
    }
}

export function extendedUserLoaded() {
    return {
        type: UserAction.ExtendedUserLoaded
    }
}

export function extendedUserError(e) {
    return {
        type: UserAction.ExtendedUserError,
        message: e
    }
}

export function extendedUserUpdateSuccess(data) {
    return {
        type: UserAction.ExtendedUserUpdateSuccess,
        payload: data
    }
}

export function extendedUserUpdateError(e) {
    return {
        type: UserAction.ExtendedUserUpdateError,
        message: e
    }
}

export function setHandoverInfoAndStore(handoverInfo, store, localOnly) {
    return {
        type: UserAction.SetHandoverInfoAndStore,
        payload: {
            handoverInfo,
            store,
            localOnly
        }
    }
}

export function setHandoverTypeAndLocation(handoverType, location, localOnly) {
    return {
        type: UserAction.SetHandoverTypeAndLocation,
        payload: {
            handoverType,
            location,
            localOnly
        }
    }
}

export function setHandoverWindow(handoverWindow, localOnly) {
    return {
        type: UserAction.SetHandoverWindow,
        payload: handoverWindow,
        localOnly
    }
}

export function updateHandoverWindowData(handoverWindow) {
    return {
        type: UserAction.UpdateHandoverWindowData,
        payload: handoverWindow
    }
}

export function resetHandoverWindow() {
    return {
        type: UserAction.ResetHandoverWindow
    }
}
