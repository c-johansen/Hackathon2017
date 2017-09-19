import React, { Component } from "react"

// Components
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"

export default class List extends Component {
    render() {
        return (
            <div className="list">
                <h2 className="list__title">Siste kjøpt</h2>
                <p className="list__counter sub">23 varer i listen</p>
                {this.props.showPrice ? <p className="list__price">234 kr</p> : null}
                <div className="list__button">
                    <Button>
                        <Icon type={IconType.ListOpenCircleFilled} />
                    </Button>
                </div>
            </div>
        )
    }
}
