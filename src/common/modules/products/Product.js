import React, { PureComponent } from "react"
import AddToCart from "../cart/AddToCart"
import RemoveFromCart from "../cart/RemoveFromCart"
import ProductImage from "./ProductImage"
import Icon, { IconType } from "../shared/Icon"
import Price from "./Price"
import { get } from "../../data/store/actions/product"
import { connect } from "react-redux"
import classNames from "classnames"
import { removeCartItem } from "../../data/store/actions/cart"

export class Product extends PureComponent {
    static defaultProps = {
        canRevealLeft: false,
        canRevealRight: false,
        actionThreshold: 110
    }
    state = {
        x: 0,
        dx: 0,
        y: 0,
        dy: 0,
        isHorizontalMovement: false,
        distanceX: 0,
        distanceY: 0,
        isTouching: false,
        isRevealingLeft: false,
        isRevealingRight: false,
        isScrolling: false,
        isLockedHorizontal: null,
        actionLocked: false
    }

    onTouchStart(e) {
        if (!this.props.canRevealLeft && !this.props.canRevealRight) {
            return
        }

        this.setState({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            isTouching: true
        })
    }

    onTouchMove(e) {
        if (!this.props.canRevealLeft && !this.props.canRevealRight) {
            return
        }

        if (this.state.isLockedHorizontal) {
            e.preventDefault()
            let dx = e.touches[0].clientX - this.state.x
            let dy = e.touches[0].clientY - this.state.y
            let actionLocked = this.state.actionLocked

            if (Math.abs(dx) > this.props.actionThreshold) {
                actionLocked = true
            } else {
                actionLocked = false
            }

            this.setState({
                dx: !this.props.canRevealLeft && dx < 0 || this.props.canRevealLeft ? dx : 0,
                dy,
                actionLocked,
                isRevealingLeft: dx > 0,
                isRevealingRight: dx < 0,
                distanceX: Math.abs(dx),
                distanceY: Math.abs(dy),
                isHorizontalMovement: Math.abs(dx) > Math.abs(dy)
            })

        } else if (this.state.isLockedHorizontal === null) {
            let dx = e.touches[0].clientX - this.state.x
            let dy = e.touches[0].clientY - this.state.y

            this.setState({
                isLockedHorizontal: Math.abs(dx) > Math.abs(dy)
            })
        }

    }

    onTouchEnd() {
        if (!this.props.canRevealLeft && !this.props.canRevealRight) {
            return
        }

        if (this.state.actionLocked && this.state.isRevealingRight) {
            setTimeout(() => this.props.removeCartItem(this.props.product), 250)

            this.setState({
                x: 0,
                dx: -window.innerWidth,
                distanceX: window.innerWidth,
                isTouching: false
            })
        } else {
            this.setState({
                isTouching: false,
                x: 0,
                dx: 0,
                dy: 0,
                y: 0,
                distanceX: 0,
                distanceY: 0,
                isHorizontalMovement: false,
                isRevealingLeft: false,
                isRevealingRight: false,
                isLockedHorizontal: null
            })
        }
    }

    openPopup(e) {
        e.preventDefault()
        this.props.get(this.props.product.ean)
    }

    getSidebarElement() {
        let { product } = this.props

        return (
            <div className={"product__sidebar "} onClick={this.openPopup.bind(this)}>
                <ProductImage imageName={product.imageName} />
            </div>
        )
    }

    getPriceElement() {
        return (
            <div className="product__price single-line-only">
                <Price {...this.props.product} />
            </div>
        )
    }

    render() {
        const { isTouching, dx, distanceX, isRevealingLeft, isRevealingRight, actionLocked } = this.state
        const { product, doesNotExistInCurrentStore } = this.props

        const wrapperCss = classNames("product__wrapper", {
            "product__wrapper--is-touching": isTouching,
            "product__wrapper--fluffed": product.subtitle && product.promotionDisplayName,
            "product__wrapper--not-in-current-store": doesNotExistInCurrentStore,
        })

        return (
            <div className="product">
                <div
                    className={wrapperCss}
                    onTouchStart={this.onTouchStart.bind(this)}
                    onTouchMove={this.onTouchMove.bind(this)}
                    onTouchEnd={this.onTouchEnd.bind(this)}
                    onTouchCancel={this.onTouchEnd.bind(this)}
                    style={{ transform: dx ? `translateX(${dx}px)` : null }}>
                    <div onClick={this.openPopup.bind(this)} className="product__wrapper-inner">
                        <strong className="product__title single-line-only">{product.title}</strong>
                        {product.subtitle ? <p className="product__subtitle single-line-only">{product.subtitle}</p> : null}

                        {this.getPriceElement()}

                        {this.getSidebarElement()}

                        {product.promotionDisplayName ? <div className="product__campaign single-line-only"> {product.promotionDisplayName}</div> : null}
                    </div>
                    <div className="product__quantity-picker">
                        {!doesNotExistInCurrentStore && (
                            <AddToCart product={{ ...product }} />
                        )}
                        {doesNotExistInCurrentStore && (
                            <RemoveFromCart cartItem={{ ...this.props }} />
                        )}
                    </div>
                </div>
                <div
                    className={`product__left ${isTouching && "product__wrapper--is-touching"}`}
                    style={{ width: this.props.canRevealLeft && isRevealingLeft ? distanceX : 0 }}>
                    N/A
                </div>
                <div
                    className={`product__right ${isTouching && "product__wrapper--is-touching"} ${actionLocked && "product__right--is-locked"}`}
                    style={{ width: this.props.canRevealRight && isRevealingRight ? distanceX : 0 }}>
                    <div className="product__right__action">
                        <Icon type={IconType.Trash} />
                        <span className="product__right__action-text">Fjern</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            get: (id) => dispatch(get(id)),
            removeCartItem: (product) => dispatch(removeCartItem({ product }))
        }
    }
)(Product)
