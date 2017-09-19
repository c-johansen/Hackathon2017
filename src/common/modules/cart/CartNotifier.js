import React, { Component } from "react"
import Icon, { IconType } from "../shared/Icon"
import { connect } from "react-redux"
import { CSSTransitionGroup as TransitionGroup }  from "react-transition-group"

function MessageAdded() {
    return (
        <div className="cart-notifier ">
            <div className="cart-notifier__wrapper">
                <Icon type={IconType.CirclePlus} />
                Lagt til
            </div>
        </div>
    )
}

function MessageRemoved() {
    return (
        <div className="cart-notifier ">
            <div className="cart-notifier__wrapper">
                <Icon type={IconType.X} />
                Fjernet
            </div>
        </div>
    )
}

export class CartNotifier extends Component {
    tid = null
    state = {
        show: false
    }

    componentDidMount() {
        this.flash()
    }

    componentWillReceiveProps() {
        this.flash()
    }

    flash() {
        clearTimeout(this.tid)

        this.setState({ show: true })
        this.tid = setTimeout(() => this.setState({ show: false }), 350)
    }

    render() {
        let [latest] = this.props.edits

        return (
            <TransitionGroup
                component="div"
                transitionName={"fade-out"}
                transitionEnter={false}
                transitionLeave={true}
                transitionLeaveTimeout={300}>
                {this.state.show && latest !== "update" && latest ? latest === "add" ? <MessageAdded key="add" /> : <MessageRemoved key="remove" /> : null}
            </TransitionGroup>
        )
    }
}

export default connect(
    store => {
        return {
            edits: store.cart.edits
        }
    }
)(CartNotifier)
//
