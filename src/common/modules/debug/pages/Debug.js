import React, { Component } from "react"
import { connect } from "react-redux"
import { showOnboardingPopup, setEnvironment } from "../../../data/store/actions/app"
import { addProduct } from "../../../data/store/actions/cart"
import { version as coreVersion, Environment, Settings } from "@ng-mw/framework-core"
import { version as productsearchVersion } from "@ng-mw/framework-productsearch"
import { version as shoppinglistsVersion } from "@ng-mw/framework-shoppinglists"
import Login from "../../auth/Login"
import Button from "../../shared/Button"
import Link from "../../shared/Link"
import LoginButton from "../../auth/LoginButton"
import Icon, { IconType } from "../../shared/Icon"
import { App } from "../../app/markup"
import LoaderDialog from "../../shared/LoaderDialog"
import ExternalLink from "../../shared/ExternalLink"

const highlightStyle = {
    color: "#CC092F"
}

export class Debug extends Component {
    state = {
        error: false,
        loaderDialogIsOpen: false,
    }
    render() {
        if (this.state.error) {
            throw new Error("It's Britney, bitch")
        }

        return (
            <App.Top>
                <App.Main extended={true}>
                    <div className="container">
                        <h1 className="fluff-top ws-typo-header-l">Debug</h1>

                        <p>App: <strong style={highlightStyle}>{process.env.APP_VERSION}</strong></p>
                        <p>framework-core: <strong style={highlightStyle}>{coreVersion}</strong></p>
                        <p>framework-shoppinglists: <strong style={highlightStyle}>{shoppinglistsVersion}</strong></p>
                        <p>framework-productsearch: <strong style={highlightStyle}>{productsearchVersion}</strong></p>
                        <p>Environment: <strong style={highlightStyle}>{Environment[Settings.env]}</strong></p>

                        <Login />

                        <h2 className="ws-typo-header-s fluff-top">Tools</h2>
                        <div>
                            <ExternalLink root="https://vg.no" to="/">External link: vg.no</ExternalLink>
                        </div>

                        <LoginButton>LoginButton test</LoginButton>

                        <p className="fluff-top"><Button className="ws-button" onClick={this.props.showOnboardingPopup}>Trigger onboarding</Button></p>

                        <p className="fluff-top"><Button className="ws-button" onClick={() => this.setState({ error: true })}>Trigger fatal error screen</Button></p>

                        <p className="fluff-top"><Link className="ws-button" to="/its-britney-bitch">Trigger unknown route</Link></p>

                        <p className="fluff-top"><Button className="ws-button" onClick={this.addProductNotInCurrentStore.bind(this)}>Add product not in current store</Button></p>

                        <p className="fluff-top"><Button className="ws-button" onClick={this.showLoaderDialog.bind(this)}>Show loader with spinner</Button></p>
                        <LoaderDialog message="Kansellerer bestilling" isOpen={this.state.loaderDialogIsOpen} />

                        <h2 className="ws-typo-header-s fluff-top">Icons</h2>

                        {Object.keys(IconType).map(k => {
                            let key = IconType[k]
                            return (
                                <div key={key}>
                                    <h3>{key}</h3>
                                    <Icon type={key} circle />
                                    <Icon type={key} circle outline />
                                    <Icon type={key} />

                                    <div style={{ borderBottom: "1px solid #666", margin: "20px 0" }} />
                                </div>
                            )
                        })}
                    </div>
                </App.Main>
            </App.Top>
        )
    }
    addProductNotInCurrentStore() {
        this.props.addProduct({
            "isMedicin": false,
            "pricePerUnit": 20.5,
            "recycleValue": 0,
            "vitaminsMinerals": [],
            "measurementType": "g",
            "brand": "Freia lohengrin",
            "productByWeightSoldAsItem": false,
            "imageName": "v1462291548/Product/7040110478309.jpg",
            "allergyDeclaration": "Soyalecitin, skummetmelkpulver",
            "weight": 0.03,
            "environmentalCodes": [],
            "unitRule": 1,
            "productSoldByWeight": false,
            "unit": "stk",
            "pricePerUnitOriginal": 20.5,
            "subtitle": "34g Freia",
            "unitWeight": null,
            "measurementValue": 34,
            "packageSize": "34G  ",
            "title": "Lohengrin",
            "categoryName": "Snacks & godteri",
            "calcUnit": "stk",
            "alcoholPercentage": 0,
            "unitType": "Stykk",
            "nutritionalContent": [],
            "ageLimit": 0,
            "ean": "7040110478309000",
            "vendor": "Mondelez norge as",
            "comparePricePerUnit": 602.94,
            "ingredients": "",
            "servingSize": 0,
            "organic": false,
            "containsAlcohol": false,
            "compareUnit": "kg",
            "calcUnitType": "Stykk",
            "calcPricePerUnit": 20.5,
            "isOffer": false,
            "isNew": false,
            "storeId": 0,
            "slugifiedUrl": "",
            "allergens": [],
            "unitRules": 1,
            "guidelineDailyAmount": [],
            "countryOfOrigin": "Tyskland",
            "promotionDisplayName": "",
            "promotionId": null
        })
    }
    showLoaderDialog() {
        this.setState({
            loaderDialogIsOpen: true,
        })
        setTimeout(() => {
            this.setState({
                loaderDialogIsOpen: false,
            })
        }, 2000)
    }
}

export default connect(
    store => {
        return {
            store: store
        }
    },
    dispatch => {
        return {
            showOnboardingPopup: () => dispatch(showOnboardingPopup()),
            setEnvironment: (env) => dispatch(setEnvironment(env)),
            addProduct: (product) => dispatch(addProduct(product)),
        }
    }
)(Debug)
