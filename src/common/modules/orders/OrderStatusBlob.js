import React, { Component } from "react"
import ButtonTitle from "../shared/ButtonTitle"
import HorizontalScroller from "../shared/HorizontalScroller"
import OrderBlob from "./OrderBlob"
import { all } from "../../data/store/actions/orders"
import { connect } from "react-redux"
import OrderStatus from "../../data/const/OrderStatus"
import Only from "../shared/Only"

export class OrderStatusBlob extends Component {
    componentWillMount() {
        this.props.all()
    }
    render() {
        let open = this.props.orders.data.filter(i => i.status === OrderStatus.Open)

        if (!open.length) {
            return null
        }

        return (
            <div className="order-status-blob">
                <ButtonTitle title={open.length === 1 ? "Aktiv bestilling" : "Aktive bestillinger"} url="/user/orders" buttonText="Se alle" />
                <Only if={open.length > 1}>
                    <HorizontalScroller>
                        {open.map(i => <OrderBlob key={i.pickupCode} order={i} />)}
                    </HorizontalScroller>
                </Only>
                <Only if={open.length === 1}>
                    <OrderBlob key={open[0].pickupCode} order={open[0]} />
                </Only>
            </div>
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
)(OrderStatusBlob)
