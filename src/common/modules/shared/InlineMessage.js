import React, { Component } from "react"
import Urls from "../../data/const/Urls"
import Icon, { IconType } from "../shared/Icon"
import ExternalLink from "../shared/ExternalLink"

export const MessageType = {
    Info: "info",
    Warning: "warning",
    Error: "error",
}

export default class InlineMessage extends Component {
    static defaultProps = {
        message: "Det har skjedd en feil. Vennligst prøv igjen senere.",
        error: {},
        show: false,
        type: MessageType.Error,
        style: null,            // Inline CSS overrides
        showProfileLink: false  // Render link to edit profile on web
    }
    state = {
        showDebugInfo: false
    }
    start = null
    render() {
        const { error, show, type, style, showProfileLink } = this.props

        if (!show) return false

        let { message } = this.props
        if (message === "Failed to fetch") {
            // App is offline. Fall back to default message
            message = InlineMessage.defaultProps.message
        }
        const messageIsArray = Array.isArray(message)

        return (
            <div
                className={`ws-inline-message ws-inline-message--${type}`}
                style={style}
                onDoubleClick={this.handleDoubleClick.bind(this)}
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
                onTouchCancel={this.handleTouchEnd.bind(this)}
            >
                <Icon type={IconType.Attention} circle />
                <div className="ws-inline-message__body">
                    {message && !messageIsArray && (
                        <p>
                            {message}
                        </p>
                    )}
                    {message && messageIsArray && message.map((m, i) => (
                        m && (
                            <p key={i}>
                                {m}
                            </p>
                        )
                    ))}
                    {showProfileLink && (
                        <p>
                            <ExternalLink root={Urls.MenyWeb} to="/min-side">
                                Oppdater profilen din på meny.no
                            </ExternalLink>
                        </p>
                    )}
                    {this.state.showDebugInfo && (
                        <p>
                            {JSON.stringify(error)}
                        </p>
                    )}
                </div>
            </div>
        )
    }
    handleReloadClick() {
        window.location.reload()
    }
    handleTouchStart() {
        this.start = new Date()
    }
    handleTouchEnd() {
        const duration = new Date() - this.start

        if (duration > 2500) {
            this.setState({ showDebugInfo: !this.state.showDebugInfo })
        }
    }
    handleDoubleClick() {
        this.setState({ showDebugInfo: !this.state.showDebugInfo })
    }
}
