import React, { Component } from "react"
import ButtonTitle from "../shared/ButtonTitle"
import HorizontalScroller from "../shared/HorizontalScroller"
import { all } from "../../data/store/actions/mostPurchasedProducts"
import { connect } from "react-redux"
import ProductList from "./ProductList"

export class MostPurchasedProductsIntro extends Component {
    componentWillMount() {
        if (!this.props.mostPurchasedProducts.data.length) {
            this.props.all()
        }
    }
    render() {
        let { data, isUserSpecific } = this.props.mostPurchasedProducts

        return (
            <div className="most-purchased-products-intro">
                <ButtonTitle title={isUserSpecific ? "Varer jeg kjøper ofte" : "Våre bestselgere"} url="/most-purchased" buttonText="Se flere" />

                <HorizontalScroller>
                    <ProductList products={data.slice(0, 5)} />
                </HorizontalScroller>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            mostPurchasedProducts: state.mostPurchasedProducts
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all())
        }
    }
)(MostPurchasedProductsIntro)
