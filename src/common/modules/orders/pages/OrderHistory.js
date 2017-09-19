import React, { Component } from "react"
import { App } from "../../app/markup"
import TitleHeader from "../../app/TitleHeader"
import CartButton from "../../cart/CartButton"
import OnlyGuest from "../../shared/OnlyGuest"
import OnlyAuth from "../../shared/OnlyAuth"
import LoginPoster from "../../auth/LoginPoster"
import UserNav from "../../user/UserNav"
import OrdersList from "../OrdersList"
import { ScrollAnchor, ScrollToTopLink } from "../../shared/ScrollToTop"

export default class OrderHistory extends Component {
    render() {
        return (
            <App.Top>
                <App.Header extended>
                    <ScrollToTopLink>
                        <TitleHeader title="Min oversikt" >
                            <CartButton />
                        </TitleHeader>
                        <UserNav />
                    </ScrollToTopLink>
                </App.Header>
                <App.Main restricted >
                    <ScrollAnchor />
                    <OnlyGuest>
                        <LoginPoster text="For å få tilgang til dine bestillinger og muligheten til å velge ønsket utlevering for neste bestilling, må du logge inn med Trumf." />
                    </OnlyGuest>
                    <OnlyAuth>
                        <h1 className="ws-visually-hidden">Mine bestillinger</h1>
                        <OrdersList />
                    </OnlyAuth>
                </App.Main>
            </App.Top>
        )
    }
}
