export default class EventBridge {
    static listeners = []

    // broadcast to native
    static broadcastNative(action, data) {
        this._log(action, data, "native")

        let message = {
            action: action,
            data: data ? data : {}
        }

        window.postMessage(JSON.stringify(message), "*")
    }

    // broadcast to webview
    static broadcastWeb(action, data) {
        this._log(action, data, "web")

        for (let listener of this.listeners) {
            if (listener.action === action) {
                listener.callback(data)

                if (listener.once) {
                    this.listeners = this.listeners.filter(i => i !== listener)
                }
            }
        }

        // native requires this?
        return true
    }

    // webview listen
    static listen(action, callback, once = true) {
        let listener = {
            action,
            callback,
            once
        }

        this.listeners.push(listener)

        return listener
    }

    static unlisten(listener) {
        this.listeners = this.listeners.filter(i => i !== listener)
    }

    static _log(action, data, type) {
        console.info(`%c${type} %cevent %c${action}`, "color: blue", "color: blue", "font-weight: bold; color: blue", data)
    }
}

// this export required for native wrapper
window.NativeBridge = EventBridge
