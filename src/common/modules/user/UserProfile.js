import React, { Component } from "react"
import { connect } from "react-redux"
import Urls from "../../data/const/Urls"
import { logOut } from "../../data/store/actions/user"
import Button from "../shared/Button"
import ExternalLink from "../shared/ExternalLink"
import FormatHelper from "../../helpers/FormatHelper"
import Icon, { IconType } from "../shared/Icon"
import { getPaymentAgreements } from "../../data/store/actions/checkout"
import UserProfileAlternativeAddress from "./UserProfileAlternativeAddress"
import UserProfileContactDetails from "./UserProfileContactDetails"

export class UserProfile extends Component {
    componentWillMount() {
        this.props.getPaymentAgreements()
    }
    render() {
        let { user, checkout } = this.props

        if (!user || !user.currentMember || !user.household) {
            return null
        }

        return (
            <div>
                <div className="trumf-heading">
                    <div className="trumf-heading__icon">
                        <Icon type={IconType.TrumfLogo} />
                    </div>
                    <h2 className="trumf-heading__title">Informasjon fra Trumf</h2>
                    <p>Trumf-saldo: <strong>{FormatHelper.formatPrice(user.household.trumfBalance)} kr</strong></p>
                </div>
                <div className="profile-block">
                    <ul className="actions actions--blue">
                        <li className="actions__element">
                            <ExternalLink root={Urls.MenyWeb} to="/min-side">
                                Oppdater Trumf-profilen din på meny.no
                            </ExternalLink>
                        </li>
                        <li className="actions__element">
                            <ExternalLink root={Urls.MenyWeb} to="/min-side/bonusuttak/">
                                Bruk Trumf-bonus på meny.no
                            </ExternalLink>
                        </li>
                    </ul>
                </div>

                <UserProfileContactDetails />

                <UserProfileAlternativeAddress />

                <div className="profile-block">
                    <h2 className="profile-block__title">Mine kort i nettbutikken</h2>
                    {!checkout.paymentAgreements.data || !checkout.paymentAgreements.data.length && (
                        <p>Du har ingen betalingskort</p>
                    )}
                    {checkout.paymentAgreements.data && checkout.paymentAgreements.data.length && (
                        <ul className="stripe-list">
                            {checkout.paymentAgreements.data.map(i => {
                                return (
                                    <li key={i.internalId} className="stripe-list__element">
                                        <div className="stripe-list__element__left">
                                            {i.name}
                                        </div>
                                        <div className="stripe-list__element__right stripe-list__element--lo">
                                            {i.maskedCreditCardNumber}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>

                <div className="profile-block">
                    <h2 className="profile-block__title">Mine kort og kontonummer for bonussparing</h2>

                    <ul className="stripe-list">
                        {user.currentMember.media && user.currentMember.media.map(i => {
                            return (
                                <li key={i.cardNumber} className="stripe-list__element">
                                    <div className="stripe-list__element__left">
                                        {i.cardType}
                                    </div>
                                    <div className="stripe-list__element__right stripe-list__element--lo">
                                        {i.cardNumberMasked}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="profile-block">
                    <ul className="actions">
                        <li className="actions__element">
                            <ExternalLink root={Urls.MenyWeb} to="/Om-MENY/Personvern-minmeny/">
                                Personvern
                            </ExternalLink>
                        </li>
                        <li className="actions__element">
                            <Button className="button">
                                Slik fungerer appen <span className="text-light">(se video)</span>
                                <Icon type={IconType.ChevronRight} />
                            </Button>
                        </li>
                        <li className="actions__element">
                            <ExternalLink root="https://faq.socialboards.no" to="/meny">
                                Gi tilbakemelding
                            </ExternalLink>
                        </li>
                    </ul>
                </div>

                <div className="container">
                    <Button onClick={this.props.logOut} className="ws-button ws-button--red ws-button--wide">Logg ut</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user.data,
            checkout: store.checkout
        }
    },
    dispatch => {
        return {
            logOut: () => dispatch(logOut()),
            getPaymentAgreements: () => dispatch(getPaymentAgreements(true))
        }
    }
)(UserProfile)
