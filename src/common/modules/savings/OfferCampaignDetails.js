import React, { Component } from "react"
import { connect } from "react-redux"
import { get, loadMore, setFilter, clear } from "../../data/store/actions/offerCampaign"
import InfiniteScroller from "../shared/InfiniteScroller"
import FacetFilter from "../products/FacetFilter"
import ProductList from "../products/ProductList"

export class OfferCampaignDetails extends Component {
    componentWillMount() {
        this.props.get(this.props.campaignId)
    }
    componentWillUnmount() {
        this.props.clear()
    }
    setFilter(filter) {
        this.props.setFilter(filter)
        this.props.get(this.props.campaignId)
    }
    render() {
        let offerCampaign = this.props.offerCampaign

        return (
            <InfiniteScroller
                action={this.props.loadMore.bind(null, this.props.campaignId)}
                loading={offerCampaign.loading}
                page={offerCampaign.page}
                hasMore={offerCampaign.totalHits > offerCampaign.data.length}>
                <FacetFilter
                    categories={offerCampaign.aggregations.categories}
                    activeCategory={offerCampaign.filter.category}
                    setFilter={this.setFilter.bind(this)} />
                <ProductList products={offerCampaign.data} />
            </InfiniteScroller>
        )
    }
}

export default connect(
    store => {
        return {
            offerCampaign: store.offerCampaign
        }
    },
    dispatch => {
        return {
            get: (campaignId) => dispatch(get(campaignId)),
            loadMore: (campaignId) => dispatch(loadMore(campaignId)),
            setFilter: (filter) => dispatch(setFilter(filter)),
            clear: () => dispatch(clear())
        }
    }
)(OfferCampaignDetails)
