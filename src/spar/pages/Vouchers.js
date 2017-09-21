import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Kuponger"/>
                </App.Header>
                <App.Main>
                    <div className="container">
                        <p>Kuponger her</p>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
