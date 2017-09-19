import React, { Component } from "react"
import classNames from "classnames"

// Components
import RadioItem from "../shared/RadioItem"

export default class HandoverLocationItemAddress extends Component {
    render() {
        const { location, checked, disabled, onChange } = this.props

        const elementClassNames = classNames(
            "ws-radioitems__label",
            "ws-radioitems__label--secondary",
            {
                "ws-radioitems__label--checked": checked,
                "ws-radioitems__label--disabled": disabled
            }
        )

        return (
            <RadioItem
                className={elementClassNames}
                name="handoverpostalcode"
                value={location.id}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(location)}
            >
                <span className="ws-radioitems__title">
                    {location.address.address}
                </span>
                {" "}
                <span className="ws-radioitems__subtitle">
                    {location.address.postalCode} {location.address.city}
                </span>
                {" "}
                {disabled && (
                    <span className="ws-radioitems__subtitle">
                        Vi tilbyr ikke levering til denne adressen
                    </span>
                )}
            </RadioItem>
        )
    }
}
