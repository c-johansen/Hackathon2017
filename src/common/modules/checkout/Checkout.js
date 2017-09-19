import React, { Component } from "react"
import { connect } from "react-redux"
import { resetCheckoutProcess } from "../../data/store/actions/checkout"

// Components
import CheckoutPage from "./pages/CheckoutPage"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import Dialog from "../shared/Dialog"

export class Checkout extends Component {
    static defaultProps = {
        close: () => { }
    }
    componentWillMount() {
        this.props.resetCheckoutProcess()
    }
    render() {
        const { cart, orderData } = this.props

        if (orderData) {
            return <OrderConfirmationPage />
        }

        if (!cart.loading) {
            if (!cart.calculatingPrice && !cart.totals.totalQuantity) {
                return (
                    <Dialog
                        isOpen={true}
                        question="Du har fjernet alle varene i handlevognen."
                        cancel={() => this.props.close()}
                        closeText="Gå til forsiden"
                    />
                )
            } else {
                return <CheckoutPage />
            }
        }

        return null
    }
}

export default connect(
    store => {
        return {
            cart: store.cart,
            orderData: store.order.data
        }
    },
    dispatch => {
        return {
            resetCheckoutProcess: () => dispatch(resetCheckoutProcess()),
        }
    }
)(Checkout)
