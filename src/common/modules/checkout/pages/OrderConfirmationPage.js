import React, { Component } from "react"
import { connect } from "react-redux"
import { reset } from "../../../data/store/actions/cart"
import { invalidate } from "../../../data/store/actions/order"
import { resetHandoverWindow } from "../../../data/store/actions/user"
import orderUiSelector from "../../../selectors/orderUiSelector"
import OrderConfirmation from "../order-confirmation/OrderConfirmation"
import Only from "../../shared/Only"

export class OrderConfirmationPage extends Component {
    componentDidMount() {
        this.props.resetCart()
        this.props.resetHandoverWindow()
    }
    componentWillUnmount() {
        this.props.invalidateOrder()
    }
    render() {
        const { order, user, orderUi } = this.props

        if (!order.data) {
            return false
        }

        return (
            <Only if={!order.loading} className="ws-checkout-page ws-checkout-page--full">
                <OrderConfirmation orderUi={orderUi} user={user.data} />
            </Only>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user,
            order: store.order,
            orderUi: orderUiSelector(store),
        }
    },
    dispatch => {
        return {
            resetCart: () => dispatch(reset()),
            invalidateOrder: () => dispatch(invalidate()),
            resetHandoverWindow: () => dispatch(resetHandoverWindow()),
        }
    }
)(OrderConfirmationPage)
