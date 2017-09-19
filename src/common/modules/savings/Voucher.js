import React, { Component } from "react"
import Image from "../shared/Image"
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"
import Only from "../shared/Only"
import moment from "moment"
import VoucherStatus from "../../data/const/VoucherStatus"
import VoucherType from "../../data/const/VoucherType"
import css from "classnames"

const LONG_TITLE_LENGTH = 16

export default class Voucher extends Component {
    getVoucherType() {
        let voucher = this.props.voucher
        let type = voucher.rabattType

        switch (type) {
            case VoucherType.NormalPrice:
                return <div><strong>{voucher.rabattSats} kr</strong> fastpris</div>
            case VoucherType.DiscountPercentage:
                return <div><strong>&minus;{voucher.rabattSats}%</strong> på dagens hyllepris</div>
            case VoucherType.TrumfPointsPercentage:
                return <div><strong>{voucher.rabattSats}%</strong> i ekstra Trumf-poeng</div>
            case VoucherType.DiscountAmount:
                return <div><strong>&minus;{voucher.rabattSats} kr</strong> på dagen hyllepris</div>
            case VoucherType.TakeFourPayForThree:
                return <div><strong>4 for 3</strong></div>
            case VoucherType.TakeThreePayForTwo:
                return <div><strong>3 for 2</strong></div>
        }
    }
    render() {
        let { voucher, activate } = this.props

        return (
            <div className={"voucher " + (voucher.status === VoucherStatus.Used ? "voucher--used" : "")}>
                <div className="voucher__info">
                    <h2 className={css("voucher__info__title", {
                        "voucher__info__title--active": voucher.status === VoucherStatus.Active,
                        "voucher__info__title--used": voucher.status === VoucherStatus.Used,
                        "voucher__info__title--long": voucher.tittel.length >= LONG_TITLE_LENGTH })}>
                        {voucher.tittel}
                    </h2>
                    <p className="voucher__info__subtitle">{voucher.undertittel}</p>
                </div>
                <div className="voucher__image">
                    <Image imageName={voucher.bildeId} width={250} height={250} />
                </div>
                <p className="voucher__description">{voucher.kampanjeTekst}</p>
                <p className="voucher__valid-to"><strong>Gyldig t.o.m. {moment(voucher.gyldigTil).format("DD.MM.YYYY")}</strong></p>
                <div className={css("voucher__footer", {
                    "voucher__footer--active": voucher.status === VoucherStatus.Active,
                    "voucher__footer--used": voucher.status === VoucherStatus.Used })}>
                    <div className="relative">
                        <div className="voucher__rebate">
                            {this.getVoucherType()}
                        </div>
                        <div className={css("voucher__status", { "voucher__status--active": voucher.status === VoucherStatus.Active, "voucher__status--used": voucher.status === VoucherStatus.Used  })}>
                            <Only if={voucher.loading}>
                                Aktiverer...
                            </Only>
                            <Only if={!voucher.loading}>
                                <Only if={voucher.status === VoucherStatus.Inactive}>
                                    <Button
                                        className="ws-button ws-button--white"
                                        onClick={activate.bind(null, voucher.strekkode)}>
                                        Aktiver nå
                                    </Button>
                                </Only>
                                <Only if={voucher.status === VoucherStatus.Active}>
                                    <div><Icon type={IconType.Checkmark} /> Aktivert</div>
                                </Only>
                                <Only if={voucher.status === VoucherStatus.Used}>
                                    <div>Brukt</div>
                                </Only>
                            </Only>
                        </div>
                    </div>

                    <Only if={voucher.status === VoucherStatus.Active}>
                        <p className="voucher__footer__info">Kupongen er klar til bruk. Rabatten trekkes automatisk når du drar ditt Trumf-registrerte kort.</p>
                    </Only>
                </div>
            </div>
        )
    }
}
