import React, { Component } from "react"
import Button from "../common/modules/shared/Button"
import Icon, { IconType } from "../common/modules/shared/Icon"
import VoucherType from "../common/data/const/VoucherType"
import css from "classnames"

export default class Voucher extends Component {
    getVoucherType() {
        let discount  = this.props.discount

        switch (this.props.type) {
            case VoucherType.NormalPrice:
                return <div><strong>{discount} kr</strong> fastpris</div>
            case VoucherType.DiscountPercentage:
                return <div><strong>&minus;{discount}%</strong> på dagens hyllepris</div>
            case VoucherType.TrumfPointsPercentage:
                return <div><strong>{discount}%</strong> i ekstra Trumf-poeng</div>
            case VoucherType.DiscountAmount:
                return <div><strong>&minus;{discount} kr</strong> på dagen hyllepris</div>
            case VoucherType.TakeFourPayForThree:
                return <div><strong>4 for 3</strong></div>
            case VoucherType.TakeThreePayForTwo:
                return <div><strong>3 for 2</strong></div>
        }
    }
    render() {
        let { image, title, subtitle, description , type, active } = this.props

        return (
            <div className={"voucher "}>
                <div className="voucher__info">
                    <h2 className={css("voucher__info__title", {
                        "voucher__info__title--active": active,
                        "voucher__info__title--used": false,
                        "voucher__info__title--long": false })}>
                        {title}
                    </h2>
                    <p className="voucher__info__subtitle">{subtitle}</p>
                </div>
                <div className="voucher__image">
                    <img src={image} />
                </div>
                <p className="voucher__description">{description}</p>
                <p className="voucher__valid-to"><strong>Gyldig t.o.m. 13.10.17</strong></p>
                <div className={css("voucher__footer", {
                    "voucher__footer--active": active,
                    "voucher__footer--used": false })}>
                    <div className="relative">
                        <div className="voucher__rebate">
                            {this.getVoucherType()}
                        </div>
                        <div className={css("voucher__status", { "voucher__status--active": active  })}>
                            <Button className="button button--white">
                                Aktiver nå
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
