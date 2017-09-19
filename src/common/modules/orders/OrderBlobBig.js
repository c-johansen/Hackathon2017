import React from "react"
import moment from "moment"
import HandoverType from "../../data/const/HandoverType"
import OrderStatus from "../../data/const/OrderStatus"
import { FullDateTime } from "../../data/const/MomentDateFormats"
import { formatPrice } from "../../helpers/FormatHelper"
import Link from "../shared/Link"
import Icon, { IconType } from "../shared/Icon"
import Only from "../shared/Only"
import CancelOrderButton from "./CancelOrderButton"
import Urls from "../../data/const/Urls"
import ExternalLink from "../shared/ExternalLink"
import OrderDaddy from "./OrderDaddy"

export default class OrderBlobBig extends OrderDaddy {
    getArchivedElement() {
        let { order } = this.props

        return (
            <div className="order-blob-big order-blob-big--archived">
                <Link
                    to={`/user/orders/${order.ngOrderId}`}
                    state={{ pickupCode: order.pickupCode, isArchived: this.props.isArchive }}>
                    <h3 className="order-blob-big__archived-title">
                        {order.store.name}, kr {formatPrice(order.totals.totalGrossAmount)}
                    </h3>
                    <div className="order-blob-big__completed-at">
                        {this.props.isArchived ? "Levert" : "Hentet"}
                        {" "}
                        {moment(order.handoverInfo.customerPickupFrom).format(FullDateTime)}-{moment(order.handoverInfo.customerPickupTo).format("HH")}
                    </div>
                    <Icon type={IconType.ChevronRight} />
                </Link>
            </div>
        )
    }
    render() {
        let { order } = this.props

        if (!order || !order.store || !order.totals) return null

        if (this.props.isArchived) {
            return this.getArchivedElement()
        }

        return (
            <div className="order-blob-big">
                <h3 className="ws-visually-hidden">Bestilling {order.pickupCode}</h3>

                <div className={"order-blob-big__status " + (this.getNormalizedStatus(order.status) === OrderStatus.Processing ? "order-blob-big__status--processing" : "")}>
                    <Only if={!moment(order.handoverInfo.deadline).isAfter()}>
                        <Only if={this.getNormalizedStatus(order.status) === OrderStatus.PickedUpByCourier} className="order-blob-big__status__icon">
                            <Icon type={IconType.Truck} circle outline />
                        </Only>
                        <Only if={this.getNormalizedStatus(order.status) === OrderStatus.ReadyForPickup} className="order-blob-big__status__icon">
                            <Icon type={IconType.Pin} circle outline />
                        </Only>
                        <Only if={this.getNormalizedStatus(order.status) === OrderStatus.Processing} className="order-blob-big__status__icon order-blob-big__status__icon--processing" />

                        {this.getHeaderTitle(order)}
                    </Only>
                </div>

                <ul>
                    <Only if={order.status <= OrderStatus.Open} wrapper="li" className="stripe-list__element">
                        <div className="stripe-list__element__full">
                            <Only if={moment(order.handoverInfo.deadline).isAfter()}>
                                {this.getHeaderTitle(order)}
                                <ExternalLink
                                    className="order-blob-big__action"
                                    root={Urls.MenyWebShop}
                                    to={`/profil/bestilling/${order.ngOrderId}?status=OPEN`}
                                >
                                    Endre bestilling på meny.no
                                </ExternalLink>
                            </Only>
                        </div>
                    </Only>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__left stripe-list__element--lo">
                            Varene {order.handoverInfo.handoverType === HandoverType.Delivery ? "leveres" : "hentes"}
                        </div>
                        <div className="stripe-list__element__right ">
                            {moment(order.handoverInfo.customerPickupFrom).format(FullDateTime)}-{moment(order.handoverInfo.customerPickupTo).format("HH")}
                        </div>
                    </li>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__left stripe-list__element--lo">
                            Varene {order.handoverInfo.handoverType === HandoverType.Delivery ? "leveres fra" : "hentes hos"}
                        </div>
                        <div className="stripe-list__element__right">
                            {order.store.name}
                        </div>
                    </li>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__full">
                            <Link
                                to={`/user/orders/${order.ngOrderId}`}
                                className="order-blob-big__action"
                                state={{ pickupCode: order.pickupCode, isArchived: order.status === OrderStatus.Delivered }}>
                                Se bestillingsdetaljer <Icon type={IconType.ChevronRight} />
                            </Link>
                        </div>
                    </li>
                    <Only if={moment(order.handoverInfo.deadline).isAfter()} wrapper="li" className="stripe-list__element">
                        <CancelOrderButton order={order} containerClassName="stripe-list__element__full" />
                    </Only>
                </ul>
            </div>
        )
    }
}
