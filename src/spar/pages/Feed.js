import React, { PureComponent } from "react"
import HomeHeader from "../HomeHeader"
import { App } from "../../common/modules/app/markup"
import Link from "../../common/modules/shared/Link"
import Icon, { IconType } from "../../common/modules/shared/Icon"

export default class Home extends PureComponent {
    render() {
        return (
            <App.Top>
                <App.Header>
                    <HomeHeader title="Tilbud" />
                </App.Header>
                <App.Main>
                    <div className="joker-campaign-big">
                        <Link to="/feed/taco">
                            <img src="/images/kampanje.png" />
                            <p>Se alle tilbud <Icon type={IconType.ChevronRight} /></p>
                        </Link>
                    </div>
                    <div className="joker-campaign-big">
                        <img src="/images/junior.png" />
                        <p>Se alle tilbud <Icon type={IconType.ChevronRight} /></p>
                    </div>
                </App.Main>
            </App.Top>
        )
    }
}
