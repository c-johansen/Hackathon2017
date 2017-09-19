import React from "react"
import OnlyGuest from "../shared/OnlyGuest"
import LoginButton from "../auth/LoginButton"

export default class AuthEncourager extends React.Component {
    render() {
        return (
            <OnlyGuest>
                <fieldset className="ws-auth-encourager">
                    <legend className="ws-auth-encourager__title">For å få den beste handleopplevelsen</legend>
                    <LoginButton className="ws-button ws-button--wide ws-button--white">Logg inn med Trumf</LoginButton>
                </fieldset>
            </OnlyGuest>
        )
    }
}
