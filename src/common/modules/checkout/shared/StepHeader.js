import React, { Component } from "react"
import classNames from "classnames"
import CheckoutStepStatus from "../../../data/const/CheckoutStepStatus"
import CheckoutStep from "../../../data/const/CheckoutStep"

// Components
import Icon, { IconType } from "../../shared/Icon"
import Button from "../../shared/Button"

const stepNameIconMap = {
    [CheckoutStep.Cart]: IconType.Cart,
    [CheckoutStep.Substitutions]: IconType.Substitution,
    [CheckoutStep.HandoverType]: IconType.Bag,
    [CheckoutStep.HandoverTime]: IconType.Clock,
    [CheckoutStep.Payment]: IconType.Payment,
}

export default class CheckoutStepHeader extends Component {
    render() {
        const { stepStatus, stepName, openText, readyText, editText, onOpenStep } = this.props

        const elementClassNames = classNames(
            "ws-checkout-step-header",
            `ws-checkout-step-header--${stepStatus}`,
            `ws-checkout-step-header--${stepName}`,
            `ws-checkout-step-header--${stepName}--${stepStatus}`
        )

        switch (stepStatus) {
            case CheckoutStepStatus.Todo:
                return false
            case CheckoutStepStatus.Doing:
                return (
                    <div className={elementClassNames}>
                        <Icon type={stepNameIconMap[stepName]} circle outline className="ws-checkout-step-header__icon" />
                        <h2 className="ws-checkout-step-header__title">
                            {openText}
                        </h2>
                    </div>
                )
            case CheckoutStepStatus.Done:
                return (
                    <div className={elementClassNames}>
                        <Icon type={stepNameIconMap[stepName]} circle outline className="ws-checkout-step-header__icon" />
                        <Button className="ws-checkout-step-header__button" onClick={onOpenStep}>
                            <h2 className="ws-checkout-step-header__title">
                                {readyText}
                            </h2>
                            {editText && (
                                <span className="ws-checkout-step-header__edit-button">
                                    {editText}
                                </span>
                            )}
                        </Button>
                    </div>
                )
        }
    }
}
