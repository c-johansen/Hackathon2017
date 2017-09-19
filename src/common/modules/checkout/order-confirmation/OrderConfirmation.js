import React, { Component } from "react"
import OrderConfirmationHeader from "./OrderConfirmationHeader"
import OrderDetailsSummary from "../../orders/OrderDetailsSummary"
import OrderDetailsCart from "../../orders/OrderDetailsCart"
import OrderDetailsSubstitutions from "../../orders/OrderDetailsSubstitutions"

export default class OrderConfirmation extends Component {
    render() {
        let { orderUi, user } = this.props

        if (!orderUi || !user) {
            return null
        }

        return (
            <div className="ws-order-details">
                <OrderConfirmationHeader user={user} orderUi={orderUi} />
                <OrderDetailsSummary user={user} orderUi={orderUi} />
                <OrderDetailsCart orderUi={orderUi} />
                <OrderDetailsSubstitutions orderUi={orderUi} />
            </div>
        )
    }
}
