export const VouchersAction = {
    Success: "vouchers:success",
    Error: "vouchers:error",
    Loading: "vouchers:loading",
    Loaded: "vouchers:loaded",
    UpdateVoucher: "vouchers:update-voucher"
}

export function updateVoucher(barcode, props) {
    return {
        type: VouchersAction.UpdateVoucher,
        payload: { barcode, props }
    }
}

export function success(data) {
    return {
        type: VouchersAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: VouchersAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: VouchersAction.Loaded
    }
}

export function loading() {
    return {
        type: VouchersAction.Loading
    }
}
