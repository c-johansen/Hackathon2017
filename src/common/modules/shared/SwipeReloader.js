import React, { Component } from "react"
import css from "classnames"
import Only from "./Only"
import Icon, { IconType } from "./Icon"
import Button from "./Button"

export default class SwipeReloader extends Component {
    static defaultProps = {
        action: () => { },
        loading: false,
        enabled: true
    }
    state = {
        y: 0,
        dy: 0,
        isTouching: false,
        isPullingDown: null,
        distance: 0,
        activated: false,
        startedScrolling: false,
        done: false,
        triggered: false
    }
    ref = null
    tid = null
    actionThreshold = window.screen.height / 2

    componentWillReceiveProps(props) {
        if (!props.loading && this.state.activated && this.props.enabled) {
            this.setState({ done: true })
        }
    }
    onTouchStart(e) {
        if (!this.props.enabled) {
            return
        }

        this.setState({
            y: e.touches[0].clientY,
            isTouching: true,
            startedScrolling: this.ref.scrollTop > 0
        })
    }
    onTouchMove(e) {
        if (this.state.startedScrolling || !this.props.enabled) {
            return
        }

        let dy = e.touches[0].clientY - this.state.y

        if (this.state.isPullingDown === null) {
            this.setState({
                isPullingDown: dy > 0
            })
        } else if (this.state.isPullingDown === true) {
            let distance = dy
            let activated = this.state.dy > this.actionThreshold

            if (activated & !this.state.activated) {
                this.props.action()
                this.setState({
                    triggered: true
                })
            }

            this.setState({
                dy,
                distance,
                activated
            })
        }

        if (this.state.isPullingDown) {
            e.preventDefault()
            e.stopPropagation()
        }
    }
    onTouchEnd() {
        if (!this.props.enabled) {
            return
        }

        this.setState({
            y: 0,
            dy: 0,
            isTouching: false,
            distance: 0,
            isPullingDown: null,
            startedScrolling: false,
            activated: false,
            triggered: false,
            done: false
        })
    }
    render() {
        let barCount = 12
        let bars = []
        let progress = (this.state.distance) / this.actionThreshold

        for (let i = 0; i < barCount; i++) {
            bars.push(
                <div
                    key={i}
                    style={{ transform: `rotate(${i / barCount * 360}deg)` }}
                    className={css("swipe-reloader-trigger__inner__spinner__bar", { "swipe-reloader-trigger__inner__spinner__bar--active": progress > i / 12 })} />
            )
        }

        return (
            <div
                ref={ref => this.ref = ref}
                className="swipe-reloader"
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}>
                <div
                    className={css("swipe-reloader-trigger", { "swipe-reloader-trigger--touching": this.state.isTouching })}
                    style={{ height: this.state.distance / 2 }}>
                    <Button onClick={this.props.action} className="ws-visually-hidden">Oppdater</Button>
                    <div
                        className="swipe-reloader-trigger__inner"
                        style={{ opacity: progress - .25 }}>
                        <Only if={!this.state.done}>
                            <div className={css("swipe-reloader-trigger__inner__spinner", { "swipe-reloader-trigger__inner__spinner--spinning": this.state.triggered && !this.state.done })}>
                                {bars}
                            </div>
                        </Only>
                        <Only if={this.state.triggered && this.state.done}>
                            <div className="swipe-reloader-trigger__inner__done" aria-live="assertive">
                                <Icon type={IconType.Checkmark} />
                                <span className="ws-visually-hidden">Oppdatert!</span>
                            </div>
                        </Only>
                    </div>
                </div>

                {this.props.children}
            </div>
        )
    }
}

