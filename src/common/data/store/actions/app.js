import * as appActions from "./creators/app"
import LocalStorage from "../../LocalStorage"
import App from "../../const/App"

export function showCheckoutPopup() {
    return function (dispatcher) {
        dispatcher(appActions.showCheckoutPopup())
    }
}

export function hideCheckoutPopup() {
    return function (dispatcher) {
        dispatcher(appActions.hideCheckoutPopup())
    }
}

export function showProductPopup() {
    return function (dispatcher) {
        dispatcher(appActions.showProductPopup())
    }
}

export function hideProductPopup() {
    return function (dispatcher) {
        dispatcher(appActions.hideProductPopup())
    }
}

export function showCartPopup() {
    return function (dispatcher) {
        dispatcher(appActions.showCartPopup())
    }
}

export function hideCartPopup() {
    return function (dispatcher) {
        dispatcher(appActions.hideCartPopup())
    }
}

export function showOnboardingPopup() {
    return function (dispatcher) {
        dispatcher(appActions.showOnboardingPopup())
    }
}

export function hideOnboardingPopup() {
    LocalStorage.set(App.LocalStorage.UserSeenOnboarding, true)

    return function (dispatcher) {
        dispatcher(appActions.hideOnboardingPopup())
    }
}

export function showTosPopup() {
    return function (dispatcher) {
        dispatcher(appActions.showTosPopup())
    }
}

export function hideTosPopup() {
    return function (dispatcher) {
        dispatcher(appActions.hideTosPopup())
    }
}

export function showHandoverPickerPopup() {
    return function (dispatcher) {
        dispatcher(appActions.showHandoverPickerPopup())
    }
}

export function hideHandoverPickerPopup() {
    return function (dispatcher) {
        dispatcher(appActions.hideHandoverPickerPopup())
    }
}
