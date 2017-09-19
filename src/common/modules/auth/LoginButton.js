import React from "react"
import { connect } from "react-redux"
import { setToken, clearError } from "../../data/store/actions/user"
import Button from "../shared/Button"
import Dialog from "../shared/Dialog"
import EventBridge from "../../data/EventBridge"
import NativeEvent from "../../data/events/NativeEvent"

export class LoginButton extends React.Component {
    static defaultProps = {
        onSuccess: () => { },
        onError: () => { }
    }
    state = {
        loginErrorOpen: false
    }
    attemptNativeLogin() {
        EventBridge.broadcastNative(NativeEvent.Login)

        EventBridge.listen(NativeEvent.LoginComplete, (data) => {
            this.props.setToken(data.token)
            this.props.onSuccess()
        })

        EventBridge.listen(NativeEvent.LoginFailed, () => {
            this.setState({ loginErrorOpen: true })
            this.props.onError()
        })
    }
    close() {
        this.setState({ loginErrorOpen: false })
        this.props.clearError()
    }

    render() {
        return (
            <Button className={"ws-button " + this.props.className} onClick={this.attemptNativeLogin.bind(this)}>
                {this.props.children || "Logg inn"}

                <Dialog
                    isOpen={this.state.loginErrorOpen || !!this.props.user.error}
                    question="Det skjedde en feil ved innlogging &mdash; prøv igjen"
                    close={this.close.bind(this)} />
            </Button>
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
            setToken: (token) => dispatch(setToken(token)),
            clearError: () => dispatch(clearError())
        }
    }
)(LoginButton)
