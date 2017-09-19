import React, { Component } from "react"
import TabNav from "../app/TabNav"
import InstantLink from "../shared/InstantLink"

export default class UserNav extends Component {
    render() {
        return (
            <TabNav>
                <InstantLink to="/user/orders">Mine bestillinger</InstantLink>
                <InstantLink to="/user/profile">Profil</InstantLink>
            </TabNav>
        )
    }
}
