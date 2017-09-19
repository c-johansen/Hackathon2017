import React, { Component } from "react"

export default class Button extends Component {
    static defaultProps = {
        preventDefault: false,
        stopPropagation: true,
        type: "button",
        className: "",
        style: null,
        onClick: () => { },
        "aria-controls": null,
        disabled: false,
    }
    onClick(e) {
        if (this.props.stopPropagation) {
            e.stopPropagation()
        }

        if (this.props.preventDefault) {
            e.preventDefault()
        }

        if (!this.props.disabled) {
            this.props.onClick(e)
        }
    }
    render() {
        return (
            <button
                className={this.props.className}
                style={this.props.style}
                type={this.props.type}
                aria-controls={this.props["aria-controls"]}
                onClick={this.onClick.bind(this)}
                disabled={this.props.disabled}
            >
                {this.props.children}
            </button>
        )
    }
}

