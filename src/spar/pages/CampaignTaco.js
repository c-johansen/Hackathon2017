import React, { PureComponent } from "react"
import BackHeader from "../../common/modules/app/BackHeader"
import { App } from "../../common/modules/app/markup"
import Link from "../../common/modules/shared/Link"
import Icon, { IconType } from "../../common/modules/shared/Icon"
import { Product } from "@ng-mw/framework-productsearch"
import SingleProduct from "../SingleProduct"

export default class Home extends PureComponent {
    state = {
        data: []
    }
    async componentWillMount() {
        let result = await Product.search("taco", {
            pageSize: 20,
            page: 1,
            full_response: true,
        }, undefined, 7080000886050)

        this.setState({ data: result.hits })
    }
    render() {
        return (
            <App.Top>
                <App.Header>
                    <BackHeader title="Taco-helg!" />
                </App.Header>
                <App.Main>
                    <div className="spar-single-products">{this.state.data.slice(0, 16).map(i => <SingleProduct product={i} key={i.ean} />)}</div>
                </App.Main>
            </App.Top>
        )
    }
}
