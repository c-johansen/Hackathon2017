export default function(type) {
    switch (type) {
        case "VISA":
            return "Visa"
        case "EUROCARD":
            return "Eurocard"
        case "MAESTRO":
            return "Maestro"
        case "MC":
            return "Mastercard"
        default:
            return type
    }
}
