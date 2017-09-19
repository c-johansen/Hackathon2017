import { EventHubLogger } from "@ng-mw/framework-core"

export default class Logger extends EventHubLogger {
    static info(location, message) {
        super.info({ location, message }, "menyapp")
    }

    static error(location, error, ...args) {
        let err = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            column: error.column,
            ...error
        }

        // eslint-disable-next-line
        console.error(location, error, args)

        super.error({ location, args, err }, "menyapp")
    }
}
