import React, { PureComponent } from "react"

export default class Cloak extends PureComponent {
    render() {
        return (
            this.props.loading ? <div className="spinner"></div> : this.props.children
        )
    }
}
