import React from "react"
import { Route } from "react-router-dom"
import Debug from "../../common/modules/debug/pages/Debug"
import SparHome from "../../spar/pages/Home"
import NotFound from "./NotFound"

let i = 0

export default [
    <Route path={"/debug"} key={i++}>
        <Debug />
    </Route>,
    <Route path={"/"} key={i++}>
        <SparHome />
    </Route>,
    <Route key={i++}>
        <NotFound />
    </Route>
]


/*


<Route path={"/savings/bargain-offers"} key={i++}>
        <BargainOffers />
    </Route>,
    <Route path={"/savings/generic-offers"} key={i++}>
        <GenericOffers />
    </Route>,
    <Route path={"/savings/campaigns/:id"} key={i++}>
        <OfferCampaign />
    </Route>,
    <Route path={"/savings/vouchers"} key={i++}>
        <Vouchers />
    </Route>,
    <Route path={"/user/orders/:id"} key={i++}>
        <OrderItem />
    </Route>,
    <Route path={"/user/orders"} key={i++}>
        <OrderHistory />
    </Route>,
    <Route path={"/user/profile"} key={i++}>
        <UserProfile />
    </Route>,
    <Route path={"/search"} key={i++}>
        <Search />
    </Route>,


    */
