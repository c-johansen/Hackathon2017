import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"
moment.locale("nb")
import { name as fwName, version as fwVersion, Environment as fwEnvirontment, Settings as fwSettings } from "@ng-mw/framework-core"
import { name as fwPsName, version as fwPsVersion } from "@ng-mw/framework-productsearch"

export class Debug extends Component {
    render() {
        const { currentMember, household, store } = this.props.user

        return (
            <div>
                {currentMember && (
                    <p className="ws-paragraph">
                        <strong className="ws-typo-header-s">{currentMember.displayName}</strong><br />
                        memberId: <strong>{currentMember.memberId}</strong><br />
                        {household && (
                            <span>householdId: <strong>{household.householdId}</strong></span>
                        )}
                    </p>
                )}
                {store && (
                    <p className="ws-paragraph">
                        <strong className="ws-typo-header-s">{store.name}</strong><br />
                        gln: <strong>{store.gln}</strong><br />
                        pickupGln: <strong>{store.pickupGln}</strong>
                    </p>
                )}
                <p className="ws-paragraph">
                    Environment: <strong>{fwEnvirontment[fwSettings.env]}</strong><br />
                    Framework {fwName}: <strong>{fwVersion}</strong><br />
                    Framework {fwPsName}: <strong>{fwPsVersion}</strong><br />
                    Built: <strong>{moment(process.env.LAST_BUILD).calendar()}</strong>
                </p>
                <h2 className="ws-typo-title">user:</h2>
                <pre style={{ "fontSize": "10px" }}>
                    {JSON.stringify(this.props.user, undefined, 3)}
                </pre>
                <h2 className="ws-typo-title">cart:</h2>
                <pre style={{ "fontSize": "10px" }}>
                    {JSON.stringify(this.props.cart, undefined, 3)}
                </pre>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            cart: store.cart,
            user: store.user.data,
            //checkoutOrder: checkoutOrderSelector(store),
        }
    }
)(Debug)
