import React, { Component } from "react"
import Icon, { IconType } from "./Icon"
import { Link, withRouter } from "react-router-dom"

export class ButtonTitle extends Component {
    static defaultProps = {
        buttonText: "Mer"
    }
    render() {
        return (
            <div className="button-title">
                <h2 className="button-title__title">{this.props.title}</h2>
                {this.props.url && (
                    <Link to={this.props.url} className="button-title__button">
                        {this.props.buttonText}
                        <Icon type={IconType.ChevronRight} />
                    </Link>
                )}
            </div>
        )
    }
}

export default withRouter(ButtonTitle)
