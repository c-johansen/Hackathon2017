import React, { Component } from "react"
import Link from "./Link"

export default class InstantLink extends Component {
    render() {
        return (
            <Link to={this.props.to} state={{isImmediate: true}} className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </Link>
        )
    }
}
