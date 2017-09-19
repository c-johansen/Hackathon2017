import React, { Component } from "react"
import { connect } from "react-redux"
import { getHandoverOptions } from "../../../data/store/actions/checkout"
import CheckoutStep from "../../../data/const/CheckoutStep"
import HandoverType from "../../../data/const/HandoverType"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"
import ValidatorHelper from "../helpers/ValidatorHelper"

// Components
import Step from "../shared/Step"
import HandoverTypePicker from "../../handover-type-picker"
import FeeThresholdReminder from "../shared/FeeThresholdReminder"

export class StepHandoverType extends Component {
    componentWillMount() {
        // Preload handover-options
        this.props.getHandoverOptions(this.props.checkoutOrder)
    }
    render() {
        const { checkoutOrder, id, stepStatus, gotoStep, onCollapseRest, cart, handoverOptions } = this.props

        let stepHeaderReadyText = ""
        if (checkoutOrder.store) {
            stepHeaderReadyText = checkoutOrder.handoverInfo.handoverType !== HandoverType.Delivery
                ? `Varene hentes på ${checkoutOrder.store.name}`
                : `Varene leveres til ${checkoutOrder.handoverInfo.deliveryInfo.address}, ${checkoutOrder.handoverInfo.deliveryInfo.postalCode} ${checkoutOrder.handoverInfo.deliveryInfo.city}`
        }

        const specialNextStepDisabled = !handoverOptions.loading && handoverOptions.error

        return (
            <Step
                id={id}
                stepName={CheckoutStep.HandoverType}
                stepStatus={stepStatus}
                onCollapseRest={onCollapseRest}
                // Header
                pendingText="Vil du få varene levert eller hente dem selv?"
                openText="Vil du få varene levert eller hente dem selv?"
                readyText={stepHeaderReadyText}
                editText="Endre valg for levering/henting"
                // Footer
                nextStep={CheckoutStep.HandoverTime}
                prevStep={CheckoutStep.Substitutions}
                nextStepDisabled={specialNextStepDisabled || !ValidatorHelper.validate(checkoutOrder, { stepName: CheckoutStep.HandoverType })}
                gotoStep={gotoStep}
            >
                <FeeThresholdReminder />
                <HandoverTypePicker cart={cart} />
            </Step>
        )
    }
}

export default connect(
    store => {
        return {
            checkoutOrder: checkoutOrderSelector(store),
            cart: store.cart,
            handoverOptions: store.checkout.handoverOptions,
        }
    },
    dispatch => {
        return {
            getHandoverOptions: (cart) => dispatch(getHandoverOptions(cart)),
        }
    },
)(StepHandoverType)
