import React, { PureComponent } from "react"
import { withRouter } from "react-router"
import css from "classnames"

export class TabNav extends PureComponent {
    render() {
        let { children, history} = this.props
        children = Array.isArray(children) ? children : [children]

        return (
            <nav className="tab-nav">
                <ul className="tab-nav__wrapper">
                    {children.map(i => <li key={i.props.to} className="tab-nav__item">{React.cloneElement(i, { className: css("tab-nav__link ", { "tab-nav__link--active": i.props.to === history.location.pathname }) })}</li>)}
                </ul>
            </nav>
        )
    }
}

export default withRouter(TabNav)
