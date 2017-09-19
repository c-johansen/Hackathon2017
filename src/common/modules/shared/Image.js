import React from "react"
import { CloudinaryImages as fwCloudinaryImages } from "@ng-mw/framework-core"
import css from "classnames"

export const ImageSize = fwCloudinaryImages.productImageSize

export default class Image extends React.Component {
    state = {
        hasLoaded: false
    }
    getImgAttrs() {
        let { imageName, width, height, crop } = this.props

        imageName = imageName || "Product/404.jpg"
        width = width || ImageSize.SMALL
        height = height || ImageSize.SMALL

        return {
            source: fwCloudinaryImages.getImageUrl({
                width,
                height,
                cropMode: fwCloudinaryImages.cropMode[(crop || "").toUpperCase()],
                filename: imageName
            }),
            width: Math.floor(width / 2),
            height: Math.floor(width / 2),
        }
    }

    render() {
        let { source, width, height } = this.getImgAttrs()

        return (
            <div className={css("ws-image", { "ws-image--loaded": this.state.hasLoaded, "ws-image--simple": this.props.simple })}>
                <img
                    ref={r => this.ref = r}
                    width={width}
                    height={height}
                    onLoad={() => this.setState({ hasLoaded: true })}
                    src={source} />
            </div>
        )
    }
}
