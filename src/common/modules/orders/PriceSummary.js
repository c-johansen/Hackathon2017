import React, { Component } from "react"
import { formatPrice, toLetterCase } from "../../helpers/FormatHelper"
import PriceSummaryHelper from "../../helpers/PriceSummaryHelper"

export default class PriceSummary extends Component {
    static defaultProps = {
        isPreSubmit: false,
        isArchived: false,
    }
    render() {
        const { order, isArchived, isPreSubmit } = this.props

        const totalRecycleValue = PriceSummaryHelper.getTotalRecycleValue(order)
        const handoverProducts = PriceSummaryHelper.getHandoverProducts(order)
        const buffer = PriceSummaryHelper.getBuffer(order)
        const discounts = PriceSummaryHelper.getDiscounts(order)
        const totalDiscount = PriceSummaryHelper.getTotalDiscount(order)

        const showDiscountsDetails = !!(discounts && discounts.length)

        return (
            <div className="ws-price-summary">
                <div className="ws-price-summary__line">
                    <strong className="ws-price-summary__title ws-price-summary__title--hi">
                        Sum varer
                    </strong>
                    {" "}
                    <span className="ws-price-summary__price">
                        kr {formatPrice(PriceSummaryHelper.getCalculatorTotalExDiscounts(order))}
                    </span>
                </div>
                {!isArchived && buffer > 0 && (
                    <div className="ws-price-summary__line">
                        <strong className="ws-price-summary__title">
                            Reservert beløp for vekt-/erstatningsvarer
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(buffer)}
                        </span>
                    </div>
                )}
                {totalRecycleValue > 0 && (
                    <div className="ws-price-summary__line">
                        <strong className="ws-price-summary__title">
                            Pant
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(totalRecycleValue)}
                        </span>
                    </div>
                )}
                {isPreSubmit && handoverProducts && handoverProducts.map((handoverProduct, idx) => (
                    <div className="ws-price-summary__line" key={idx}>
                        <strong className="ws-price-summary__title">
                            {toLetterCase(handoverProduct.title)}
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(handoverProduct.price)}
                        </span>
                    </div>
                ))}
                {order.fees && order.fees.map((fee, idx) => (
                    <div className="ws-price-summary__line" key={idx}>
                        <strong className="ws-price-summary__title ">
                            {toLetterCase(fee.title)}
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(fee.linePrice)}
                        </span>
                    </div>
                ))}
                {showDiscountsDetails && (
                    <h3 className="ws-price-summary__heading">
                        Rabatter
                    </h3>
                )}
                {showDiscountsDetails && discounts.map((discount, idx) => (
                    <div className="ws-price-summary__line" key={idx}>
                        <strong className="ws-price-summary__title">
                            {discount.description}
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr &minus;{formatPrice(discount.value)}
                        </span>
                    </div>
                ))}
                {!showDiscountsDetails && totalDiscount > 0 && (
                    <div className="ws-price-summary__line">
                        <strong className="ws-price-summary__title">
                            Rabatter
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr &minus;{formatPrice(totalDiscount)}
                        </span>
                    </div>
                )}
                {!isPreSubmit && !isArchived && (
                    <div className="ws-price-summary__line ws-price-summary__line--sum">
                        <strong className="ws-price-summary__title ws-price-summary__title--hi">
                            Reservert beløp
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(order.totals.totalToPay)}
                        </span>
                    </div>
                )}
                {!isPreSubmit && isArchived && (
                    <div className="ws-price-summary__line ws-price-summary__line--sum">
                        <strong className="ws-price-summary__title ws-price-summary__title--hi">
                            Total
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(order.totals.totalDeliveredGrossAmount)}
                        </span>
                    </div>
                )}
                {isPreSubmit && (
                    <div className="ws-price-summary__line ws-price-summary__line--sum">
                        <strong className="ws-price-summary__title">
                            Beløp som reserveres
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            kr {formatPrice(PriceSummaryHelper.getReservationAmount(order, null, true))}
                        </span>
                    </div>
                )}
                {order.vatSummary && order.vatSummary.length && (
                    <p className="ws-price-summary__line ws-price-summary__line--vat">
                        Inkludert moms på kr {formatPrice(order.vatSummary.map(i => i.vatValueRate).reduce((sum, i) => sum + i))}
                    </p>
                )}
            </div>
        )
    }
}

