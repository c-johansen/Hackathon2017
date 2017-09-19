import React, { Component } from "react"
import { App } from "../../app/markup"
import TitleHeader from "../../app/TitleHeader"
import CartButton from "../../cart/CartButton"
import OnlyGuest from "../../shared/OnlyGuest"
import OnlyAuth from "../../shared/OnlyAuth"
import LoginPoster from "../../auth/LoginPoster"
import UserNav from "../UserNav"
import UserProfile from "../UserProfile"
import { ScrollAnchor, ScrollToTopLink } from "../../shared/ScrollToTop"

export default class VouchersHome extends Component {
    render() {
        return (
            <App.Top>
                <App.Header extended={true}>
                    <ScrollToTopLink>
                        <TitleHeader title="Min oversikt">
                            <CartButton />
                        </TitleHeader>
                        <UserNav />
                    </ScrollToTopLink>
                </App.Header>
                <App.Main restricted={true}>
                    <ScrollAnchor />
                    <h1 className="ws-visually-hidden">Profil</h1>

                    <OnlyGuest>
                        <LoginPoster text="For å få tilgang til din profil må du logge inn med Trumf" />
                    </OnlyGuest>
                    <OnlyAuth>
                        <UserProfile />
                    </OnlyAuth>
                </App.Main>
            </App.Top>
        )
    }
}
