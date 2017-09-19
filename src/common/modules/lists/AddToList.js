import React, { Component } from "react"
import { connect } from "react-redux"
import { addListItem } from "../../data/store/actions/lists"

// Components
import Button from "../shared/Button"

export class AddToList extends Component {
    state = {
        listInput: "",
        quantityInput: 1
    }
    onListChange(e) {
        this.setState({ listInput: e.target.value })
    }

    onQuantityChange(e) {
        this.setState({ quantityInput: e.target.value })
    }

    addListItem(e) {
        e.preventDefault()
        this.props.addListItem(this.state.listInput, this.props.product, parseFloat(this.state.quantityInput, 10))
    }

    render() {
        return (
            <form onSubmit={this.addListItem.bind(this)}>
                <fieldset>
                    <legend>Add <em>{this.props.product.title}</em> to list</legend>

                    <select
                        required={true}
                        value={this.state.listInput}
                        onChange={this.onListChange.bind(this)}>
                        <option disabled={true} value={""}>Liste...</option>
                        {this.props.lists.items.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>

                    <input
                        required={true}
                        type="number"
                        value={this.state.quantityInput}
                        onChange={this.onQuantityChange.bind(this)} />

                    <Button disabled={!this.state.listInput || this.state.quantityInput < 1}>
                        Legg til
                    </Button>
                </fieldset>
            </form>
        )
    }
}

export default connect(
    store => {
        return {
            lists: store.lists
        }
    },
    dispatch => {
        return {
            addListItem: (listId, item, quantity) => dispatch(addListItem(listId, item, quantity))
        }
    }
)(AddToList)
