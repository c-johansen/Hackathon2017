import { Environment, Settings } from "@ng-mw/framework-core"

export default {
    get MenyWebShop() {
        switch (Settings.env) {
            case Environment.DEVELOPMENT:
            case Environment.LOCAL:
            case Environment.PREPRODUCTION:
                return "https://preprod.pilot.meny.no"
            case Environment.PRODUCTION:
                return "https://nettbutikk.meny.no"
        }
    },
    get MenyWeb() {
        switch (Settings.env) {
            case Environment.DEVELOPMENT:
            case Environment.LOCAL:
            case Environment.PREPRODUCTION:
                return "https://preprod.meny.no"
            case Environment.PRODUCTION:
                return "https://meny.no"
        }
    }
}
