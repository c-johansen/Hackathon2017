import { getInfoForCurrentUser as fwrkGetInfoForCurrentUser } from "@ng-mw/framework-core"

export async function getInfoForCurrentUser() {
    try {
        let user = await fwrkGetInfoForCurrentUser()

        return user
    } catch (e) {
        return {}
    }
}
