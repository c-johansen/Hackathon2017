import React, { Component } from "react"
import { SubstitutionTypeLabel } from "../../data/const/Order"

export default class OrderDetailsSubstitutions extends Component {
    render() {
        const { orderUi } = this.props

        if (!orderUi) {
            return null
        }

        return (
            <div className="ws-order-details__settings">
                <h2 className="ws-visually-hidden">Valg</h2>

                <h3 className="ws-order-details__settings__setting">Hva vil du at vi skal gjøre dersom en av varene er utsolgt?</h3>
                <p className="ws-order-details__settings__answer">
                    {SubstitutionTypeLabel[orderUi.substitutePreference] || ""}
                </p>

                <h3 className="ws-order-details__settings__setting">Har du noen beskjeder til den som skal plukke varene dine?</h3>
                <p className="ws-order-details__settings__answer">
                    {orderUi.substituteComment || "Ingen kommentar"}
                </p>
            </div>
        )
    }
}
