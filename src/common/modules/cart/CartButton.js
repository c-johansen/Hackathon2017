import React, { Component } from "react"
import { showCartPopup } from "../../data/store/actions/app"
import Icon, { IconType } from "../shared/Icon"
import Button from "../shared/Button"
import { connect } from "react-redux"
import css from "classnames"

let i

export class CartButton extends Component {
    componentDidMount() {
        i = this.props.itemsCount
    }

    componentDidUpdate() {
        i = this.props.itemsCount
    }

    render() {
        let { itemsCount } = this.props

        return (
            <Button className="cart-button" onClick={this.props.showCartPopup}>
                <Icon type={itemsCount ? IconType.CartFull : IconType.Cart} />
                {
                    itemsCount > 0 ? (
                        <span className={css("cart-button__count", { "cart-button__count--updated": itemsCount !== i })} key={itemsCount}>
                            <span className="cart-button__count__text">{itemsCount}</span>
                            <span className="ws-visually-hidden">vare(r) i handlevognen</span>
                        </span>
                    ) : null
                }
                <span className="ws-visually-hidden">Åpne handlevognen</span>
            </Button>
        )
    }
}

export default connect(
    store => {
        return {
            itemsCount: store.cart.totals.totalQuantity
        }
    },
    dispatch => {
        return {
            showCartPopup: () => dispatch(showCartPopup())
        }
    }
)(CartButton)
