import React, { PureComponent } from "react"
import isEqual from "lodash.isequal"

class HorizontalScrollerElement extends PureComponent {
    shouldComponentUpdate(props) {
        return !isEqual(props, this.props)
    }
    render() {
        return (
            <div className={"horizontal-scroller__element " + (this.props.small ? "horizontal-scroller__element--small" : "")}>
                {this.props.children}
            </div>
        )
    }
}

export default class HorizontalScroller extends PureComponent {
    render() {
        let elements = React.Children.map(
            this.props.children,
            (i, index) => <HorizontalScrollerElement small={this.props.small} key={index}>{React.cloneElement(i)}</HorizontalScrollerElement>
        )

        return (
            <div className="horizontal-scroller" onScroll={e => e.stopPropagation()}>
                {this.props.children && this.props.children.length && elements}
            </div>
        )
    }
}
