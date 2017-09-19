import React, { Component } from "react"
import { connect } from "react-redux"
import { hideTosPopup } from "../../../data/store/actions/app"
import { getTos } from "../../../data/store/actions/checkout"
import EventBridge from "../../../data/EventBridge"
import NativeEvent from "../../../data/events/NativeEvent"

// Components
import Popup from "../Popup"
import { Grid, StaticBox, StretchBox } from "../../app/markup"
import BackHeader from "../../app/BackHeader"
import InlineMessage, { MessageType } from "../../shared/InlineMessage"

export class TosPopup extends Component {
    componentWillMount() {
        if (!this.props.tos.data) {
            this.props.getTos()
        }
    }
    render() {
        let { hide, isOpen, counter, tos } = this.props

        return (
            <Popup close={hide} isOpen={isOpen} partial={false} counter={counter}>
                <Grid>
                    <StaticBox>
                        <BackHeader title="Bruker- og salgsbetingelser" backTitle="Lukk" goBack={hide} hasCartButton={false} />
                    </StaticBox>
                    <StretchBox className="popup__content">
                        <InlineMessage
                            error={tos.error}
                            show={tos.error}
                            style={{ margin: "16px -16px" }}
                            type={MessageType.Error}
                        />
                        <div className="ws-article"
                            onClick={this.tosClicked.bind(this)}
                            dangerouslySetInnerHTML={{ __html: tos.data }}
                        />
                    </StretchBox>
                </Grid>
            </Popup>
        )
    }
    tosClicked(event) {
        if (event.target.tagName.toLowerCase() === "a" && event.target.href) {
            EventBridge.broadcastNative(NativeEvent.ExternalLink, { url: event.target.href })
            event.preventDefault()
        }
    }
}

export default connect(
    store => {
        return {
            isOpen: store.app.tosPopup.visible,
            counter: store.app.tosPopup.counter,
            tos: store.checkout.tos
        }
    },
    dispatch => {
        return {
            getTos: () => dispatch(getTos()),
            hide: () => dispatch(hideTosPopup())
        }
    }
)(TosPopup)
