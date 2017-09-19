import React, { Component } from "react"
import { CloudinaryImages as fwCloudinaryImages } from "@ng-mw/framework-core"
import Link from "../shared/Link"

export default class Campaign extends Component {
    render() {
        let { campaign } = this.props
        let url = campaign.imageId ? fwCloudinaryImages.getImageUrl({
            width: 600,
            filename: campaign.imageId
        }) : null

        return (
            <Link to={`/campaigns/${campaign.campaignId}`} state={{ title: campaign.marketText }}>
                <div className="campaign" style={{ backgroundImage: `url(${url})` }}>
                    <div className="campaign__info">
                        <h2 className="campaign__title">{campaign.marketText}</h2>
                        <p className="campaign__description">{campaign.marketTextLong}</p>
                    </div>
                </div>
            </Link>
        )
    }
}
