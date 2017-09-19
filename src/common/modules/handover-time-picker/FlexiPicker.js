import React, { Component } from "react"
import Portal from "react-portal"

// Components
import FlexiPickerProduct from "./FlexiPickerProduct"
import Button from "../shared/Button"

export default class FlexiPicker extends Component {
    render() {
        const { handoverWindow, selectedProduct, onSelectProduct, onClose } = this.props

        return (
            <Portal isOpened={true}>
                <div className="ws-dialog" role="dialog" aria-live="assertive">
                    <div className="ws-dialog__message">
                        <p className="ws-dialog__message__question">
                            Velg ønsket fleksibilitet
                        </p>
                        <div className="ws-flexipicker">
                            {handoverWindow.filteredProducts.map((product) => (
                                <FlexiPickerProduct
                                    product={product}
                                    key={product.ean}
                                    checked={selectedProduct.ean === product.ean}
                                    onSelectProduct={onSelectProduct}
                                    hours={handoverWindow.uiFlexiHours}
                                />
                            ))}
                        </div>
                        <div className="ws-dialog__message__buttons">
                            <div className="ws-dialog__message__buttons__button ws-dialog__message__buttons__button--main">
                                <Button onClick={onClose}>
                                    OK
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        )
    }
}
