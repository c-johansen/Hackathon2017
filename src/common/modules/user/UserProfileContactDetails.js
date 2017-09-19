import React, { Component } from "react"
import { connect } from "react-redux"

export class UserProfileContactDetails extends Component {
    render() {
        let { user } = this.props

        if (!user || !user.currentMember || !user.household) {
            return null
        }

        return (
            <div className="profile-block">
                <h2 className="profile-block__title">Mine kontaktdetaljer</h2>
                <ul>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__left">
                            E-post
                        </div>
                        <div className="stripe-list__element__right stripe-list__element--lo">
                            {user.currentMember.email}
                        </div>
                    </li>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__left">
                            Mobil
                        </div>
                        <div className="stripe-list__element__right stripe-list__element--lo">
                            {user.currentMember.mobile}
                        </div>
                    </li>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__left">
                            Adresse
                        </div>
                        <div className="stripe-list__element__right stripe-list__element--lo">
                            {user.household.address}<br />
                            {user.household.postalCode} {user.household.city}
                        </div>
                    </li>
                    <li className="stripe-list__element">
                        <div className="stripe-list__element__left">
                            Kommentar til sjåfør
                        </div>
                        <div className="stripe-list__element__right stripe-list__element--lo">
                            {user.household.deliveryComment  || <em>Ingen kommentar</em>}
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user.data,
        }
    },
)(UserProfileContactDetails)
