import React, { Component } from "react"
import { withRouter } from "react-router"

export class Link extends Component {
    onClick(e) {
        let { onClick, history, location, to, state } = this.props

        if (location.pathname !== to) {
            e.preventDefault()
            e.stopPropagation()
            history.push({ pathname: to, state })
        }

        if (onClick) {
            onClick()
        }
    }
    render() {
        return (
            <span
                className={"link " + this.props.className}
                role="link"
                aria-current={this.props.location.pathname === this.props.to ? true : false}
                onClick={this.onClick.bind(this)}>
                {this.props.children}
            </span>
        )
    }
}

export default withRouter(Link)
