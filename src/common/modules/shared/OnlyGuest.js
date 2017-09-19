import React, { PureComponent } from "react"
import { connect } from "react-redux"

export class OnlyGuest extends PureComponent {
    render() {
        const renderContent = !this.props.userToken
            || (this.props.includeSimplified && this.props.userToken.indexOf("Simplified") === 0)

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
)(OnlyGuest)
