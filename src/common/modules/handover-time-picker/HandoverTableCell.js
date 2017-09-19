import React, { Component } from "react"
import classNames from "classnames"
import moment from "moment"
moment.locale("nb")
import { formatPrice } from "../../helpers/FormatHelper"

// Components
import RadioItem from "../shared/RadioItem"
import FlexiPicker from "./FlexiPicker"

export default class HandoverTableCell extends Component {
    state = {
        showFlexiPicker: false
    }
    render() {
        const { handoverWindow, orderHandoverInfo, checked } = this.props

        const elementClassNames = classNames(
            "ws-radioitems__label",
            {
                "ws-radioitems__label--disabled": handoverWindow.uiDisabled,
                "ws-radioitems__label--alcohol": handoverWindow.uiOutsideAlcoholWindows,
                "ws-radioitems__label--checked": checked
            },
            "ws-handover-table__window"
        )

        const selectedProduct = checked ? orderHandoverInfo.product : handoverWindow.selectedProduct

        /*
            TODO: Fix warning:
            Warning: RadioItem is changing an uncontrolled input of type radio to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
        */

        return (
            <div className="ws-radioitems__label-group">
                <RadioItem
                    className={elementClassNames}
                    name="handoverwindow"
                    checked={checked}
                    disabled={handoverWindow.uiDisabled}
                    onChange={this.onSelectHandoverWindow.bind(this)}
                    onClick={this.onClickHandoverWindow.bind(this)}
                >
                    <span className="ws-visually-hidden">
                        {moment(handoverWindow.displayFrom).format("dddd DD.MM")} kl.
                    </span>
                    {" "}
                    <span className="ws-radioitems__title">
                        {moment(handoverWindow.displayFrom).format("HH.mm")} - {moment(handoverWindow.displayTo).format("HH.mm")}
                    </span>
                    {" "}
                    <span className="ws-radioitems__price">
                        kr {formatPrice(selectedProduct.price, true)}
                    </span>
                </RadioItem>
                {this.state.showFlexiPicker && (
                    <FlexiPicker
                        handoverWindow={handoverWindow}
                        selectedProduct={selectedProduct}
                        onSelectProduct={this.onSelectProduct.bind(this)}
                        onClose={this.closeFlexiPicker.bind(this)}
                    />
                )}
            </div>
        )
    }
    onSelectHandoverWindow() {
        const { handoverWindow } = this.props
        this.props.onChange(handoverWindow)
    }
    onClickHandoverWindow() {
        const { handoverWindow } = this.props
        if (handoverWindow.filteredProducts.length > 1) {
            this.setState({ showFlexiPicker: true })
        }
    }
    onSelectProduct(product) {
        this.props.onChange({ ...this.props.handoverWindow, selectedProduct: product })
    }
    closeFlexiPicker() {
        this.setState({ showFlexiPicker: false })
    }
}
