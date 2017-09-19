import React, { Component } from "react"
import classNames from "classnames"
import { formatPrice } from "../../helpers/FormatHelper"

// Components
import RadioItem from "../shared/RadioItem"

export default class FlexiPickerProduct extends Component {
    render() {
        const { product, checked, hours, onSelectProduct } = this.props

        const elementClassNames = classNames(
            "ws-radioitems__label",
            {
                "ws-radioitems__label--checked": checked
            }
        )

        return (
            <RadioItem
                className={elementClassNames}
                name="flexiproduct"
                checked={checked}
                onChange={() => onSelectProduct(product)}
            >
                <span className="ws-radioitems__title">
                    {product.flexibility === "FLEXI" ? "Fleksipris " : "Beste pris "}
                </span>
                <span className="ws-radioitems__price">
                    kr {formatPrice(product.price, true)}
                </span>
                {product.flexibility === "OVER_NATT" && (
                    <span className="ws-radioitems__subtitle">
                        Med <strong>beste pris</strong> kan du endre bestillingen din frem til midnatt dagen før levering
                    </span>
                )}
                {product.flexibility === "FLEXI" && (
                    <span className="ws-radioitems__subtitle">
                        Med <strong>fleksipris</strong> kan du endre bestillingen din helt frem til {hours} timer før levering
                    </span>
                )}
            </RadioItem>
        )
    }
}
