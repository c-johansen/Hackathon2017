import React, { Component } from "react"
import Link from "../shared/Link"
import Only from "../shared/Only"
import Icon, { IconType } from "../shared/Icon"
import HorizontalScroller from "../shared/HorizontalScroller"
import { connect } from "react-redux"
import { all } from "../../data/store/actions/offerCampaigns"
import OfferCampaignType from "../../data/const/OfferCampaignType"
import { CloudinaryImages } from "@ng-mw/framework-core"

export class CampaignsList extends Component {
    static defaultProps = {
        type: OfferCampaignType.All
    }
    componentWillMount() {
        this.props.all()
    }
    getTitle(type) {
        switch (type) {
            case OfferCampaignType.Generic:
                return "Tilbuds-kampanje"
            case OfferCampaignType.Bargain:
                return "Knallkjøp-kampanje"
            case OfferCampaignType.All:
                return "Kampanjer"
        }
    }
    getUrl(imageId) {
        if (!imageId) {
            return null
        }

        return CloudinaryImages.getImageUrl({ width: 600, filename: imageId })
    }
    render() {
        let { type, offerCampaigns } = this.props
        let filteredCampaigns = offerCampaigns.data.filter(i => type === OfferCampaignType.All ? true : i.offerType === type)

        if (!filteredCampaigns.length) {
            return null
        }

        return (
            <fieldset className="offer-campaign-list">
                <legend className="ws-visually-hidden">{this.getTitle(type)}</legend>

                <Only if={filteredCampaigns.length === 1}>
                    <div
                        style={{ backgroundImage: `url(${this.getUrl(filteredCampaigns[0].imageId)})` }}
                        className="offer-campaign-list__element offer-campaign-list__element--solo">
                        <Link
                            state={{ campaignName: filteredCampaigns[0].marketTextLong || filteredCampaigns[0].marketText }}
                            to={`/savings/campaigns/${filteredCampaigns[0].campaignId}`}>
                            <span className="offer-campaign-list__element__title">
                                {filteredCampaigns[0].marketTextLong || filteredCampaigns[0].marketText} <Icon type={IconType.ChevronRight} />
                            </span>
                        </Link>
                    </div>
                </Only>
                <Only if={filteredCampaigns.length > 1}>
                    <HorizontalScroller>
                        {filteredCampaigns.map(i => (
                            <div
                                key={i.campaignId}
                                style={{ backgroundImage: `url(${this.getUrl(i.imageId)})` }}
                                className="offer-campaign-list__element">
                                <Link
                                    state={{ campaignName: i.marketTextLong || i.marketTextLong }}
                                    to={`/savings/campaigns/${i.campaignId}`}>
                                    <span className="offer-campaign-list__element__title">
                                        {i.marketTextLong || i.marketText} <Icon type={IconType.ChevronRight} />
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </HorizontalScroller>
                </Only>
            </fieldset>
        )
    }
}

export default connect(
    store => {
        return {
            offerCampaigns: store.offerCampaigns
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all())
        }
    }
)(CampaignsList)
