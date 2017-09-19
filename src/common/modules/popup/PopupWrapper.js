import React, { Component } from "react"
import PropTypes from "prop-types"
import css from "classnames"
import Icon, { IconType } from "../shared/Icon"
import Button from "../shared/Button"
import uuid from "uuid"

export default class PopupWrapper extends Component {
    static propTypes = {
        partial: PropTypes.bool,
        close: PropTypes.func.isRequired,
        children: PropTypes.element.isRequired
    }
    static defaultProps = {
        partial: true
    }
    id = "popup" + uuid.v4()
    maxTargetY = 200
    threshold = 115
    state = {
        y: 0,
        dy: 0,
        distance: 0,
        actionLocked: false,
        isTouching: false
    }

    onTouchStart(e) {
        if (!this.props.partial) {
            return
        }

        this.setState({
            y: e.touches[0].clientY,
            isTouching: true
        })
    }

    onTouchMove(e) {
        if (!this.props.partial || this.state.y > this.maxTargetY) {
            return
        }

        e.preventDefault()
        e.stopPropagation()

        let dy = e.touches[0].clientY - this.state.y

        this.setState({
            dy,
            distance: dy > 0 ? dy : 0,
            actionLocked: Math.abs(dy) > this.threshold && dy > 0
        })
    }

    onTouchEnd() {
        let locked = this.state.actionLocked && this.state.y < this.maxTargetY

        if (!this.props.partial) {
            return
        }

        if (locked) {
            this.props.close()
        }

        this.setState({
            y: locked ? this.state.y : 0,
            dy: locked ? this.state.dy : 0,
            actionLocked: false,
            isTouching: false,
            distance: locked ? this.state.distance : 0
        })
    }

    render() {
        return (
            <div
                role="dialog"
                aria-live="polite"
                id={this.id}
                aria-labelledby={this.props.headingId}
                className={css("popup", { "popup--partial": this.props.partial })}
                style={{ zIndex: this.props.zIndex }}>
                <div
                    style={{ transform: `translateY(${this.state.distance}px)` }}
                    className={css("popup__wrapper", { "popup__wrapper--touching": this.state.isTouching })}
                    onTouchMove={this.onTouchMove.bind(this)}
                    onTouchStart={this.onTouchStart.bind(this)}
                    onTouchEnd={this.onTouchEnd.bind(this)}>
                    {this.props.partial && (
                        <div className="popup__header">
                            <Button
                                className="popup__header-button"
                                aria-controls={this.id}
                                onClick={this.props.close}>
                                <Icon type={IconType.ChevronDown} />
                                <span className="ws-visually-hidden">Lukk</span>
                            </Button>
                        </div>
                    )}
                    {this.props.children}
                </div>
            </div>
        )
    }
}

