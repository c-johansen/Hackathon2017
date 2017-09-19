import React, { Component } from "react"
import { App } from "../../app/markup"
import { withRouter } from "react-router"
import BackHeader from "../../app/BackHeader"
import CartButton from "../../cart/CartButton"
import { ScrollAnchor, ScrollToTopLink } from "../../shared/ScrollToTop"
import OfferCampaignDetails from "../OfferCampaignDetails"

export class GenericOfferCampaign extends Component {
    render() {
        let { campaignName } = this.props.location.state
        let campaignId = this.props.match.params.id

        return (
            <App.Top>
                <App.Header>
                    <ScrollToTopLink>
                        <BackHeader title={campaignName} >
                            <CartButton />
                        </BackHeader>
                    </ScrollToTopLink>
                </App.Header>
                <App.Main>
                    <ScrollAnchor />
                    <h1 className="ws-visually-hidden">{campaignName}</h1>
                    <OfferCampaignDetails campaignId={campaignId} />
                </App.Main>
            </App.Top>
        )
    }
}

export default withRouter(GenericOfferCampaign)
