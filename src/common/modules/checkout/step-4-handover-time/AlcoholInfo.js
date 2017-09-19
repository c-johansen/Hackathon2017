import React, { Component } from "react"
import { connect } from "react-redux"
import HandoverType from "../../../data/const/HandoverType"
import { removeCartItems, addCartItems } from "../../../data/store/actions/cart"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"

// Components
import Button from "../../shared/Button"

export class AlcoholInfo extends Component {
    state = {
        alcoholItems: []
    }
    render() {
        const { checkoutOrder } = this.props
        const { alcoholItems } = this.state

        const orderContainsAlcohol = !!checkoutOrder.cart.find((item) => {
            return item.product.containsAlcohol
        })

        const alcoholAllowed = checkoutOrder.handoverInfo.handoverType !== HandoverType.Delivery || checkoutOrder.store.alcoholDelivery

        if (!orderContainsAlcohol && (!alcoholItems || alcoholItems.length === 0)) return false

        return (
            <div className="ws-handover-alcohol">
                {alcoholItems.length === 0 && (
                    <div className="ws-handover-alcohol-header contains-alchohol">
                        {alcoholAllowed && (
                            <p className="ws-paragraph">
                                Siden du har alkoholholdige varer i handlevongen, må varene utleveres før ølsalget stenger
                            </p>
                        )}
                        {!alcoholAllowed && (
                            <p className="ws-paragraph">
                                {checkoutOrder.store.name} tilbyr dessverre ikke levering av alkoholholdige varer til {checkoutOrder.handoverInfo.deliveryInfo.address}, {checkoutOrder.handoverInfo.deliveryInfo.postalCode} {checkoutOrder.handoverInfo.deliveryInfo.city}
                            </p>
                        )}
                        <Button
                            className="ws-checkout__button ws-checkout__button--default"
                            onClick={this.removeAlcohol.bind(this)}
                        >
                            Fjern alkoholholdige varer
                        </Button>
                    </div>
                )}
                {alcoholItems.length > 0 && (
                    <div className="ws-handover-alcohol-header alcohol-removed">
                        <p className="ws-paragraph">
                            Alkoholholdige varer er fjernet fra handlevognen din:
                        </p>
                        <ul className="ws-paragraph">
                            {alcoholItems.map((cartItem) => (
                                <li key={cartItem.product.ean}>
                                    {cartItem.product.title}
                                </li>
                            ))}
                        </ul>
                        <Button
                            className="ws-checkout__button ws-checkout__button--default"
                            onClick={this.putBackAlcohol.bind(this)}
                        >
                            Legg alkoholholdige varer tilbake
                        </Button>
                    </div>
                )}
            </div>
        )
    }
    removeAlcohol() {
        const { checkoutOrder, removeCartItems } = this.props

        const itemsToRemove = checkoutOrder.cart.filter((cartItem) => {
            return cartItem.product.containsAlcohol
        })

        // Remove items from cart
        removeCartItems(itemsToRemove)

        // Add items to state
        this.setState({ alcoholItems: itemsToRemove })
    }
    putBackAlcohol() {
        const { addCartItems } = this.props

        // Add items back to cart
        addCartItems(this.state.alcoholItems)

        // Remove items from state
        this.setState({ alcoholItems: [] })
    }
}

export default connect(
    store => {
        return {
            checkoutOrder: checkoutOrderSelector(store),
        }
    },
    dispatch => {
        return {
            removeCartItems: (items) => dispatch(removeCartItems(items)),
            addCartItems: (items) => dispatch(addCartItems(items)),
        }
    }
)(AlcoholInfo)
