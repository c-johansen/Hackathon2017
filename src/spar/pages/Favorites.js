import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
import Icon, { IconType } from "../../common/modules/shared/Icon"
import FavoritesRepo from "../FavoritesRepo"
import SingleProduct from "../SingleProduct"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Favoritter" />
                </App.Header>
                <App.Main>
                    <div className="container">
                        <div className="spar-single-products">
                            {FavoritesRepo.data.map(i => <SingleProduct product={i} key={i.ean} />)}
                        </div>
                        <div className="spar-summary">
                            <Icon type={IconType.CartFull} />
                            <span>Du sparer <strong>108 kr</strong> på disse tilbudene!</span>
                        </div>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
