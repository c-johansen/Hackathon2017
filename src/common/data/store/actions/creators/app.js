export const AppAction = {
    ShowCheckoutPopup: "app:show-checkout-popup",
    HideCheckoutPopup: "app:hide-checkout-popup",
    ShowProductPopup: "app:show-product-popup",
    HideProductPopup: "app:hide-product-popup",
    ShowCartPopup: "app:show-cart-popup",
    HideCartPopup: "app:hide-cart-popup",
    ShowOnboardingPopup: "app:show-onboarding-popup",
    HideOnboardingPopup: "app:hide-onboarding-popup",
    ShowTosPopup: "app:show-tos-popup",
    HideTosPopup: "app:hide-tos-popup",
    ShowHandoverPickerPopup: "app:show-handover-picker-popup",
    HideHandoverPickerPopup: "app:hide-handover-picker-popup",
}

export function showOnboardingPopup() {
    return {
        type: AppAction.ShowOnboardingPopup
    }
}

export function hideOnboardingPopup() {
    return {
        type: AppAction.HideOnboardingPopup
    }
}

export function showCartPopup() {
    return {
        type: AppAction.ShowCartPopup
    }
}

export function hideCartPopup() {
    return {
        type: AppAction.HideCartPopup
    }
}

export function showCheckoutPopup() {
    return {
        type: AppAction.ShowCheckoutPopup
    }
}

export function hideCheckoutPopup() {
    return {
        type: AppAction.HideCheckoutPopup
    }
}

export function showProductPopup() {
    return {
        type: AppAction.ShowProductPopup
    }
}

export function hideProductPopup() {
    return {
        type: AppAction.HideProductPopup
    }
}

export function showTosPopup() {
    return {
        type: AppAction.ShowTosPopup
    }
}

export function hideTosPopup() {
    return {
        type: AppAction.HideTosPopup
    }
}

export function showHandoverPickerPopup() {
    return {
        type: AppAction.ShowHandoverPickerPopup
    }
}

export function hideHandoverPickerPopup() {
    return {
        type: AppAction.HideHandoverPickerPopup
    }
}
