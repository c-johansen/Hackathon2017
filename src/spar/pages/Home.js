import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader />
                </App.Header>
                <App.Main>
                    <div className="container">
                        <p>Dette er starten til Spars app</p>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
