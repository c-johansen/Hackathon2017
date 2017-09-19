import React from "react"
import Link from "../shared/Link"
import Icon, { IconType } from "../shared/Icon"
import HandoverType from "../../data/const/HandoverType"
import OrderStatus from "../../data/const/OrderStatus"
import OrderDaddy from "./OrderDaddy"

export default class OrderBlob extends OrderDaddy {
    static defaultProps = {
        headingLevel: "h3"
    }
    render() {
        let { order, headingLevel } = this.props
        let HeadingLevel = headingLevel

        return (
            <div className="order-blob">
                <Icon type={order.handoverInfo.handoverType === HandoverType.Delivery ? IconType.Truck : IconType.Pin} />
                <Link to={`/user/orders/${order.ngOrderId}`} state={{ pickupCode: order.pickupCode, isArchived: order.status === OrderStatus.Delivered }}>
                    <HeadingLevel className="order-blob__status">
                        Bestilling {order.pickupCode}
                    </HeadingLevel>
                    <div>
                        {this.getHeaderTitle(order)}
                    </div>
                    <div className="order-blob__place">
                        {order.handoverInfo.handoverType === HandoverType.Delivery ? "Leveres fra" : "Hentes hos"} <strong>{order.store.name}</strong>
                        {" "}
                        {this.getHandoverTime(order.handoverInfo)}
                    </div>
                </Link>
            </div>
        )
    }
}
