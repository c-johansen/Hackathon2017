import React, { Component } from "react"

// Components
import Button from "../../shared/Button"

export default class StepFooter extends Component {
    render() {
        const { nextStep, nextStepText, nextStepDisabled, prevStep, onNextClick, gotoStep } = this.props

        return (
            <div className="ws-checkout-step-footer">
                <Button
                    className="ws-button popup__footer-button ws-checkout-step-footer-button--default"
                    disabled={nextStepDisabled}
                    onClick={(e) => onNextClick ? onNextClick(e) : gotoStep(nextStep, e)}
                >
                    {nextStepText ? nextStepText : "Fortsett"}
                </Button>
                {prevStep && (
                    <Button
                        className="ws-button ws-checkout-step-footer-button"
                        onClick={(e) => gotoStep(prevStep, e)}
                    >
                        Tilbake
                    </Button>
                )}
            </div>
        )
    }
}
