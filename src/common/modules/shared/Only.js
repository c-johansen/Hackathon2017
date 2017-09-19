import React, { PureComponent } from "react"
import css from "classnames"

export default class Only extends PureComponent {
    static defaultProps = {
        wrapper: "div"
    }
    render() {
        let Wrapper = this.props.wrapper

        return (
            this.props.if ? <Wrapper className={css(this.props.className)}>{this.props.children}</Wrapper> : null
        )
    }
}
