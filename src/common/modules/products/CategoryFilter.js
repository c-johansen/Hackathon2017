import React, { PureComponent } from "react"
import Button from "../shared/Button"
import { uniqueArray } from "../../data/parsers/generic"

export default class CategoryFilter extends PureComponent {
    static defaultProps = {
        offers: []
    }
    render() {
        let { offers, activeCategory, setCategory } = this.props
        let categories = uniqueArray(offers.map(i => i.categoryName))

        if (categories.length < 2) {
            return null
        }

        return (
            <fieldset className="filter">
                <legend className="ws-visually-hidden">Filtrer på varekategori</legend>
                <ul className="filter__inner" onScroll={(e) => e.stopPropagation()}>
                    <li className={"filter__inner__element " + (activeCategory === null ? "filter__inner__element--hi" : "")}>
                        <Button
                            aria-current={activeCategory === null}
                            className="ws-button"
                            onClick={setCategory.bind(null, null)}>
                            <em>Alt</em>
                        </Button>
                    </li>
                    {categories.map(category => (
                        <li key={category} className={"filter__inner__element " + (category === activeCategory ? "filter__inner__element--hi" : "")}>
                            <Button
                                aria-current={category === activeCategory}
                                className="ws-button"
                                onClick={setCategory.bind(null, category)}>
                                <span className="ws-visually-hidden">{category === activeCategory ? "Fjern filter " : ""}</span>
                                <em>{category}</em>
                            </Button>
                        </li>
                    ))}
                </ul>
            </fieldset>
        )
    }
}
