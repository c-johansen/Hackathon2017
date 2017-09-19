export const roundNumber = (num, decimals = 2) => {
    if (typeof num !== "number") {
        return
    }

    return (Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals))
}

export const formatNumber = (num, decimals) => {
    if (typeof num !== "number") {
        return
    }

    return roundNumber(num, decimals).toString().replace(".", ",")
}

export const formatQuantity = (quantity, unit, joinResult = true) => {
    unit = (!unit || unit.toLowerCase() === "stk") ? " stk" : unit

    if (quantity < 1) {
        quantity *= 1000
        unit = "g"
    }

    if (joinResult) {
        return `${formatNumber(quantity, 2)} ${unit}`
    } else {
        return {
            quantity: formatNumber(quantity, 2),
            unit
        }
    }
}

export const formatPrice = (value, stripZerosIfWhole = false) => {
    if (typeof value !== "number") {
        return
    }

    // Split into before- and after decimal separator
    let priceParts = value.toFixed(2).toString().split(".")

    // Add thousands separators (no-break space)
    priceParts[0] = priceParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")

    // Return first part only if not ører
    if (stripZerosIfWhole && priceParts[1] === "00") {
        return priceParts[0]
    }

    // Put together
    return `${priceParts[0]},${priceParts[1]}`
}

export const toLetterCase = (value) => {
    if (!value) {
        return ""
    }

    return value[0].toUpperCase() + value.substring(1).toLowerCase()
}

export default {
    roundNumber,
    formatNumber,
    formatQuantity,
    formatPrice
}
