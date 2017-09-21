import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"

export default class Home extends PureComponent {
    state = { hasClicked: false };
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Sparehjulet" />
                </App.Header>
                <App.Main>
                    <div className="container">
                        <p>Wheel</p>
                        <img className="wheelArrow" src="/images/arrow_down_red.png" />
                        <img className={this.state.hasClicked ? "spinthewheel wheel" : "waiting wheel"} onClick={() => this.setState({ hasClicked: true })} src="/images/wheel_test.jpg" />
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
