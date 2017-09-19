export const ListsAction = {
    Success: "lists:success",
    Error: "lists:error",
    Loading: "lists:loading",
    Loaded: "lists:loaded",
    ListUpdated: "lists:list-updated",
    AddList: "lists:add-list",
    EmptyList: "lists:empty-list",
    AddListItem: "lists:add-list-item",
    RemoveListItem: "lists:remove-item"
}

export function success(data) {
    return {
        type: ListsAction.Success,
        payload: data
    }
}

export function error(error) {
    return {
        type: ListsAction.Error,
        payload: error
    }
}

export function loaded() {
    return {
        type: ListsAction.Loaded
    }
}

export function loading() {
    return {
        type: ListsAction.Loading
    }
}

export function addList(list) {
    return {
        type: ListsAction.AddList,
        payload: list
    }
}

export function listUpdated(listId) {
    return {
        type: ListsAction.ListUpdated,
        payload: listId
    }
}

export function empty(list) {
    return {
        type: ListsAction.Empty,
        payload: list
    }
}

export function addListItem(listId, item, quantity = 1) {
    return {
        type: ListsAction.AddListItem,
        payload: {
            listId,
            item,
            quantity
        }
    }
}

export function removeListItem(listId, item) {
    return {
        type: ListsAction.RemoveListItem,
        payload: {
            listId,
            item
        }
    }
}
