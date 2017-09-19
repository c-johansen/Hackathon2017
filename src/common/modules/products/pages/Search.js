import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { loadMore, setFilter, search } from "../../../data/store/actions/products"
import ProductList from "../ProductList"
import MostPurchasedProducts from "../MostPurchasedProducts"
import ProductSearchForm from "../ProductSearchForm"
import ProductSuggestions from "../ProductSuggestions"
import EmptySearchPoster from "../EmptySearchPoster"
import InfiniteScroller from "../../shared/InfiniteScroller"
import Only from "../../shared/Only"
import AuthEncourager from "../../auth/AuthEncourager"
import { App } from "../../app/markup"
import FacetFilter from "../FacetFilter"
import { ScrollToTopLink } from "../../shared/ScrollToTop"
import PreorderStatusBlob from "../../orders/PreorderStatusBlob"

export class Search extends PureComponent {
    setFilter(filter) {
        this.props.setFilter(filter)
        this.props.search(this.props.products.query)
    }
    getPlaceholderBlock() {
        return (
            <MostPurchasedProducts>
                <PreorderStatusBlob />
                <AuthEncourager />
            </MostPurchasedProducts>
        )
    }
    getSearchBlock() {
        let products = this.props.products

        return (
            <InfiniteScroller
                action={this.props.loadMore}
                loading={products.loading}
                page={products.page}
                hasMore={products.totalHits > products.data.length}
                enabled={products.query !== null}>
                <Only if={!products.error}>
                    <h1 className="ws-visually-hidden">Søkeresultat</h1>

                    {products.autocomplete.suggestion ? <p className="autocomplete">Finner ikke <strong>{products.autocomplete.original}</strong>. Viser resultat for <strong>{products.autocomplete.suggestion}</strong></p> : null}
                    {products.filter.specificCategory ? <div className="container">Viser <strong>{products.filter.specificCategory}</strong></div> : null}

                    <Only if={products.data.length}>
                        <FacetFilter
                            categories={products.aggregations.categories}
                            activeCategory={products.filter.category}
                            setFilter={this.setFilter.bind(this)} />
                        <ProductList products={products.data} />
                        <ProductSuggestions />
                    </Only>
                    <Only if={!products.data.length && !products.loading}>
                        <EmptySearchPoster />
                    </Only>
                </Only>
            </InfiniteScroller>
        )
    }
    render() {
        let products = this.props.products

        return (
            <App.Top>
                <App.Header>
                    <ScrollToTopLink target=".infinite-scroller">
                        <ProductSearchForm />
                    </ScrollToTopLink>
                </App.Header>
                <App.Main>
                    {products.query === null ? this.getPlaceholderBlock() : this.getSearchBlock()}
                </App.Main>
            </App.Top>
        )
    }
}

export default connect(
    store => {
        return {
            products: store.products,
            auth: store.auth
        }
    },
    dispatch => {
        return {
            loadMore: () => dispatch(loadMore()),
            search: (query) => dispatch(search(query)),
            setFilter: (filter) => dispatch(setFilter(filter))
        }
    }
)(Search)
