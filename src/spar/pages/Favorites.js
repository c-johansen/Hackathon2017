import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
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
                        {FavoritesRepo.data.map(i => <SingleProduct product={i} key={i.ean} />)}
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
