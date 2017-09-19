import React, { Component } from "react"
import moment from "moment"
import { FullDateTime } from "../../data/const/MomentDateFormats"
import Only from "../shared/Only"
import HandoverType from "../../data/const/HandoverType"
import Urls from "../../data/const/Urls"
import ExternalLink from "../shared/ExternalLink"
import CancelOrderButton from "./CancelOrderButton"

export default class OrderDetailsSummary extends Component {
    render() {
        const { orderUi, isArchived } = this.props

        if (!orderUi) {
            return null
        }

        return (
            <div className="ws-order-details__summary">
                <div className="container">
                    <ul>
                        <li className="stripe-list__element">
                            <div className="stripe-list__element__left stripe-list__element--lo">
                                Bestillingskode
                            </div>
                            <div className="stripe-list__element__right ">
                                {orderUi.pickupCode}
                            </div>
                        </li>
                        <li className="stripe-list__element">
                            <div className="stripe-list__element__left stripe-list__element--lo">
                                Varene {orderUi.handoverInfo.handoverType === HandoverType.Delivery ? isArchived ? "ble levert" : "leveres" : isArchived ? "ble hentet" : "hentes"}
                            </div>
                            <div className="stripe-list__element__right ">
                                {moment(orderUi.handoverInfo.customerPickupFrom).format(FullDateTime)}-{moment(orderUi.handoverInfo.customerPickupTo).format("HH")}
                            </div>
                        </li>
                        <li className="stripe-list__element">
                            <div className="stripe-list__element__left stripe-list__element--lo">
                                {orderUi.handoverInfo.handoverType === HandoverType.Delivery ? "Leveringsadresse" : isArchived ? "Varene ble hentet hos" : "Varene hentes hos"}
                            </div>
                            <div className="stripe-list__element__right ">
                                {orderUi.handoverInfo.handoverType === HandoverType.Delivery ? <span>{orderUi.handoverInfo.deliveryInfo && orderUi.handoverInfo.deliveryInfo.address}, {orderUi.handoverInfo.deliveryInfo && orderUi.handoverInfo.deliveryInfo.postalcode} {orderUi.handoverInfo.deliveryInfo && orderUi.handoverInfo.deliveryInfo.city}</span> : orderUi.store && orderUi.store.name}
                            </div>
                        </li>
                        <Only if={moment(orderUi.handoverInfo.deadline).isAfter()} className="stripe-list__element stripe-list__element--full" wrapper="li">
                            <CancelOrderButton order={orderUi} />
                        </Only>
                    </ul>

                    <Only if={moment(orderUi.handoverInfo.deadline).isAfter()}>
                        <div className="ws-order-details__edit-notice">
                            <h2 className="ws-order-details__edit-notice__title">Har du glemt noe?</h2>
                            <ExternalLink
                                className="ws-order-details__edit-notice__link"
                                root={Urls.MenyWebShop}
                                to={`/profil/bestilling/${orderUi.ngOrderId}?status=OPEN`}
                            >
                                Du kan legge til varer fra meny.no
                            </ExternalLink>
                            <p className="ws-order-details__edit-notice__text">Legg til varer som vanlig i handlekurven og velg denne bestillingen i kassen.</p>
                        </div>
                    </Only>
                </div>
            </div>
        )
    }
}
