import React, { Component } from "react"
import { App } from "../../app/markup"
import TitleHeader from "../../app/TitleHeader"
import CartButton from "../../cart/CartButton"
import SavingsNav from "../SavingsNav"
import BargainOffersList from "../BargainOffersList"
import { ScrollAnchor, ScrollToTopLink } from "../../shared/ScrollToTop"

export default class WeeklyOffers extends Component {
    render() {
        return (
            <App.Top>
                <App.Header extended={true}>
                    <ScrollToTopLink target=".infinite-scroller">
                        <TitleHeader title="Tilbud & fordeler" >
                            <CartButton />
                        </TitleHeader>
                        <SavingsNav />
                    </ScrollToTopLink>
                </App.Header>
                <App.Main restricted={true}>
                    <ScrollAnchor />
                    <h1 className="ws-visually-hidden">Knallkjøp</h1>
                    <BargainOffersList />
                </App.Main>
            </App.Top>
        )
    }
}
