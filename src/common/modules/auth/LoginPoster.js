import React, { Component } from "react"
import LoginButton from "./LoginButton"
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"

export default class LoginPoster extends Component {
    render() {
        return (
            <div className="login-poster">
                <div className="ws-poster">
                    <p className="ws-poster__message">{this.props.text}</p>

                    <LoginButton className="ws-button ws-button--red ws-button--wide" onClick={this.attemptNativeLogin}>Logg inn med Trumf</LoginButton>

                    <p className="ws-poster__message">Er du ikke medlem i Trumf?</p>
                    <Button className="ws-button ws-button--white ws-button--wide">Bli Trumf medlem her <Icon type={IconType.ChevronRight} /></Button>
                </div>
            </div>
        )
    }
}
