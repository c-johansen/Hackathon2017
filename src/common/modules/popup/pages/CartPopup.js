import React, { Component } from "react"
import { connect } from "react-redux"
import Popup from "../Popup"
import CartHeader from "../../cart/CartHeader"
import { hideCartPopup } from "../../../data/store/actions/app"
import { Grid, StretchBox, StaticBox } from "../../app/markup"
import Only from "../../shared/Only"
import CartItems from "../../cart/CartItems"
import CartSummary from "../../cart/CartSummary"
import EmptyCartPoster from "../../cart/EmptyCartPoster"
import PreorderStatusBlob from "../../orders/PreorderStatusBlob"

export class CartPopup extends Component {
    render() {
        let { hide, isOpen, itemsCount, counter, loading } = this.props

        return (
            <Popup close={hide} isOpen={isOpen} partial={false} counter={counter}>
                <Grid>
                    <StaticBox>
                        <CartHeader />
                    </StaticBox>
                    <StaticBox>
                        <PreorderStatusBlob />
                    </StaticBox>
                    <StretchBox>
                        <Only if={!loading}>
                            <Only if={itemsCount > 0}>
                                <CartItems />
                            </Only>
                            <Only if={itemsCount === 0}>
                                <EmptyCartPoster />
                            </Only>
                        </Only>
                    </StretchBox>
                    {itemsCount > 0 && !loading ? <StaticBox><CartSummary /></StaticBox> : null}
                </Grid>
            </Popup>
        )
    }
}

export default connect(
    store => {
        return {
            isOpen: store.app.cartPopup.visible,
            counter: store.app.cartPopup.counter,
            itemsCount: store.cart.items.length,
            loading: store.cart.loading,
        }
    },
    dispatch => {
        return {
            hide: () => dispatch(hideCartPopup())
        }
    }
)(CartPopup)
