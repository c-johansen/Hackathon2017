import React, { Component } from "react"
import Icon, { IconType } from "../shared/Icon"
import { RedHeader } from "../app/Header"
import CartButton from "../cart/CartButton"

export default class HomeHeader extends Component {
    render() {
        return (
            <RedHeader>
                <div className="title-header title-header--logo-only">
                    <div className="title-header__logo">
                        <Icon type={IconType.MenyLogoWhite} />
                    </div>
                    <div className="title-header__buttons">
                        <CartButton />
                    </div>
                </div>
            </RedHeader>
        )
    }
}
