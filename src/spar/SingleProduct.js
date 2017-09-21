import React, { Component } from "react"
import Button from "../common/modules/shared/Button"
import Image from "../common/modules/shared/Image"
import FormatHelper from "../common/helpers/FormatHelper"
import Icon, { IconType } from "../common/modules/shared/Icon"
import css from "classnames"

export default class Voucher extends Component {
    render() {
        let { product } = this.props
        let price = FormatHelper.formatPrice(product.pricePerUnit).split(",")

        return (
            <div className={"spar-single-product "}>
                <div className="spar-single-product__image"><Image simple={true} imageName={product.imageName} width={400} height={400} /></div>
                <span className="spar-single-product__price">
                    <span>{price[0]}<span className="des">{price[1]}</span></span>
                </span>
                <span className="spar-single-product__title">{product.title}</span>
                <span className="spar-single-product__subtitle">{product.subtitle}</span>
            </div>
        )
    }
}
