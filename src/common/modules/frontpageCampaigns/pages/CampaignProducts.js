import React, { Component } from "react"
import { get } from "../../../data/store/actions/campaign"
import { connect } from "react-redux"
import { App } from "../../app/markup"
import Only from "../../shared/Only"
import BackHeader from "../../app/BackHeader"
import ProductList from "../../products/ProductList"
import CategoryFilter from "../../products/CategoryFilter"
import { withRouter } from "react-router"

export class CampaignProducts extends Component {
    state = {
        activeCategory: null
    }
    setCategory(category) {
        this.setState({ activeCategory: category === this.state.activeCategory ? null : category })
    }
    componentWillMount() {
        this.props.get(this.props.match.params.id)
    }
    render() {
        let products = this.props.campaign.data.products
        let filteredProducts = products.filter(i => this.state.activeCategory ? i.categoryName === this.state.activeCategory : true)

        return (
            <App.Top>
                <App.Header>
                    <BackHeader title={this.props.location.state.title} />
                </App.Header>
                <App.Main>
                    <h1 className="ws-visually-hidden">{this.props.location.state.title}</h1>
                    <Only if={!this.props.campaign.loading}>
                        <CategoryFilter
                            offers={products}
                            activeCategory={this.state.activeCategory}
                            setCategory={this.setCategory.bind(this)} />
                        <ProductList products={filteredProducts} />
                    </Only>
                </App.Main>
            </App.Top>
        )
    }
}

export default connect(
    store => {
        return {
            campaign: store.campaign
        }
    },
    dispatch => {
        return {
            get: (id) => dispatch(get(id))
        }
    }
)(withRouter(CampaignProducts))
