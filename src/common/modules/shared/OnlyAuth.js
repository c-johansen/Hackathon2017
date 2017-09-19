import React, { PureComponent } from "react"
import { connect } from "react-redux"

export class OnlyAuth extends PureComponent {
    render() {
        const renderContent = this.props.userToken
            && (!this.props.excludeSimplified || this.props.userToken.indexOf("Bearer") === 0)

        if (renderContent && this.props.noWrap) {
            return this.props.children
        }

        return (
            renderContent ? <div className={this.props.className}>{this.props.children}</div> : null
        )
    }
}

export default connect(
    store => {
        return {
            userToken: store.user.userToken
        }
    }
)(OnlyAuth)
