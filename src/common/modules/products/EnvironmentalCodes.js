import React from "react"
import Icon, { IconType } from "../shared/Icon"

class EnvironmentalCode extends React.Component {
    getSource(name, code) {
        switch (name) {
            case "bio":
                return null
            case "brodskalaen":
                return {
                    icon: <Icon type={"matmerk-brod-" + code.toLowerCase()} />,
                    name: `Brødskalaen — ${code.toLowerCase()}`
                }
            case "euokologi":
                return {
                    icon: <Icon type={IconType.MatmerkEuEco} />,
                    name: "Eukologi"
                }
            case "firstprice":
                return {
                    icon: <Icon type={IconType.MatmerkFirstPrice} />,
                    name: "FirstPrice"
                }
            case "krav":
                return {
                    icon: <Icon type={IconType.MatmerkKrav} />,
                    name: "Krav"
                }
            case "nokkelhullet":
                return {
                    icon: <Icon type={IconType.MatmerkNokkelhull} />,
                    name: "Nøkkelhullet"
                }
            case "nyt_norge":
                return {
                    icon: <Icon type={IconType.MatmerkNytNorge} />,
                    name: "Nyt Norge"
                }
            case "okologisk":
                return {
                    icon: <Icon type={IconType.MatmerkDebioEco} />,
                    name: "Økologisk"
                }
            case "svanen":
                return {
                    icon: <Icon type={IconType.MatmerkSvanen} />,
                    name: "Svanen"
                }
        }
    }
    render() {
        let code = this.getSource(this.props.name, this.props.code)

        if (!code) {
            return null
        }

        return (
            <div className="environmental-code">
                <span className="ws-visually-hidden">{code.name}</span>
                <span className="environmental-code__image">{code.icon}</span>
            </div>
        )
    }
}

export default class EnvironmentalCodes extends React.PureComponent {
    recognized = [
        "bio", "brodskalaen", "svanen", "okologisk", "nyt_norge", "nokkelhullet", "krav", "firstprice", "euokologi"
    ]
    render() {
        let environmentalCodes = (this.props.environmentalCodes || []).filter(i => this.recognized.includes(i.name))

        if (!environmentalCodes.length) {
            return null
        }

        return (
            <div className="environmental-codes">
                <ul className="environmental-codes-wrapper">
                    {environmentalCodes.map(i => <li key={i.name || i.code}><EnvironmentalCode {...i} /></li>)}
                </ul>
            </div>
        )
    }
}
