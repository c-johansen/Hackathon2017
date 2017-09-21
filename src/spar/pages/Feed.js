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

        this.setState({ data: result.hits })
    }
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Tilbud" />
                </App.Header>
                <App.Main>
                    <h1 className="spar-heading">Drikke</h1>
                    <div className="spar-single-products">{this.state.data.slice(0, 4).map(i => <SingleProduct product={i} key={i.ean}/>)}</div>
                    <div className="spar-link">Se alle tilbud i drikke <Icon type={IconType.ChevronRight} /></div>

                    <MultipleProduct />

                    <div className="joker-campaign-big">
                        <Link to="/feed/taco">
                            <img src="/images/kampanje.png" />
                            <p>Se alle tilbud <Icon type={IconType.ChevronRight} /></p>
                        </Link>
                    </div>

                    <div className="joker-campaign-big">
                        <img src="/images/junior.png" />
                        <p>Se alle tilbud <Icon type={IconType.ChevronRight} /></p>
                    </div>

                    <div className="spar-single-products">{this.state.data.slice(4, 10).map(i => <SingleProduct product={i} key={i.ean}/>)}</div>

                    <div className="spar-link">Hent flere tilbud</div>
                </App.Main>
            </App.Top>
        )
    }
}
