import HandoverType from "../data/const/HandoverType"

export default class HandoverTypeHelper {
    // Verify that the order's handover-option is still available
    static handoverTypeOnOrderIsValid(order, handoverOptions) {
        if (!order.handoverInfo || !order.handoverInfo.handoverType) return true // Exit: Not set on order yet
        const handoverOption = handoverOptions.find((option) => option.handoverType === order.handoverInfo.handoverType)
        if (!handoverOption) return false // Exit: Service did not return the order's option
        if (!handoverOption.handoverProducts || handoverOption.handoverProducts.length === 0) return false // Exit: No handoverProducts returned

        const product = handoverOption.handoverProducts.find((product) => {
            return order.totals.calculatorTotal >= product.priceIntervalFrom && (product.priceIntervalTo === null || order.totals.calculatorTotal < product.priceIntervalTo)
        })
        if (!product) return false // Exit: No valid handoverProducts returned

        // Everything apparently fine!
        return true
    }

    // Verify that the user's store is corresponding with home delivery address
    static deliveryStoreOnOrderIsValid(order, handoverOptions) {
        if (order.handoverInfo.handoverType === HandoverType.Delivery) {
            const location = this.getDeliveryLocation(order, handoverOptions)

            // Location not found
            if (!location || !location.store) return false

            // Compare store on locations
            return location.store.pickupGln === order.store.pickupGln
        }

        // Everything apparently fine!
        return true
    }

    // Find location for delivery-address on order
    static getDeliveryLocation(order, handoverOptions) {
        const handoverOption = handoverOptions.find((option) => option.handoverType === order.handoverInfo.handoverType)

        // Handover-option not found
        if (!handoverOption) return null

        return handoverOption.locations.find((location) => (
            location.address.address === order.handoverInfo.deliveryInfo.address &&
            location.address.postalCode === order.handoverInfo.deliveryInfo.postalCode &&
            location.address.city === order.handoverInfo.deliveryInfo.city
        ))
    }
}
