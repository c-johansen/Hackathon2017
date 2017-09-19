export const setHandoverTypeAndLocation = (extendedUser, handoverType, location) => {
    if (location && location.address && location.store) {
        // Home delivery
        return {
            ...extendedUser,
            store: location.store,
            handoverInfo: {
                ...extendedUser.handoverInfo,
                handoverType: handoverType,
                deliveryInfo: {
                    carrierOrderId: null,
                    carrierWindowId: null,
                    firstName: location.address.firstName,
                    lastName: location.address.lastName,
                    address: location.address.address,
                    postalCode: location.address.postalCode,
                    city: location.address.city,
                    comment: location.address.deliveryComment,
                }
            }
        }
    } else if (location && location.store) {
        // Store / pickuppoint
        return {
            ...extendedUser,
            store: location.store,
            handoverInfo: {
                ...extendedUser.handoverInfo,
                handoverType: handoverType,
                deliveryInfo: null
            }
        }
    } else {
        // Reset location and/or handoverType
        return {
            ...extendedUser,
            store: extendedUser.store,
            handoverInfo: {
                handoverType: handoverType,
                deliveryInfo: null
            }
        }
    }
}

export const setHandoverInfoAndStore = (extendedUser, handoverInfo, store) => {
    const response = {
        ...extendedUser,
        handoverInfo
    }

    if (store) {
        response.store = store
    }

    return response
}

export const setHandoverWindow = (extendedUser, handoverwindow) => {
    return {
        ...extendedUser,
        handoverInfo: {
            ...extendedUser.handoverInfo,
            from: handoverwindow.from,
            to: handoverwindow.to,
            customerPickupFrom: handoverwindow.displayFrom,
            customerPickupTo: handoverwindow.displayTo,
            deadline: handoverwindow.selectedProduct.deadline,
            storeWindowId: handoverwindow.storeWindowId,
            pickupPointWindowId: handoverwindow.pickupPointWindowId,
            product: handoverwindow.selectedProduct,
            deliveryInfo: handoverwindow.carrierWindowId ? {
                ...extendedUser.handoverInfo.deliveryInfo,
                carrierWindowId: handoverwindow.carrierWindowId
            } : null
        }
    }
}

export const updateHandoverWindowData = (extendedUser, handoverwindow) => {
    // Only for updating fresh ids and product from handover-windows service
    return {
        ...extendedUser,
        handoverInfo: {
            ...extendedUser.handoverInfo,
            storeWindowId: handoverwindow.storeWindowId,
            pickupPointWindowId: handoverwindow.pickupPointWindowId,
            product: handoverwindow.selectedProduct,
            deliveryInfo: handoverwindow.carrierWindowId ? {
                ...extendedUser.handoverInfo.deliveryInfo,
                carrierWindowId: handoverwindow.carrierWindowId
            } : null
        }
    }
}

export const resetHandoverWindow = (extendedUser) => {
    return {
        ...extendedUser,
        handoverInfo: {
            ...extendedUser.handoverInfo,
            from: null,
            to: null,
            customerPickupFrom: null,
            customerPickupTo: null,
            deadline: null,
            storeWindowId: null,
            pickupPointWindowId: null,
            product: null,
            deliveryInfo: extendedUser.handoverInfo.deliveryInfo
        }
    }
}
