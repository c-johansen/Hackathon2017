import React, { PureComponent } from "react"
import { connect } from "react-redux"
import Price from "../Price"
import NutritionalContent from "../NutritionalContent"
import EnvironmentalCodes from "../EnvironmentalCodes"
import ProductImage, { ImageSize } from "../ProductImage"
import Only from "../../shared/Only"
import Icon, { IconType } from "../../shared/Icon"
import Panel from "../../shared/Panel"
import AddToCart from "../../cart/AddToCart"

export class ProductItem extends PureComponent {
    render() {
        let product = this.props.product.data
        let allergens = (product.allergens || []).filter(i => i.code === "JA").map(i => i.displayName.toLowerCase())
        let hasReducedPrice = product.isOffer && product.pricePerUnitOriginal !== product.pricePerUnit && product.pricePerUnitOriginal > 0

        return (
            <div className="product-details">
                <header className="product-details__header">
                    <div className="product-details__image">
                        <ProductImage simple={true} imageName={product.imageName} size={ImageSize.LARGE} />
                    </div>

                    {hasReducedPrice ? <div className="product-details__campaign-icon"><Icon type={IconType.Rebate} /></div> : null}

                    <h1 id={this.props.headingId} className="product-details__title ">{product.title}</h1>
                    <p className="product-details__description">{product.subtitle}</p>

                    {product.promotionDisplayName ? <p className="product-details__campaign">{product.promotionDisplayName}</p> : null}
                </header>

                <div className="product-details__buy">
                    <div className="product-details__price">
                        <Price {...product} isBig={true} />
                    </div>
                    <div className="product-details__add-to-cart">
                        <AddToCart product={product} />
                    </div>
                </div>

                <Only if={product.environmentalCodes && product.environmentalCodes.length} >
                    <h2 className="ws-visually-hidden">Merking</h2>
                    <EnvironmentalCodes environmentalCodes={product.environmentalCodes} />
                </Only>

                <Only if={product.ingredients}>
                    <Panel title="Ingredienser">
                        <p>{(product.ingredients || "")}</p>
                    </Panel>
                </Only>

                <Only if={product.nutritionalContent && product.nutritionalContent.length}  >
                    <Panel title="Næringsinnhold per 100 gram">
                        <NutritionalContent nutritionalContent={product.nutritionalContent} />
                    </Panel>
                </Only>

                <Panel title="Produsentinformasjon">
                    <ul>
                        {product.vendor ? <li><strong>{product.vendor}</strong></li> : null}
                        {product.brand ? <li><strong>Merke:</strong> {product.brand}</li> : null}
                        {product.countryOfOrigin ? <li><strong>Opprinnelsesland:</strong> {product.countryOfOrigin}</li> : null}
                        {product.ean ? <li><strong>EAN:</strong> {product.ean}</li> : null}
                    </ul>
                </Panel>
                {allergens.length ? <p className="container"><strong>Allergener:</strong> {allergens.join(", ")}</p> : null}
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            product: store.product
        }
    }
)(ProductItem)
