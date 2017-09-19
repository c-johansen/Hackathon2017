import React from "react"
import { RedHeader, GrayHeader } from "./Header"
import Icon, { IconType } from "../shared/Icon"
import Button from "../shared/Button"

export default class TitleHeader extends React.PureComponent {
    render() {
        let { title, children} = this.props
        let Header = this.props.gray ? GrayHeader : RedHeader

        return (
            <Header>
                <div className="title-header">
                    <div className="title-header__title" role="presentational">{title}</div>
                    <div className="title-header__buttons">
                        {React.Children.map(children, (i, index) => i ? React.cloneElement(i, { key: index, className: "header-button header-button--filled" }) : null)}
                        {this.props.onClose ? <Button className="header-button" onClick={this.props.onClose}><Icon type={IconType.X} /></Button> : null}
                    </div>
                </div>
            </Header>
        )
    }
}
