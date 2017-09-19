import React, { Component } from "react"
import { connect } from "react-redux"
import { removeCartItem } from "../../data/store/actions/cart"

// Components
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"

export class RemoveFromCart extends Component {
    render() {
        let { cartItem } = this.props

        return (
            <Button className="ws-add-to-cart__button ws-add-to-cart__button--remove" onClick={() => this.props.removeCartItem(cartItem)}>
                <Icon type={IconType.Trash} circle outline />
                <span className="ws-visually-hidden">Fjern varen fra handlevognen</span>
            </Button>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            removeCartItem: (item) => dispatch(removeCartItem(item)),
        }
    }
)(RemoveFromCart)
