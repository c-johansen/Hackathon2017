import { createSelector } from "reselect"

const clientOrderSelector = state => state.checkout.clientOrder
const cartSelector = state => state.cart
const userSelector = state => state.user.data

const submitOrderSelector = createSelector(
    clientOrderSelector,
    cartSelector,
    userSelector,
    (clientOrder, cart, user) => {
        let submitOrder = {
            ...clientOrder,
            store: user.store,
            handoverInfo: user.handoverInfo,
        }

        // Hack and mock for calculator-values on ICartOrder

        const productPropsToDelete = [
            "allergens",
            "allergyDeclaration",
            "brand",
            "guidelineDailyAmount",
            "ingredients",
            "nutritionalContent",
            "vitaminsMinerals"
        ]

        submitOrder.cart = cart.items.map(cartItem => {
            cartItem = { ...cartItem }
            cartItem.product = { ...cartItem.product }

            // TODO: Remove this mapping when calculator returns all values:
            cartItem.comparePricePerUnit = cartItem.product.comparePricePerUnit
            cartItem.calcUnitType = cartItem.product.calcUnitType
            cartItem.product.archive = false

            productPropsToDelete.forEach((prop) => {
                delete cartItem.product[prop]
            })

            return cartItem
        })

        // Remove products not available on current store

        submitOrder.cart = submitOrder.cart.filter(cartItem => !cartItem.doesNotExistInCurrentStore)

        return submitOrder
    }
)

export default submitOrderSelector
