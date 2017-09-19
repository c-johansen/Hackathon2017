import React, { Component } from "react"
import PropTypes from "prop-types"
import Button from "./Button"
import Only from "./Only"

export function InfiniteScrollerSpinner(props) {
    return (
        <strong className="infinite-scroller__loading">{props.children}</strong>
    )
}

export default class InfiniteScroller extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        action: PropTypes.func.isRequired,
        enabled: PropTypes.bool
    }
    static defaultProps = {
        enabled: true
    }
    constructor(props) {
        super(props)
        this.onScroll = this.onScroll.bind(this)
    }
    ref = null
    componentWillReceiveProps(nextProps) {
        if (nextProps.page === 1) {
            setTimeout(() => {
                if (this.ref) {
                    this.ref.scrollTop = 0
                    this.forceUpdate()
                }
            }, 50)
        }
    }
    onScroll({ target }) {
        if (!this.props.enabled || this.props.loading) {
            return
        }
        let dy = target.scrollHeight - target.scrollTop - target.clientHeight

        if (dy < 350) {
            this.props.action()
        }
    }
    render() {
        return (
            <div className="infinite-scroller show-scroll" ref={ref => this.ref = ref} onScroll={this.onScroll}>
                {this.props.children}

                <Only if={this.props.enabled && !this.props.loading && this.props.hasMore}>
                    <div className="infinite-scroller__button">
                        <Button onClick={this.props.action} className="ws-button ws-button--red">Vis flere</Button>
                    </div>
                </Only>

                {this.props.loading && this.props.page > 1 ? <InfiniteScrollerSpinner>Laster...</InfiniteScrollerSpinner> : null}
            </div>
        )
    }
}
