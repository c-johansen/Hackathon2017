import React, { Component } from "react"
import Icon, { IconType } from "../shared/Icon"
import Collapse from "react-collapse"
import classNames from "classnames"

// Components
import Button from "../shared/Button"

export default class HandoverLocationGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: props.defaultExpanded
        }
    }

    render() {
        const { title, children } = this.props
        const { expanded } = this.state

        const elementClassNames = classNames(
            "ws-expander-box",
            {
                "ws-expander-box--expanded": expanded
            }
        )

        return (
            <div
                className={elementClassNames}
                aria-expanded={expanded}
            >
                <h4 className="ws-expander-box__title">
                    <Button
                        className="ws-expander-box__toggler"
                        onClick={this.toggleExpanded.bind(this)}
                    >
                        {title}
                        <Icon type={IconType.ChevronDown} />
                    </Button>
                </h4>
                <Collapse
                    className="ws-expander-box__content"
                    isOpened={expanded}
                    springConfig={{ stiffness: 230, damping: 26 }}
                >
                    {children}
                </Collapse>
            </div>
        )
    }

    toggleExpanded() {
        this.setState({
            expanded: !this.state.expanded
        })
    }
}
