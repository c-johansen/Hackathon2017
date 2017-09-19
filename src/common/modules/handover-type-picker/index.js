import React, { Component } from "react"
import { connect } from "react-redux"
import Urls from "../../data/const/Urls"
import HandoverType from "../../data/const/HandoverType"
import { getHandoverOptions } from "../../data/store/actions/checkout"
import { setHandoverTypeAndLocation, setHandoverInfoAndStore } from "../../data/store/actions/user"
import handoverTypeUiSelector from "../../selectors/handoverTypeUiSelector"
import checkoutOrderSelector from "../../selectors/checkoutOrderSelector"

// Components
import Only from "../shared/Only"
import ExternalLink from "../shared/ExternalLink"
import HandoverTypeItem from "./HandoverTypeItem"
import HandoverLocationItem from "./HandoverLocationItem"
import HandoverLocationGroup from "./HandoverLocationGroup"
import InlineMessage, { MessageType } from "../shared/InlineMessage"
import Panel from "../shared/Panel"
import UserProfileContactDetails from "../user/UserProfileContactDetails"
import UserProfileAlternativeAddress from "../user/UserProfileAlternativeAddress"

export class HandoverTypePicker extends Component {
    componentWillMount() {
        this.props.getHandoverOptions(this.props.checkoutOrder)
    }
    componentWillReceiveProps(nextProps) {
        if (this.storeIsResetting) return

        const { handoverTypeUi, checkoutOrder } = nextProps

        this.initialHandoverInfo = this.initialHandoverInfo || checkoutOrder.handoverInfo
        this.initialStore = this.initialStore || checkoutOrder.store

        handoverTypeUi.forEach(o => {
            if (checkoutOrder.handoverInfo.handoverType === o.handoverType && o.uiDisabled) {
                // Reset handover-type & handover-location
                this.props.setHandoverTypeAndLocation(null)
            }
        })
    }
    render() {
        const { handoverOptions, handoverTypeUi, checkoutOrder } = this.props
        const { handoverInfo } = checkoutOrder

        const self = this

        if (!handoverOptions.error && !handoverOptions.data) {
            return false
        }

        if (handoverOptions.error) {
            return (
                <InlineMessage
                    message={handoverOptions.error.message}
                    error={handoverOptions.error}
                    show={true}
                    style={{ margin: "0 -16px" }}
                    type={MessageType.Error}
                    showProfileLink={false}
                />
            )
        }

        const validationMessage = this.getValidationMessage(handoverOptions.data)

        return (
            <div>
                {validationMessage}
                <div className="ws-checkout-handover__type">
                    <div className="ws-radioitems ws-handover-picker">
                        <fieldset className="ws-radioitems ws-radioitems--handover-type" role="tablist">
                            <legend className="ws-radioitems__legend ws-visually-hidden">
                                Vil du få varene levert eller hente dem selv?
                            </legend>
                            {handoverTypeUi && handoverTypeUi.map(o => (
                                <HandoverTypeItem
                                    key={o.handoverType}
                                    option={o}
                                    value={handoverInfo.handoverType}
                                    onChange={self.setHandoverType.bind(this)}
                                />
                            ))}
                        </fieldset>
                        {handoverTypeUi && handoverTypeUi.map(o => (
                            <Only if={handoverInfo.handoverType === o.handoverType} key={o.handoverType}>
                                {handoverInfo.handoverType === HandoverType.Delivery && (
                                    <p className="ws-handover-picker__message">
                                        <ExternalLink
                                            className="ws-order-details__edit-notice__link"
                                            root={Urls.MenyWebShop}
                                            to={"/profil"}
                                        >
                                            Du kan legge til og endre leveringsadresser på meny.no
                                        </ExternalLink>
                                    </p>
                                )}
                                <div
                                    id={`${o.handoverType}-panel`}
                                    className={`ws-handover-picker__detail ws-handover-picker__detail--${o.handoverType}`}
                                    aria-labelledby={`${o.handoverType}-tab`}
                                    role="tabpanel"
                                >
                                    <Only if={o.locations && o.locations.length > 1}>
                                        <h3 className="ws-checkout__sublabel">
                                            {o.uiLocationTitle}
                                        </h3>
                                        <fieldset className={`ws-radioitems ws-radioitems--location-${o.handoverType}`}>
                                            <legend className="ws-radioitems__legend ws-visually-hidden">
                                                {o.uiLocationTitle}
                                            </legend>
                                            {o.uiGroupedLocations && o.uiGroupedLocations.length > 1 && (
                                                o.uiGroupedLocations.map(group => (
                                                    <HandoverLocationGroup
                                                        title={group.groupName}
                                                        key={group.groupName}
                                                        defaultExpanded={self.groupIsSelected(group)}
                                                    >
                                                        {group.locations.map(l => (
                                                            <HandoverLocationItem
                                                                key={`${l.address ? l.address.address : "null"}-${l.store ? l.store.pickupGln : "null"}`}
                                                                location={l}
                                                                checked={self.locationIsSelected(l)}
                                                                onChange={self.setHandoverLocation.bind(this)}
                                                            />
                                                        ))}
                                                    </HandoverLocationGroup>
                                                ))
                                            )}
                                            {!o.uiGroupedLocations && o.locations && o.locations.length &&
                                                o.locations.map(l => (
                                                    <HandoverLocationItem
                                                        key={`${l.address ? l.address.address : "null"}-${l.store ? l.store.pickupGln : "null"}`}
                                                        location={l}
                                                        checked={self.locationIsSelected(l)}
                                                        onChange={self.setHandoverLocation.bind(this)}
                                                    />
                                                ))
                                            }
                                        </fieldset>
                                    </Only>
                                </div>
                            </Only>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    getValidationMessage(handoverOptionsResponse) {
        let validationMessages = []

        // Extract messages
        handoverOptionsResponse.forEach((type) => {
            if (type.validation) {
                validationMessages = validationMessages.concat(type.validation.map((e) => e.error))
            }
        })

        if (validationMessages.length) {
            // Remove duplicate entries
            validationMessages = validationMessages.filter((value, index, self) => self.indexOf(value) === index)
            // Prepend with general error
            validationMessages.unshift("Vi mangler informasjon på profilen din for å kunne tilby deg både henting og levering:")

            return (
                <div>
                    <InlineMessage
                        message={validationMessages}
                        error={validationMessages}
                        show={true}
                        style={{ margin: "0 -16px" }}
                        type={MessageType.Error}
                        showProfileLink={true}
                    />
                    <Panel
                        title={"Vis profilinformasjon"}
                        simple={true}
                        style={{ margin: "0 -16px 16px", "background": "none" }}
                    >
                        <UserProfileContactDetails />
                        <UserProfileAlternativeAddress showDeliveryComment={false} />
                    </Panel>
                </div>
            )
        }

        return null
    }
    // Event handlers
    setHandoverType(handoverType) {
        // Ignore if not changed
        if (this.props.checkoutOrder.handoverInfo.handoverType === handoverType) return

        const currentOption = this.props.handoverTypeUi.find((o) => { return o.handoverType === handoverType })
        let newLocation

        if (handoverType === HandoverType.Store) {
            // User switched from delivery to pickup. Try to find same store
            newLocation = currentOption.locations.find((l) => { return l.store.gln === this.props.checkoutOrder.store.gln })
        }

        if (!newLocation) {
            // Preselect first valid location
            newLocation = currentOption.locations.find((l) => { return l.store })
        }

        this.location = newLocation

        this.props.setHandoverTypeAndLocation(
            handoverType,
            this.location,
            this.props.localOnly,
        )
    }
    setHandoverLocation(location) {
        this.props.setHandoverTypeAndLocation(
            this.props.checkoutOrder.handoverInfo.handoverType,
            location,
            this.props.localOnly,
        )
    }
    resetStore() {
        this.storeIsResetting = true

        this.props.setHandoverInfoAndStore(
            this.initialHandoverInfo,
            this.initialStore,
            this.props.localOnly,
        )
    }
    // GUI helpers
    groupIsSelected(group) {
        for (const location in group.locations) {
            if (this.locationIsSelected(group.locations[location])) {
                return true
            }
        }
        return false
    }
    locationIsSelected(l) {
        const { handoverInfo, store } = this.props.checkoutOrder

        // Get current handover location from cart
        let currentHandoverType = this.props.handoverTypeUi.find((o) => {
            return handoverInfo.handoverType === o.handoverType
        })

        if (!currentHandoverType) return false

        let foundLocation = null

        if (handoverInfo.handoverType === HandoverType.Delivery) {
            foundLocation = currentHandoverType.locations.find((o) => {
                return l.address
                    && o.address.address === handoverInfo.deliveryInfo.address
                    && o.address.address === l.address.address
            })
        } else if (store) {
            foundLocation = currentHandoverType.locations.find((o) => {
                return l.store
                    && o.store.pickupGln === store.pickupGln
                    && o.store.pickupGln === l.store.pickupGln
            })
        }

        return !!foundLocation
    }
}

export default connect(
    store => {
        return {
            checkoutOrder: checkoutOrderSelector(store),
            handoverOptions: store.checkout.handoverOptions,
            handoverTypeUi: handoverTypeUiSelector(store),
        }
    },
    dispatch => {
        return {
            getHandoverOptions: (cart) => dispatch(getHandoverOptions(cart)),
            setHandoverTypeAndLocation: (handoverType, location, localOnly) => dispatch(setHandoverTypeAndLocation(handoverType, location, localOnly)),
            setHandoverInfoAndStore: (handoverInfo, store, localOnly) => dispatch(setHandoverInfoAndStore(handoverInfo, store, localOnly)),
        }
    },
    null,
    {
        withRef: true
    }
)(HandoverTypePicker)
