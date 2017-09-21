import React, { PureComponent } from "react"
import BackHeader from "../../common/modules/app/BackHeader"
import { App } from "../../common/modules/app/markup"
import Link from "../../common/modules/shared/Link"
import Icon, { IconType } from "../../common/modules/shared/Icon"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <BackHeader title="Taco-helg!" />
                </App.Header>
                <App.Main>
                    alle taco tilbud
                </App.Main>
            </App.Top>
        )
    }
}
