import React, { Component } from "react"
import ButtonTitle from "../shared/ButtonTitle"
import HorizontalScroller from "../shared/HorizontalScroller"
import Recipe from "./Recipe"
import { connect } from "react-redux"
import { all } from "../../data/store/actions/recipes"

export class RecipesIntro extends Component {
    componentWillMount(){
        if (!this.props.recipes.data.length) {
            this.props.all()
        }
    }
    render() {
        if (this.props.recipes.loading) {
            return null
        }

        return (
            <div className="recipes-intro block">
                <ButtonTitle title="Middagstips" />
                <HorizontalScroller>
                    {this.props.recipes.data.map(i => <Recipe key={i.id} recipe={i}/>)}
                </HorizontalScroller>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            recipes: store.recipes
        }
    },
    dispatch => {
        return {
            all: () => dispatch(all())
        }
    }
)(RecipesIntro)
