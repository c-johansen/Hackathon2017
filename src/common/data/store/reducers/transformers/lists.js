export function addListItem(state, action) {
    let list = state.items.find(l => l.id === action.payload.listId)
    let restLists = state.items.filter(l => l.id !== action.payload.listId)
    let item = {
        quantity: action.payload.quantity,
        addedAt: new Date(),
        product: action.payload.item
    }
    let existingItem = list.items.find(p => p.product.ean === item.product.ean)

    if (existingItem) {
        item.quantity += existingItem.quantity
    }

    return {
        ...state,
        items: [
            ...restLists,
            {
                ...list,
                items: [
                    item,
                    ...list.items.filter(i => i.product.ean !== item.product.ean)
                ]
            }
        ]
    }
}

export function removeListItem(state, action) {
    let list = state.items.find(l => l.id === action.payload.listId)
    let restLists = state.items.filter(l => l.id !== action.payload.listId)

    return {
        ...state,
        items: [
            ...restLists,
            {
                ...list,
                items: [
                    ...list.items.filter(i => i.product.ean !== action.payload.item.ean)
                ]
            }
        ]
    }
}
