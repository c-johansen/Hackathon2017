import React, { PureComponent } from "react"
import Product from "./Product"

export default class ProductList extends PureComponent {
    render() {
        return (
            <ul className="product-list">
                {this.props.products.map(p => <li key={p.ean}><Product product={p} /></li>)}
            </ul>
        )
    }
}
