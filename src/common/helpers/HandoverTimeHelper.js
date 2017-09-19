import HandoverType from "../data/const/HandoverType"

const universalTime = (dateOrString) => {
    if (typeof dateOrString === "string") {
        dateOrString = new Date(dateOrString)
    }
    return dateOrString.getTime()
}

export default class HandoverTimeHelper {
    static orderContainsAlcohol(order) {
        var cartItem = order.cart.find((item) => item.product.containsAlcohol)

        return !!cartItem
    }

    static windowIsBeforeDeadline(handoverWindow) {
        // Returns true if timeslot is unavailable because of deadline

        if (!handoverWindow) return false

        var date
        if (handoverWindow.selectedProduct) {
            date = handoverWindow.selectedProduct.deadline
        } else if (!handoverWindow.handoverProducts || !handoverWindow.handoverProducts.length) {
            return false
        } else {
            const maxDeadlineProduct = handoverWindow.handoverProducts.reduce((prev, current) => {
                return (universalTime(prev.deadline) > universalTime(current.deadline)) ? prev : current
            })

            date = maxDeadlineProduct.deadline
        }

        return universalTime(date) < universalTime(new Date())
    }

    static windowIsOutsideAlcoholWindows(handoverWindow, order) {
        // Returns true if window/home delivery is unavailable because of alcohol
        if (!handoverWindow) return false
        const storeAllowsAlcoholHandover = order.handoverInfo.handoverType !== HandoverType.Delivery || order.store.alcoholDelivery
        return this.orderContainsAlcohol(order) && (!handoverWindow.alcoholAllowed || !storeAllowsAlcoholHandover)
    }

    static windowIsFullyBooked(handoverWindow) {
        // Returns true if there are no more handovers available
        if (!handoverWindow) return true
        return handoverWindow.capacity === 0
    }

    static windowIsDisabled(handoverWindow, order) {
        return this.windowIsBeforeDeadline(handoverWindow)
            || this.windowIsFullyBooked(handoverWindow)
            || this.windowIsOutsideAlcoholWindows(handoverWindow, order)
    }

    static windowIsSelected(handoverWindow, order) {
        return order.handoverInfo.customerPickupFrom
            && order.handoverInfo.customerPickupTo
            && universalTime(order.handoverInfo.customerPickupFrom) === universalTime(handoverWindow.displayFrom)
            && universalTime(order.handoverInfo.customerPickupTo) === universalTime(handoverWindow.displayTo)
    }

    static productIsCurrent(product, order, calculatorTotal) {
        return order.handoverInfo.product
            && universalTime(order.handoverInfo.product.deadline) === universalTime(product.deadline)
            && calculatorTotal >= product.priceIntervalFrom
            && calculatorTotal < product.priceIntervalTo
            && order.handoverInfo.product.ean === product.ean
    }

    static getEquivalentHandoverWindowOnOrder(order, handoverWindows) {
        let self = this,
            foundWindow = null

        if (!order.handoverInfo.from || !order.handoverInfo.to) {
            return null
        } else {
            handoverWindows.days.forEach(day => {
                if (!foundWindow) {
                    day.handoverWindows.forEach(handoverWindow => {
                        if (!foundWindow
                            && self.windowIsSelected(handoverWindow, order)
                            && !self.windowIsDisabled(handoverWindow, order)) {
                            foundWindow = handoverWindow
                        }
                    })
                }
            })

            return foundWindow
        }
    }

    static windowsAreEqual(a, b) {
        return a.storeWindowId === b.storeWindowId
            && a.carrierWindowId === b.carrierWindowId
            && a.pickupPointWindowId === b.pickupPointWindowId
    }
}
