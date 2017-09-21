import React, { Component } from "react"
import { StretchBox } from "../app/markup"
import { Swiper, Screen } from "../shared/Swiper"
import Icon, { IconType } from "../shared/Icon"
import Button from "../shared/Button"
import LoginButton from "../auth/LoginButton"

export default class Onboarding extends Component {
    state = {
        activeIndex: 0
    }
    setIndex(index, e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ activeIndex: index })
    }
    render() {
        return (
            <StretchBox className="onboarding">
                <Swiper activeIndex={this.state.activeIndex} setActiveIndex={i => this.setState( { activeIndex: i})}>
                    <Screen>
                        <div className="ws-poster ws-poster--from-top">
                            <div className="onboarding__icon">
                                <img src="/images/sparlogo.svg" />
                            </div>
                            <h1 className="trumf-login-heading"><Icon type={IconType.TrumfLogo} />Logg inn med Trumf</h1>
                            <div className="login">
                                <input value="E-post eller mobilnummer" />
                                <input value="Passord" />
                            </div>
                            <div className="onboarding__buttons">
                                <Button onClick={(e) => this.setIndex(1, e)} className="ws-button ws-button--wide ws-button--red">Logg inn</Button>
                            </div>
                            <div className="trumf-on-link">Bli medlem</div>
                        </div>
                    </Screen>
                    <Screen>
                        <div className="ws-poster ws-poster--from-top">
                            <div className="onboarding__icon">
                                <img src="/images/sparlogo.svg" />
                            </div>

                            <h1 className="trumf-login-heading">Velg butikk</h1>

                            <ul className="stores-pick">
                                <li className="yes">
                                    SPAR Kastellet
                                </li>
                                <li className="">
                                    SPAR Tåsen
                                </li>
                                <li className="">
                                    SPAR Kjelsås
                                </li>
                            </ul>

                            <div className="onboarding__buttons">
                                <Button onClick={() => this.props.hide()} className="ws-button ws-button--wide ws-button--red">Neste</Button>
                            </div>
                        </div>
                    </Screen>
                </Swiper>
            </StretchBox>
        )
    }
}

