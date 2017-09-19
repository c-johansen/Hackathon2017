import React, { Component } from "react"
import Icon, { IconType } from "./Icon"
import uuid from "uuid"

// Components
import Button from "../shared/Button"

export default class Panel extends Component {
    static defaultProps = {
        title: "",
        simple: false,
        style: null,
    }
    id = "panel" + uuid.v4()
    state = {
        open: false
    }
    render() {
        return (
            <div className={"ws-panel " + (this.props.simple ? "ws-panel--simple" : "")} style={this.props.style}>
                <h2>
                    <Button
                        aria-expanded={this.state.open}
                        aria-controls={this.id}
                        className={"ws-panel__title " + (this.state.open ? "ws-panel__title--open" : "")}
                        onClick={() => this.setState({ open: !this.state.open })}>
                        <Icon type={IconType.ChevronRight} />
                        {this.props.title}
                    </Button>
                </h2>
                <div
                    aria-hidden={!this.state.open}
                    id={this.id}
                    className={"ws-panel__content " + (this.state.open ? "ws-panel__content--open" : "")}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

