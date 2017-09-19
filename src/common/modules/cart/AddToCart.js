import React, { Component } from "react"
import { connect } from "react-redux"
import { addProduct, increaseCartItem, decreaseCartItem, removeCartItem } from "../../data/store/actions/cart"
import { formatQuantity } from "../../helpers/FormatHelper"

// Components
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"

export class AddToCart extends Component {
    getQuantity(cartItem) {
        let quantity = formatQuantity(cartItem.quantity, cartItem.product.unit, false)

        return (
            <span className="ws-add-to-cart__quantity">
                {quantity.quantity}
                <span className="ws-add-to-cart__quantity-unit">{quantity.unit}</span>
            </span>
        )
    }

    render() {
        let cartItem = { quantity: 0 }

        if (!this.props.cart || !this.props.cart.items) {
            return false
        }

        if (this.props.item) {
            let foundItem = this.props.cart.items.find((item) => {
                return item.product.ean === this.props.item.product.ean && item.parentrecipeid === this.props.item.parentrecipeid
            })

            if (foundItem) {
                cartItem = foundItem
            }
        } else if (this.props.product) {
            let foundItem = this.props.cart.items.find(i => i.product.ean === this.props.product.ean)

            if (foundItem) {
                cartItem = foundItem
            }
        }

        return (
            <fieldset className="ws-add-to-cart">
                <legend className="ws-visually-hidden">Legg {this.props.product.title} i handlevogn</legend>
                {cartItem.quantity === 0 &&
                    <Button className="ws-add-to-cart__button ws-add-to-cart__button--add" onClick={() => this.props.addProduct(this.props.product)}>
                        <Icon type={IconType.Cart} circle />
                        <span className="ws-visually-hidden">Legg i handlevognen</span>
                    </Button>
                    ||
                    <div>
                        {cartItem.quantity <= cartItem.product.unitRule &&
                            <Button className="ws-add-to-cart__button ws-add-to-cart__button--remove" onClick={() => this.props.removeCartItem(cartItem)}>
                                <Icon type={IconType.Minus} circle outline />
                                <span className="ws-visually-hidden">Fjern fra handlevognen</span>
                            </Button>
                            ||
                            <Button className="ws-add-to-cart__button ws-add-to-cart__button--decrease" onClick={() => this.props.decreaseCartItem(cartItem)}>
                                <Icon type={IconType.Minus} circle outline />
                                <span className="ws-visually-hidden">Senk mengde i handlevognen</span>
                            </Button>
                        }

                        {this.getQuantity(cartItem)}

                        <Button className="ws-add-to-cart__button ws-add-to-cart__button--increase" onClick={() => this.props.increaseCartItem(cartItem)}>
                            <Icon type={IconType.Plus} circle outline />
                            <span className="ws-visually-hidden">Øk mengde i handlevognen</span>
                        </Button>
                    </div>
                }
            </fieldset>
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
            addProduct: (product) => dispatch(addProduct(product)),
            increaseCartItem: (item) => dispatch(increaseCartItem(item)),
            decreaseCartItem: (item) => dispatch(decreaseCartItem(item)),
            removeCartItem: (item) => dispatch(removeCartItem(item))
        }
    }
)(AddToCart)
