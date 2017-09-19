import React, { Component } from "react"
import { connect } from "react-redux"
import { addListItem, removeListItem } from "../../data/store/actions/lists"

// Components
import Button from "../shared/Button"

export class ListItem extends Component {
    adjustQuantity(quantity) {
        this.props.adjustQuantity(this.props.listId, this.props.product, quantity)
    }
    removeItem() {
        this.props.removeItem(this.props.listId, this.props.product)
    }
    render() {
        return (
            <li>
                {this.props.quantity} stk: <strong>{this.props.product.title}</strong> {this.props.product.subtitle}
                <fieldset>
                    <Button onClick={this.adjustQuantity.bind(this, 1)}>+</Button>
                    <Button onClick={this.adjustQuantity.bind(this, -1)} disabled={this.props.quantity <= 1}>-</Button>
                    <Button onClick={this.removeItem.bind(this)}>Delete</Button>
                </fieldset>
            </li>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            adjustQuantity: (listId, item, quantity) => dispatch(addListItem(listId, item, quantity)),
            removeItem: (listId, item) => dispatch(removeListItem(listId, item))
        }
    }
)(ListItem)
