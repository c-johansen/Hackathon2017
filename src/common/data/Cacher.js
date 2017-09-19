import moment from "moment"
import { getInfoForCurrentUser } from "../helpers/framework-helpers"

export default class Cacher {
    static _data = []

    static async cache(key, predicate, data, validDurationInMinutes = 5) {
        let memberId = (await getInfoForCurrentUser()).memberId || null

        for (let key of Object.keys(predicate)) {
            if (predicate[key] === undefined) {
                predicate[key] = null
            }
        }

        this._data.push({
            expiresAt: moment().add(validDurationInMinutes, "m").toDate(),
            key,
            predicate: {
                ...predicate,
                memberId
            },
            data
        })
    }

    static async get(key, predicate) {
        predicate = {
            ...predicate,
            memberId: (await getInfoForCurrentUser()).memberId || null
        }
        let result = this._data.find(cacheObject => cacheObject.key === key && this._match(cacheObject.predicate, predicate))

        if (result && result.expiresAt >= new Date()) {
            return result.data
        } else {
            this._clean()

            return null
        }
    }

    static empty(key) {
        if (key) {
            this._data = this._data.filter(i => i.key !== key)
        } else {
            this._data.length = 0
        }
    }

    static _match(cacheObjectPredicate, otherPredicate) {
        return Object.keys(cacheObjectPredicate).every(key => cacheObjectPredicate[key] === otherPredicate[key])
    }

    static _clean() {
        this._data = this._data.filter(i => i.expiresAt > new Date())
    }
}
