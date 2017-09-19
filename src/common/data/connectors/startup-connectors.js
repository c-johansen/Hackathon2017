import shoppingCartConnector from "./shopping-cart"
import extendedUserConnector from "./extended-user"
import { setToken, loadBaseData } from "../store/actions/user"
import LocalStorage from "../../data/LocalStorage"
import EventBridge from "../../data/EventBridge"
import App from "../const/App"
import NativeEvent from "../../data/events/NativeEvent"
import WebAppEvent from "../../data/events/WebAppEvent"
import fontLoader from "../fontLoader"
import { Environment, setup, LoggerConfig } from "@ng-mw/framework-core"

const token = LocalStorage.get(App.LocalStorage.UserToken)
const envParam = parseInt(new URLSearchParams(window.location.search).get("env"))
const env = envParam >= 0 && envParam <= 3 ? envParam : Environment.DEVELOPMENT
const keys = {
    [Environment.LOCAL]: process.env.API_KEY_DEV,
    [Environment.DEVELOPMENT]: process.env.API_KEY_DEV,
    [Environment.PREPRODUCTION]: process.env.API_KEY_PREPROD,
    [Environment.PRODUCTION]: process.env.API_KEY_PROD
}

export default async function (store) {
    LoggerConfig.turnOffAllFrameworkLoggers()
    setup({
        apiKey: keys[env],
        chainId: process.env.CHAIN_ID,
        userToken: LocalStorage.get(App.LocalStorage.UserToken),
        environment: env
    })

    if (token) {
        await store.dispatch(setToken(token))
    } else {
        await store.dispatch(loadBaseData())
    }

    await Promise.all([
        shoppingCartConnector(store),
        extendedUserConnector(store),
        fontLoader()
    ])

    EventBridge.broadcastNative(NativeEvent.LoadingComplete)
    EventBridge.broadcastWeb(WebAppEvent.ReactCanMount)
}

// debug
if (process.env.NODE_ENV !== "production") {
    window.Framework = require("@ng-mw/framework-core")
    window.processEnv = env
}
