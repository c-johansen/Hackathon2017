import React, { Component } from "react"
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { hideCartPopup } from "../../data/store/actions/app"

export class EmptyCartPoster extends Component {
    onClick() {
        this.props.hideCartPopup()

        if (this.props.location.pathname !== "/search") {
            setTimeout(() => this.props.history.push("/search"), 350)
        }
    }
    render() {
        return (
            <div className="empty-cart-poster">
                <div className="generic-poster">
                    <div className="generic-poster__icon">
                        <Icon type={IconType.Cart} />
                    </div>
                    <h2 className="generic-poster__title">Handlevognen din er tom</h2>
                    <p className="generic-poster__subtitle">Men det trenger den ikke være</p>
                    <Button onClick={this.onClick.bind(this)} className="ws-button ws-button--red" to="/search">Legg til varer</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            hideCartPopup: () => dispatch(hideCartPopup())
        }
    }
)(withRouter(EmptyCartPoster))
