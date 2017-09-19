import React from "react"
import { connect } from "react-redux"
import { setToken, logOut } from "../../data/store/actions/user"
import JsonOutput from "../shared/JsonOutput"
import Button from "../shared/Button"
import EventBridge from "../../data/EventBridge"
import NativeEvent from "../../data/events/NativeEvent"

export class Login extends React.Component {
    state = {
        tokenInput: ""
    }

    attemptNativeLogin(e) {
        e.preventDefault()

        EventBridge.broadcastNative(NativeEvent.Login)
        EventBridge.listen(NativeEvent.LoginComplete, (data) => this.props.setToken(data.token))
    }

    attemptWebLogin(e) {
        e.preventDefault()

        this.props.setToken(this.state.tokenInput)
    }

    handleTokenChange(e) {
        this.setState({ tokenInput: e.target.value })
    }

    handleKeyChange(e) {
        this.setState({ keyInput: e.target.value })
    }

    handleTypeChange(e) {
        this.setState({ type: e.target.value })
    }

    render() {
        return (
            <div>
                <h2 className="ws-typo-header-s fluff-top">Log in</h2>
                <form onSubmit={this.attemptNativeLogin.bind(this)} className="fluff-top">
                    <fieldset>
                        <legend className="ws-visually-hidden">Login (native)</legend>
                        <Button className="ws-button" type="submit" preventDefault={false}>Log in (native)</Button>
                    </fieldset>
                </form>

                <form onSubmit={this.attemptWebLogin.bind(this)}>
                    <fieldset>
                        <legend className="ws-visually-hidden">Login (web)</legend>
                        <label htmlFor="password" className="label">Log in with token</label>
                        <div style={{ display: "flex" }}>
                            <input
                                className="text-input"
                                type="text"
                                placeholder="Bearer xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                id="password"
                                value={this.state.tokenInput}
                                onChange={this.handleTokenChange.bind(this)}
                                style={{ flex: 1, borderRight: "none", borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            />
                            <Button
                                type="submit"
                                className="ws-button"
                                preventDefault={false}
                                stopPropagation={false}
                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >Log in</Button>
                        </div>
                    </fieldset>

                    {this.props.user.error && !this.props.user.loading ? <JsonOutput data={this.props.user.error} error={true} /> : null}
                </form>

                {this.props.user.userToken && (
                    <div className="fluff-top">
                        <h2 className="ws-visually-hidden">User</h2>
                        <p>{this.props.user.data.currentMember.firstName} {this.props.user.data.currentMember.lastName}</p>
                        <p>{this.props.user.userToken}</p>
                        <h2 className="ws-visually-hidden">Log out</h2>
                        <p className="fluff-top"><Button className="ws-button" onClick={this.props.logOut}>Log out</Button></p>
                    </div>
                )}
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
            setToken: (token) => dispatch(setToken(token)),
            logOut: () => dispatch(logOut())
        }
    }
)(Login)

