import "babel-polyfill"
import reactGuard from "react-guard"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Router from "./routes/Router"
import Routes from "./routes/Routes"
import FatalError from "./FatalError"
import makeStore from "../common/data/store/make-store"
import ProductPopup from "../common/modules/popup/pages/ProductPopup"
import CheckoutPopup from "../common/modules/popup/pages/CheckoutPopup"
import OnboardingPopup from "../common/modules/popup/pages/OnboardingPopup"
import CartPopup from "../common/modules/popup/pages/CartPopup"
import TosPopup from "../common/modules/popup/pages/TosPopup"
import AuthFlasher from "../common/modules/auth/AuthFlasher"
import HandoverPickerPopup from "../common/modules/popup/pages/HandoverPickerPopup"
import startupConnectors from "../common/data/connectors/startup-connectors"
import Logger from "../common/data/Logger"
import EventBridge from "../common/data/EventBridge"
import WebAppEvent from "../common/data/events/WebAppEvent"

const store = makeStore()

startupConnectors(store)

reactGuard(React, function (error, componentInfo) {
    Logger.error("reactGuard", error, componentInfo)

    return <FatalError componentInfo={componentInfo} error={error} />
})

EventBridge.listen(WebAppEvent.ReactCanMount, () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Routes />

                <OnboardingPopup />
            </Router>
        </Provider>,
        document.getElementById("app")
    )
})
