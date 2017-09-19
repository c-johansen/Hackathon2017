import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import reduxPromise from "redux-promise"

import userReducer from "../common/data/store/reducers/user"
import cartReducer from "../common/data/store/reducers/cart"
import checkoutReducer from "../common/data/store/reducers/checkout"
import orderReducer from "../common/data/store/reducers/order"
import cartSuggestionsReducer from "../common/data/store/reducers/cartSuggestions"
import handoverWindowsReducer from "../common/data/store/reducers/handoverWindows"

export default function () {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    return createStore(
        combineReducers({
            user: userReducer,
            cart: cartReducer,
            checkout: checkoutReducer,
            order: orderReducer,
            cartSuggestions: cartSuggestionsReducer,
            handoverWindows: handoverWindowsReducer,
        }),
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                reduxPromise,
                createLogger({ collapsed: true }),
            )
        )
    )
}
