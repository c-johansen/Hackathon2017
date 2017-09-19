import React, { Component } from "react"
import { connect } from "react-redux"
import { invalidate } from "../../../data/store/actions/order"
import { formatPrice } from "../../../helpers/FormatHelper"

// Components
import Button from "../../shared/Button"
import Only from "../../shared/Only"
import CartSuggestions from "../cartsuggestions/CartSuggestions"

export class CartSuggestionsPage extends Component {
    componentDidMount() {
        this.props.invalidateOrder()
    }
    render() {
        const { cart, goToCheckout } = this.props

        return (
            <div className="ws-checkout-page">
                <div className="ws-checkout-content">
                    <CartSuggestions />
                </div>
                <div className="ws-checkout-footer">
                    <div className="popup__footer">
                        <Button
                            className="ws-button popup__footer-button popup__footer-button--default"
                            onClick={goToCheckout}
                        >
                            Fortsett til kassen
                        </Button>
                        <div className="cart-summary__price">
                            <Only if={cart.calculatingPrice}>
                                Henter pris...
                            </Only>
                            <Only if={!cart.calculatingPrice}>
                                Totalt kr {formatPrice(cart.totals.calculatorTotal)}
                            </Only>
                        </div>
                        <div className="cart-summary__item-count">
                            {cart.totals.totalQuantity} {cart.totals.totalQuantity > 1 ? "varer" : "vare"}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            cart: store.cart
        }
    },
    dispatch => {
        return {
            invalidateOrder: () => dispatch(invalidate()),
        }
    },
)(CartSuggestionsPage)
