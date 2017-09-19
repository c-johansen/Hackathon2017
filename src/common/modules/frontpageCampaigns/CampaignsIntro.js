import React, { Component } from "react"
import { all } from "../../data/store/actions/campaigns"
import { connect } from "react-redux"
import Campaign from "./Campaign"

export class CampaignsIntro extends Component {
    componentWillMount() {
        this.props.all()
    }
    render() {
        let { data } = this.props.campaigns

        return (
            <div className="campaigns-intro">
                <h2 className="ws-visually-hidden">Kampanjer</h2>
                {data.map(i => <Campaign key={i.campaignId} campaign={i} />)}
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            campaigns: state.campaigns
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all())
        }
    }
)(CampaignsIntro)
