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
                            <h1 className="onboarding__title">Velkommen til vår nettbutikk</h1>
                            <div className="onboarding__description">
                                <p> Du kan planlegge og gjennomføre din neste handel hos Meny! </p>
                                <p> Du får også tilgang til kuponger og alle dine fordeler som Meny-kunde.</p>
                            </div>
                            <div className="onboarding__buttons">
                                <Button onClick={(e) => this.setIndex(1, e)} className="ws-button ws-button--wide ws-button--red">Neste</Button>
                            </div>
                        </div>
                    </Screen>
                    <Screen>
                        <div className="ws-poster ws-poster--from-top">
                            <div className="onboarding__icon">
                                <img src="/images/sparlogo.svg" />
                            </div>
                            <h1 className="onboarding__title">Du kan handle i vår nettbutikk</h1>
                            <div className="onboarding__description">
                                <p><strong>Du kan bruke handlevognen som en handleliste i butikken, eller du kan sende inn en bestilling til Meny Nettbutikk.</strong></p>
                                <p>Meny Nettbutikk er tilgjengelig i utvalgte områder, og tilbyr både henting av varer på hentepunkt og hjemlevering.</p>
                            </div>
                            <div className="onboarding__buttons">
                                <Button onClick={(e) => this.setIndex(2, e)} className="ws-button ws-button--wide ws-button--red">Neste</Button>
                            </div>
                        </div>
                    </Screen>
                    <Screen>
                        <div className="ws-poster ws-poster--from-top">
                            <div className="onboarding__icon">
                                <img src="/images/sparlogo.svg" />
                            </div>
                            <h1 className="onboarding__title">Kom i gang</h1>
                            <p className="onboarding__description">For å få den beste opplevelsen av appen anbefaler vi deg å logge inn med Trumf. </p>
                            <div className="onboarding__buttons">
                                <LoginButton className="ws-button ws-button--wide ws-button--red" onSuccess={this.props.hideOnboarding}>Logg inn med Trumf</LoginButton>
                                <Button className="ws-button ws-button--wide ws-button--white">Bli Trumf medlem</Button>
                                <Button className="ws-button ws-button--wide ws-button--transparent" onClick={this.props.hide}>Fortsett uten å logge inn <Icon type={IconType.ChevronRight} /></Button>
                            </div>
                        </div>
                    </Screen>
                </Swiper>
            </StretchBox>
        )
    }
}

