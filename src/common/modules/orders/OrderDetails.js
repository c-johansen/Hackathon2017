import React, { Component } from "react"
import { connect } from "react-redux"
import { invalidate } from "../../data/store/actions/order"
import OrderDetailsHeader from "./OrderDetailsHeader"
import OrderDetailsSummary from "./OrderDetailsSummary"
import OrderDetailsCart from "./OrderDetailsCart"
import OrderDetailsSubstitutions from "./OrderDetailsSubstitutions"
import OrderStatus from "../../data/const/OrderStatus"

export class OrderDetails extends Component {
    componentWillUnmount() {
        this.props.invalidateOrder()
    }
    render() {
        let { orderUi, user } = this.props

        if (!orderUi || !user) {
            return null
        }

        const isArchived = [OrderStatus.Collected, OrderStatus.PartiallyDelivered, OrderStatus.Delivered].includes(orderUi.status)

        return (
            <div className="ws-order-details">
                <OrderDetailsHeader user={user} orderUi={orderUi} isArchived={isArchived} />
                <OrderDetailsSummary user={user} orderUi={orderUi} isArchived={isArchived} />
                <OrderDetailsCart orderUi={orderUi} isArchived={isArchived} />
                <OrderDetailsSubstitutions orderUi={orderUi} />
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            invalidateOrder: () => dispatch(invalidate()),
        }
    }
)(OrderDetails)
