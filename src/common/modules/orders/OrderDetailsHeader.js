import React from "react"
import moment from "moment"
import Only from "../shared/Only"
import HandoverType from "../../data/const/HandoverType"
import Urls from "../../data/const/Urls"
import OrderStatus from "../../data/const/OrderStatus"
import ExternalLink from "../shared/ExternalLink"
import Icon, { IconType } from "../shared/Icon"
import OrderDaddy from "./OrderDaddy"

export default class OrderDetailsHeader extends OrderDaddy {
    render() {
        let { orderUi, user } = this.props

        if (!orderUi || !user.currentMember.memberId) {
            return null
        }

        return (
            <header className="ws-order-details__header">
                <div className={"ws-order-details__header__title " + (this.getNormalizedStatus(orderUi.status) === OrderStatus.Collected ? "ws-order-details__header__title--solo" : "")}>
                    <div className={"order-blob-big__status " + (this.getNormalizedStatus(orderUi.status) === OrderStatus.Processing && moment(orderUi.handoverInfo.deadline).isBefore() ? "order-blob-big__status--processing" : "")}>
                        <Only if={this.getNormalizedStatus(orderUi.status) === OrderStatus.PickedUpByCourier} className="order-blob-big__status__icon">
                            <Icon type={IconType.Truck} circle outline />
                        </Only>
                        <Only if={this.getNormalizedStatus(orderUi.status) === OrderStatus.ReadyForPickup} className="order-blob-big__status__icon">
                            <Icon type={IconType.Pin} circle outline />
                        </Only>

                        <Only if={this.getNormalizedStatus(orderUi.status) === OrderStatus.Processing && moment(orderUi.handoverInfo.deadline).isBefore()} className="order-blob-big__status__icon order-blob-big__status__icon--processing" />

                        <h1 className="ws-order-details__header__title__text">{this.getHeaderTitle(orderUi, false)}</h1>
                    </div>
                </div>

                <div className="ws-order-details__header__text">
                    <Only if={moment(orderUi.handoverInfo.deadline).isAfter()} wrapper="p">
                        <ExternalLink
                            className="ws-order-details__header__link"
                            root={Urls.MenyWebShop}
                            to={`/profil/bestilling/${orderUi.ngOrderId}?status=OPEN`}
                        >
                            Endre bestilling på meny.no
                        </ExternalLink>
                    </Only>
                    <Only if={!this.props.isArchived} wrapper="p">
                        Bekreftelse er sendt på epost.
                        {" "}
                        Du vil få en SMS på <strong>{user.currentMember.mobile}</strong> når varene
                        {" "}
                        <Only if={orderUi.handoverInfo.handoverType === HandoverType.Delivery} wrapper="span">er på vei til deg.</Only>
                        <Only if={orderUi.handoverInfo.handoverType !== HandoverType.Delivery} wrapper="span">er klar til henting.</Only>
                    </Only>
                </div>
            </header>
        )
    }
}
