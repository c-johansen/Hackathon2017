import { createSelector } from "reselect"
import moment from "moment"
moment.locale("nb")
import { ClientStatus } from "../data/const/Order"
import HandoverTimeHelper from "../helpers/HandoverTimeHelper"

const handoverWindowsSelector = state => state.handoverWindows
import checkoutOrderSelector from "./checkoutOrderSelector"

const handoverTimeUiSelector = createSelector(
    handoverWindowsSelector,
    checkoutOrderSelector,
    (handoverWindows, checkoutOrder) => {
        let windowSet = handoverWindows.data

        if (!windowSet || !windowSet.days) return []

        windowSet.days = windowSet.days.map((day) => {
            day.allhours = day.allhours || []
            day.fourhours = day.fourhours || []
            day.twohours = day.twohours || []

            let windows = [...day.allhours, ...day.fourhours, ...day.twohours]

            windows = windows.map((handoverWindow) => {
                return new HandoverWindowModel(handoverWindow, checkoutOrder)
            })

            day.handoverWindows = windows
            //delete day.allhours
            //delete day.fourhours
            //delete day.twohours

            return day
        })

        return windowSet
    }
)

// Models

const HandoverWindowModel = (handoverWindow, order) => {
    const calculatorTotal = order.totals.calculatorTotal || 1

    // Init/wash data
    handoverWindow.from = handoverWindow.from ? new Date(handoverWindow.from) : null
    handoverWindow.to = handoverWindow.to ? new Date(handoverWindow.to) : null
    handoverWindow.displayFrom = handoverWindow.displayFrom ? new Date(handoverWindow.displayFrom) : null
    handoverWindow.displayTo = handoverWindow.displayTo ? new Date(handoverWindow.displayTo) : null
    handoverWindow.handoverProducts = handoverWindow.handoverProducts || []
    handoverWindow.selectedProduct = handoverWindow.selectedProduct ? new HandoverFeeProductModel(handoverWindow.selectedProduct) : null
    handoverWindow.storeWindowId = handoverWindow.storeWindowId
    handoverWindow.pickupPointWindowId = handoverWindow.pickupPointWindowId

    // Map handoverProducts to HandoverFeeProductModel
    handoverWindow.handoverProducts = handoverWindow.handoverProducts.map((product) => {
        return new HandoverFeeProductModel(product)
    })

    handoverWindow.uiOutsideAlcoholWindows = HandoverTimeHelper.windowIsOutsideAlcoholWindows(handoverWindow, order)
    handoverWindow.uiDisabled = HandoverTimeHelper.windowIsDisabled(handoverWindow, order)

    handoverWindow.filteredProducts = []

    // Find price to show on window
    if (handoverWindow.handoverProducts.length) {

        // Sort handoverProducts ascending by price
        handoverWindow.handoverProducts.sort((a, b) => {
            return (b.price > a.price) ? -1 : (b.price < a.price) ? 1 : 0
        })

        // Filter products
        handoverWindow.handoverProducts.forEach((product) => {
            if (calculatorTotal >= product.priceIntervalFrom && calculatorTotal < product.priceIntervalTo) {
                handoverWindow.filteredProducts.push(product)
            }
        })

        // Preselect product
        if (HandoverTimeHelper.windowIsSelected(handoverWindow, order)) {
            // This is the chosen window. Select chosen product:
            handoverWindow.handoverProducts.forEach((product) => {
                if (HandoverTimeHelper.productIsCurrent(product, order, calculatorTotal)) {
                    handoverWindow.selectedProduct = product

                    if (order.statusDescription === ClientStatus.Open && !handoverWindow.capacity) {
                        // We're modifying an existing order, make sure capacity is still available
                        handoverWindow.capacity = 1
                    }
                }
            })

            if (!handoverWindow.selectedProduct) {
                // None of the products match previous product. Select first valid product:
                handoverWindow.selectedProduct = handoverWindow.filteredProducts[0]
            }
        } else {
            // This is not the chosen window. Select first valid product:
            handoverWindow.selectedProduct = handoverWindow.filteredProducts[0]
        }

        if (!handoverWindow.selectedProduct && handoverWindow.handoverProducts.length) {
            // No valid handoverProducts found. Select first in the list
            handoverWindow.selectedProduct = handoverWindow.handoverProducts[0]
        }
    }

    // Find deadline as hours on flexible fee
    const flexiProduct = handoverWindow.filteredProducts.find((p) => p.flexibility === "FLEXI" || p.flexibility === "")
    if (flexiProduct) {
        handoverWindow.uiFlexiHours = moment
            .duration(moment(handoverWindow.displayFrom).diff(flexiProduct.deadline))
            .asHours()
    }

    return handoverWindow
}

const HandoverFeeProductModel = (product) => {
    // Init/wash data
    product.deadline = product.deadline ? new Date(product.deadline) : null
    product.price = product.price || 0
    product.priceIntervalFrom = product.priceIntervalFrom || 0
    product.priceIntervalTo = product.priceIntervalTo || 2E+10

    return product
}

export default handoverTimeUiSelector
