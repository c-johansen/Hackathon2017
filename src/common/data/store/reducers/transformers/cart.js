export const cart = (state, cart) => {
    var jsonCart = cart.toJSON()

    return {
        ...state,
        items: cart.getAllItems().map(i => i.toJSON()),
        containsItemsNotInCurrentStore: !!cart.getItemsNotInCurrentStore().length,
        totals: {
            totalToPay: jsonCart.totalToPay,
            calculatorTotal: jsonCart.calculatorTotal,
            totalQuantity: jsonCart.totalQuantity,
            totalRecycleValue: jsonCart.totalRecycleValue,
            buffer: jsonCart.buffer,
            totalDiscount: jsonCart.totalDiscount,
            totalWeight: jsonCart.totalWeight,
            discounts: jsonCart.discounts,
            fees: jsonCart.fees,
        }
    }
}
