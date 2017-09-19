import React from "react"
import { formatNumber } from "../../helpers/FormatHelper"

export default class NutritionalContent extends React.PureComponent {
    render() {
        let nutritionalContent = this.props.nutritionalContent || []

        return (
            <ul className="nutritional-content">
                {nutritionalContent.map(n => <li key={n.name}><strong>{n.displayName}:</strong> {formatNumber(n.amount, 1)} {n.unit} </li>)}
            </ul>
        )
    }
}
