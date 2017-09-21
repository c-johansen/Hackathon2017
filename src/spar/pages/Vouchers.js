import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import Voucher from "../Voucher"
import { App } from "../../common/modules/app/markup"
import VoucherType from "../../common/data/const/VoucherType"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Kuponger"/>
                </App.Header>
                <App.Main>
                    <div className="container">

                        <Voucher title="Dusjsåpe" discount="30" subtitle="LANO, 250 ML" image="/images/lano.png" type={VoucherType.DiscountPercentage} />
                        <Voucher title="MELLOMBAR" discount="40" subtitle="HAVRE/KOKOS, 138 G, ELDORADO" image="/images/mellom.png" type={VoucherType.NormalPrice} />
                        <Voucher title="TØYVASK ULTRA/COLOR" discount="30" subtitle="1,1 KG, UNIK " image="/images/ultra.png" type={VoucherType.TakeThreePayForTwo} />
                        <Voucher title="En valgfri Ali kaffe" discount="40" subtitle="ORIGINAL/MØRKBRENT, FILTER-/KOK, 250 G" image="/images/ali.png" type={VoucherType.DiscountAmount} />
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
