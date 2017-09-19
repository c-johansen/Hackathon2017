import React, { Component } from "react"
import { connect } from "react-redux"
import HandoverType from "../../data/const/HandoverType"
import { RelativeCalendarFormats } from "../../data/const/MomentDateFormats"
import { showHandoverPickerPopup } from "../../data/store/actions/app"
import { getHandoverWindows } from "../../data/store/actions/handoverWindows"
import { setHandoverWindow } from "../../data/store/actions/user"
import Button from "../shared/Button"
import moment from "moment"
import Icon, { IconType } from "../shared/Icon"
import OnlyAuth from "../shared/OnlyAuth"
import Only from "../shared/Only"
import RawDialog from "../shared/RawDialog"


export class PreorderStatusBlob extends Component {
    state = {
        showDetails: false
    }
    componentWillMount() {
        this.checkAndUpdate(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.checkAndUpdate(nextProps)
    }
    checkAndUpdate(nextProps) {
        const currentHandoverInfo = this.props.user.data.handoverInfo
        const currentStore = this.props.user.data.store
        const nextHandoverInfo = nextProps.user.data.handoverInfo
        const nextStore = nextProps.user.data.store

        if (!nextProps.user.userToken
            || nextProps.handoverPickerPopupIsVisible
            || nextStore.gln === "0"
            || nextProps.handoverWindows.loading
            || nextProps.handoverWindows.error) {
            return
        }

        if (currentHandoverInfo.handoverType !== nextHandoverInfo.handoverType) {
            // User switched method
            //console.log("TODO: PREVENT EXCESSIVE RELOADS PreorderStatusBlob User switched method")
            this.props.getHandoverWindows()
        } else if (currentStore.pickupGln !== nextStore.pickupGln) {
            // User switched store
            //console.log("TODO: PREVENT EXCESSIVE RELOADS PreorderStatusBlob User switched store", currentStore.pickupGln, nextStore.pickupGln)
            this.props.getHandoverWindows()
        } else if (!nextHandoverInfo.deadline && !nextProps.handoverWindows.data.firstAvailableWindow && !nextProps.handoverWindows.loading) {
            // Deadline is missing/invalid
            //console.log("TODO: PREVENT EXCESSIVE RELOADS PreorderStatusBlob Deadline is missing/invalid")
            this.props.getHandoverWindows()
        }
    }
    change() {
        this.props.showHandoverPickerPopup()
        this.setState({ showDetails: false })
    }
    render() {
        const { handoverInfo, store } = this.props.user.data
        const firstAvailableWindow = this.props.handoverWindows.data.firstAvailableWindow

        if (!firstAvailableWindow) {
            return null
        }

        return (
            <OnlyAuth>
                <div className="preorder-status-blob" >
                    <div className="preorder-status-blob__content" onClick={() => this.setState({ showDetails: true })}>
                        <Icon type={IconType.I} />
                        {handoverInfo.from ? "Valgt" : "Neste tilgjenglige"} {handoverInfo.handoverType === HandoverType.Delivery ? "levering" : "henting"} er
                        {" "}
                        <strong>
                            {moment(handoverInfo.from || firstAvailableWindow.displayFrom).calendar(null, RelativeCalendarFormats)}
                            -
                            {moment(handoverInfo.to || firstAvailableWindow.displayTo).format("HH")}
                        </strong>
                    </div>

                    <RawDialog isOpen={this.state.showDetails} close={() => this.setState({ showDetails: false })}>
                        <fieldset>
                            <legend className="ws-visually-hidden">
                                {handoverInfo.handoverType === HandoverType.Delivery ? "Leverings" : "Hente"}detaljer
                            </legend>
                            <div className="preorder-status-blob__x">
                                <Button onClick={() => this.setState({ showDetails: false })}>
                                    <span className="ws-visually-hidden">Lukk</span>
                                    <Icon type={IconType.X} />
                                </Button>
                            </div>
                            <p className="preorder-status-blob__place">
                                <strong>Varene {handoverInfo.handoverType === HandoverType.Delivery ? "leveres til" : "hentes hos"}:</strong>
                                <Only if={handoverInfo.handoverType === HandoverType.Delivery} wrapper="span">
                                    {handoverInfo.deliveryInfo && handoverInfo.deliveryInfo.firstName} {handoverInfo.deliveryInfo && handoverInfo.deliveryInfo.lastName}<br />
                                    {handoverInfo.deliveryInfo && handoverInfo.deliveryInfo.address}<br />
                                    {handoverInfo.deliveryInfo && handoverInfo.deliveryInfo.postalCode} {handoverInfo.deliveryInfo && handoverInfo.deliveryInfo.city}
                                </Only>
                                <Only if={handoverInfo.handoverType !== HandoverType.Delivery} wrapper="span">
                                    {store.name}<br />
                                    {store.address}<br />
                                    {store.postalCode} {store.municipality}
                                </Only>
                            </p>
                            <p className="preorder-status-blob__time">
                                {handoverInfo.from ? "Valgt" : "Neste tilgjenglige"} {handoverInfo.handoverType === HandoverType.Delivery ? "levering " : "henting "}
                                er
                                <strong>
                                    {moment(handoverInfo.from || firstAvailableWindow.displayFrom).calendar(null, RelativeCalendarFormats)}
                                    -
                                    {moment(handoverInfo.to || firstAvailableWindow.displayTo).format("HH")}
                                </strong>
                            </p>

                            <Button onClick={this.change.bind(this)} className="ws-button ws-button--wide ws-button--red">Endre</Button>
                        </fieldset>
                    </RawDialog>
                </div>
            </OnlyAuth>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user,
            handoverWindows: store.handoverWindows,
            handoverPickerPopupIsVisible: store.app.handoverPickerPopup.visible
        }
    },
    dispatch => {
        return {
            showHandoverPickerPopup: () => dispatch(showHandoverPickerPopup()),
            getHandoverWindows: () => dispatch(getHandoverWindows()),
            setHandoverWindow: (handoverWindow) => dispatch(setHandoverWindow(handoverWindow)),
        }
    }
)(PreorderStatusBlob)
