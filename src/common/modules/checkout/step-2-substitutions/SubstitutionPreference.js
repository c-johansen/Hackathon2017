import React, { Component } from "react"
import classNames from "classnames"
import { SubstitutionTypeLabel, SubstitutionTypeSubLabel } from "../../../data/const/Order"

import RadioItem from "../../shared/RadioItem"

export default class SubstitutionPreference extends Component {
    render() {
        const { substitutionType, value, onChange } = this.props

        const checked = value === substitutionType

        const elementClassNames = classNames(
            "ws-radioitems__label",
            {
                "ws-radioitems__label--checked": checked
            }
        )

        return (
            <RadioItem
                className={elementClassNames}
                name="substitutionpreference"
                checked={checked}
                onChange={() => onChange(substitutionType)}
            >
                <span className="ws-radioitems__title">
                    {SubstitutionTypeLabel[substitutionType]}
                </span>
                {SubstitutionTypeSubLabel[substitutionType] && (
                    <span className="ws-radioitems__subtitle">
                        {SubstitutionTypeSubLabel[substitutionType]}
                    </span>
                )}
            </RadioItem>
        )
    }
}
