import React, { Component } from "react"
import { connect } from "react-redux"
import { hasUserToken as fwHasUserToken } from "@ng-mw/framework-core"
import { getHandoverOptions } from "../../../data/store/actions/checkout"
import handoverTypeUiSelector from "../../../selectors/handoverTypeUiSelector"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"
import HandoverType from "../../../data/const/HandoverType"
import { formatPrice } from "../../../helpers/FormatHelper"

export class FeeThresholdReminder extends Component {
    static defaultProps = {
        updateOnMount: false,
        style: null,
    }
    componentWillMount() {
        if (this.props.updateOnMount) {
            this.update(this.props)
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.checkoutOrder || this.props.checkoutOrder.cart.length === nextProps.checkoutOrder.cart.length) {
            return
        }

        this.update(nextProps)
    }
    update(props) {
        if (fwHasUserToken() && (this.props.checkoutOrder || props.checkoutOrder.cart.length)) {
            this.props.getHandoverOptions(props.checkoutOrder)
        }
    }
    render() {
        const { checkoutOrder, handoverOptions } = this.props

        if (!handoverOptions || !checkoutOrder) {
            return false
        }

        const handoverType = checkoutOrder.handoverInfo.handoverType

        const currentHandoverOption = handoverOptions.find(o => o.handoverType === handoverType)

        if (!currentHandoverOption) {
            return false
        }

        const priceData = currentHandoverOption.uiHandoverPriceData
        if (!priceData || !priceData.threshold) {
            return false
        }

        return (
            <div className="ws-fee-threshold-reminder" style={this.props.style}>
                Handler du for over <strong>kr {formatPrice(priceData.threshold, true)}</strong>,
                {" "}
                {priceData.thresholdPrice === 0 ? "slipper du" : "får du beste pris på"}
                {" "}
                {handoverType === HandoverType.Delivery ? "hjemlevering" : "plukkgebyr"}
                {priceData.thresholdPrice === 0 && (
                    <span> på <strong>kr {formatPrice(priceData.priceFrom, true)}</strong></span>
                )}
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            checkoutOrder: checkoutOrderSelector(store),
            handoverOptions: handoverTypeUiSelector(store),
        }
    },
    dispatch => {
        return {
            getHandoverOptions: (cart) => dispatch(getHandoverOptions(cart)),
        }
    }
)(FeeThresholdReminder)
