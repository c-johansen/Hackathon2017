export default class PriceSummaryHelper {
    static getCalculatorTotal(order1, order2) {
        return (order1 && order1.totals.calculatorTotal ? order1.totals.calculatorTotal : 0)
            + (order2 && order2.totals.calculatorTotal ? order2.totals.calculatorTotal : 0)
    }
    static getCalculatorTotalExDiscounts(order1, order2) {
        return (order1 && order1.totals.calculatorTotal ? order1.totals.calculatorTotal : 0)
            + (order1 && order1.totals.totalDiscount ? order1.totals.totalDiscount : 0)
            + (order2 && order2.totals.calculatorTotal ? order2.totals.calculatorTotal : 0)
            + (order2 && order2.totals.totalDiscount ? order2.totals.totalDiscount : 0)
    }
    static getBuffer(order1, order2) {
        return (order1 && order1.totals.buffer ? order1.totals.buffer : 0)
            + (order2 && order2.totals.buffer ? order2.totals.buffer : 0)
    }
    static getTotalRecycleValue(order1, order2) {
        return (order1 && order1.totals.totalRecycleValue ? order1.totals.totalRecycleValue : 0)
            + (order2 && order2.totals.totalRecycleValue ? order2.totals.totalRecycleValue : 0)
    }
    static getTotalToPay(order1, order2) {
        return (order1 && order1.totals.totalToPay ? order1.totals.totalToPay : 0)
            + (order2 && order2.totals.totalToPay ? order2.totals.totalToPay : 0)
    }
    static getReservationAmount(order1, order2, includeHandoverFees) {
        return (order1 && order1.totals.totalToPay ? order1.totals.totalToPay : 0)
            + (order2 && order2.totals.totalToPay ? order2.totals.totalToPay : 0)
            + (includeHandoverFees ? this.getTotalFees(order1) : 0)
    }
    static getDiscounts(order1, order2) {
        var discounts = []
        if (order1 && order1.totals.discounts && order1.totals.discounts.length) {
            discounts = discounts.concat(order1.totals.discounts)
        }
        if (order2 && order2.totals.discounts && order2.totals.discounts.length) {
            discounts = discounts.concat(order2.totals.discounts)
        }
        discounts = discounts.map((discount) => {
            // map `totalValue` on ICalculatedOrderDiscount to `value` and return absolute value
            discount.value = discount.value !== undefined ? Math.abs(discount.value) : Math.abs(discount.totalValue)
            return discount
        })
        return discounts
    }
    static getTotalDiscount(order1, order2) {
        return (order1 && order1.totals.totalDiscount ? Math.abs(order1.totals.totalDiscount) : 0)
            + (order2 && order2.totals.totalDiscount ? Math.abs(order2.totals.totalDiscount) : 0)
    }
    static getHandoverProducts(order) {
        if (order.handoverInfo && order.handoverInfo.product) {
            return [order.handoverInfo.product]
        }
        return []
    }
    static getTotalFees(order) {
        if (order.handoverInfo && order.handoverInfo.product) {
            return order.handoverInfo.product.price
        }
        return 0
    }
}
