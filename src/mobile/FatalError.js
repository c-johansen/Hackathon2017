import React, { Component } from "react"
import Portal from "react-portal"
import Only from "../common/modules/shared/Only"
import Button from "../common/modules/shared/Button"

export default class FatalError extends Component {
    state = {
        extended: false
    }
    render() {
        let { error, componentInfo } = this.props

        return (
            <Portal isOpened={true}>
                <div className="global-error" aria-live="assertive">
                    <Only if={!this.state.extended} className="ws-poster">
                        <h1 className="global-error__title">Beklager, men noe gikk galt</h1>

                        <p className="global-error__text">Vil du prøve å laste appen på nytt?</p>

                        <a href={window.location.href} className="ws-button ws-button--red">Last på nytt</a>
                    </Only>

                    <Only if={this.state.extended} className="global-error__deets">
                        <pre>{error.stack}</pre>

                        <pre>
                            {JSON.stringify(componentInfo, null, 4)}
                        </pre>
                    </Only>

                    <Button className="global-error__sub-button" onClick={() => this.setState({ extended: !this.state.extended })}>Detaljer</Button>
                </div>
            </Portal>
        )
    }
}
