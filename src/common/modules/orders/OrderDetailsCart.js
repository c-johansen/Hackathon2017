import React, { Component } from "react"
import { formatPrice, formatQuantity } from "../../helpers/FormatHelper"
import Price from "../products/Price"
import Panel from "../shared/Panel"
import Only from "../shared/Only"
import Icon, { IconType } from "../shared/Icon"
import PriceSummary from "./PriceSummary"

export default class OrderDetailsCart extends Component {
    static defaultProps = {
        isArchived: false
    }
    render() {
        const { orderUi, isArchived } = this.props

        if (!orderUi) {
            return null
        }

        return (
            <div>
                <div className="ws-order-details__cart">
                    <Only if={!isArchived} >
                        <h2 className="ws-order-details__cart__title">
                            <span className="icon-circle"><Icon type={IconType.Payment} /></span>
                            Beløp som reserveres kr {formatPrice(orderUi.totals.totalToPay)}
                        </h2>

                        <Panel title={`Bestilte varer (${orderUi.totals.numberOfItemsOrdered})`} simple={true}>
                            <table className="ws-order-confirmation-cart-table">
                                <thead>
                                    <tr>
                                        <th className="ws-order-confirmation-cart-table__heading">Vare</th>
                                        {isArchived ? <th className="ws-order-confirmation-cart-table__heading">Moms</th> : null}
                                        <th className="ws-order-confirmation-cart-table__heading">Mengde</th>
                                        <th className="ws-order-confirmation-cart-table__heading">Pris</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderUi.cart.map((i, index) => this.getCartItemRow(i, index))}
                                </tbody>
                            </table>
                        </Panel>
                    </Only>

                    <Only if={isArchived}>
                        <h2 className="ws-order-details__cart__title">
                            Betalt beløp kr {formatPrice(orderUi.totals.totalDeliveredGrossAmount)}
                        </h2>

                        <Only if={orderUi.pickedCart.delivered.length}>
                            <Panel title={`Leverte varer (${orderUi.uiDeliveredCount})`} simple={true}>
                                <table className="ws-order-confirmation-cart-table">
                                    <thead>
                                        <tr>
                                            <th className="ws-order-confirmation-cart-table__heading">Vare</th>
                                            {isArchived ? <th className="ws-order-confirmation-cart-table__heading">Moms</th> : null}
                                            <th className="ws-order-confirmation-cart-table__heading">Mengde</th>
                                            <th className="ws-order-confirmation-cart-table__heading">Pris</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderUi.pickedCart.delivered.map((i, index) => (
                                            <tr className="ws-order-confirmation-cart-table__item" key={i.product.ean + index}>
                                                <td className="ws-order-confirmation-cart-table__item__product">
                                                    <span className="ws-order-confirmation-cart-table__item__title">
                                                        {i.product.title}
                                                        <span className="ws-order-confirmation-cart-table__item__subtitle">{i.product.subtitle} <Price simple={true} {...i.product} /></span>
                                                    </span>
                                                </td>
                                                {isArchived ? <td className="ws-order-confirmation-cart-table__item__vat">{i.deliveredVatPercent}</td> : null}
                                                <td className="ws-order-confirmation-cart-table__item__quantity">{i.quantity}</td>
                                                <td className="ws-order-confirmation-cart-table__item__price">{formatPrice(i.linePrice)} kr</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Panel>
                        </Only>

                        <Only if={orderUi.pickedCart.substituted.length}>
                            <Panel title={`Varer som ble erstattet (${orderUi.uiSubstitutedCount})`} simple={true}>
                                <p>Følgende varer ble helt eller delvis erstattet.</p>
                                <table className="ws-order-confirmation-cart-table">
                                    <thead>
                                        <tr>
                                            <th className="ws-order-confirmation-cart-table__heading">Vare</th>
                                            {isArchived ? <th className="ws-order-confirmation-cart-table__heading">Moms</th> : null}
                                            <th className="ws-order-confirmation-cart-table__heading">Mengde</th>
                                            <th className="ws-order-confirmation-cart-table__heading">Pris</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderUi.pickedCart.substituted.map((i, index) => this.getCartItemRow(i.ordered, index))}
                                    </tbody>
                                </table>
                            </Panel>
                        </Only>

                        <Only if={orderUi.pickedCart.nondeliverable.length}>
                            <Panel title={`Kunne ikke leveres (${orderUi.uiNondeliverableCount})`} simple={true}>
                                <table className="ws-order-confirmation-cart-table">
                                    <thead>
                                        <tr>
                                            <th className="ws-order-confirmation-cart-table__heading">Vare</th>
                                            {isArchived ? <th className="ws-order-confirmation-cart-table__heading">Moms</th> : null}
                                            <th className="ws-order-confirmation-cart-table__heading">Mengde</th>
                                            <th className="ws-order-confirmation-cart-table__heading">Pris</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderUi.pickedCart.nondeliverable.map((i, index) => this.getCartItemRow(i, index))}
                                    </tbody>
                                </table>
                            </Panel>
                        </Only>
                    </Only>
                </div>

                <PriceSummary order={orderUi} isArchived={isArchived} />
            </div>
        )
    }
    getCartItemRow(cartItem, index) {
        const { isArchived } = this.props
        const quantity = formatQuantity(cartItem.quantity, cartItem.product.unit, false)

        return (
            <tr className="ws-order-confirmation-cart-table__item" key={cartItem.product.ean + index}>
                <td className="ws-order-confirmation-cart-table__item__product">
                    <span className="ws-order-confirmation-cart-table__item__title">
                        {cartItem.product.title}
                        <span className="ws-order-confirmation-cart-table__item__subtitle">
                            {cartItem.product.subtitle} kr {formatPrice(cartItem.pricePerUnit)}/{cartItem.product.unit}
                        </span>
                    </span>
                </td>
                {isArchived ? (
                    <td className="ws-order-confirmation-cart-table__item__vat">
                        {cartItem.deliveredVatPercent}
                    </td>
                ) : null}
                <td className="ws-order-confirmation-cart-table__item__quantity">
                    {quantity.quantity} {quantity.unit}
                </td>
                <td className="ws-order-confirmation-cart-table__item__price">
                    kr {formatPrice(cartItem.linePrice)}
                </td>
            </tr>
        )
    }
}
