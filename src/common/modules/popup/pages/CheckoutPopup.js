import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { hideCheckoutPopup, hideCartPopup } from "../../../data/store/actions/app"
import { clearFilter as clearProductsFilter, clearQuery as clearProductsQuery } from "../../../data/store/actions/products"
import { clearFilter as clearMostPurchasedProductsFilter } from "../../../data/store/actions/mostPurchasedProducts"

// Components
import Popup from "../Popup"
import OnlyGuest from "../../shared/OnlyGuest"
import OnlyAuth from "../../shared/OnlyAuth"
import TitleHeader from "../../app/TitleHeader"
import LoginPoster from "../../auth/LoginPoster"
import Checkout from "../../checkout/Checkout"
import CartSuggestionsPage from "../../checkout/pages/CartSuggestionsPage"

export class CheckoutPopup extends Component {
    state = {
        showCartSuggestions: true
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen && !this.props.isOpen) {
            this.setState({
                showCartSuggestions: true
            })
        }
    }

    render() {
        if (this.state.showCartSuggestions) {
            return this.getCartSuggestionsPopup()
        }

        return (
            <div>
                <OnlyGuest includeSimplified={true}>
                    {this.getLoginPopup()}
                </OnlyGuest>
                <OnlyAuth excludeSimplified={true}>
                    {this.getCheckoutPopup()}
                </OnlyAuth>
            </div>
        )
    }
    getCartSuggestionsPopup() {
        const { isOpen, counter } = this.props

        return (
            <Popup isOpen={isOpen} partial={false} counter={counter} close={this.closePopup.bind(this)} >
                <div className="ws-checkout">
                    <TitleHeader title="Glemt noe?" gray={true} onClose={this.closePopup.bind(this)} />
                    <CartSuggestionsPage goToCheckout={this.handleGoToCheckout.bind(this)} />
                </div>
            </Popup>
        )
    }
    getLoginPopup() {
        const { isOpen, counter } = this.props

        return (
            <Popup isOpen={isOpen} partial={false} counter={counter} close={this.closePopup.bind(this)}>
                <div className="ws-checkout">
                    <TitleHeader title="Kassen" gray={true} onClose={this.closePopup.bind(this)} />
                    <LoginPoster text="For å få kunne sende inn en bestilling må du være medlem i Trumf" />
                </div>
            </Popup>
        )
    }
    getCheckoutPopup() {
        const { isOpen, counter, hasOrder } = this.props

        return (
            <Popup isOpen={isOpen} partial={false} counter={counter} close={this.closePopup.bind(this)}>
                <div className="ws-checkout">
                    <TitleHeader title={hasOrder ? "Bekreftelse" : "Kassen"} gray={true} onClose={this.closePopup.bind(this)} />
                    <Checkout close={this.closePopup.bind(this)} />
                </div>
            </Popup>
        )
    }

    handleGoToCheckout() {
        this.setState({ showCartSuggestions: false })
    }

    closePopup() {
        const {
            history,
            clearMostPurchasedProductsFilter,
            clearProductsFilter,
            clearProductsQuery,
            hideCartPopup,
            hideCheckoutPopup,
        } = this.props

        // Go to start page after closing checkout/order confirmation
        history.push({ pathname: "/search", state: { isBack: false, isImmediate: true } })
        clearMostPurchasedProductsFilter()
        clearProductsFilter()
        clearProductsQuery()
        hideCartPopup()
        hideCheckoutPopup()
    }
}

export default connect(
    store => {
        return {
            isOpen: store.app.checkoutPopup.visible,
            counter: store.app.checkoutPopup.counter,
            hasOrder: !!store.order.data
        }
    },
    dispatch => {
        return {
            hideCheckoutPopup: () => dispatch(hideCheckoutPopup()),
            hideCartPopup: () => dispatch(hideCartPopup()),
            clearProductsQuery: () => dispatch(clearProductsQuery()),
            clearProductsFilter: () => dispatch(clearProductsFilter()),
            clearMostPurchasedProductsFilter: () => dispatch(clearMostPurchasedProductsFilter()),
        }
    }
)(withRouter(CheckoutPopup))
