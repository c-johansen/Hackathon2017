import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
import { withRouter } from "react-router"
import Dialog from "../../common/modules/shared/RawDialog"

export class Home extends PureComponent {
    state = { hasClicked: false, showPrize: false };

    goToOffers() {
        this.setState({ showPrize: false });
        this.props.history.push("/feed");
    }
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Sparehjulet" />
                </App.Header>
                <App.Main>
                    <div className="container bodyText">
                        <p>Wheel</p>
                        <img className="wheelArrow" src="/images/arrow_down_red.png" />
                        <img className={this.state.hasClicked ? "spinthewheel wheel" : "waiting wheel"}
                            onClick={() => this.setState({ hasClicked: true })} src="/images/sparhjulet_small.jpg"
                            onAnimationEnd={() => this.setState({ showPrize: true })} />

                        <Dialog className="bodyText" isOpen={this.state.showPrize} close={() => this.setState({ showPrize: false })}>
                            <h1 className="title">Gratulerer!</h1>
                            <p>Vi spanderer en boks Grønne druer fra Bama ved ditt neste kjøp</p>
                            <img src="/images/druer.jpg" className="prizeImage" />
                            <p>Du finner premien din under "Mine favortitter"</p>
                            <div>
                                <button type="button" className="ws-button ws-button--wide ws-button--red"
                                    onClick={this.goToOffers.bind(this)}> Se våre tilbud</button>
                            </div>

                        </Dialog>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}

export default withRouter(Home)
