import React, { Component } from "react"
import PropTypes from "prop-types"
import css from "classnames"

export class Swiper extends Component {
    static propTypes = {
        activeIndex: PropTypes.number,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }
    static defaultProps = {
        activeIndex: 0
    }

    threshold = 65
    state = {
        activeIndex: this.props.activeIndex,
        maxIndex: this.props.children.length,
        x: 0,
        dx: 0,
        y: 0,
        isTouching: false,
        isLockedHorizontal: null
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ activeIndex: nextProps.activeIndex })
    }
    onTouchStart(e) {
        this.setState({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
    }
    onTouchMove(e) {
        if (this.state.isLockedHorizontal) {
            e.preventDefault()
            e.stopPropagation()

            let dx = e.touches[0].clientX - this.state.x
            let dy = e.touches[0].clientY - this.state.y

            this.setState({
                dx,
                dy,
                isTouching: true
            })
        } else if (this.state.isLockedHorizontal === null) {
            let dx = Math.abs(e.touches[0].clientX - this.state.x)
            let dy = Math.abs(e.touches[0].clientY - this.state.y)

            if (dx > 5 || dy > 5) {
                this.setState({
                    isLockedHorizontal: dx > dy
                })
            }
        }
    }
    onTouchEnd() {
        let activeIndex = this.state.activeIndex

        if (Math.abs(this.state.dx) > this.threshold) {
            if (this.state.dx < 0 && this.state.activeIndex < this.state.maxIndex - 1) {
                activeIndex++
                this.props.setActiveIndex(activeIndex)
            }

            if (this.state.dx > 0 && this.state.activeIndex > 0) {
                activeIndex--
                this.props.setActiveIndex(activeIndex)
            }
        }

        this.setState({
            activeIndex,
            x: 0,
            dx: 0,
            y: 0,
            dy: 0,
            isTouching: false,
            isLockedHorizontal: null
        })
    }
    setScreen(index) {
        this.props.setActiveIndex(index)
    }
    render() {
        let dots = []

        for (let i = 0; i < this.props.children.length; i++) {
            dots.push(
                <div
                    key={i}
                    className={css("swiper-nav__dot", { "swiper-nav__dot--active": i === this.state.activeIndex })}
                    onClick={this.setScreen.bind(this, i)} />
            )
        }

        return (
            <div>
                <div
                    onTouchStart={this.onTouchStart.bind(this)}
                    onTouchMove={this.onTouchMove.bind(this)}
                    onTouchEnd={this.onTouchEnd.bind(this)}
                    className="swiper">
                    <div
                        className={css("swiper__wrapper", { "swiper__wrapper--touching": this.state.isTouching })}
                        style={{ transform: `translateX(calc(${this.state.activeIndex * -100}vw ${this.state.dx >= 0 ? "+" : "-"} ${Math.abs(this.state.dx)}px))` }}>
                        {this.props.children}
                    </div>
                </div>
                <div className="swiper-nav" onClick={(e) => e.stopPropagation()}>
                    {dots}
                </div>
            </div>
        )
    }
}

export class Screen extends Component {
    render() {
        return (
            <div className="screen">
                {this.props.children}
            </div>
        )
    }
}
