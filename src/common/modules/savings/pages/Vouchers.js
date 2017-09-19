import React, { Component } from "react"
import { App } from "../../app/markup"
import TitleHeader from "../../app/TitleHeader"
import CartButton from "../../cart/CartButton"
import OnlyGuest from "../../shared/OnlyGuest"
import OnlyAuth from "../../shared/OnlyAuth"
import Only from "../../shared/Only"
import LoginPoster from "../../auth/LoginPoster"
import SavingsNav from "../SavingsNav"
import Voucher from "../Voucher"
import { connect } from "react-redux"
import VoucherCategory from "../../../data/const/VoucherCategory"
import sortArray from "sort-array"
import { all, activate } from "../../../data/store/actions/vouchers"
import { ScrollAnchor, ScrollToTopLink } from "../../shared/ScrollToTop"

export class VouchersHome extends Component {
    componentWillMount() {
        this.props.all()
    }
    render() {
        let vouchers = sortArray(this.props.vouchers.data, "sortering")

        return (
            <App.Top>
                <App.Header extended={true}>
                    <ScrollToTopLink>
                        <TitleHeader title="Tilbud & fordeler" >
                            <CartButton />
                        </TitleHeader>
                        <SavingsNav />
                    </ScrollToTopLink>
                </App.Header>
                <App.Main restricted={true}>
                    <ScrollAnchor />
                    <div className="container">
                        <h1 className="ws-visually-hidden">Kuponger</h1>
                        <OnlyGuest>
                            <LoginPoster text="For å få tilgang til dine kuponger må du logge inn med Trumf" />
                        </OnlyGuest>
                        <OnlyAuth>
                            <p className="intro">
Kupongene er gyldige fra du aktiverer dem til utløpsdato, og rabatten gjelder for alle produktene på kupongen og et ubegrenset antall på én handel. Handler du kupongvarer i Nettbutikken vil du få rabatten når varene handles.</p>

                            <Only if={!this.props.vouchers.loading}>
                                {vouchers.map(i => <Voucher key={i.strekkode} voucher={i} activate={this.props.activate.bind(i.strekkode)} />)}
                            </Only>
                        </OnlyAuth>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}

export default connect(
    store => {
        return {
            vouchers: store.vouchers
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all()),
            activate: (barcode) => dispatch(activate(barcode))
        }
    }
)(VouchersHome)
