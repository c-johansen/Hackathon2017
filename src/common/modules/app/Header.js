import React from "react"

export class GrayHeader extends React.PureComponent {
    render() {
        let {  children } = this.props

        return (
            <div className="header header--gray" role="complementary">
                <div className="header__inner">
                    {children}
                </div>
            </div>
        )
    }
}

export class RedHeader extends React.PureComponent {
    render() {
        let {  children } = this.props

        return (
            <div className="header header--red" role="complementary">
                <div className="header__inner">
                    {children}
                </div>
            </div>
        )
    }
}
