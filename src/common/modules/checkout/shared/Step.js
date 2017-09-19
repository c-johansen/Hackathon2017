import React, { Component } from "react"
import Collapse from "react-collapse"
import classNames from "classnames"
import CheckoutStepStatus from "../../../data/const/CheckoutStepStatus"

// Components
import StepHeader from "../shared/StepHeader"
import StepFooter from "../shared/StepFooter"

export default class CheckoutStep extends Component {
    render() {
        const {
            id,
            stepName,
            stepStatus,
            onCollapseRest,
            children,
            className,
            // Header
            pendingText,
            openText,
            readyText,
            editText,
            // Footer
            nextStep,
            prevStep,
            nextStepDisabled,
            gotoStep,
            nextStepText,
            onNextClick
        } = this.props

        const elementClassNames = classNames(
            "ws-checkout-step",
            `ws-checkout-step--${stepStatus}`,
            `ws-checkout-step--${stepName}`,
            {
                [className]: className
            },
        )

        return (
            <div className={elementClassNames} id={id}>
                <StepHeader
                    stepName={stepName}
                    stepStatus={stepStatus}
                    pendingText={pendingText}
                    openText={openText}
                    readyText={readyText}
                    editText={editText}
                    onOpenStep={() => gotoStep(stepName)}
                />
                <Collapse
                    className="ws-checkout-step-content__collapse"
                    isOpened={stepStatus === CheckoutStepStatus.Doing}
                    onRest={onCollapseRest}
                    springConfig={{ stiffness: 230, damping: 26 }}
                >
                    <div className="ws-checkout-step-content">
                        {children}
                    </div>
                    {process.env.PLATFORM === "chainsite" &&
                        <StepFooter
                            nextStep={nextStep}
                            prevStep={prevStep}
                            nextStepDisabled={nextStepDisabled}
                            gotoStep={gotoStep}
                            nextStepText={nextStepText}
                            onNextClick={onNextClick}
                        />
                    }
                </Collapse>
            </div>
        )
    }
}
