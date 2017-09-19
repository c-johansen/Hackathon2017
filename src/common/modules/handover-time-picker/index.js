import React, { Component } from "react"
import { connect } from "react-redux"
import SwipeableViews from "react-swipeable-views"
import { virtualize } from "react-swipeable-views-utils"
import moment from "moment"
moment.locale("nb")
import isEqual from "lodash.isequal"
import HandoverType from "../../data/const/HandoverType"
import HandoverTimeHelper from "../../helpers/HandoverTimeHelper"
import { getHandoverWindows } from "../../data/store/actions/handoverWindows"
import { setHandoverWindow, updateHandoverWindowData, resetHandoverWindow } from "../../data/store/actions/user"
import checkoutOrderSelector from "../../selectors/checkoutOrderSelector"
import handoverTimeUiSelector from "../../selectors/handoverTimeUiSelector"

// Components
import Button from "../shared/Button"
import Icon, { IconType } from "../shared/Icon"
import HandoverTableCell from "./HandoverTableCell"
const VirtualizeSwipeableViews = virtualize(SwipeableViews)
import AlcoholInfo from "../checkout/step-4-handover-time/AlcoholInfo"
import InlineMessage, { MessageType } from "../shared/InlineMessage"

export class HandoverTimePicker extends Component {
    static defaultProps = {
        reloadWindowsOnOrderChange: false
    }
    state = {
        panDaysPos: undefined
    }
    componentWillMount() {
        this.setInitialPanDayPos(this.props)
        this.getHandoverWindows(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.setInitialPanDayPos(nextProps)

        if (isEqual(nextProps, this.props)) return
        if (this.storeIsResetting) return

        const currentOrder = this.props.checkoutOrder
        const nextOrder = nextProps.checkoutOrder

        this.initialHandoverInfo = this.initialHandoverInfo || nextOrder.handoverInfo

        // Reload windows if order settings change
        if (
            nextProps.reloadWindowsOnOrderChange
            // Changed handovertype:
            && (currentOrder.handoverInfo.handoverType != nextOrder.handoverInfo.handoverType)
            // Changed store:
            || (currentOrder.store && currentOrder.store.pickupGln != nextOrder.store.pickupGln)
            // Changed cart-weight on home-delivery order:
            || (nextOrder.handoverInfo.handoverType === HandoverType.Delivery && currentOrder.totals.totalWeight && currentOrder.totals.totalWeight != nextOrder.totals.totalWeight)) {
            //console.log("TODO: PREVENT EXCESSIVE RELOADS HandoverTimePicker")
            this.initialHandoverInfo = null
            this.getHandoverWindows(nextProps)
        }

        this.checkHandoverWindowOnOrder(nextProps)
    }
    setInitialPanDayPos(props) {
        let panDaysPos
        if (props.handoverWindowsUi && props.handoverWindowsUi.days) {
            panDaysPos = this.getIndexOfDayWithSelectedWindow(props.handoverWindowsUi, props.user)
            if (panDaysPos === undefined) {
                panDaysPos = this.getIndexOfFirstDayWithAvailableWindows(props.handoverWindowsUi)
            }
        }

        if (panDaysPos === undefined) {
            panDaysPos = 0
        }

        this.setState({
            panDaysPos
        })
    }
    checkHandoverWindowOnOrder(props) {
        const { checkoutOrder, handoverWindowsUi } = props

        // Make sure the order's handover-window is still available
        if (handoverWindowsUi && handoverWindowsUi.days) {
            const equivalentOrderWindow = HandoverTimeHelper.getEquivalentHandoverWindowOnOrder(checkoutOrder, handoverWindowsUi)

            if (equivalentOrderWindow && !HandoverTimeHelper.windowsAreEqual(equivalentOrderWindow, checkoutOrder.handoverInfo)) {
                // Update window data on userupdateHandoverWindowData
                this.props.updateHandoverWindowData(equivalentOrderWindow)
            } else {
                // Reset window on user
                this.props.resetHandoverWindow()
            }
        }
    }
    getHandoverWindows(props) {
        const { checkoutOrder } = props
        this.props.getHandoverWindows(checkoutOrder)
    }
    render() {
        const { handoverWindows, handoverWindowsUi } = this.props

        if (!handoverWindows.loading && handoverWindows.error) {
            return (
                <InlineMessage
                    error={handoverWindows.error}
                    show={true}
                    style={{ margin: "16px -16px" }}
                    type={MessageType.Error}
                />
            )
        }

        if (!handoverWindowsUi || !handoverWindowsUi.days || !handoverWindowsUi.days.length) return false

        const maxDayPans = handoverWindowsUi.days.length - 1

        return (
            <div>
                <AlcoholInfo />
                <div className="ws-handover-table">
                    <div className="ws-handover-table__nav">
                        <Button
                            className="ws-checkout__button ws-checkout__button--backward"
                            onClick={this.onPrevClicked.bind(this)}
                            disabled={this.state.panDaysPos === 0}
                        >
                            <Icon type={IconType.ChevronLeft} className="ws-checkout__button-icon" />
                            Bakover
                        </Button>
                        <Button
                            className="ws-checkout__button ws-checkout__button--forward"
                            onClick={this.onNextClicked.bind(this)}
                            disabled={this.state.panDaysPos === maxDayPans}
                        >
                            <Icon type={IconType.ChevronRight} className="ws-checkout__button-icon" />
                            Fremover
                        </Button>
                    </div>
                    <div className="ws-visually-hidden" id="table-label">Velg tidspunkt</div>
                    <VirtualizeSwipeableViews
                        className="ws-handover-table__container"
                        style={{
                            padding: "0 56px"
                        }}
                        slideStyle={{
                            padding: "0 8px"
                        }}
                        resistance={true}
                        index={this.state.panDaysPos}
                        onChangeIndex={this.onSwiped.bind(this)}
                        slideRenderer={this.renderDay.bind(this)}
                        slideCount={handoverWindowsUi.days.length}
                        overscanSlideBefore={2}
                        overscanSlideAfter={1}
                    />
                </div>
            </div>
        )
    }
    renderDay({ key, index }) {
        const day = this.props.handoverWindowsUi.days[index]
        const { user } = this.props
        const datePrefix = moment(day.date).isSame(moment(), "day") ? "i dag" : moment(day.date).format("dddd")

        return (
            <div className="ws-handover-table__day" key={key}>
                <h3 className="ws-handover-table__day-date">
                    {datePrefix} {moment(day.date).format("D. MMMM")}
                </h3>
                <div className="ws-radioitems ws-radioitems--handover-time ws-handover-table__windows">
                    {day.handoverWindows && day.handoverWindows.map(handoverWindow => (
                        <HandoverTableCell
                            handoverWindow={handoverWindow}
                            orderHandoverInfo={user.handoverInfo}
                            checked={HandoverTimeHelper.windowIsSelected(handoverWindow, user)}
                            onChange={this.setHandoverWindow.bind(this)}
                            key={handoverWindow.storeWindowId}
                        />
                    ))}
                </div>
            </div>
        )
    }
    getIndexOfDayWithSelectedWindow(windowSet, user) {
        if (!user.handoverInfo.storeWindowId) return

        for (let di = 0, dlen = windowSet.days.length; di < dlen; di++) {
            let day = windowSet.days[di]
            for (let wi = 0, wlen = day.allhours.length; wi < wlen; wi++) {
                let handoverWindow = day.allhours[wi]
                if (HandoverTimeHelper.windowIsSelected(handoverWindow, user)) {
                    return di
                }
            }
        }
    }
    getIndexOfFirstDayWithAvailableWindows(windowSet) {
        for (let di = 0, dlen = windowSet.days.length; di < dlen; di++) {
            let day = windowSet.days[di]
            for (let wi = 0, wlen = day.allhours.length; wi < wlen; wi++) {
                let handoverWindow = day.allhours[wi]
                if (!HandoverTimeHelper.windowIsBeforeDeadline(handoverWindow) && !HandoverTimeHelper.windowIsFullyBooked(handoverWindow)) {
                    return di
                }
            }
        }
    }
    setHandoverWindow(handoverWindow) {
        this.props.setHandoverWindow(
            handoverWindow,
            this.props.localOnly,
        )
    }
    resetStore() {
        this.storeIsResetting = true

        this.props.resetHandoverWindow()
    }
    // GUI helpers
    onNextClicked() {
        this.setState({
            panDaysPos: this.state.panDaysPos + 1
        })
    }
    onPrevClicked() {
        this.setState({
            panDaysPos: this.state.panDaysPos - 1
        })
    }
    onSwiped(paneIndex) {
        this.setState({
            panDaysPos: paneIndex
        })
    }
}

export default connect(
    store => {
        return {
            user: store.user.data,
            checkoutOrder: checkoutOrderSelector(store),
            handoverWindows: store.handoverWindows,
            handoverWindowsUi: handoverTimeUiSelector(store),
        }
    },
    dispatch => {
        return {
            getHandoverWindows: (order) => dispatch(getHandoverWindows(order)),
            setHandoverWindow: (value, localOnly) => dispatch(setHandoverWindow(value, localOnly)),
            resetHandoverWindow: () => dispatch(resetHandoverWindow()),
            updateHandoverWindowData: (handoverWindow) => dispatch(updateHandoverWindowData(handoverWindow)),

        }
    },
    null,
    {
        withRef: true
    }
)(HandoverTimePicker)
