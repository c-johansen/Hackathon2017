import React from "react"

export const IconType = {
    // plain
    Attention: "attention",
    Minus: "minus",
    Plus: "plus",
    ExternalArrow: "external-arrow",
    X: "x",
    ChevronLeft: "chevron-left",
    ChevronRight: "chevron-right",
    ChevronDown: "chevron-down",
    ChevronUp: "chevron-up",
    Checkmark: "checkmark",
    Truck: "truck",
    Bag: "bag",
    I: "i",
    Hamburger: "hamburger",
    DotsOutlined: "dots-outlined",
    DotsFilled: "dots-filled",
    Payment: "payment",
    Pin: "pin",
    Substitution: "substition",
    Trash: "trash",
    Clock: "clock",
    Magnifier: "magnifier",
    Cart: "cart",
    CartFull: "cart-full",
    Rebate: "rebate",
    Handle: "handle",
    ThumbsUp: "thumbs-up",

    // colored
    MenyLogo: "meny-logo",
    TrumfLogo: "trumf-logo",
    MatmerkBrodEkstraGrovt: "matmerk-brod-ekstragrovt",
    MatmerkBrodGrovt: "matmerk-brod-grovt",
    MatmerkBrodFint: "matmerk-brod-fint",
    MatmerkBrodHalvGrovt: "matmerk-brod-halvgrovt",
    MatmerkDebioEco: "matmerk-debio-oko",
    MatmerkEuEco: "matmerk-eu-oko",
    MatmerkKrav: "matmerk-krav",
    MatmerkNokkelhull: "matmerk-nokkelhull",
    MatmerkSvanen: "matmerk-svanen",
    MatmerkNytNorge: "matmerk-nyt-norge",
    MatmerkFirstPrice: "matmerk-first-price",

    // nav icons
    NavProfile: "nav-profile",
    NavHome: "nav-home",
    NavSearch: "nav-search",
    NavSavings: "nav-savings"
}

const ViewBox = {
    //plain
    [IconType.Attention]: "0 0 3 13",
    [IconType.Minus]: "0 0 13 1",
    [IconType.Plus]: "0 0 13 13",
    [IconType.ExternalArrow]: "0 0 10 10",
    [IconType.ChevronLeft]: "0 0 7 13",
    [IconType.ChevronRight]: "0 0 7 13",
    [IconType.ChevronDown]: "0 0 18 10",
    [IconType.ChevronUp]: "0 0 18 10",
    [IconType.X]: "0 0 13 13",
    [IconType.Checkmark]: "0 0 22 22",
    [IconType.Truck]: "0 0 22 17",
    [IconType.Bag]: "0 0 29 36",
    [IconType.I]: "0 0 5 13",
    [IconType.Hamburger]: "0 0 19 11",
    [IconType.DotsFilled]: "0 0 26 6",
    [IconType.DotsOutlined]: "0 0 26 6",
    [IconType.Payment]: "0 0 18 14",
    [IconType.Pin]: "0 0 12 16",
    [IconType.Substitution]: "0 0 16 17",
    [IconType.Trash]: "0 0 22 24",
    [IconType.Clock]: "0 0 18 18",
    [IconType.Magnifier]: "0 0 15 15",
    [IconType.Cart]: "0 0 24 23",
    [IconType.CartFull]: "0 0 24 23",
    [IconType.Rebate]: "0 0 54 54",
    [IconType.Handle]: "0 0 15 6",
    [IconType.ThumbsUp]: "0 0 45 42",

    // colored
    [IconType.MenyLogo]: "0 0 141 60",
    [IconType.TrumfLogo]: "0 0 82 82",
    [IconType.MatmerkBrodEkstraGrovt]: "0 0 160.76 160.76",
    [IconType.MatmerkBrodGrovt]: "0 0 160.76 160.76",
    [IconType.MatmerkBrodFint]: "0 0 160.76 160.76",
    [IconType.MatmerkBrodHalvGrovt]: "0 0 160.76 160.76",
    [IconType.MatmerkDebioEco]: "0 0 141.73 141.73",
    [IconType.MatmerkEuEco]: "0 0 153.07 153.07",
    [IconType.MatmerkKrav]: "0 0 141.73 141.73",
    [IconType.MatmerkNokkelhull]: "0 0 145 145",
    [IconType.MatmerkSvanen]: "0 0 173.78 170.38",
    [IconType.MatmerkFirstPrice]: "0 0 63 19",
    [IconType.MatmerkNytNorge]: "0 0  87 97",

    // nav icons
    [IconType.NavSearch]: "0 0 44 44",
    [IconType.NavHome]: "0 0 62 39",
    [IconType.NavProfile]: "0 0 62 42",
    [IconType.NavSavings]: "0 0 40 39"
}

export function IconCircle(props) {
    return <span className={`icon-circle ${props.outline ? "icon-circle--outline" : ""} ${props.className ? props.className : ""}`}>{props.children}</span>
}

export default class Icon extends React.Component {
    defaultProps = {
        circle: false,
        naturalWidth: false,
        outline: false,
        className: null,
    }
    shouldComponentUpdate(nextProps) {
        return this.props.type !== nextProps.type
    }

    render() {
        const { type, circle, naturalWidth, className } = this.props

        let icon = (
            <span className={`icon ${naturalWidth ? "icon--natural-width" : ""} ${className && !circle ? className : ""}`}>
                <svg viewBox={ViewBox[type]} >
                    <use xlinkHref={`gfx/iconset.svg?v=${process.env.APP_VERSION}#${type}`} />
                </svg>
            </span>
        )

        if (circle) {
            return (
                <IconCircle {...this.props}>
                    {icon}
                </IconCircle>
            )
        }

        return icon
    }
}
