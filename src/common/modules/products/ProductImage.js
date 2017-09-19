import Image from "../shared/Image"
import { CloudinaryImages as fwCloudinaryImages } from "@ng-mw/framework-core"

export const ImageSize = fwCloudinaryImages.productImageSize

export default class ProductImage extends Image {
    getImgAttrs() {
        let { imageName, size } = this.props

        if (!imageName) {
            return {}
        }

        size = size || ImageSize.SMALL

        return {
            source: fwCloudinaryImages.getProductImageUrl({
                size,
                filename: imageName
            }),
            width: Math.floor(size / 2),
            height: Math.floor(size / 2),
        }
    }
}
