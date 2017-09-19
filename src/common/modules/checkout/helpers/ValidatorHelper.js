import CheckoutStep from "../../../data/const/CheckoutStep"
import CheckoutStepStatus from "../../../data/const/CheckoutStepStatus"

export default class ValidatorHelper {
    static validate(order, options) {
        options = options || {}

        const stepValidators = [
            {
                stepName: CheckoutStep.Cart,
                isValid: () => {
                    return order.cart
                        && order.cart.length
                        && order.totals.totalToPay
                }
            },
            {
                stepName: CheckoutStep.Substitutions,
                isValid: () => {
                    return order.substitutePreference
                }
            },
            {
                stepName: CheckoutStep.HandoverType,
                isValid: () => {
                    return order.handoverInfo.handoverType
                        && order.store
                }
            },
            {
                stepName: CheckoutStep.HandoverTime,
                isValid: () => {
                    return order.handoverInfo.from
                        && order.handoverInfo.to
                        && order.handoverInfo.storeWindowId
                }
            },
            {
                stepName: CheckoutStep.Payment,
                isValid: () => {
                    // Validate EVERYTHING (todo: make dry-er)
                    return order.agreementInternalId
                        // Handover-time
                        && order.handoverInfo.from
                        && order.handoverInfo.to
                        && order.handoverInfo.storeWindowId
                        // Handover-type
                        && order.handoverInfo.handoverType
                        && order.store
                        // Substitutions
                        && order.substitutePreference
                        // Cart
                        && order.cart
                        && order.cart.length
                        && order.totals.totalToPay
                }
            }
        ]

        // Validate given step only
        if (options.stepName) {
            return stepValidators.find((v) => v.stepName === options.stepName).isValid()
        }

        // Validate all steps
        let newStepStatus = {}
        let firstPendingFound = false
        stepValidators.forEach((validator) => {
            if (firstPendingFound) {
                // Set all following steps to "todo"
                newStepStatus[validator.stepName] = CheckoutStepStatus.Todo
            } else {
                newStepStatus[validator.stepName] = validator.isValid() ? CheckoutStepStatus.Done : CheckoutStepStatus.Todo
                if (newStepStatus[validator.stepName] === CheckoutStepStatus.Todo) {
                    firstPendingFound = true
                }
            }
        })

        return newStepStatus
    }
}
