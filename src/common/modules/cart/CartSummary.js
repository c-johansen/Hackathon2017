import React, { Component } from "react"
import { formatPrice } from "../../helpers/FormatHelper"
import { showCheckoutPopup } from "../../data/store/actions/app"
import { connect } from "react-redux"
import Button from "../shared/Button"
import { CSSTransitionGroup as TransitionGroup } from "react-transition-group"
import Icon, { IconType } from "../shared/Icon"
import Only from "../shared/Only"

let isMinimal = false

export class CartSummary extends Component {
    state = {
        isMinimal
    }
    componentWillUnmount() {
        isMinimal = this.state.isMinimal
    }
    render() {
        const { cart, showCheckoutPopup } = this.props

        return (
            <div>
                <div className={"cart-summary " + (this.state.isMinimal ? "cart-summary--minimal" : "")}>

                    <Button className="cart-summary__minimize-button" onClick={() => this.setState({ isMinimal: !this.state.isMinimal })}>
                        <Icon type={IconType.Handle} />
                    </Button>

                    <span className="cart-summary__price">
                        <Only if={cart.calculatingPrice}>
                            Henter pris...
                        </Only>
                        <Only if={!cart.calculatingPrice}>
                            Totalt kr {formatPrice(cart.totals.calculatorTotal)}
                        </Only>
                    </span>
                    <TransitionGroup
                        component="div"
                        transitionName="cart-summary-slide-left"
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={600}
                        transitionLeaveTimeout={300}>
                        {this.state.isMinimal ? null : <div className="cart-summary__item-count">{cart.totals.totalQuantity} vare{cart.totals.totalQuantity > 1 ? "r" : ""}</div>}
                    </TransitionGroup>
                    <TransitionGroup
                        component="div"
                        transitionName="cart-summary-slide-right"
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={600}
                        transitionLeaveTimeout={300}>
                        {
                            this.state.isMinimal ? null : <Button
                                className="cart-summary__button"
                                onClick={showCheckoutPopup}>
                                Til kassen
                            </Button>
                        }
                    </TransitionGroup>

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
            showCheckoutPopup: () => dispatch(showCheckoutPopup())
        }
    }
)(CartSummary)
