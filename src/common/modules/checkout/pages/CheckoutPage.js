import React, { Component } from "react"
import { connect } from "react-redux"
import { animateScroll } from "react-scroll"
import HandoverType from "../../../data/const/HandoverType"
import CheckoutStep from "../../../data/const/CheckoutStep"
import CheckoutStepStatus from "../../../data/const/CheckoutStepStatus"
import { updateStepStatus } from "../../../data/store/actions/checkout"
import { send } from "../../../data/store/actions/order"
import ValidatorHelper from "../helpers/ValidatorHelper"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"
import submitOrderSelector from "../selectors/submitOrderSelector"

// Components
import StepCart from "../step-1-cart/StepCart"
import StepSubstitutions from "../step-2-substitutions/StepSubstitutions"
import StepHandoverType from "../step-3-handover-type/StepHandoverType"
import StepHandoverTime from "../step-4-handover-time/StepHandoverTime"
import StepPayment from "../step-5-payment/StepPayment"
import StepFooter from "../shared/StepFooter"
import Dialog from "../../shared/Dialog"
import LoaderDialog from "../../shared/LoaderDialog"

const stepId = {
    cart: "ws-checkout-step-cart",
    substitutions: "ws-checkout-step-substitutions",
    handoverType: "ws-checkout-step-handover-type",
    handoverTime: "ws-checkout-step-handover-time",
    payment: "ws-checkout-step-payment"
}
const containerId = "ws-checkout-scrollpane"

