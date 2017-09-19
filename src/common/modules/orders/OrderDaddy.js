import React, { Component } from "react"
import moment from "moment"
import HandoverType from "../../data/const/HandoverType"
import OrderStatus from "../../data/const/OrderStatus"
import { RelativeCalendarFormats } from "../../data/const/MomentDateFormats"

export default class OrderDaddy extends Component {
    static defaultProps = {
        isArchived: false
    }
    getHandoverTime(handoverInfo) {
        const from = moment(handoverInfo.customerPickupFrom).calendar(null, RelativeCalendarFormats)
        const to = moment(handoverInfo.customerPickupTo).format("HH")
        return from + "-" + to
    }
    getNormalizedStatus(status) {
        switch (status) {
            case OrderStatus.User:
            case OrderStatus.Local:
            case OrderStatus.Open:
            case OrderStatus.Created:
            case OrderStatus.Processing:
            case OrderStatus.PickStarted:
            case OrderStatus.Picked:
            case OrderStatus.PlacedInStorage:
            case OrderStatus.ArrivedAtPickupPoint:
            case OrderStatus.ReadyAtPickupPoint:
            case OrderStatus.PaymentSuccess:
            case OrderStatus.PaymentFailed:
                return OrderStatus.Processing
            case OrderStatus.PickedUpByCourier:
                return OrderStatus.PickedUpByCourier
            case OrderStatus.ReadyForPickup:
                return OrderStatus.ReadyForPickup
            case OrderStatus.Collected:
            case OrderStatus.PartiallyDelivered:
            case OrderStatus.Delivered:
                return OrderStatus.Collected
            case OrderStatus.Deleted:
                return OrderStatus.Deleted
            default:
                return OrderStatus.Processing
        }
    }
    getHeaderTitle(order, doPickupCode = true ) {
        let canChangeOrder = moment(order.handoverInfo.deadline).isAfter()
        let isDelivery = order.handoverInfo.handoverType === HandoverType.Delivery
        let status = order.uiClientStatus || order.status

        if (canChangeOrder) {
            return <span>Bestilling{!doPickupCode ? "en" : null} {doPickupCode ? <strong>{order.pickupCode}</strong> : null} kan endres frem til {moment(order.handoverInfo.deadline).calendar(null, RelativeCalendarFormats)}</span>
        }

        switch (status) {
            case OrderStatus.User:
            case OrderStatus.Local:
            case OrderStatus.Open:
            case OrderStatus.Created:
            case OrderStatus.Processing:
            case OrderStatus.PickStarted:
            case OrderStatus.Picked:
            case OrderStatus.PlacedInStorage:
            case OrderStatus.ArrivedAtPickupPoint:
            case OrderStatus.ReadyAtPickupPoint:
            case OrderStatus.PaymentSuccess:
            case OrderStatus.PaymentFailed:
                return <span>Bestilling{!doPickupCode ? "en" : null} {doPickupCode ? <strong>{order.pickupCode}</strong> : null} behandles</span>
            case OrderStatus.PickedUpByCourier:
                return <span>Bestilling{!doPickupCode ? "en" : null} {doPickupCode ? <strong>{order.pickupCode}</strong> : null} er klar til levering</span>
            case OrderStatus.ReadyForPickup:
                return <span>Bestilling{!doPickupCode ? "en" : null} {doPickupCode ? <strong>{order.pickupCode}</strong> : null} er klar til henting</span>
            case OrderStatus.Collected:
            case OrderStatus.PartiallyDelivered:
            case OrderStatus.Delivered:
                return <span>Bestilling{!doPickupCode ? "en" : null} {doPickupCode ? <strong>{order.pickupCode}</strong> : null} ble {isDelivery ? "levert" : "hentet"} {this.getHandoverTime(order.handoverInfo)}</span>
            case OrderStatus.Deleted:
                return <span>Bestilling{!doPickupCode ? "en" : null} {doPickupCode ? <strong>{order.pickupCode}</strong> : null} er kansellert</span>
            default:
                return <span>Default order status tekst -- bug</span>
        }
    }
}
