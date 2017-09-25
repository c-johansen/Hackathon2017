import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
import { withRouter } from "react-router"
import Only from "../../common/modules/shared/Only"
import Icon, { IconType } from "../../common/modules/shared/Icon"

export class Home extends PureComponent {
    state = { hasClicked: false, showPrize: false };

    goToOffers() {
        this.setState({ showPrize: false })
        this.props.history.push("/feed")
    }
    render() {
        return (
            <App.Top>
                <App.Main extended>
                    <div className="container   wheely">
                        <img className="wheel-logo" src="/images/lykkelogo.svg" />

                        <Only if={this.state.showPrize}>
                            <div className="prize">
                                <div className="prize__title">Gratulerer! 🎉 </div>
                                <Icon type={IconType.TrumfLogo} />
                                <div>Du får <strong>3 %</strong> ekstra Trumf-bonus neste gang du handler hos SPAR!</div>
                            </div>

                            <button type="button" className="spinny ws-button ws-button--wide ws-button--white" onClick={this.goToOffers.bind(this)}> Se våre tilbud <Icon type={IconType.ChevronRight} /></button>
                        </Only>

                        <Only if={!this.state.showPrize}>
                            <img src="/images/pil.svg" className={"spar-pin " + (this.state.hasClicked ? "tick" :"")} style={{ zIndex: "1", position: "relative", display: "block", margin: "0 auto -1em" }} />
                            <img className={this.state.hasClicked ? "spinthewheel wheel" : "waiting wheel"}
                                src="/images/hjul_ny.png"
                                onAnimationEnd={() => setTimeout(() => this.setState({ showPrize: true }), 700)} />

                            <button onClick={() => this.setState({ hasClicked: true })} type="button" className="spinny ws-button ws-button--wide ws-button--white">Spinn &amp; vinn</button>
                        </Only>

                    </div>
                </App.Main>
            </App.Top>
        )
    }
}

export default withRouter(Home)
