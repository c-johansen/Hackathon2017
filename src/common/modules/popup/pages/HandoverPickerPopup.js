import React, { Component } from "react"
import { connect } from "react-redux"
import { hideHandoverPickerPopup } from "../../../data/store/actions/app"
import { saveExtendedUserHousehold } from "../../../data/store/actions/user"
import checkoutOrderSelector from "../../../selectors/checkoutOrderSelector"
import HandoverType from "../../../data/const/HandoverType"

// Components
import Button from "../../shared/Button"
import Icon, { IconType } from "../../shared/Icon"
import Popup from "../Popup"
import { Grid, StretchBox, StaticBox } from "../../app/markup"
import TitleHeader from "../../app/TitleHeader"
import HandoverTypePicker from "../../handover-type-picker"
import HandoverTimePicker from "../../handover-time-picker"

const PageName = {
    HandoverType: "HandoverType",
    HandoverTime: "HandoverTime"
}

const stepHeaderStyle = {
    margin: "0 -16px",
}

export class HandoverPickerPopup extends Component {
    state = {
        pageName: PageName.HandoverType
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen && !this.props.isOpen && this.state.pageName !== PageName.HandoverType) {
            this.setState({
                pageName: PageName.HandoverType
            })
        }
        // Necessary hack to make the popup animate in every time:
        if (nextProps.isOpen && !this.props.isOpen) {
            this.setState({
                showPicker: false
            })
            setTimeout(() => {
                this.setState({
                    showPicker: true
                })
            }, 100)
        }
    }
    render() {
        const { hide, isOpen, counter, checkoutOrder, handoverOptions, handoverInfo } = this.props

        const specialNextStepDisabled = !handoverOptions.loading && handoverOptions.error

        return (
            <Popup close={hide} isOpen={isOpen} partial={false} counter={counter}>
                <Grid>
                    <StaticBox>
                        <TitleHeader title="Endre utlevering" gray={true} onClose={this.cancel.bind(this)} />
                    </StaticBox>
                    {this.state.pageName === PageName.HandoverType && ([
                        <StretchBox className="popup__content" key="type-content">
                            <div className="ws-checkout-step-header ws-checkout-step-header--doing ws-checkout-step-header--handoverType ws-checkout-step-header--handoverType--doing" style={stepHeaderStyle}>
                                <Icon type={IconType.Bag} circle outline className="ws-checkout-step-header__icon" />
                                <h2 className="ws-checkout-step-header__title">
                                    Vil du få varene levert eller hente dem selv?
                                </h2>
                            </div>
                            {this.state.showPicker && (
                                <HandoverTypePicker localOnly={true} ref="handoverTypePicker" />
                            )}
                        </StretchBox>,
                        <StaticBox key="type-footer">
                            <div className="popup__footer">
                                <Button
                                    className="ws-button popup__footer-button popup__footer-button--default"
                                    disabled={specialNextStepDisabled}
                                    onClick={this.saveType.bind(this)}
                                >
                                    Lagre valg
                                </Button>
                                <Button
                                    className="ws-button popup__footer-button"
                                    onClick={this.cancel.bind(this)}
                                >
                                    Avbryt
                                </Button>
                            </div>
                        </StaticBox>
                    ])}
                    {this.state.pageName === PageName.HandoverTime && ([
                        <StretchBox className="popup__content" key="time-content">
                            <div className="ws-checkout-step-header ws-checkout-step-header--doing ws-checkout-step-header--handoverTime ws-checkout-step-header--handoverTime--doing" style={stepHeaderStyle}>
                                <Icon type={IconType.Clock} circle outline className="ws-checkout-step-header__icon" />
                                <h2 className="ws-checkout-step-header__title">
                                    {`Når ønsker du å ${checkoutOrder.handoverInfo.handoverType !== HandoverType.Delivery ? "hente varene" : "få varene levert"}?`}
                                </h2>
                            </div>
                            <HandoverTimePicker
                                localOnly={true}
                                reloadWindowsOnOrderChange={false}
                                ref="handoverTimePicker"
                            />
                        </StretchBox>,
                        <StaticBox key="time-footer">
                            <div className="popup__footer">
                                <Button
                                    className="ws-button popup__footer-button popup__footer-button--default"
                                    onClick={this.saveTime.bind(this)}
                                    disabled={!handoverInfo.from}
                                >
                                    Lagre tidspunkt
                                </Button>
                                <Button
                                    className="ws-button popup__footer-button"
                                    onClick={this.cancel.bind(this)}
                                >
                                    Velg senere
                                </Button>
                            </div>
                        </StaticBox>
                    ])}
                </Grid>
            </Popup>
        )
    }
    saveType() {
        this.props.saveExtendedUserHousehold()
        this.setState({
            pageName: PageName.HandoverTime
        })
    }
    saveTime() {
        this.props.saveExtendedUserHousehold()
        this.props.hide()
    }
    cancel() {
        this.resetCheckoutOrder()
        this.props.hide()
    }
    resetCheckoutOrder() {
        switch (this.state.pageName) {
            case PageName.HandoverType:
                this.refs.handoverTypePicker.getWrappedInstance().resetStore()
                break
            case PageName.HandoverTime:
                this.refs.handoverTimePicker.getWrappedInstance().resetStore()
                break
        }
    }
}

export default connect(
    store => {
        return {
            isOpen: store.app.handoverPickerPopup.visible,
            counter: store.app.handoverPickerPopup.counter,
            checkoutOrder: checkoutOrderSelector(store),
            handoverOptions: store.checkout.handoverOptions,
            handoverInfo: store.user.data.handoverInfo
        }
    },
    dispatch => {
        return {
            hide: () => dispatch(hideHandoverPickerPopup()),
            saveExtendedUserHousehold: () => dispatch(saveExtendedUserHousehold()),
        }
    }
)(HandoverPickerPopup)
