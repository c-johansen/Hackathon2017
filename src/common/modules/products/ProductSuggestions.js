import React from "react"
import { connect } from "react-redux"
import HorizontalScroller from "../shared/HorizontalScroller"
import ProductImage from "./ProductImage"
import Button from "../shared/Button"
import Only from "../shared/Only"
import css from "classnames"
import Icon, { IconType } from "../shared/Icon"
import { search, setFilter } from "../../data/store/actions/products"
import { get, activate, disable } from "../../data/store/actions/productSuggestions"
import { toggleVisible } from "../../data/store/actions/productSuggestions"

export function ProductSuggestion(props) {
    return (
        <div className="product-suggestions__element" onClick={props.onClick}>
            <div className="product-suggestions__element-image">
                <ProductImage imageName={props.imageName} />
            </div>
            <div className="product-suggestions__element-title">{props.title}</div>
        </div>
    )
}

export class ProductSuggestions extends React.Component {
    search(specificCategory) {
        this.props.setFilter({ specificCategory })
        this.props.search("")
    }
    componentWillMount() {
        this.props.activate()
        this.props.get()
    }
    componentWillUnmount() {
        this.props.disable()
    }
    render() {
        let { productSuggestions } = this.props
        let spacerState
        let innerState

        if (productSuggestions.visible) {
            spacerState = "product-suggestions__spacer--big"
            innerState = "product-suggestions__inner--big"
        } else {
            spacerState = "product-suggestions__spacer--small"
            innerState = "product-suggestions__inner--small"
        }

        return (
            <aside className="product-suggestions">
                <div className={"product-suggestions__inner " + innerState}>
                    <div className="product-suggestions__inner__wrapper">
                        <h2 className="product-suggestions__inner__title">
                            <Only if={productSuggestions.productId} wrapper="span">
                                Andre som kjøpte <em>{productSuggestions.denomination}</em> kjøpte også&hellip;
                            </Only>
                            <Only if={!productSuggestions.productId} wrapper="span">
                                Hva med&hellip;
                            </Only>
                        </h2>

                        <Button
                            className={css("product-suggestions__inner__collapse-button", { "product-suggestions__inner__collapse-button--hidden": !productSuggestions.visible })}
                            onClick={this.props.toggleVisible}>
                            <span className="ws-visually-hidden">Lukk</span>
                            <Icon type={IconType.Handle} />
                        </Button>

                        <div className="product-suggestions__inner__content">
                            <Only if={productSuggestions.data.length}>
                                <HorizontalScroller small={true}>
                                    {productSuggestions.data.map(i => <ProductSuggestion key={i.title} {...i} onClick={this.search.bind(this, i.title)} />)}
                                </HorizontalScroller>
                            </Only>
                        </div>
                    </div>
                </div>
                <div className={"product-suggestions__spacer " + spacerState} />
            </aside>
        )
    }
}

export default connect(
    state => {
        return {
            productSuggestions: state.productSuggestions
        }
    },
    dispatch => {
        return {
            search: (query) => dispatch(search(query)),
            toggleVisible: () => dispatch(toggleVisible()),
            get: () => dispatch(get()),
            activate: () => dispatch(activate()),
            disable: () => dispatch(disable()),
            setFilter: (filter) => dispatch(setFilter(filter))
        }
    }
)(ProductSuggestions)
