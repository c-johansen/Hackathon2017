import * as vouchersActions from "./creators/vouchers"
import { performRESTRequest } from "@ng-mw/framework-core"
import VoucherStatus from "../../const/VoucherStatus"
import Logger from "../../Logger"

export function all() {
    return async function (dispatch) {
        dispatch(vouchersActions.loading())

        try {
            let result = await performRESTRequest({
                path: "/kjeder/{chainid}/kuponger",
                method: "GET"
            })

            dispatch(vouchersActions.success(result.kuponger))
        } catch (e) {
            dispatch(vouchersActions.error(e))
            Logger.error("actions/vouchers/all()", e)
        } finally {
            dispatch(vouchersActions.loaded())
        }
    }
}


export function activate(barcode) {
    return async function (dispatch) {
        dispatch(vouchersActions.updateVoucher(barcode, { loading: true }))

        try {
            await performRESTRequest({
                path: `/kjeder/{chainid}/kuponger/${barcode}`,
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: { status: VoucherStatus.Active }
            })

            dispatch(vouchersActions.updateVoucher(barcode, { status: VoucherStatus.Active }))
        } catch (e) {
            dispatch(vouchersActions.error(e))
            Logger.error("actions/vouchers/activate()", e, barcode)
        } finally {
            dispatch(vouchersActions.updateVoucher(barcode, { loading: false }))
        }
    }
}
