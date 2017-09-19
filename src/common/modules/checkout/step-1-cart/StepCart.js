import React, { Component } from "react"
import { connect } from "react-redux"
import CheckoutStep from "../../../data/const/CheckoutStep"
import ValidatorHelper from "../helpers/ValidatorHelper"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"
import { formatPrice } from "../../../helpers/FormatHelper"
import PriceSummaryHelper from "../../../helpers/PriceSummaryHelper"

// Components
import Step from "../shared/Step"
import CartItems from "../../cart/CartItems"

export class StepCart extends Component {
    render() {
        const { checkoutOrder, id, stepStatus, gotoStep, onCollapseRest } = this.props
        const totalDiscount = PriceSummaryHelper.getTotalDiscount(checkoutOrder)

        return (
            <Step
                id={id}
                stepName={CheckoutStep.Cart}
                stepStatus={stepStatus}
                onCollapseRest={onCollapseRest}
                // Header
                openText="Min handlevogn"
                pendingText="Ingen varer i handlevognen"
                readyText={`${checkoutOrder.totals.totalQuantity} ${checkoutOrder.totals.totalQuantity === 1 ? "vare" : "varer"} i handlevognen`}
                editText="Vis/endre varer"
                // Footer
                nextStep={CheckoutStep.Substitutions}
                prevStep={null}
                nextStepDisabled={!ValidatorHelper.validate(checkoutOrder, { stepName: CheckoutStep.Cart })}
                gotoStep={gotoStep}
            >
                <CartItems
                    order={checkoutOrder}
                    className="ws-cart"
                />
                <div className="ws-price-summary">
                    <div className="ws-price-summary__line">
                        <strong className="ws-price-summary__title">
                            Sum varer
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price">
                            {formatPrice(PriceSummaryHelper.getCalculatorTotalExDiscounts(checkoutOrder))}
                        </span>
                    </div>
                    {totalDiscount > 0 && (
                        <div className="ws-price-summary__line">
                            <strong className="ws-price-summary__title">
                                Rabatter
                            </strong>
                            {" "}
                            <span className="ws-price-summary__price">
                                {formatPrice(totalDiscount)}
                            </span>
                        </div>
                    )}
                    <div className="ws-price-summary__line ws-price-summary__line--sum">
                        <strong className="ws-price-summary__title">
                            Estimert total ({checkoutOrder.totals.totalQuantity} {checkoutOrder.totals.totalQuantity === 1 ? "vare" : "varer"})
                        </strong>
                        {" "}
                        <span className="ws-price-summary__price calculated-price">
                            {formatPrice(PriceSummaryHelper.getCalculatorTotal(checkoutOrder))}
                        </span>
                    </div>
                </div>
            </Step>
        )
    }
}

export default connect(
    store => {
        return {
            checkoutOrder: checkoutOrderSelector(store),
        }
    }
)(StepCart)
