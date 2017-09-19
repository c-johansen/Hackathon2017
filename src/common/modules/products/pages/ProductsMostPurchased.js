import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { App } from "../../app/markup"
import BackHeader from "../../app/BackHeader"
import MostPurchasedProducts from "../MostPurchasedProducts"

export class ProductsMostPurchased extends PureComponent {
    render() {
        let mostPurchasedProducts = this.props.mostPurchasedProducts

        return (
            <App.Top>
                <App.Header>
                    <BackHeader to="/" title={mostPurchasedProducts.isUserSpecific ? "Varer jeg kjøper ofte" : "Våre bestselgere"} />
                </App.Header>
                <App.Main>
                    <MostPurchasedProducts hasTitle={false} />
                </App.Main>
            </App.Top>
        )
    }
}

export default connect(
    state => {
        return {
            mostPurchasedProducts: state.mostPurchasedProducts
        }
    }
)(ProductsMostPurchased)
