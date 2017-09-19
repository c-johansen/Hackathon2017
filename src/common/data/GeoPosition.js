export default class GeoPosition {
    static get(options = {}) {
        let defaultOptions = {
            enableHighAccuracy: false,
            timeout: 1000 * 60 * 2,
            maximumAge: 0
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { ...defaultOptions, ...options })
        })
    }

    static watch(successFunc, errorFunc = () => { }, options = {}) {
        let defaultOptions = {
            enableHighAccuracy: false,
            timeout: 1000 * 60 * 5,
            maximumAge: 0
        }

        return navigator.geolocation.watchPosition(successFunc, errorFunc, { ...defaultOptions, ...options })
    }

    static unwatch(id) {
        navigator.geolocation.clearWatch(id)
    }
}

