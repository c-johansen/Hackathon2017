import React, { Component } from "react"
import { connect } from "react-redux"
import { all } from "../../data/store/actions/orders"
import OrderBlobBig from "./OrderBlobBig"
import { CSSTransitionGroup as TransitionGroup } from "react-transition-group"
import Only from "../shared/Only"
import SwipeReloader from "../shared/SwipeReloader"
import OrderStatus from "../../data/const/OrderStatus"

export class OrdersList extends Component {
    componentWillMount() {
        this.props.all()
    }
    render() {
        let orders = this.props.orders.data.filter(i => i.status !== OrderStatus.Deleted)
        let archived = orders.filter(i => [
            OrderStatus.Collected,
            OrderStatus.PartiallyDelivered,
            OrderStatus.Delivered
        ].includes(i.status))
        let open = orders.filter(i => !archived.includes(i))

        return (
            <SwipeReloader
                action={this.props.all}
                loading={this.props.orders.loading}>
                <h2 className="orders-heading">Mine aktive bestillinger</h2>
                <TransitionGroup
                    component="div"
                    transitionName={"zoom"}
                    transitionEnter={false}
                    transitionLeave={true}
                    transitionLeaveTimeout={800}>
                    {open.map(i => <OrderBlobBig order={i} key={i.pickupCode} />)}
                </TransitionGroup>
                <Only if={!open.length}>
                    <p className="orders-empty-info">Du har ingen aktive bestillinger</p>
                </Only>

                <h2 className="orders-heading">Bestillingshistorikk</h2>
                <Only if={archived.length}>
                    {archived.map(i => <OrderBlobBig order={i} isArchived={true} key={i.pickupCode} />)}
                </Only>
                <Only if={!archived.length}>
                    <p className="orders-empty-info">Du har ingen bestillingshistorikk</p>
                </Only>
            </SwipeReloader>
        )
    }
}

export default connect(
    store => {
        return {
            orders: store.orders
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all())
        }
    }
)(OrdersList)
