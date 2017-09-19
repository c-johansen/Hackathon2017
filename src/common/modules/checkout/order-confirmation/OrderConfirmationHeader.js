import React, { Component } from "react"
import moment from "moment"
import Only from "../../shared/Only"
import HandoverType from "../../../data/const/HandoverType"
import { RelativeCalendarFormats } from "../../../data/const/MomentDateFormats"
import Urls from "../../../data/const/Urls"
import ExternalLink from "../../shared/ExternalLink"

export default class OrderConfirmationHeader extends Component {
    render() {
        let { orderUi, user } = this.props

        if (!orderUi.ngOrderId || !user.currentMember.memberId) {
            return null
        }

        return (
            <header className="ws-order-details__header">
                <h1 className="ws-order-details__header__title">
                    Takk for bestillingen!
                </h1>

                <div className="ws-order-details__header__text">
                    <p>
                        Bekreftelse er sendt på epost.
                        {" "}
                        Du vil få en SMS på <strong>{user.currentMember.mobile}</strong> når varene
                        {" "}
                        <Only if={orderUi.handoverInfo.handoverType === HandoverType.Delivery} wrapper="span">er på vei til deg.</Only>
                        <Only if={orderUi.handoverInfo.handoverType !== HandoverType.Delivery} wrapper="span">er klar til henting.</Only>
                        {" "}
                        Du finner bestillingen din under Mine bestillinger.
                    </p>
                    <Only if={moment(orderUi.handoverInfo.deadline).isAfter()} wrapper="div">
                        <p className="ws-order-details__header__can-edit">Bestillingen kan endres frem til {moment(orderUi.handoverInfo.deadline).calendar(null, RelativeCalendarFormats)}.</p>
                        <ExternalLink
                            className="ws-order-details__header__can-edit-link"
                            root={Urls.MenyWebShop}
                            to={`/profil/bestilling/${orderUi.ngOrderId}?status=OPEN`}
                        >
                            Endre bestilling på meny.no
                        </ExternalLink>
                    </Only>
                </div>
            </header>
        )
    }
}
