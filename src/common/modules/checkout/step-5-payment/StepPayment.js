import React, { Component } from "react"
import { connect } from "react-redux"
import CheckoutStep from "../../../data/const/CheckoutStep"
import { getPaymentAgreements } from "../../../data/store/actions/checkout"
import { send } from "../../../data/store/actions/order"
import { setPaymentAgreement } from "../../../data/store/actions/checkout"
import { showTosPopup } from "../../../data/store/actions/app"
import ValidatorHelper from "../helpers/ValidatorHelper"
import submitOrderSelector from "../selectors/submitOrderSelector"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"

// Components
import Button from "../../shared/Button"
import Step from "../shared/Step"
import PriceSummary from "../../orders/PriceSummary"
import PaymentAgreement from "./PaymentAgreement"
import InlineMessage, { MessageType } from "../../shared/InlineMessage"

export class StepPayment extends Component {
    componentWillMount() {
        this.props.getPaymentAgreements(true)
    }
    componentWillReceiveProps() {
        const { paymentAgreements } = this.props
        // Retry loading if previous request gave error
        if (!paymentAgreements.loading && paymentAgreements.error) {
            this.props.getPaymentAgreements(true)
        }
    }
    render() {
        const { checkoutOrder, paymentAgreements, id, stepStatus, onCollapseRest, order, gotoStep, setPaymentAgreement, cart } = this.props
        const self = this
        const inlineMessages = []

        if (paymentAgreements.error) {
            inlineMessages.push({
                error: paymentAgreements.error,
                type: MessageType.Error,
            })
        }

        if (!paymentAgreements.error && !paymentAgreements.loading && paymentAgreements.data && paymentAgreements.data.length === 0) {
            inlineMessages.push({
                message: "Du har ingen gyldige betalingskort lagret på profilen din og foreløpig kan du dessverre ikke sende inn bestilling.",
                type: MessageType.Info,
            })
        }

        if (!checkoutOrder.totals.totalToPay || cart.calculatingError) {
            inlineMessages.push({
                message: "Det har skjedd en feil, så vi klarer ikke å regne ut totalen på handlevognen din. Vennligst prøv igjen senere.",
                type: MessageType.Error,
            })
        }

        if (order.error) {
            inlineMessages.push({
                message: "Det har skjedd en feil. Prøv å sende bestillingen på nytt. Kortet ditt vil ikke bli belastet flere ganger.",
                error: order.error,
                type: MessageType.Error,
            })
        }

        return (
            <Step
                id={id}
                stepName={CheckoutStep.Payment}
                stepStatus={stepStatus}
                onCollapseRest={onCollapseRest}
                // Header
                pendingText="Alt klart til betaling!"
                openText="Fullfør bestilling"
                readyText="Sikker betaling med PayEx"
                editText="Fullfør bestilling"
                // Footer
                nextStep={CheckoutStep.Submit}
                prevStep={CheckoutStep.HandoverTime}
                nextStepDisabled={order.loading || !ValidatorHelper.validate(checkoutOrder, { stepName: CheckoutStep.Payment })}
                nextStepText="Send bestilling"
                gotoStep={gotoStep}
                onNextClick={self.sendOrder.bind(self)}
            >
                <PriceSummary order={checkoutOrder} isPreSubmit={true} />
                <h3 className="ws-checkout__subtitle">Velg kort for betaling via PayEx</h3>
                {paymentAgreements && paymentAgreements.data && paymentAgreements.data.length > 0 && (
                    <div>
                        <fieldset className="ws-radioitems ws-radioitems--payment ws-cards">
                            <legend className="ws-radioitems__legend ws-visually-hidden">
                                Velg kort som du har betalt med før
                            </legend>
                            {paymentAgreements.data.map(agreement => (
                                <PaymentAgreement
                                    agreement={agreement}
                                    key={agreement.internalId}
                                    checked={agreement.internalId === checkoutOrder.agreementInternalId}
                                    onChange={setPaymentAgreement}
                                />
                            ))}
                        </fieldset>
                        <p className="ws-paragraph">
                            Ved å fullføre bestillingen, godkjenner jeg gjeldende <Button className="ws-payment__tos-link" onClick={this.props.showTosPopup}>
                                bruker- og salgsbetingelser
                            </Button>.
                        </p>
                    </div>
                )}
                {inlineMessages.map((message) => (
                    <InlineMessage
                        message={message.message}
                        error={message.error}
                        show={true}
                        style={{ margin: "16px -16px" }}
                        type={message.type}
                        key={message.message}
                    />
                ))}
            </Step>
        )
    }
    sendOrder(event) {
        event && event.stopPropagation()
        this.props.send(this.props.submitOrder, this.props.memberId)
    }
}

export default connect(
    store => {
        return {
            memberId: store.user.data.currentMember.memberId,
            checkoutOrder: checkoutOrderSelector(store),
            submitOrder: submitOrderSelector(store),
            paymentAgreements: store.checkout.paymentAgreements,
            order: store.order,
            cart: store.cart,
        }
    },
    dispatch => {
        return {
            getPaymentAgreements: (activeOnly) => dispatch(getPaymentAgreements(activeOnly)),
            setPaymentAgreement: (agreement) => dispatch(setPaymentAgreement(agreement)),
            showTosPopup: () => dispatch(showTosPopup()),
            send: (submitOrder, memberId) => dispatch(send(submitOrder, memberId))
        }
    }
)(StepPayment)
