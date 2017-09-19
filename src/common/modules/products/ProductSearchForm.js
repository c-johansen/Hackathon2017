import React, { Component } from "react"
import { connect } from "react-redux"
import { setQuery, clearQuery, search, clearFilter } from "../../data/store/actions/products"
import Icon, { IconType } from "../shared/Icon"
import { RedHeader } from "../app/Header"
import Button from "../shared/Button"
import CartButton from "../cart/CartButton"

export class ProductSearchForm extends Component {
    ref = null
    state = {
        input: this.props.products.query === null ? "" : this.props.products.query
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ input: nextProps.products.query === null ? "" : nextProps.products.query })
    }
    componentWillUnmount() {
        this.props.clearQuery()
    }
    onSubmit(e) {
        e.preventDefault()

        if (this.state.input) {
            this.props.clearFilter()
            this.props.search(this.state.input)

            if (this.ref) {
                this.ref.blur()
            }
        }
    }
    onChange(e) {
        this.setState({ input: e.target.value })
    }

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    render() {
        return (
            <RedHeader>
                <form onSubmit={this.onSubmit} action="" className="product-search-form">
                    <fieldset>
                        <fieldset className="ws-visually-hidden">Søk etter varer</fieldset>

                        <div className="product-search-form__wrapper">
                            <div className="product-search-form__input-wrapper">
                                <input
                                    onClick={e => e.stopPropagation()}
                                    autoFocus={false}
                                    spellCheck={false}
                                    autoComplete={false}
                                    ref={ref => this.ref = ref}
                                    autoCapitalize={false}
                                    className={"product-search-form__input-field"}
                                    placeholder="Søk etter varer"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.input} />
                                <div className="product-search-form__search-icon">
                                    <Icon type={IconType.Magnifier} />
                                </div>
                                {this.props.products.query !== null && (
                                    <Button className="product-search-form__clear-button" onClick={this.props.clearQuery}>
                                        <Icon type={IconType.X} />
                                        <span className="ws-visually-hidden">Tøm søkefeltet</span>
                                    </Button>
                                )}
                            </div>
                            <div className="product-search-form__buttons">
                                <CartButton />
                            </div>
                            <span className="ws-visually-hidden">
                                <Button onClick={this.onSubmit}>Søk</Button>
                            </span>
                        </div>
                    </fieldset>
                </form>
            </RedHeader>

        )
    }
}

export default connect(
    state => {
        return {
            products: state.products
        }
    },
    dispatch => {
        return {
            setQuery: (query) => dispatch(setQuery(query)),
            clearQuery: () => dispatch(clearQuery()),
            search: (query) => dispatch(search(query)),
            clearFilter: () => dispatch(clearFilter()),
        }
    }
)(ProductSearchForm)
