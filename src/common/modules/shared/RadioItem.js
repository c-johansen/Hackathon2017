import React, { Component } from "react"
import classNames from "classnames"

export default class RadioItem extends Component {
    static defaultProps = {
        className: null,
        checked: false,
        disabled: false,
        id: null,
        role: null,
        ariaControls: null,
        ariaLabelledby: null,
        name: null,
        value: "",
        children: null,
        onClick: () => { },
        onChange: () => { },
    }
    render() {
        const { className, checked, disabled, id, role, ariaControls, ariaLabelledby, name, value, children } = this.props

        const elementClassNames = classNames(
            "ws-radio",
            "ws-radio--hidelabel",
            {
                "ws-radio--checked": checked
            }
        )

        return (
            <label
                className={className}
                aria-selected={checked}
                aria-disabled={disabled}
                id={id}
                role={role}
                aria-controls={ariaControls}
                aria-labelledby={ariaLabelledby}
                onClick={this.onLabelClicked.bind(this)}
            >
                <span className={elementClassNames}>
                    <input
                        type="radio"
                        tabIndex="0"
                        name={name}
                        value={value}
                        checked={checked}
                        disabled={disabled}
                        onChange={this.onRadioChanged.bind(this)}
                    />
                    <span className="ws-radio__label"></span>
                </span>
                <span className="ws-label">
                    {children}
                </span>
            </label>
        )
    }
    onRadioChanged(event) {
        event.stopPropagation()
        event.preventDefault()
    }
    onLabelClicked(event) {
        event.stopPropagation()
        event.preventDefault()

        this.props.onClick()

        if (!this.props.disabled && !this.props.checked) {
            this.props.onChange()
        }
    }
}
