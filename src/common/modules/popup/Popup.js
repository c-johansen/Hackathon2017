import React, { Component } from "react"
import PropTypes from "prop-types"
import { CSSTransitionGroup as TransitionGroup } from "react-transition-group"
import PopupWrapper from "./PopupWrapper"

let zIndex = 1
let animDuration = 450

export default class Popup extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        counter: PropTypes.number.isRequired,
        partial: PropTypes.bool,
        children: PropTypes.element.isRequired,
        animateIn: PropTypes.bool,
        animateOut: PropTypes.bool
    }
    static defaultProps = {
        animateIn: true,
        animateOut: true,
        partial: true
    }
    zIndex = ++zIndex

    componentWillMount() {
        this.zIndex = ++zIndex
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.counter !== this.props.counter) {
            this.zIndex = ++zIndex
            this.forceUpdate()
        }
    }

    render() {
        let props = this.props

        return (
            <div>
                <TransitionGroup
                    component="div"
                    transitionName="fade"
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}>
                    {props.isOpen ? <div className="popup-background" style={{ zIndex: this.zIndex }} /> : null}
                </TransitionGroup>
                <TransitionGroup
                    component="div"
                    transitionName="slide"
                    transitionEnter={props.animateIn}
                    transitionLeave={props.animateOut}
                    transitionEnterTimeout={animDuration}
                    transitionLeaveTimeout={animDuration}>
                    {props.isOpen ? <PopupWrapper zIndex={this.zIndex} {...props}>{props.children}</PopupWrapper> : null}
                </TransitionGroup>
            </div>
        )
    }
}

