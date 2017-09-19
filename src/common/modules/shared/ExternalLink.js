import React, { Component } from "react"
import EventBridge from "../../data/EventBridge"
import NativeEvent from "../../data/events/NativeEvent"
import Icon, { IconType } from "./Icon"

export default class ExternalLink extends Component {
    static defaultProps = {
        root: null,
        className: ""
    }
    onClick(e) {
        EventBridge.broadcastNative(NativeEvent.ExternalLink, { url: this.props.root + this.props.to })

        if (this.props.onClick) {
            this.props.onClick(e)
        }
    }
    render() {
        return (
            <span
                role="link"
                className={"external-link " + this.props.className}
                onClick={this.onClick.bind(this)}>
                {this.props.children}
                <Icon type={IconType.ExternalArrow} />
                <span className="ws-visually-hidden">(åpnes eksternt)</span>
            </span>
        )
    }
}
