import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"

export default class Home extends PureComponent {
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
                        <img className="spinthewheel" src="/images/wheel_test.jpg" />
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
