import React, { Component } from "react"
import HandoverType from "../../data/const/HandoverType"
import Panel from "../shared/Panel"

export default class StoreInfo extends Component {
    render() {
        let { store, handoverType } = this.props

        if (!store || handoverType === HandoverType.Delivery) {
            return null
        }

        return (
            <Panel title={`Informasjon om ${store.name}`}>
                <p>
                    <strong>{store.name}</strong><br />
                    {store.address}<br />
                    {store.postalCode} {store.city}<br />
                    <a href="tel:{store.phoneNumber}">{store.phoneNumber}</a>
                </p>
                {store.gln === store.pickupGln && (
                    <p>
                        <strong>{store.carPickupPoint ? "Utlevering til bil" : "Utlevering i butikk"}</strong><br />
                        {store.carPickupPointDescription && (
                            <span>
                                {store.carPickupPointDescription}
                            </span>
                        )}
                    </p>
                )}
            </Panel>
        )
    }
}
