import { AppAction } from "../actions/creators/app"
import LocalStorage from "../../LocalStorage"
import App from "../../const/App"

const init = {
    checkoutPopup: {
        visible: false,
        counter: 0
    },
    productPopup: {
        visible: false,
        counter: 0
    },
    cartPopup: {
        visible: false,
        counter: 0
    },
    onboardingPopup: {
        visible: !LocalStorage.get(App.LocalStorage.UserSeenOnboarding),
        counter: 0
    },
    tosPopup: {
        visible: false,
        counter: 0
    },
    handoverPickerPopup: {
        visible: false,
        counter: 0
    },
    lastBuild: process.env.LAST_BUILD,
    version: process.env.APP_VERSION
}

export default function (state = init, action) {
    switch (action.type) {
        case AppAction.ShowCheckoutPopup:
            return { ...state, checkoutPopup: { visible: true, counter: state.checkoutPopup.counter + 1 } }
        case AppAction.HideCheckoutPopup:
            return { ...state, checkoutPopup: { ...state.checkoutPopup, visible: false } }
        case AppAction.ShowProductPopup:
            return { ...state, productPopup: { visible: true, counter: state.productPopup.counter + 1 } }
        case AppAction.HideProductPopup:
            return { ...state, productPopup: { ...state.productPopup, visible: false } }
        case AppAction.ShowCartPopup:
            return { ...state, cartPopup: { visible: true, counter: state.cartPopup.counter + 1 } }
        case AppAction.HideCartPopup:
            return { ...state, cartPopup: { ...state.cartPopup, visible: false } }
        case AppAction.ShowOnboardingPopup:
            return { ...state, onboardingPopup: { visible: true, counter: state.onboardingPopup.counter + 1 } }
        case AppAction.HideOnboardingPopup:
            return { ...state, onboardingPopup: { ...state.onboardingPopup, visible: false } }
        case AppAction.ShowTosPopup:
            return { ...state, tosPopup: { visible: true, counter: state.tosPopup.counter + 1 } }
        case AppAction.HideTosPopup:
            return { ...state, tosPopup: { ...state.tosPopup, visible: false } }
        case AppAction.ShowHandoverPickerPopup:
            return { ...state, handoverPickerPopup: { visible: true, counter: state.handoverPickerPopup.counter + 1 } }
        case AppAction.HideHandoverPickerPopup:
            return { ...state, handoverPickerPopup: { ...state.handoverPickerPopup, visible: false } }
        default:
            return state
    }
}
