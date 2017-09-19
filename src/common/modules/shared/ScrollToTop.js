import React, { Component } from "react"
import animateProp from "animate-prop"
import EventBridge from "../../data/EventBridge"
import NativeEvent from "../../data/events/NativeEvent"

export class ScrollAnchor extends Component {
    render() {
        return (
            <div id="scroll-top" />
        )
    }
}

export class ScrollToTopLink extends Component {
    eventId = null

    componentDidMount(){
        this.eventId = EventBridge.listen(NativeEvent.StatusBarClicked, () => this.onClick(), false)
    }
    componentWillUnmount(){
        EventBridge.unlisten(this.eventId)
    }
    onClick() {
        try {
            let target

            if (this.props.target) {
                target = document.querySelector(this.props.target)
            } else {
                target = document.getElementById("scroll-top").parentElement
            }

            // if a touch based scroll is in progress, cancel it now
            target.style["-webkit-overflow-scrolling"] = "auto"

            animateProp(
                target,
                "scrollTop",
                0,
                300,
                (progress) =>  Math.sin(Math.PI / 2 * progress),
                () => target.style["-webkit-overflow-scrolling"] = "touch"
            )
        } catch (e) {
            // nothing to do here
        }
    }
    render() {
        return (
            <div className="scroll-to-top-link" onClick={this.onClick.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}

