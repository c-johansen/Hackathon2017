import React, { Component } from "react"
import { connect } from "react-redux"
import { animateScroll } from "react-scroll"
import CheckoutStep from "../../../data/const/CheckoutStep"
import { SubstitutionTypes, SubstitutionTypeLabel, Defaults } from "../../../data/const/Order"
import { setSubstitutePreference, setSubstituteComment } from "../../../data/store/actions/checkout"
import ValidatorHelper from "../helpers/ValidatorHelper"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"

// Components
import Step from "../shared/Step"
import SubstitutionPreference from "./SubstitutionPreference"

export class StepSubstitutions extends Component {
    state = {
        commentFocus: false
    }
    containerId = "ws-checkout-scrollpane"
    componentWillMount() {
        if (!this.props.checkoutOrder.substitutePreference) {
            this.props.setSubstitutePreference(Defaults.substitutePreference)
        }
    }
    componentDidMount() {
        this.containerOffset = document.getElementById(this.containerId).offsetTop
    }
    render() {
        const { checkoutOrder, stepStatus, id, setSubstitutePreference, setSubstituteComment, gotoStep, onCollapseRest } = this.props

        return (
            <Step
                id={id}
                stepName={CheckoutStep.Substitutions}
                stepStatus={stepStatus}
                onCollapseRest={onCollapseRest}
                className={this.state.commentFocus ? "ws-checkout-step--input-focus" : ""}
                // Header
                pendingText="Hva vil du at vi skal gjøre hvis enkelte varer er utsolgt?"
                openText="Hva vil du at vi skal gjøre hvis enkelte varer er utsolgt?"
                readyText={`Hvis enkelte varer er utsolgt, ${checkoutOrder.substitutePreference && SubstitutionTypeLabel[checkoutOrder.substitutePreference].toLowerCase()}`}
                editText="Endre valg for utsolgte varer"
                // Footer
                nextStep={CheckoutStep.HandoverType}
                prevStep={CheckoutStep.Cart}
                nextStepDisabled={!ValidatorHelper.validate(checkoutOrder, { stepName: CheckoutStep.Substitutions })}
                gotoStep={gotoStep}
            >
                <div className="ws-checkout-substitutions__container">
                    <fieldset className="ws-radioitems ws-radioitems--substitutions">
                        <legend className="ws-visually-hidden">
                            Velg hva vi skal gjøre dersom enkelte varer er utsolgt
                        </legend>
                        {SubstitutionTypes.map(s => (
                            <SubstitutionPreference
                                key={s}
                                substitutionType={s}
                                value={checkoutOrder.substitutePreference}
                                onChange={setSubstitutePreference}
                            />
                        ))}
                    </fieldset>
                    <div className="ws-checkout-substitutions__comment">
                        <label htmlFor="substituteComment" className="ws-checkout__subtitle ws-checkout-substitutions__comment-label">
                            Har du noen beskjeder til den som skal plukke varene dine?
                        </label>
                        <textarea
                            className="ws-checkout-substitutions__comment-input"
                            id="substituteComment"
                            placeholder="Eksempel: Jeg vil helst ha grønne bananer, jeg ønsker at brødet er oppskåret"
                            maxLength="1000"
                            autoFocus={false}
                            aria-multiline="true"
                            aria-invalid="false"
                            onChange={(e) => setSubstituteComment(e.target.value)}
                            onFocus={this.onCommentFocus.bind(this)}
                            onBlur={this.onCommentBlur.bind(this)}
                            defaultValue={checkoutOrder.substituteComment}
                        ></textarea>
                    </div>
                </div>
            </Step>
        )
    }
    onCommentFocus() {
        this.setState({ commentFocus: true })

        const substituteCommentElement = document.getElementById("substituteComment")
        if (substituteCommentElement) {
            animateScroll.scrollTo(substituteCommentElement.offsetTop - this.containerOffset, {
                containerId: this.containerId,
                duration: 500
            })
        }
    }
    onCommentBlur() {
        this.setState({ commentFocus: false })
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
            setSubstitutePreference: (value) => dispatch(setSubstitutePreference(value)),
            setSubstituteComment: (value) => dispatch(setSubstituteComment(value))
        }
    }
)(StepSubstitutions)
