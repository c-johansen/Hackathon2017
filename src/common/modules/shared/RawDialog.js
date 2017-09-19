import React from "react"
import Portal from "react-portal"

export default class RawDialog extends React.Component {
    static defaultProps = {
        isOpen: false,
        close: () => { }
    }
    render() {
        if (!this.props.isOpen) {
            return null
        }

        return (
            <Portal isOpened={this.props.isOpen}>
                <div className="ws-dialog" role="dialog" aria-live="assertive" onClick={this.props.close}>
                    <div className="ws-dialog__message">
                        {this.props.children}
                    </div>
                </div>
            </Portal>
        )
    }
}

