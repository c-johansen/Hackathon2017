import React, { Component } from "react"
import { connect } from "react-redux"
import CheckoutStep from "../../../data/const/CheckoutStep"
import { FullDateTime } from "../../../data/const/MomentDateFormats"
import moment from "moment"
moment.locale("nb")
import ValidatorHelper from "../helpers/ValidatorHelper"
import HandoverType from "../../../data/const/HandoverType"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"
import { getHandoverWindows } from "../../../data/store/actions/handoverWindows"

// Components
import Step from "../shared/Step"
import HandoverTimePicker from "../../handover-time-picker"

export class StepHandoverTime extends Component {
    componentWillMount() {
        // Preload windows
        //console.log("TODO: PREVENT EXCESSIVE RELOADS StepHandoverTime componentWillMount")
        this.getHandoverWindows(this.props)
    }
    componentWillReceiveProps(nextProps) {
        const currentOrder = this.props.checkoutOrder
        const nextOrder = nextProps.checkoutOrder

        // Reload windows if order settings change
        if (
            // Changed handovertype:
            (currentOrder.handoverInfo.handoverType != nextOrder.handoverInfo.handoverType)
            // Changed store:
            || (currentOrder.store && currentOrder.store.pickupGln != nextOrder.store.pickupGln)
            // Changed cart-weight on home-delivery order:
            || (nextOrder.handoverInfo.handoverType === HandoverType.Home && currentOrder.meta.weight && currentOrder.meta.weight != nextOrder.meta.weight)) {
            //console.log("TODO: PREVENT EXCESSIVE RELOADS StepHandoverTime componentWillReceiveProps")
            this.getHandoverWindows(nextProps)
        }
    }
    getHandoverWindows(props) {
        const { checkoutOrder } = props
        this.props.getHandoverWindows(checkoutOrder)
    }
    render() {
        const { checkoutOrder, id, stepStatus, gotoStep, onCollapseRest } = this.props

        let stepHeaderReadyText = ""
        if (checkoutOrder.handoverInfo.customerPickupFrom && checkoutOrder.handoverInfo.customerPickupTo) {
            stepHeaderReadyText = `Varene ${checkoutOrder.handoverInfo.handoverType !== HandoverType.Delivery ? "hentes" : "leveres"} ${moment(checkoutOrder.handoverInfo.customerPickupFrom).format(FullDateTime)}-${moment(checkoutOrder.handoverInfo.customerPickupTo).format("HH")}`
        }

        return (
            <Step
                id={id}
                stepName={CheckoutStep.HandoverTime}
                stepStatus={stepStatus}
                onCollapseRest={onCollapseRest}
                // Header
                pendingText="Velg tidspunkt for utlevering"
                openText={`Når ønsker du å ${checkoutOrder.handoverInfo.handoverType !== HandoverType.Delivery ? "hente varene" : "få varene levert"}?`}
                readyText={stepHeaderReadyText}
                editText="Endre tid"
                // Footer
                nextStep={CheckoutStep.Payment}
                prevStep={CheckoutStep.HandoverType}
                nextStepDisabled={!ValidatorHelper.validate(checkoutOrder, { stepName: CheckoutStep.HandoverTime })}
                gotoStep={gotoStep}
            >
                <HandoverTimePicker />
            </Step>
        )
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
            getHandoverWindows: (order) => dispatch(getHandoverWindows(order)),
        }
    },
)(StepHandoverTime)
