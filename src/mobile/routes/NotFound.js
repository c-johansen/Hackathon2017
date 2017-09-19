import React from "react"
import Icon, { IconType } from "../../common/modules/shared/Icon"
import Link from "../../common/modules/shared/Link"
import { App } from "../../common/modules/app/markup"

export default function NotFound() {
    return (
        <App.Top>
            <App.Main extended>
                <div className="not-found-poster">
                    <div className="generic-poster">
                        <div className="generic-poster__icon">
                            <Icon type={IconType.X} />
                        </div>
                        <h2 className="generic-poster__title">Ojsann</h2>
                        <p className="generic-poster__subtitle">Vi klarte ikke å finne siden du prøvde å navigere til.</p>
                        <Link to="/" className="ws-button ws-button--red">Ta meg hjem</Link>
                    </div>
                </div>
            </App.Main>
        </App.Top>
    )
}
