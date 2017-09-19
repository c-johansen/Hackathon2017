import React, { Component } from "react"
import { connect } from "react-redux"
import { all, loadMore, setFilter, clear, clearFilter } from "../../data/store/actions/genericOffers"
import ProductList from "../products/ProductList"
import InfiniteScroller from "../shared/InfiniteScroller"
import FacetFilter from "../products/FacetFilter"
import CampaignsList from "./CampaignsList"
import OfferCampaignType from "../../data/const/OfferCampaignType"

export class GenericOffersList extends Component {
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
        let genericOffers = this.props.genericOffers

        return (
            <InfiniteScroller
                action={this.props.loadMore}
                loading={genericOffers.loading}
                page={genericOffers.page}
                hasMore={genericOffers.totalHits > genericOffers.data.length}>
                <CampaignsList type={OfferCampaignType.Generic} />
                <FacetFilter
                    categories={genericOffers.aggregations.categories}
                    activeCategory={genericOffers.filter.category}
                    setFilter={this.setFilter.bind(this)} />
                <ProductList products={genericOffers.data} />
            </InfiniteScroller>
        )
    }
}

export default connect(
    store => {
        return {
            genericOffers: store.genericOffers
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
)(GenericOffersList)
