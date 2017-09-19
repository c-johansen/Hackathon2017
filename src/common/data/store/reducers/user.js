import { UserAction } from "../actions/creators/user"

const init = {
    loading: false,
    error: null,
    userToken: null,
    welcomeScreenVisible: false,
    data: {
        currentMember: {},
        household: {},
        store: {    // Fallback-store = "0" for unauthorized users
            gln: "0",
            pickupGln: "0",
        },
        handoverInfo: {
            handoverType: "BUTIKK",
        }
    }
}

export default function (state = init, action) {
    switch (action.type) {
        case UserAction.SetToken:
            return { ...state, userToken: action.payload }
        case UserAction.ShowWelcomeScreen:
            return { ...state, welcomeScreenVisible: true }
        case UserAction.HideWelcomeScreen:
            return { ...state, welcomeScreenVisible: false }
        case UserAction.ClearError:
            return { ...state, error: null }
        case UserAction.Loaded:
            return { ...state, loading: false }
        case UserAction.Loading:
            return { ...state, loading: true }
        case UserAction.Error:
            return { ...state, error: action.payload }
        case UserAction.LogOut:
            return { ...init }
        case UserAction.ExtendedUserLoading:
            return { ...state, loading: true }
        case UserAction.ExtendedUserSuccess:
            return { ...state, data: { ...action.payload }, error: null }
        case UserAction.ExtendedUserLoaded:
            return { ...state, loading: false }
        case UserAction.ExtendedUserError:
            return { ...state, data: init.data, loading: false, error: action.message }
        case UserAction.ExtendedUserUpdateSuccess:
            return { ...state, data: { ...state.data, ...action.payload }, error: null }
        case UserAction.ExtendedUserUpdateError:
            return { ...state, error: action.message }
        default:
            return state
    }
}
