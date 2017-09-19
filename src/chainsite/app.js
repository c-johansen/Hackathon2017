import "babel-polyfill"
import ReactHabitat from "react-habitat"
import ReactHabitatRedux from "react-habitat-redux"
import shoppingCartConnector from "../common/data/connectors/shopping-cart"
import extendedUserConnector from "../common/data/connectors/extended-user"
import { Environment as fwEnvironment, LoggerConfig as fwLoggerConfig, setup as fwSetup, isUserLoggedIn as fwIsUserLoggedIn } from "@ng-mw/framework-core"

import makeStore from "./make-store"
import { setToken, logOut } from "../common/data/store/actions/user"

// Top level components
import Cart from "./Cart"
import AddToCart from "../common/modules/cart/AddToCart"
import Checkout from "../common/modules/checkout/Checkout"
import CartSuggestions from "../common/modules/checkout/cartsuggestions/CartSuggestions"
import Debug from "./Debug"

fwLoggerConfig.turnOffAllFrameworkLoggers()

if (process.env.NODE_ENV !== "production") {
    // Expose stuff on window
    window.Framework = require("@ng-mw/framework-core")
    window.processEnv = process.env
}

class ChainSiteClient extends ReactHabitat.Bootstrapper {
    constructor(props) {
        super(props)

        let settings = window._siteGlobalSettings

        switch (settings.environment) {
            case "prod":
            case "production":
                settings.environment = fwEnvironment.PRODUCTION
                break
            case "dev":
            case "develop":
            case "development":
                settings.environment = fwEnvironment.DEVELOPMENT
                break
            case "local":
                settings.environment = fwEnvironment.LOCAL
                break
            default:
                settings.environment = fwEnvironment.PREPRODUCTION
                break
        }

        // Create a store
        const store = makeStore()

        fwSetup({
            chainId: settings.chainId,
            environment: settings.environment,
            apiKey: settings.apiKey
        })

        if (settings.userToken) {
            // Call setToken to trigger base data loading
            store.dispatch(setToken(settings.userToken))
        } else if (fwIsUserLoggedIn()) {
            // Previously logged in user shall be logged out
            store.dispatch(logOut())
        }

        shoppingCartConnector(store)
        extendedUserConnector(store)

        // Create a new "Redux" container builder for the store
        var container = new ReactHabitatRedux.Container(store)

        // Register top level components for habitat
        let topLevelComponents = {
            Cart,
            AddToCart,
            Checkout,
            CartSuggestions
        }

        if (process.env.NODE_ENV !== "production") {
            topLevelComponents.Debug = Debug
        }

        container.registerAll(topLevelComponents)

        // Finally, set the container
        this.setContainer(container)
    }
}

// Export a _new_ instance so it immediately evokes
export default new ChainSiteClient()
