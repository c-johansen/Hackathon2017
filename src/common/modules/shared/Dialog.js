import React from "react"
import Button from "./Button"
import Portal from "react-portal"

export default class Dialog extends React.Component {
    static defaultProps = {
        isOpen: false,
        question: "",
        close: () => { },
        confirm: null,
        cancel: () => { },
        cancelText: "Avbryt",
        closeText: "Lukk",
    }
    confirm() {
        this.props.confirm()
        this.props.close()
    }
    cancel() {
        this.props.cancel()
        this.props.close()
    }
    render() {
        return (
            <Portal isOpened={this.props.isOpen}>
                <div className="ws-dialog" role="dialog" aria-live="assertive" onClick={this.props.close}>
                    <div className="ws-dialog__message">
                        <p className="ws-dialog__message__question">{this.props.question}</p>
                        <div className="ws-dialog__message__buttons">
                            {this.props.confirm && (
                                <div className="ws-dialog__message__buttons__button ws-dialog__message__buttons__button--main">
                                    <Button onClick={this.confirm.bind(this)}>
                                        {this.props.children}
                                    </Button>
                                </div>
                            )}
                            <div className="ws-dialog__message__buttons__button">
                                <Button onClick={this.cancel.bind(this)}>
                                    {this.props.confirm ? this.props.cancelText : this.props.closeText}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        )
    }
}

