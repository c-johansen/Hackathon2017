import React, { Component } from "react"
import classNames from "classnames"
import moment from "moment"
moment.locale("nb")

// Components
import RadioItem from "../../shared/RadioItem"

export default class PaymentAgreement extends Component {
    render() {
        const { agreement, checked, onChange } = this.props

        const elementClassNames = classNames(
            "ws-radioitems__label",
            "ws-cards",
            {
                "ws-radioitems__label--checked": checked
            }
        )

        return (
            <RadioItem
                className={elementClassNames}
                name="agreenemtInternalId"
                value={agreement.internalId}
                checked={checked}
                onChange={() => onChange(agreement.internalId)}
            >
                <span className={`ws-radioitems__title ws-cards__type ws-cards__type--${agreement.typeOfCreditCard}`}>
                    {agreement.name}
                </span>
                {" "}
                <span className="ws-radioitems__subtitle ws-cards__number">
                    {agreement.maskedCreditCardNumber}
                </span>
                {" "}
                <span className="ws-radioitems__subtitle ws-cards__expires">
                    Utløper: {moment(agreement.expires).format("MM/YY")}
                </span>
            </RadioItem>
        )
    }
}
