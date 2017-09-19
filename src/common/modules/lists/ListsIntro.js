import React, { Component } from "react"
import List from "./List"
import ButtonTitle from "../shared/ButtonTitle"
import HorizontalScroller from "../shared/HorizontalScroller"

export default class ListsBlock extends Component {
    render() {
        return (
            <div className="scroll-block scroll-block--gray">
                <ButtonTitle title="Dine lister" url="/lists" />
                <HorizontalScroller small={true}>
                    <List />
                    <List />
                    <List />
                </HorizontalScroller>
            </div>
        )
    }
}

