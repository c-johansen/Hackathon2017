export const HandoverWindowsAction = {
    HandoverWindowsSuccess: "handover-windows:success",
    HandoverWindowsError: "handover-windows:error",
    HandoverWindowsLoading: "handover-windows:loading",
    HandoverWindowsLoaded: "handover-windows:loaded",
    HandoverWindowsInvalidate: "handover-windows:invalidate",
}

export function handoverWindowsSuccess(data) {
    return {
        type: HandoverWindowsAction.HandoverWindowsSuccess,
        payload: data
    }
}

export function handoverWindowsLoading() {
    return {
        type: HandoverWindowsAction.HandoverWindowsLoading
    }
}

export function handoverWindowsLoaded() {
    return {
        type: HandoverWindowsAction.HandoverWindowsLoaded
    }
}

export function handoverWindowsError(error) {
    return {
        type: HandoverWindowsAction.HandoverWindowsError,
        payload: error
    }
}

export function handoverWindowsInvalidate() {
    return {
        type: HandoverWindowsAction.HandoverWindowsInvalidate
    }
}
