import { createSelector } from "reselect"
import OrderStatus from "../data/const/OrderStatus"

let totalQuantity = 0

const statuscodeMap = {
    "USER": OrderStatus.User,
    "LOCAL": OrderStatus.Local,
    "OPEN": OrderStatus.Open,
    "CREATED": OrderStatus.Open,
    "PROCESSING": OrderStatus.Processing,
    "PICKSTARTED": OrderStatus.Processing,
    "PICKED": OrderStatus.Processing,
    "PLACEDINSTORAGE": OrderStatus.Processing,
    "ARRIVEDATPICKUPPOINT": OrderStatus.Processing,
    "READYFORPICKUP": OrderStatus.ReadyForPickup,
    "READYATPICKUPPOINT": OrderStatus.Processing,
    "PICKEDUPBYCOURIER": OrderStatus.Processing,
    "PAYMENTSUCCESS": OrderStatus.Processing,
    "PAYMENTFAILED": OrderStatus.Processing,
    "DELIVERED": OrderStatus.Delivered,
    "PARTIALLYDELIVERED": OrderStatus.Delivered,
    "COLLECTED": OrderStatus.Delivered,
    "CANCELLED": OrderStatus.Deleted,
    "DELETED": OrderStatus.Deleted
}

const orderSelector = state => state.order.data

const orderUiSelector = createSelector(
    orderSelector,
    (order) => {
        if (!order) return null
        return new OrderModel(order)
    }
)

// Models

const OrderModel = (order) => {
    let deliveredCount

    // Sanitize
    order.uiClientStatus = statuscodeMap[order.statusDescription]
    order.handoverInfo = order.handoverInfo || {}
    order.fees = order.fees ? order.fees.map(FeeModel) : []
    order.totals = order.totals || {}
    order.pickedCart = order.pickedCart || { delivered: [], nondeliverable: [], substituted: [] }

    // MAP ALL ORDER-LINES TO SAME MODEL

    // Map cart items
    totalQuantity = 0
    order.cart = order.cart ? order.cart.map(CartItemModel) : []

    // Map delivered
    totalQuantity = 0
    order.pickedCart.delivered = order.pickedCart.delivered.map(CartItemModel)
    deliveredCount = totalQuantity
    order.uiDeliveredCount = deliveredCount

    // Map non-deliverable
    totalQuantity = 0
    order.pickedCart.nondeliverable = order.pickedCart.nondeliverable.map(CartItemModel)
    order.uiNondeliverableCount = totalQuantity

    // Map substituted
    let substitutedaslist = []
    order.pickedCart.substituted = order.pickedCart.substituted.map(substitutePair => {
        substitutePair.ordered = new CartItemModel(substitutePair.ordered)
        totalQuantity = 0
        substitutePair.delivered = substitutePair.delivered.map(delivered => {
            return new CartItemModel(delivered)
        })

        order.uiSubstitutedCount = totalQuantity
        substitutedaslist = substitutedaslist.concat(substitutePair.delivered)
        deliveredCount += totalQuantity

        return substitutePair
    })
    order.pickedCart.uiSubstitutedaslist = substitutedaslist
    order.uiSubstitutedCount = totalQuantity

    return order
}

// IFee
const FeeModel = (fee) => {
    return {
        title: fee.title || "",
        ean: fee.ean || null,
        pricePerUnit: fee.pricePerUnit || null,
        quantity: fee.quantity || 0,
        linePrice: fee.linePrice || null,
        type: fee.type || "",
        deliveredVatPercent: "N/A", // Not in IFee
    }
}

// IApprovedCartProduct
const CartItemModel = (cartItem) => {
    totalQuantity += cartItem.product.productSoldByWeight ? 1 : cartItem.quantity

    return {
        ...cartItem,
        deliveredVatPercent: cartItem.deliveredVatPercent !== null && cartItem.deliveredVatPercent >= 0 ? cartItem.deliveredVatPercent + "%" : "N/A"
    }
}

export default orderUiSelector
