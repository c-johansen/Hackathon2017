import React, { Component } from "react"
import classNames from "classnames"

// Components
import RadioItem from "../shared/RadioItem"

export default class HandoverTypeItem extends Component {
    render() {
        const { option, value, onChange } = this.props

        const elementClassNames = classNames(
            "ws-radioitems__label",
            `ws-radioitems__label--${option.handoverType}`,
            {
                "ws-radioitems__label--checked": value === option.handoverType,
                "ws-radioitems__label--disabled": option.uiDisabled
            }
        )

        return (
            <RadioItem
                id={`${option.handoverType}-tab`}
                className={elementClassNames}
                ariaControls={`${option.handoverType}-panel`}
                role="tab"
                name="handoverType"
                value={option.handoverType}
                checked={value === option.handoverType}
                disabled={option.uiDisabled}
                onChange={() => onChange(option.handoverType)}
            >
                <span className="ws-radioitems__title">
                    {option.uiTitle}
                </span>
                {" "}
                {option.uiSubtitle && (
                    <span className="ws-radioitems__subtitle">
                        {option.uiSubtitle}
                    </span>
                )}
                {" "}
                {option.uiMessage && (
                    <span className="ws-radioitems__subtitle">
                        {option.uiMessage}
                    </span>
                )}
                {" "}
                <span className="ws-radioitems__price">
                    {option.uiPrice}
                </span>
            </RadioItem>
        )
    }
}
