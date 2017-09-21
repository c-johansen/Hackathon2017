import React, { Component } from "react"
import Button from "../common/modules/shared/Button"
import Image from "../common/modules/shared/Image"
import HorizontalScroller from "../common/modules/shared/HorizontalScroller"
import FormatHelper from "../common/helpers/FormatHelper"
import Icon, { IconType } from "../common/modules/shared/Icon"
import css from "classnames"

export default class Voucher extends Component {
    render() {

        return (
            <div className={"spar-multiple-product "}>
                <div className="spar-multiple-product__header">
                    <strong>Pizzabakeriet/Grandiosa/Big One</strong>
                    Et stort utvalg 410-1000g
                    <span className="spar-multiple-product__header__price">&minus;30%</span>
                </div>
                <HorizontalScroller small>
                    <div>
                        <img src="/images/grandis1.png" />
                        <Icon type={IconType.ThumbsUp} />
                    </div>
                    <div>
                        <img src="/images/grandis2.png" />
                        <Icon type={IconType.ThumbsUp} />
                    </div>
                    <div>
                        <img src="/images/grandis3.png" />
                        <Icon type={IconType.ThumbsUp} />
                    </div>
                </HorizontalScroller>

                <div className="spar-link">Se alle <Icon type={IconType.ChevronRight} /></div>
            </div>
        )
    }
}
