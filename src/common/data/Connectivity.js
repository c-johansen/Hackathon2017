export default class Connectivity {
    static isOnline() {
        return navigator.onLine
    }

    static watch(func) {
        window.addEventListener("offline", func.bind(null, false))
        window.addEventListener("online",  func.bind(null, true))
    }
}
