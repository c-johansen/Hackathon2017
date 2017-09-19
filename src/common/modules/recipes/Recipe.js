import React, { Component } from "react"
import Image from "../shared/Image"

export default class Recipe extends Component {
    render() {
        let recipe = this.props.recipe

        return (
            <div className="recipe">
                <div className="recipe__image">
                    <Image imageName={recipe.media.imageId} crop="fill" width={400} height={400} />
                </div>
                <div className="recipe__title-wrapper">
                    <h2 className="recipe__title">{recipe.name}</h2>
                </div>
            </div>
        )
    }
}
