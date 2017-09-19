import React, { Component } from "react"
import classNames from "classnames"

// Components
import RadioItem from "../shared/RadioItem"

export default class HandoverLocationItemStore extends Component {
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
                    {location.store.name}
                </span>
                {" "}
                <span className="ws-radioitems__subtitle">
                    {location.store.address} {location.store.postalcode} {location.store.city}
                </span>
            </RadioItem>
        )
    }
}
