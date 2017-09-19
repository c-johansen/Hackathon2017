import { CartAction } from "../actions/creators/cart"
import * as transformers from "./transformers/cart"

const init = {
    calculatingPrice: false,
    calculatingError: false,
    loading: false,
    containsItemsNotInCurrentStore: false,
    items: [],
    totals: {
        totalQuantity: 0,
        totalToPay: 0,
        buffer: 0,
        totalRecycleValue: 0,
        totalDiscount: 0,
        calculatorTotal: 0,
        totalWeight: 1,
        discounts: [],
        fees: [],
    }
}

export default function (state = init, action) {
    switch (action.type) {
        case CartAction.Loading:
            return { ...state, loading: true }
        case CartAction.Loaded:
            return { ...state, loading: false }
        case CartAction.CartUpdate:
            return transformers.cart(state, action.payload)
        case CartAction.CalculatorUpdateStarted:
            return { ...state, calculatingError: false, calculatingPrice: true }
        case CartAction.CalculatorUpdateSuccess:
            return { ...state, calculatingError: false, calculatingPrice: false }
        case CartAction.CalculatorUpdateError:
            return { ...state, calculatingError: true, calculatingPrice: false }
        default:
            return state
    }
}
