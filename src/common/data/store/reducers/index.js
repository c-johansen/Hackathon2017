import { combineReducers } from "redux"
import productsReducer from "./products"
import productSuggestionsReducer from "./productSuggestions"
import productReducer from "./product"
import userReducer from "./user"
import cartReducer from "./cart"
import checkoutReducer from "./checkout"
import mostPurchasedProductsReducer from "./mostPurchasedProducts"
import appReducer from "./app"
import genericOffersReducer from "./genericOffers"
import bargainOffersReducer from "./bargainOffers"
import vouchersReducer from "./vouchers"
import cartSuggestionsReducer from "./cartSuggestions"
import ordersReducer from "./orders"
import orderReducer from "./order"
import handoverWindowsReducer from "./handoverWindows"
import offerCampaignsReducers from "./offerCampaigns"
import offerCampaignReducers from "./offerCampaign"

export default combineReducers({
    user: userReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    app: appReducer,
    productSuggestions: productSuggestionsReducer,
    mostPurchasedProducts: mostPurchasedProductsReducer,
    genericOffers: genericOffersReducer,
    bargainOffers: bargainOffersReducer,
    cartSuggestions: cartSuggestionsReducer,
    vouchers: vouchersReducer,
    orders: ordersReducer,
    order: orderReducer,
    handoverWindows: handoverWindowsReducer,
    offerCampaigns: offerCampaignsReducers,
    offerCampaign: offerCampaignReducers
})
