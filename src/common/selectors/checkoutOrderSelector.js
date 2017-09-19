import { createSelector } from "reselect"

const clientOrderSelector = state => state.checkout.clientOrder
const cartSelector = state => state.cart
const userSelector = state => state.user.data

const checkoutOrderSelector = createSelector(
    clientOrderSelector,
    cartSelector,
    userSelector,
    (clientOrder, cart, user) => {
        let checkoutOrder = {
            ...clientOrder,
            store: user.store,
            cart: cart.items,
            handoverInfo: user.handoverInfo,
            totals: cart.totals,
        }

        return checkoutOrder
    }
)

export default checkoutOrderSelector
