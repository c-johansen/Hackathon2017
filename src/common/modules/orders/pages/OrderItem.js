import React, { Component } from "react"
import { withRouter } from "react-router"
import { App } from "../../app/markup"
import BackHeader from "../../app/BackHeader"
import { connect } from "react-redux"
import { get } from "../../../data/store/actions/order"
import orderUiSelector from "../../../selectors/orderUiSelector"
import OrderDetails from "../../orders/OrderDetails"
import Only from "../../shared/Only"

export class OrderItem extends Component {
    componentWillMount() {
        this.props.get(this.props.match.params.id)
    }
    render() {
        const { order, orderUi, user, location } = this.props

        const heading = location.state.isArchived ? "Kvittering" : "Bestilling"

        return (
            <App.Top>
                <App.Header>
                    <BackHeader to="/user" title={`${heading} ${location.state.pickupCode}`} backTitle="Tilbake" hasCartButton={false} />
                </App.Header>
                <App.Main>
                    <Only if={orderUi && !order.loading}>
                        <OrderDetails orderUi={orderUi} user={user.data} />
                    </Only>
                </App.Main>
            </App.Top>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user,
            order: store.order,
            orderUi: orderUiSelector(store),
        }
    },
    dispatch => {
        return {
            get: (id) => dispatch(get(id))
        }
    }
)(withRouter(OrderItem))
