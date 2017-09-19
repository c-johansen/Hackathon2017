import groupArray from "group-array"
import sortArray from "sort-array"
import { createSelector } from "reselect"
import HandoverType from "../data/const/HandoverType"
import Texts from "../data/const/HandoverTypeTexts"
import { formatPrice } from "../helpers/FormatHelper"

const handoverOptionsSelector = state => state.checkout.handoverOptions
const handoverPickerPopupVisibleSelector = state => state.app && state.app.handoverPickerPopup.visible
import checkoutOrderSelector from "./checkoutOrderSelector"

const uiConfig = {
    [HandoverType.Delivery]: {
        uiTitle: Texts.HandoverTypeHomeTitle,
        uiDisabled: false,
        uiMessage: null,
        uiLocationTitle: Texts.HandoverTypeHomeLocationTitle,
    },
    [HandoverType.Store]: {
        uiTitle: Texts.HandoverTypeStoreTitle,
        uiDisabled: false,
        uiMessage: null,
        uiLocationTitle: Texts.HandoverTypeStoreLocationTitle,
    },
}

const handoverTypeUiSelector = createSelector(
    handoverOptionsSelector, checkoutOrderSelector, handoverPickerPopupVisibleSelector,
    (handoverOptions, checkoutOrder, handoverPickerPopupVisible) => {
        let responseOptions = []

        if (!checkoutOrder.store) {
            return []
        }

        // "Paste in" uiConfig
        responseOptions = handoverOptions.data.map(handoverOption => {
            return { ...handoverOption, ...uiConfig[handoverOption.handoverType] }
        })

        responseOptions.map(handoverOption => {
            if (checkoutOrder.handoverInfo.handoverType === handoverOption.handoverType) {
                handoverOption.uiSubtitle = checkoutOrder.store.name

                handoverOption.uiSubtitle = handoverOption.handoverType === HandoverType.Delivery
                    ? checkoutOrder.handoverInfo.deliveryInfo.address
                    : checkoutOrder.store.name
            }
        })

        updatehandoverPriceData(responseOptions, checkoutOrder)

        // Update formatted prices, messages and disabled-status based on handoverPriceData
        responseOptions.forEach(handoverOption => {
            const priceData = handoverOption.uiHandoverPriceData

            if (handoverOption.validation && handoverOption.validation.length) {
                optionNotAvailable(handoverOption, priceData)
            } else if (priceData) {
                handoverOption.uiPrice = "0,-"

                if (!handoverOption.locations.length || !handoverOption.locations.find((l) => l.store)) {
                    // Handle weird response from service (empty locations array or store === null)
                    optionNotAvailable(handoverOption, priceData)
                } else if (!handoverPickerPopupVisible && priceData.priceFrom === Infinity) {
                    priceData.priceFrom = priceData.minimumProductPrice
                    handoverOption.uiDisabled = true
                    if (priceData.threshold !== null) {
                        handoverOption.uiMessage = `For å ${handoverOption.handoverType === HandoverType.Delivery ? "få varene levert" : "hente i butikk"}, må du handle for over kr ${formatPrice(priceData.threshold, true)}`
                    } else {
                        optionNotAvailable(handoverOption, priceData)
                    }
                } else if (handoverPickerPopupVisible) {
                    priceData.priceFrom = priceData.minimumProductPrice
                }

                if (priceData.priceFrom === Infinity) {
                    // Final check for weird data
                    optionNotAvailable(handoverOption, priceData)
                } else if (priceData.priceFrom >= 0) {
                    handoverOption.uiPrice = `Fra kr ${formatPrice(priceData.priceFrom, true)}`
                }
            }
        })

        if (checkoutOrder.handoverInfo && checkoutOrder.handoverInfo.handoverType === HandoverType.Store) {
            // Group stores into counties
            responseOptions.map(handoverOption => {
                handoverOption.uiGroupedLocations = groupLocations(handoverOption.locations)
            })
        }

        return responseOptions
    }
)

const optionNotAvailable = (handoverOption, priceData) => {
    handoverOption.uiDisabled = true
    handoverOption.uiMessage = `Vi kan dessverre ikke tilby deg ${handoverOption.handoverType === HandoverType.Delivery ? "levering" : "henting"}`
    handoverOption.uiPrice = ""
    priceData.priceFrom = -1
}

const groupLocations = (locations) => {
    const groups = groupArray(locations, "store.county")
    let result = []

    for (const groupName in groups) {
        result.push({
            groupName,
            locations: sortArray(groups[groupName], "store.name")
        })
    }

    return sortArray(result, "groupName")
}

const updatehandoverPriceData = (handoverOptions, order) => {
    handoverOptions = handoverOptions.map((handoverOption) => {
        let calculatorTotal = order.totals.calculatorTotal,
            handoverPriceData = {
                minimumProductPrice: Infinity,
                priceFrom: Infinity,
                threshold: null,
                thresholdPrice: null,
                thresholdRemaining: null
            },
            minimumFrom

        if (handoverOption.handoverProducts && handoverOption.handoverProducts.length) {
            // We can say from-price and estimated threshold

            // Sort descending by priceIntervalFrom
            handoverOption.handoverProducts = sortArray(handoverOption.handoverProducts, "priceIntervalFrom").reverse()

            minimumFrom = Infinity

            handoverOption.handoverProducts.forEach(product => {
                product.priceIntervalTo = product.priceIntervalTo || Infinity

                minimumFrom = Math.min(minimumFrom, product.priceIntervalFrom)
                handoverPriceData.minimumProductPrice = Math.min(handoverPriceData.minimumProductPrice, product.price)

                if (calculatorTotal >= product.priceIntervalFrom
                    && calculatorTotal < product.priceIntervalTo) {

                    handoverPriceData.priceFrom = Math.min(handoverPriceData.priceFrom, product.price)
                }

                if (handoverPriceData.priceFrom
                    && handoverPriceData.priceFrom > product.price) {

                    handoverPriceData.threshold = product.priceIntervalFrom
                    handoverPriceData.thresholdRemaining = product.priceIntervalFrom - calculatorTotal
                    handoverPriceData.thresholdPrice = product.price

                    // Pick the lowest of all prices for threshold
                    if (handoverPriceData.thresholdPrice === null) {
                        handoverPriceData.thresholdPrice = product.price
                    } else {
                        handoverPriceData.thresholdPrice = Math.min(handoverPriceData.thresholdPrice, product.price)
                    }
                }
            })
        } else {
            // No fees retrieved!

            // Tracking for missing/empty delivery windows
            /*
            if (handoverOption.handoverType === HandoverType.Delivery) {
                Tracking.trackGenericEvent({
                    category: "Checkout",
                    action: "No delivery times available"
                })
            }
            */
        }

        handoverOption.uiHandoverPriceData = handoverPriceData

        return handoverOption
    })
}

export default handoverTypeUiSelector
