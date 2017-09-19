import { combineReducers } from "redux"
import { CheckoutAction } from "../actions/creators/checkout"
import CheckoutStepStatus from "../../const/CheckoutStepStatus"

const stepStatusInit = {
    cart: CheckoutStepStatus.Done,
    substitutions: CheckoutStepStatus.Doing,
    handoverType: CheckoutStepStatus.Todo,
    handoverTime: CheckoutStepStatus.Todo,
    payment: CheckoutStepStatus.Todo
}

// Step-status

function stepStatus(state = stepStatusInit, action) {
    switch (action.type) {
        case CheckoutAction.UpdateStepStatus:
            return { ...state, ...action.payload }
        case CheckoutAction.ResetStepStatus:
            return { ...stepStatusInit }
        default:
            return state
    }
}

// Handover-options

function handoverOptions(state = { loading: false, data: [], error: null }, action) {
    switch (action.type) {
        case CheckoutAction.HandoverOptionsSuccess:
            return { ...state, data: action.payload, error: null }
        case CheckoutAction.HandoverOptionsLoading:
            return { ...state, loading: true }
        case CheckoutAction.HandoverOptionsLoaded:
            return { ...state, loading: false }
        case CheckoutAction.HandoverOptionsError:
            return { ...state, data: [], error: action.payload }
        case CheckoutAction.HandoverOptionsClear:
            return { loading: false, data: [], error: null }
        default:
            return state
    }
}

// Payment-agreements

function paymentAgreements(state = { loading: false, data: null, error: null }, action) {
    switch (action.type) {
        case CheckoutAction.PaymentAgreementsSuccess:
            return { ...state, data: action.payload, error: null }
        case CheckoutAction.PaymentAgreementsLoading:
            return { ...state, loading: true }
        case CheckoutAction.PaymentAgreementsLoaded:
            return { ...state, loading: false }
        case CheckoutAction.PaymentAgreementsError:
            return { ...state, data: null, error: action.payload }
        case CheckoutAction.PaymentAgreementsClear:
            return { loading: false, data: null, error: null }
        default:
            return state
    }
}

// Handover-options

function tos(state = { loading: false, data: "", error: null }, action) {
    switch (action.type) {
        case CheckoutAction.TosSuccess:
            return { ...state, data: action.payload.value, error: null }
        case CheckoutAction.TosLoading:
            return { ...state, loading: true }
        case CheckoutAction.TosLoaded:
            return { ...state, loading: false }
        case CheckoutAction.TosError:
            return { ...state, data: "", error: action.payload }
        default:
            return state
    }
}

const clientOrderInit = {
    substitutePreference: null,
    substituteComment: null, // "Jeg vil helst ha grønne bananer",
    payWithOneClick: true,
    createNewAgreement: false,
    agreementInternalId: null,
}

function clientOrder(state = clientOrderInit, action) {
    switch (action.type) {
        // Checkout step 2 (substitutions)
        case CheckoutAction.SetSubstitutePreference:
            return { ...state, substitutePreference: action.payload }
        case CheckoutAction.SetSubstituteComment:
            return { ...state, substituteComment: action.payload }
        // Checkout step 5 (payment)
        case CheckoutAction.SetPaymentAgreement:
            return { ...state, agreementInternalId: action.payload }
        case CheckoutAction.Reset:
            return { ...clientOrderInit }
        default:
            return state
    }
}

export default combineReducers({
    clientOrder,
    stepStatus,
    handoverOptions,
    paymentAgreements,
    tos
})
