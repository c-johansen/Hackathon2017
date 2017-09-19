import React from "react"
import Portal from "react-portal"

export default class LoaderDialog extends React.Component {
    static defaultProps = {
        message: "Laster...",
        isOpen: false,
    }
    render() {
        return (
            <Portal isOpened={this.props.isOpen}>
                <div className="ws-dialog" role="dialog" aria-live="assertive">
                    <div className="ws-dialog__message">
                        <p className="ws-dialog__message__question">
                            {this.props.message}
                        </p>
                        <div className="ws-loader" />
                    </div>
                </div>
            </Portal>
        )
    }
}

