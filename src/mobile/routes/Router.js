import React from "react"
import { MemoryRouter } from "react-router"
import { connect } from "react-redux"
import { clear } from "../../common/data/store/actions/productSuggestions"

class RouterWrapper extends React.Component {
    componentWillReceiveProps() {
        this.props.clearProductSuggestions()
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export class Router extends React.Component {
    render() {
        return (
            <MemoryRouter>
                <RouterWrapper {...this.props}>
                    {this.props.children}
                </RouterWrapper>
            </MemoryRouter>
        )
    }
}

export default connect(
    null,
    dispatcher => {
        return {
            clearProductSuggestions: () => dispatcher(clear())
        }
    }
)(Router)
