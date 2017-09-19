export const CheckoutAction = {
    UpdateStepStatus: "checkout:update-step-status",
    ResetStepStatus: "checkout:reset-step-status",
    // Handover-options
    HandoverOptionsSuccess: "checkout:handover-options-success",
    HandoverOptionsError: "checkout:handover-options-error",
    HandoverOptionsLoading: "checkout:handover-options-loading",
    HandoverOptionsLoaded: "checkout:handover-options-loaded",
    HandoverOptionsClear: "checkout:handover-options-clear",
    // Payment-agreements
    PaymentAgreementsSuccess: "checkout:payment-agreements-success",
    PaymentAgreementsError: "checkout:payment-agreements-error",
    PaymentAgreementsLoading: "checkout:payment-agreements-loading",
    PaymentAgreementsLoaded: "checkout:payment-agreements-loaded",
    PaymentAgreementsClear: "checkout:payment-agreements-clear",
    // Terms of Service
    TosSuccess: "checkout:tos-success",
    TosError: "checkout:tos-error",
    TosLoading: "checkout:tos-loading",
    TosLoaded: "checkout:tos-loaded",
    TosClear: "checkout:tos-clear",
    // Checkout-order
    SetSubstitutePreference: "checkout:set-substitute-preference",
    SetSubstituteComment: "checkout:set-substitute-comment",
    SetPaymentAgreement: "checkout:set-payment-agreement",
}

// Step-status

export function updateStepStatus(status) {
    return {
        type: CheckoutAction.UpdateStepStatus,
        payload: status
    }
}

export function resetStepStatus() {
    return {
        type: CheckoutAction.ResetStepStatus
    }
}

// Handover-options

export function handoverOptionsSuccess(data) {
    return {
        type: CheckoutAction.HandoverOptionsSuccess,
        payload: data
    }
}

export function handoverOptionsError(error) {
    return {
        type: CheckoutAction.HandoverOptionsError,
        payload: error
    }
}

export function handoverOptionsLoading() {
    return {
        type: CheckoutAction.HandoverOptionsLoading
    }
}

export function handoverOptionsLoaded() {
    return {
        type: CheckoutAction.HandoverOptionsLoaded
    }
}

export function handoverOptionsClear() {
    return {
        type: CheckoutAction.HandoverOptionsClear
    }
}

// Payment-agreements

export function paymentAgreementsSuccess(data) {
    return {
        type: CheckoutAction.PaymentAgreementsSuccess,
        payload: data
    }
}

export function paymentAgreementsError(error) {
    return {
        type: CheckoutAction.PaymentAgreementsError,
        payload: error
    }
}

export function paymentAgreementsLoading() {
    return {
        type: CheckoutAction.PaymentAgreementsLoading
    }
}

export function paymentAgreementsLoaded() {
    return {
        type: CheckoutAction.PaymentAgreementsLoaded
    }
}

export function paymentAgreementsClear() {
    return {
        type: CheckoutAction.PaymentAgreementsClear
    }
}

// ToS

export function tosSuccess(data) {
    return {
        type: CheckoutAction.TosSuccess,
        payload: data
    }
}

export function tosError(error) {
    return {
        type: CheckoutAction.TosError,
        payload: error
    }
}

export function tosLoading() {
    return {
        type: CheckoutAction.TosLoading
    }
}

export function tosLoaded() {
    return {
        type: CheckoutAction.TosLoaded
    }
}

// Checkout-order

export function setSubstitutePreference(preference) {
    return {
        type: CheckoutAction.SetSubstitutePreference,
        payload: preference
    }
}

export function setSubstituteComment(comment) {
    return {
        type: CheckoutAction.SetSubstituteComment,
        payload: comment
    }
}

export function setPaymentAgreement(internalId) {
    return {
        type: CheckoutAction.SetPaymentAgreement,
        payload: internalId
    }
}
