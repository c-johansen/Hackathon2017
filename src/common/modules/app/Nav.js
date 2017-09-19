import React from "react"
import Icon, { IconType } from "../shared/Icon"
import InstantLink from "../shared/InstantLink"
import Only from "../shared/Only"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { clearFilter as clearProductsFilter,  clearQuery as clearProductsQuery } from "../../data/store/actions/products"
import { clearFilter as clearMostPurchasedProductsFilter } from "../../data/store/actions/mostPurchasedProducts"
import { clearFilter as clearGenericOffersFilter } from "../../data/store/actions/genericOffers"
import css from "classnames"

export class Nav extends React.PureComponent {
    t = 0
    onTouchStart() {
        this.t = new Date()
    }
    onTouchEnd(e) {
        let td = new Date() - this.t

        if (td > 4500) {
            this.props.history.push("/debug")
            e.preventDefault()
        }
    }
    resetProductsSearch() {
        this.props.clearProductsFilter()
        this.props.clearProductsQuery()
        this.props.clearMostPurchasedProductsFilter()
    }
    resetGenericOffers(){
        this.props.clearGenericOffersFilter()
    }
    render() {
        const path = this.props.location.pathname
        const href = window.location.href
        const isVoucher = path.includes("/savings")
        const isUser = path.includes("/user")
        const isSearch = path === "/search"
        const isHome = !isVoucher && !isUser && !isSearch
        const isNotProduction = href.includes("localhost") ||
            href.includes("meny-react-dev.azurewebsites.net") ||
            parseInt(new URLSearchParams(window.location.search).get("env")) < 3

        return (
            <nav className="nav" role="navigation">
                <ul className="nav__menu">
                    <li
                        className={css("nav__menu__link", { "nav__menu__link--active": isHome })} >
                        <InstantLink to="/">
                            <span className="nav__menu__link__icon" style={{ width: 28 }}>
                                <Icon type={IconType.NavHome } />
                            </span>
                            <span className="nav__menu__link__text">
                                Hjem
                            </span>
                        </InstantLink>
                    </li>
                    <li className={css("nav__menu__link", { "nav__menu__link--active": isVoucher })}>
                        <InstantLink to="/savings/generic-offers" onClick={this.resetGenericOffers.bind(this)}>
                            <span className="nav__menu__link__icon" >
                                <Icon type={ IconType.NavSavings} />
                            </span>
                            <span className="nav__menu__link__text">
                                Fordeler
                            </span>
                        </InstantLink>
                    </li>
                    <li className={css("nav__menu__link", { "nav__menu__link--active": isUser })}>
                        <InstantLink to="/user/orders">
                            <span className="nav__menu__link__icon"  >
                                <Icon type={  IconType.NavProfile} />
                            </span>
                            <span className="nav__menu__link__text">
                                Min side
                            </span>
                        </InstantLink>
                    </li>
                    <Only if={isNotProduction} wrapper="li" className="nav__menu__link">
                        <InstantLink to="/debug">
                            <span className="nav__menu__link__icon" style={{ width: 22 }}>
                                <Icon type={IconType.Plus} />
                            </span>
                            <span className="nav__menu__link__text">
                                Debug info
                            </span>
                        </InstantLink>
                    </Only>
                </ul>
            </nav>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            clearProductsFilter: () => dispatch(clearProductsFilter()),
            clearProductsQuery: () => dispatch(clearProductsQuery()),
            clearMostPurchasedProductsFilter: () => dispatch(clearMostPurchasedProductsFilter()),
            clearGenericOffersFilter: () => dispatch(clearGenericOffersFilter())
        }
    }
)(withRouter(Nav))
