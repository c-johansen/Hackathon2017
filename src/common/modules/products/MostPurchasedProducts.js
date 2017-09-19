import React from "react"
import { connect } from "react-redux"
import ProductList from "./ProductList"
import { all, loadMore, setFilter } from "../../data/store/actions/mostPurchasedProducts"
import FacetFilter from "./FacetFilter"
import Only from "../shared/Only"
import InfiniteScroller from "../shared/InfiniteScroller"

export class MostPurchasedProducts extends React.Component {
    static defaultProps = {
        hasTitle: true
    }
    componentWillMount() {
        if (!this.props.mostPurchasedProducts.data.length) {
            this.props.all()
        }
    }
    setFilter(filter) {
        this.props.setFilter(filter)
        this.props.all()
    }
    render() {
        let mostPurchasedProducts = this.props.mostPurchasedProducts

        return (
            <InfiniteScroller
                action={this.props.loadMore}
                loading={mostPurchasedProducts.loading}
                hasMore={mostPurchasedProducts.totalHits > mostPurchasedProducts.data.length}
                page={mostPurchasedProducts.page}>
                {this.props.children}
                <div className="most-purchased-products">
                    <Only if={this.props.hasTitle}>
                        <h2 className="most-purchased-products__title">
                            {mostPurchasedProducts.isUserSpecific ? "Varer jeg kjøper ofte" : "Våre bestselgere"}
                        </h2>
                    </Only>

                    <FacetFilter
                        categories={mostPurchasedProducts.aggregations.categories}
                        activeCategory={mostPurchasedProducts.filter.category}
                        setFilter={this.setFilter.bind(this)} />

                    <ProductList products={mostPurchasedProducts.data} />
                </div>
            </InfiniteScroller>
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
            all: () => dispatch(all()),
            loadMore: () => dispatch(loadMore()),
            setFilter: (filter) => dispatch(setFilter(filter))
        }
    }
)(MostPurchasedProducts)
