import React, { Component } from "react"
import { connect } from "react-redux"
import groupArray from "group-array"
import sortArray from "sort-array"
import { CSSTransitionGroup as TransitionGroup } from "react-transition-group"
import Product from "../products/Product"
import InlineMessage, { MessageType } from "../shared/InlineMessage"

export class CartItems extends Component {
    render() {
        const { cart, className } = this.props
        const categories = groupArray(cart.items, "product.categoryName")
        let result = []

        for (let category in categories) {
            let items = sortArray(categories[category], "addedAt", { reverse: true })

            result.push({
                category,
                items: (
                    <div className="ws-cart-items" key={category}>
                        <h2 className="ws-cart-items__header">{category}</h2>

                        <TransitionGroup
                            key={category}
                            component="div"
                            className="ws-cart-items__list"
                            transitionName={"selfheal"}
                            transitionEnter={false}
                            transitionLeave={true}
                            transitionLeaveTimeout={350}>
                            {items.map(i => (
                                <div className="ws-cart-items__item" key={i.product.ean}>
                                    <Product {...i} canRevealRight={true} />
                                </div>
                            ))}
                        </TransitionGroup>
                    </div>
                )
            })
        }

        result = sortArray(result, "category")

        return (
            <div className={className}>
                {cart.containsItemsNotInCurrentStore && (
                    <InlineMessage
                        message="Noen av varene i handlevognen er ikke tilgjengelige"
                        show={true}
                        style={{ margin: 0 }}
                        type={MessageType.Warning}
                    />
                )}
                {result.map(i => i.items)}
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            cart: store.cart,
        }
    }
)(CartItems)
