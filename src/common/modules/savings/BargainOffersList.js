import React, { Component } from "react"
import { connect } from "react-redux"
import { all, loadMore, setFilter, clear, clearFilter } from "../../data/store/actions/bargainOffers"
import ProductList from "../products/ProductList"
import InfiniteScroller from "../shared/InfiniteScroller"
import FacetFilter from "../products/FacetFilter"
import CampaignsList from "./CampaignsList"
import OfferCampaignType from "../../data/const/OfferCampaignType"

export class BargainOffersList extends Component {
    componentWillMount() {
        this.props.all()
    }
    componentWillUnmount() {
        this.props.clearFilter()
    }
    setFilter(filter) {
        this.props.setFilter(filter)
        this.props.all()
    }
    render() {
        let bargainOffers = this.props.bargainOffers

        return (
            <InfiniteScroller
                action={this.props.loadMore}
                loading={bargainOffers.loading}
                page={bargainOffers.page}
                hasMore={bargainOffers.totalHits > bargainOffers.data.length}>
                <CampaignsList type={OfferCampaignType.Bargain} />
                <FacetFilter
                    categories={bargainOffers.aggregations.categories}
                    activeCategory={bargainOffers.filter.category}
                    setFilter={this.setFilter.bind(this)} />
                <ProductList products={bargainOffers.data} />
            </InfiniteScroller>
        )
    }
}

export default connect(
    store => {
        return {
            bargainOffers: store.bargainOffers
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all()),
            loadMore: () => dispatch(loadMore()),
            setFilter: (filter) => dispatch(setFilter(filter)),
            clear: () => dispatch(clear()),
            clearFilter: () => dispatch(clearFilter())
        }
    }
)(BargainOffersList)

