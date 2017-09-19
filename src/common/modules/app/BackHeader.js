import React from "react"
import Icon, { IconType } from "../shared/Icon"
import Button from "../shared/Button"
import CartButton from "../cart/CartButton"
import { RedHeader } from "./Header"
import { withRouter } from "react-router-dom"

export class BackHeader extends React.PureComponent {
    static defaultProps = {
        backTitle: "Tilbake",
        hasCartButton: true
    }
    goBack(e) {
        e.preventDefault()

        if (this.props.goBack) {
            this.props.goBack()
        } else {
            try {
                this.props.history.goBack()
            } catch (e) {
                this.props.history.push(this.props.fallbackRoute)
            }
        }
    }

    render() {
        return (
            <RedHeader>
                <div className="back-header">
                    <Button
                        className="back-header__back-button"
                        onClick={this.goBack.bind(this)}>
                        <Icon type={IconType.ChevronLeft} />
                        <span className="ws-visually-hidden">{this.props.backTitle}</span>
                    </Button>
                    <div className="back-header__cart-button">
                        {this.props.hasCartButton ? <CartButton /> : null}
                    </div>
                    <span className="back-header__title" role="presentational" > {this.props.title}</span>
                </div>
            </RedHeader>
        )
    }
}

export default withRouter(BackHeader)
