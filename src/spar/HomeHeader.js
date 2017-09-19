import React, { Component } from "react"
import Icon, { IconType } from "../common/modules/shared/Icon"
import { RedHeader } from "../common/modules/app/Header"

export default class HomeHeader extends Component {
    render() {
        return (
            <RedHeader>
                <div className="back-header  ">
                    <div className="back-header__title" style={{ textAlign: "center"}}>
                        Hjem
                    </div>
                </div>
            </RedHeader>
        )
    }
}
