import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
import Voucher from "../../common/modules/savings/Voucher"
import VoucherType from "../../common/data/const/VoucherType"
import { Product } from "@ng-mw/framework-productsearch";
import { performRESTRequest } from "@ng-mw/framework-core";

export default class Home extends PureComponent {
    state = { kuponger: [] }
    componentWillMount() {
        let result = performRESTRequest({
            path: "/kjeder/{chainid}/kuponger",
            method: "GET"
        }).then((val) => {
            this.setState({ kuponger: val.kuponger });
            console.log(this.state.kuponger);
        }).catch((err) => {
            console.log(err)
        });


    }
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Kuponger" />
                </App.Header>
                <App.Main>
                    <div className="container">
                        {this.state.kuponger.map((i) => <Voucher voucher={i} activate={() => { }} />)}

                        {/*    <Voucher title="Dusjsåpe" discount="30" subtitle="LANO, 250 ML" image="/images/" type={VoucherType.DiscountPercentage} />
                        <Voucher title="MELLOMBAR" discount="40" subtitle="HAVRE/KOKOS, 138 G, ELDORADO" image="/images/" type={VoucherType.NormalPrice} />
                        <Voucher title="TØYVASK ULTRA/COLOR" discount="30" subtitle="1,1 KG, UNIK " image="/images/" type={VoucherType.TakeThreePayForTwo} />
                        <Voucher title="En valgfri Ali kaffe" discount="40" subtitle="ORIGINAL/MØRKBRENT, FILTER-/KOK, 250 G" image="/images/" type={VoucherType.DiscountAmount} /> */}
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
