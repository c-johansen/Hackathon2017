import React, { Component } from "react"
import { connect } from "react-redux"
import { getCartSuggestions } from "../../../data/store/actions/cartSuggestions"

// Components
import FeeThresholdReminder from "../shared/FeeThresholdReminder"
import ProductList from "../../products/ProductList"

export class CartSuggestions extends Component {
    componentWillMount() {
        this.props.getCartSuggestions(this.props.cart.items)
    }
    render() {
        const { cart, cartSuggestions } = this.props

        if (cartSuggestions.loading) return null

        return (
            <div className="ws-cartsuggestions">
                <div className="ws-cartsuggestions__header">
                    <p className="ws-paragraph">
                        Her er varer som vanligvis kjøpes sammen med det du har i handlevognen
                    </p>
                    <FeeThresholdReminder updateOnMount={true} />
                </div>
                {cart.items.length === 0 && (
                    <p className="ws-paragraph">
                        Du har ingen varer i handlevognen.
                    </p>
                )}
                {!cartSuggestions.loading && cartSuggestions.data.length === 0 && (
                    <p className="ws-paragraph">
                        Fant ingen vareforslag. Handlevognen din er helt unik!
                    </p>
                )}
                {!cartSuggestions.loading && cartSuggestions.data.length > 0 && (
                    <ProductList products={cartSuggestions.data} />
                )}
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            cart: store.cart,
            cartSuggestions: store.cartSuggestions
        }
    },
    dispatch => {
        return {
            getCartSuggestions: (cartItems) => dispatch(getCartSuggestions(cartItems))
        }
    }
)(CartSuggestions)
