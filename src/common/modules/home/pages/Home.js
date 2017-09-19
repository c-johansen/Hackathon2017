import React, { PureComponent } from "react"
import MostPurchasedProductsIntro from "../../products/MostPurchasedProductsIntro"
import HomeHeader from "../HomeHeader"
import PreorderStatusBlob from "../../orders/PreorderStatusBlob"
import OrderStatusBlob from "../../orders/OrderStatusBlob"
import CampaignsIntro from "../../campaigns/CampaignsIntro"
import { App } from "../../app/markup"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader />
                </App.Header>
                <App.Main>
                    <h1 className="ws-visually-hidden">Meny hjem</h1>
                    <PreorderStatusBlob />
                    <OrderStatusBlob />
                    <MostPurchasedProductsIntro />
                    <CampaignsIntro />
                </App.Main>
            </App.Top>
        )
    }
}
