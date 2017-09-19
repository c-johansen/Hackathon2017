import React, { Component } from "react"
import { connect } from "react-redux"
import { empty } from "../common/data/store/actions/cart"

// Components
import Button from "../common/modules/shared/Button"
import CartItems from "../common/modules/cart/CartItems"

export class Cart extends Component {
    render() {
        const { cart, empty } = this.props

        if (cart.items.length > 0) {
            return (
                <div className="ws-cart">
                    <CartItems order={cart} />
                    <Button onClick={empty}>
                        Tøm handlevognen
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="ws-poster">
                    <div className="ws-poster__top">
                        :(
                    </div>
                    <p className="ws-poster__message">Du har ingen varer i handlevognen</p>
                </div>
            )
        }
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
            empty: () => dispatch(empty())
        }
    }
)(Cart)
