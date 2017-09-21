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
            <div className={"spar-multiple-product "}>
                <div className="spar-multiple-product__header">
                    <strong>Pizzabakeriet/Grandiosa/Big One</strong>
                    Et stort utvalg 410-1000g
                    <span className="spar-multiple-product__price">&minus;30%</span>
                </div>
            </div>
        )
    }
}
