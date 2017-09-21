import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
import Link from "../../common/modules/shared/Link"
import Icon, { IconType } from "../../common/modules/shared/Icon"
import { Product } from "@ng-mw/framework-productsearch"
import SingleProduct from "../SingleProduct"
import MultipleProduct from "../MultipleProduct"

export default class Home extends PureComponent {
    state = {
        data: []
    }
    async componentWillMount() {
        let result = await Product.search("", {
            pageSize: 20,
            page: 1,
            full_response: true,
            facet: [
                "IsOffer:true;Categories:Drikke"
            ].join(";")
        }, undefined, 7080000886050)

        this.setState({ data: result.hits.slice(0, 4) })
    }
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Tilbud" />
                </App.Header>
                <App.Main>
                    <h1 className="spar-heading">Drikke</h1>
                    <div className="spar-single-products">{this.state.data.map(i => <SingleProduct product={i} />)}</div>
                    <div className="spar-link">Se alle tilbud i drikke</div>
                    <div className="joker-campaign-big">
                        <Link to="/feed/taco">
                            <img src="/images/kampanje.png" />
                            <p>Se alle tilbud <Icon type={IconType.ChevronRight} /></p>
                        </Link>
                    </div>

                    <MultipleProduct />

                    <div className="joker-campaign-big">
                        <img src="/images/junior.png" />
                        <p>Se alle tilbud <Icon type={IconType.ChevronRight} /></p>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
