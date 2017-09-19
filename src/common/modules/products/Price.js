import React from "react"
import { formatPrice } from "../../helpers/FormatHelper"

export default class Price extends React.PureComponent {
    hasReducedPrice() {
        let { isOffer, pricePerUnit, pricePerUnitOriginal } = this.props

        return isOffer && pricePerUnitOriginal !== pricePerUnit && pricePerUnitOriginal > 0
    }
    getSimplePrice() {
        let perKilo = <span>kr {formatPrice(this.props.comparePricePerUnit)}/{this.props.compareUnit}</span>
        let { pricePerUnit, comparePricePerUnit } = this.props

        return (
            <span>
                kr {formatPrice(pricePerUnit)} {comparePricePerUnit ? perKilo : null}
            </span>
        )
    }
    render() {
        let perKilo = <span className="ws-price__per-unit">kr {formatPrice(this.props.comparePricePerUnit)}/{this.props.compareUnit}</span>
        let { pricePerUnit, pricePerUnitOriginal, comparePricePerUnit, isBig } = this.props

        if (this.props.simple) {
            return this.getSimplePrice()
        }

        return (
            <div className="ws-price">
                <strong className={"ws-price__main " + (this.hasReducedPrice() ? "ws-price__main--discounted" : "")}>kr {formatPrice(pricePerUnit)}</strong>
                <span className={isBig ? "ws-price__wrapper" : ""}>
                    {this.hasReducedPrice() ? <strong className={"ws-price__original"}>kr {formatPrice(pricePerUnitOriginal)}</strong> : null}
                    {comparePricePerUnit ? perKilo : null}
                </span>
            </div>
        )
    }
}
