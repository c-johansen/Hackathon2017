import React from "react"
import { connect } from "react-redux"

export class EmptySearchPoster extends React.PureComponent {
    render() {
        return (
            <div className="empty-search-poster">
                <div className="generic-poster">
                    <h2 className="generic-poster__title generic-poster__title--red">Finner ingen varer</h2>
                    <p className="generic-poster__subtitle">Prøv å juster søket ditt. Vi skal ha ganske godt utvalg, men <em>{this.props.query}</em> ble vanskelig.</p>
                </div>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            query: store.products.query
        }
    }
)(EmptySearchPoster)
