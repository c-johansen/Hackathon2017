import React, { Component } from "react"
import TabNav from "../app/TabNav"
import InstantLink from "../shared/InstantLink"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { reset as resetGenericOffersFilter } from "../../data/store/actions/genericOffers"
import { reset as resetBargainOffersFilter } from "../../data/store/actions/bargainOffers"

export class SavingsNav extends Component {
    resetGenericOffers() {
        let { pathname } = this.props.location

        if (pathname === "/savings/generic-offers") {
            this.props.clearGenericOffersFilter()
        }
    }
    resetBargainOffers() {
        let { pathname } = this.props.location

        if (pathname === "/savings/bargain-offers") {
            this.props.clearBargainOffersFilter()
        }
    }
    render() {
        return (
            <TabNav>
                <InstantLink to="/savings/generic-offers" onClick={this.resetGenericOffers.bind(this)}>Tilbud</InstantLink>
                <InstantLink to="/savings/bargain-offers" onClick={this.resetBargainOffers.bind(this)}>Knallkjøp</InstantLink>
                <InstantLink to="/savings/vouchers">Kuponger</InstantLink>
            </TabNav>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            resetGenericOffersFilter: () => dispatch(resetGenericOffersFilter()),
            resetBargainOffersFilter: () => dispatch(resetBargainOffersFilter())
        }
    }
)(withRouter(SavingsNav))
