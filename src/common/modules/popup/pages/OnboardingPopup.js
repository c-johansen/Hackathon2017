import React, { Component } from "react"
import { connect } from "react-redux"
import Popup from "../Popup"
import Onboarding from "../../onboarding/Onboarding"
import { hideOnboardingPopup } from "../../../data/store/actions/app"
import { Grid } from "../../app/markup"
import Button from "../../shared/Button"
import Icon, { IconType } from "../../shared/Icon"

export class OnboardingPopup extends Component {
    render() {
        let { hide, isOpen, counter } = this.props

        return (
            <Popup close={hide} isOpen={isOpen} partial={false} counter={counter}>
                <Grid>
                    <Onboarding hide={hide} hideOnboarding={this.props.hide} />
                </Grid>
            </Popup>
        )
    }
}

export default connect(
    store => {
        return {
            isOpen: store.app.onboardingPopup.visible,
            counter: store.app.onboardingPopup.counter
        }
    },
    dispatch => {
        return {
            hide: () => dispatch(hideOnboardingPopup())
        }
    }
)(OnboardingPopup)
