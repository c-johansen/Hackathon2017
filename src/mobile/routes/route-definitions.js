import React from "react"
import { Route, Redirect } from "react-router-dom"
import Feed from "../../spar/pages/Feed"
import Vouchers from "../../spar/pages/Vouchers"
import Wheel from "../../spar/pages/Wheel"
import Favorites from "../../spar/pages/Favorites"
import NotFound from "./NotFound"

let i = 0

export default [
    <Route path={"/feed"} key={i++}>
        <Feed />
    </Route>,
    <Route path={"/favorites"} key={i++}>
        <Favorites />
    </Route>,
    <Route path={"/vouchers"} key={i++}>
        <Vouchers />
    </Route>,
    <Route path="/" exact key={i++}>
        <Wheel />
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
