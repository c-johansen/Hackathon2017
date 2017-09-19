import React, { Component } from "react"

// Components
import HandoverLocationItemAddress from "./HandoverLocationItemAddress"
import HandoverLocationItemStore from "./HandoverLocationItemStore"

export default class HandoverLocationItem extends Component {
    render() {
        const { location } = this.props

        if (location.address) {
            return <HandoverLocationItemAddress {...this.props} disabled={!location.store} />
        } else if (location.store) {
            return <HandoverLocationItemStore {...this.props} />
        }

        return false
    }
}
