import React from "react"
import { connect } from "react-redux"
import { hideWelcomeScreen } from "../../data/store/actions/user"
import Icon, { IconType } from "../shared/Icon"

function WelcomeScreen(props) {
    return (
        <div className="login-success-poster">
            <div className="ws-poster">
                <div className="login-success-poster__logo">
                    <Icon type={IconType.MenyLogo} />
                </div>
                <div className="login-success-poster__message">
                    Velkommen til Meny, {props.name}!
                </div>
                <div className="login-success-poster__closer">
                    God handel
                </div>
            </div>
        </div>
    )
}

export class AuthFlasher extends React.Component {
    state = {
        visible: false
    }
    componentWillReceiveProps(props) {
        if (!this.props.user.welcomeScreenVisible && props.user.welcomeScreenVisible) {
            this.setState({ visible: true })

            setTimeout(() => this.setState({ visible: false }), 2500)
        }
    }
    render() {
        return (
            <div onClick={() => this.setState({ visible: false })}>
                {this.state.visible ? <WelcomeScreen name={this.props.user.data.currentMember.firstName} /> : null}
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            user: store.user
        }
    },
    dispatch => {
        return {
            hideWelcomeScreen: () => dispatch(dispatch(hideWelcomeScreen()))
        }
    }
)(AuthFlasher)
