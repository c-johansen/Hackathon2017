import React, { PureComponent } from "react"
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"

export default class FacetFilter extends PureComponent {
    render() {
        let { categories, activeCategory, setFilter } = this.props

        if (categories.length <= 1) {
            return null
        }

        return (
            <fieldset className="filter">
                <legend className="ws-visually-hidden">Filtrer søk</legend>
                <div className="filter__reset-button">
                    <Button
                        aria-current={!activeCategory}
                        className={"filter-button " + (!activeCategory ? "filter-button--hi" : "")}
                        onClick={setFilter.bind(null, { category: null })}>
                        Alle
                    </Button>
                </div>
                <ul className="filter__inner" onScroll={(e) => e.stopPropagation()}>
                    {categories.map(category => (
                        <li key={category.name} className={"filter__inner__element"}>
                            <Button
                                aria-current={category.name === activeCategory}
                                className={"filter-button " + (category.name === activeCategory ? "filter-button--hi" : "")}
                                onClick={setFilter.bind(null, { category: category.name === activeCategory ? null : category.name })}>
                                <span className="ws-visually-hidden">
                                    {category.name === activeCategory ? "Fjern filter " : ""}
                                </span>
                                <em>{category.name}</em>
                                {category.name === activeCategory ? <Icon type={IconType.X} circle /> : null}
                            </Button>
                        </li>
                    ))}
                </ul>
            </fieldset>
        )
    }
}
