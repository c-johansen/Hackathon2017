import React, { Component } from "react"
import { connect } from "react-redux"
import Only from "../shared/Only"

export class UserProfileAlternativeAddress extends Component {
    static defaultProps = {
        user: null,
        showDeliveryComment: true
    }
    render() {
        let { user, showDeliveryComment } = this.props

        if (!user || !user.household) {
            return null
        }

        return (
            <Only if={user.household.alternativeAddress || user.household.alternativePostalCode || user.household.alternativeCity}>
                <div className="profile-block">
                    <h2 className="profile-block__title">Annen leveringsadresse</h2>
                    <ul>
                        <li className="stripe-list__element">
                            <div className="stripe-list__element__left">
                                Navn
                            </div>
                            <div className="stripe-list__element__right stripe-list__element--lo">
                                {user.household.alternativeFirstName} {user.household.alternativeLastName}
                            </div>
                        </li>
                        <li className="stripe-list__element">
                            <div className="stripe-list__element__left">
                                Adresse
                            </div>
                            <div className="stripe-list__element__right stripe-list__element--lo">
                                {user.household.alternativeAddress}<br />
                                {user.household.alternativePostalCode} {user.household.alternativeCity}
                            </div>
                        </li>
                        {showDeliveryComment && (
                            <li className="stripe-list__element">
                                <div className="stripe-list__element__left">
                                    Kommentar til sjåfør
                                </div>
                                <div className="stripe-list__element__right stripe-list__element--lo">
                                    {user.household.alternativeDeliveryComment || <em>Ingen kommentar</em>}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </Only>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user.data,
        }
    },
)(UserProfileAlternativeAddress)
