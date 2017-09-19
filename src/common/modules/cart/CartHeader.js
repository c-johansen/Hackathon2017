import React, { Component } from "react"
import TitleHeader from "../app/TitleHeader"
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"
import Dialog from "../shared/Dialog"
import { hideCartPopup } from "../../data/store/actions/app"
import { empty } from "../../data/store/actions/cart"
import { connect } from "react-redux"

export class CartHeader extends Component {
    state = {
        emptyDialogOpen: false
    }
    render() {
        let emptyDialog = (
            <Dialog
                isOpen={this.state.emptyDialogOpen}
                question="Sikker på du vil tømme handlevognen?"
                confirm={this.props.empty}
                close={() => this.setState({ emptyDialogOpen: false })}>
                Tøm handlevognen
            </Dialog>
        )

        return (
            <TitleHeader title="Handlevogn" gray={true} onClose={this.props.hideCartPopup}>
                {
                    this.props.totalQuantity ?
                        <Button onClick={() => this.setState({ emptyDialogOpen: true })}>
                            <Icon type={IconType.Trash} />
                        </Button>
                        : null
                }
                {this.state.emptyDialogOpen ? emptyDialog : null}
            </TitleHeader>
        )
    }
}

export default connect(
    store => {
        return {
            totalQuantity: store.cart.totals.totalQuantity
        }
    },
    dispatch => {
        return {
            hideCartPopup: () => dispatch(hideCartPopup()),
            empty: () => dispatch(empty())
        }
    }
)(CartHeader)