export class Checkout extends Component {
    state = {
        notInStoreDialogOpen: false,
        calculatedCartResolved: true,
    }
    componentDidMount() {
        this.containerOffset = document.getElementById(containerId).offsetTop
        this.scrollToStep(this.getRelatedSteps().current)
    }
    componentWillReceiveProps(nextProps) {
        const prevOrder = this.props.checkoutOrder
        const nextOrder = nextProps.checkoutOrder
        const prevCart = this.props.cart
        const nextCart = nextProps.cart

        /*
            Show dialog when changing store
            We need to resolve both storeChanged, handoverTypeChanged and cartCalculated before we can act
        */

        // Detect picking-store change
        if ((!prevOrder.store && nextOrder.store) || (prevOrder.store.pickupGln != nextOrder.store.pickupGln)) {
            this.storeChanged = true
            this.prevStoreName = prevOrder.store.name
            this.setState({ calculatedCartResolved: false })
        }

        // Detect handover-type change
        if (prevOrder.handoverInfo.handoverType !== nextOrder.handoverInfo.handoverType) {
            this.handoverTypeChanged = true
            this.setState({ calculatedCartResolved: false })
        }

        // If picking-store/handover-type changed, wait for calculator to finish
        if ((this.storeChanged || this.handoverTypeChanged) && prevCart.calculatingPrice && !nextCart.calculatingPrice) {
            this.cartCalculated = true

            if (nextCart.containsItemsNotInCurrentStore) {
                this.cartContainsItemsNotInCurrentStore = true
            }

            this.setState({ calculatedCartResolved: true })
        }

        // User changed picking-store/handover-type and calculator is finished. Act!
        if ((this.storeChanged || this.handoverTypeChanged) && this.cartCalculated) {
            if (this.prevStoreName && nextOrder.handoverInfo.handoverType === HandoverType.Delivery) {
                if (this.cartContainsItemsNotInCurrentStore) {
                    // User chose delivery, cart has items not available in store
                    this.setState({
                        dialogText: `${nextOrder.store.name} leverer varer til ${nextOrder.handoverInfo.deliveryInfo.address}. Vi må derfor bytte butikk fra ${this.prevStoreName} og noen av varene i handlevognen er ikke tilgjengelig hos ${nextOrder.store.name}`,
                        dialogCanSendUserToCartStep: true,
                        notInStoreDialogOpen: true,
                    })
                } else {
                    // User chose delivery, all items in cart are available in store
                    this.setState({
                        dialogText: `${nextOrder.store.name} leverer varer til ${nextOrder.handoverInfo.deliveryInfo.address}. Vi må derfor bytte butikk fra ${this.prevStoreName} og gjør oppmerksom på at dette kan medføre endringer i pris.`,
                        dialogCanSendUserToCartStep: false,
                        notInStoreDialogOpen: true
                    })
                }
            } else if (this.cartContainsItemsNotInCurrentStore) {
                // User chose pickup, cart has items not available in store
                this.setState({
                    dialogText: "Noen av varene i handlevognen er ikke tilgjengelige",
                    dialogCanSendUserToCartStep: true,
                    notInStoreDialogOpen: true
                })
            }

            // Reset all
            this.storeChanged = this.prevStoreName = this.handoverTypeChanged = this.cartCalculated = this.cartContainsItemsNotInCurrentStore = false
        }
    }
    render() {
        const { checkoutOrder, stepStatus, order, handoverOptions } = this.props
        const relatedSteps = this.getRelatedSteps()
        const nextStepText = !relatedSteps.next ? "Send bestilling" : null

        // Determine special step-progress disabling
        let specialNextStepDisabled = false
        if (relatedSteps.current === CheckoutStep.HandoverType && !handoverOptions.loading && handoverOptions.error) {
            specialNextStepDisabled = true
        } else if (relatedSteps.current === CheckoutStep.Payment && order.loading) {
            specialNextStepDisabled = true
        }

        return (
            <div className="ws-checkout-page">
                <div className="ws-checkout-content" id={containerId}>
                    <StepCart
                        id={stepId.cart}
                        stepStatus={stepStatus.cart}
                        gotoStep={this.gotoStep.bind(this)}
                        onCollapseRest={() => this.onCollapseRest(CheckoutStep.Cart)}
                    />
                    <StepSubstitutions
                        id={stepId.substitutions}
                        stepStatus={stepStatus.substitutions}
                        gotoStep={this.gotoStep.bind(this)}
                        onCollapseRest={() => this.onCollapseRest(CheckoutStep.Substitutions)}
                    />
                    <StepHandoverType
                        id={stepId.handoverType}
                        stepStatus={stepStatus.handoverType}
                        gotoStep={this.gotoStep.bind(this)}
                        onCollapseRest={() => this.onCollapseRest(CheckoutStep.HandoverType)}
                    />
                    <StepHandoverTime
                        id={stepId.handoverTime}
                        stepStatus={stepStatus.handoverTime}
                        gotoStep={this.gotoStep.bind(this)}
                        onCollapseRest={() => this.onCollapseRest(CheckoutStep.HandoverTime)}
                    />
                    <StepPayment
                        id={stepId.payment}
                        stepStatus={stepStatus.payment}
                        gotoStep={this.gotoStep.bind(this)}
                        onCollapseRest={() => this.onCollapseRest(CheckoutStep.Payment)}
                    />
                </div>
                <Dialog
                    isOpen={this.state.notInStoreDialogOpen}
                    question={this.state.dialogText}
                    confirm={this.state.dialogCanSendUserToCartStep && this.gotoCart.bind(this)}
                    cancelText="Lukk"
                    close={() => this.setState({ notInStoreDialogOpen: false })}
                >
                    Vis handlevogn
                </Dialog>
                <LoaderDialog
                    isOpen={order.loading}
                    message="Sender bestilling"
                />
                {process.env.PLATFORM === "mobile" &&
                    <div className="ws-checkout-footer">
                        <StepFooter
                            nextStep={relatedSteps.next}
                            prevStep={relatedSteps.prev}
                            gotoStep={this.gotoStep.bind(this)}
                            nextStepDisabled={specialNextStepDisabled || !ValidatorHelper.validate(checkoutOrder, { stepName: relatedSteps.current })}
                            nextStepText={nextStepText}
                            onNextClick={!relatedSteps.next ? this.sendOrder.bind(this) : null}
                        />
                    </div>
                }
            </div>
        )
    }
    gotoStep(stepName, event) {
        const { checkoutOrder, updateStepStatus } = this.props

        event && event.stopPropagation()
        let newStepStatus = ValidatorHelper.validate(checkoutOrder)
        newStepStatus[stepName] = CheckoutStepStatus.Doing
        updateStepStatus(newStepStatus)
    }
    sendOrder(event) {
        const { submitOrder, memberId } = this.props

        event && event.stopPropagation()
        this.props.send(submitOrder, memberId)
    }
    onCollapseRest(restedStepName) {
        const currentStepName = this.getRelatedSteps().current

        // Only scroll after previous step is done animating
        if (restedStepName === currentStepName || !stepId[currentStepName]) return

        this.scrollToStep(currentStepName)
    }
    scrollToStep(stepName) {
        const stepElement = document.getElementById(stepId[stepName])
        if (stepElement) {
            animateScroll.scrollTo(stepElement.offsetTop - this.containerOffset, {
                containerId: containerId,
                duration: 500
            })
        }
    }
    getRelatedSteps() {
        const { stepStatus } = this.props
        const stepNames = Object.keys(stepStatus)
        let currentIndex, current, next, prev = null

        // Find current step name
        stepNames.forEach((stepName, idx) => {
            if (stepStatus[stepName] === CheckoutStepStatus.Doing) {
                current = stepName
                currentIndex = idx
            }
        })

        // Set prev step name
        if (currentIndex > 0) {
            prev = stepNames[currentIndex - 1]
        }

        // Set next step name
        if (currentIndex < stepNames.length - 1) {
            next = stepNames[currentIndex + 1]
        }

        return { current, prev, next }
    }
    gotoCart() {
        setTimeout(() => this.gotoStep(CheckoutStep.Cart), 300)
    }
}

export default connect(
    store => {
        return {
            memberId: store.user.data.currentMember.memberId,
            checkoutOrder: checkoutOrderSelector(store),
            submitOrder: submitOrderSelector(store),
            stepStatus: store.checkout.stepStatus,
            order: store.order,
            handoverOptions: store.checkout.handoverOptions,
            cart: store.cart,
        }
    },
    dispatch => {
        return {
            updateStepStatus: (value) => dispatch(updateStepStatus(value)),
            send: (submitOrder, memberId) => dispatch(send(submitOrder, memberId)),
        }
    }
)(Checkout)
