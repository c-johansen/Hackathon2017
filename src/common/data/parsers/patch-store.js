import { Settings, Environment, getExtendedUser } from "@ng-mw/framework-core"

// for user without selected store, default store will not do for getting
// campaigns, these are hardcoded proper fallbacks for campaigns
export default async function (allowDefaultStore = false) {
    let gln

    try {
        gln = (await getExtendedUser()).store.gln
    } catch (e) {
        // do  nothing
    }

    if (!parseInt(gln)) {
        if (allowDefaultStore) {
            return 0
        }

        switch (Settings.env) {
            case Environment.PREPRODUCTION:
                return 7080001296346
            case Environment.PRODUCTION:
                return 7080000886050
            default:
                return 7080001296346
        }
    } else {
        return gln
    }
}
