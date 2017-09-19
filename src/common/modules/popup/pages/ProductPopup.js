import React, { Component } from "react"
import { connect } from "react-redux"
import Popup from "../Popup"
import ProductItem from "../../products/pages/ProductItem"
import { hideProductPopup } from "../../../data/store/actions/app"
import { Grid, StretchBox } from "../../app/markup"
import uuid from "uuid"

export class ProductPopup extends Component {
    id = "heading" + uuid.v4()

    render() {
        let { hide, isOpen, counter } = this.props

        return (
            <Popup close={hide} isOpen={isOpen} counter={counter} headingId={this.id}  >
                <Grid>
                    <StretchBox>
                        <ProductItem headingId={this.id} />
                    </StretchBox>
                </Grid>
            </Popup>
        )
    }
}

export default connect(
    store => {
        return {
            isOpen: store.app.productPopup.visible,
            counter: store.app.productPopup.counter
        }
    },
    dispatch => {
        return {
            hide: () => dispatch(hideProductPopup())
        }
    }
)(ProductPopup)
