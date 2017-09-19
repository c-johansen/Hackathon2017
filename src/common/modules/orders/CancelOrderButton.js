import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import OrderStatus from "../../data/const/OrderStatus"
import { cancel } from "../../data/store/actions/order"
import { hideCheckoutPopup, hideCartPopup } from "../../data/store/actions/app"
import Button from "../shared/Button"
import Dialog from "../shared/Dialog"
import LoaderDialog from "../shared/LoaderDialog"

export class CancelOrderButton extends Component {
    static defaultProps = {
        order: null,
        containerClassName: null
    }
    state = {
        orderIsCancelling: false,
        cancelDialogOpen: false,
        orderIsCancelledDialogOpen: false,
    }
    componentWillReceiveProps(nextProps) {
        const currentOrder = this.props.order
        const nextOrder = nextProps.order

        if (nextOrder && nextOrder.status === OrderStatus.Deleted && currentOrder.status !== OrderStatus.Deleted) {
            this.setState({
                orderIsCancelling: false,
                orderIsCancelledDialogOpen: true,
            })
        }
    }
    render() {
        let { order, containerClassName } = this.props

        if (!order || !order.ngOrderId || !order.pickupCode) return null

        return (
            <div className={containerClassName}>
                {order.status !== OrderStatus.Deleted && (
                    <Button
                        className="ws-button ws-button--red ws-button--wide"
                        disabled={this.state.orderIsCancelling}
                        onClick={() => this.setState({ cancelDialogOpen: true })}
                    >
                        Kanseller bestilling
                    </Button>
                )}
                <Dialog
                    isOpen={this.state.cancelDialogOpen}
                    question={`Sikker på du vil kansellere bestilling ${order.pickupCode}?`}
                    confirm={this.cancel.bind(this)}
                    close={() => this.setState({ cancelDialogOpen: false })}>
                    Kanseller bestilling
                </Dialog>
                <LoaderDialog
                    isOpen={this.state.orderIsCancelling}
                    message="Kansellerer bestilling"
                />
                <Dialog
                    isOpen={this.state.orderIsCancelledDialogOpen}
                    question="Bestillingen er kansellert"
                    close={this.goToMyOrders.bind(this)}
                    closeText="Til mine bestillinger"
                />
            </div>
        )
    }
    cancel() {
        this.setState({
            orderIsCancelling: true
        })
        this.props.cancel(this.props.order.ngOrderId)
    }
    goToMyOrders() {
        this.setState({
            orderIsCancelledDialogOpen: false
        })
        // Make sure cart & checkout popups close
        this.props.hideCartPopup()
        this.props.hideCheckoutPopup()
        // Go to my orders
        this.props.history.push({ pathname: "/user/orders", state: { isBack: true } })
    }
}

export default connect(
    null,
    dispatch => {
        return {
            cancel: (orderId) => dispatch(cancel(orderId)),
            hideCheckoutPopup: () => dispatch(hideCheckoutPopup()),
            hideCartPopup: () => dispatch(hideCartPopup()),
        }
    }
)(withRouter(CancelOrderButton))
