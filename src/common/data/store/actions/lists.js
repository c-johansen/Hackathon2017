import * as listsActions from "./creators/lists"
import generateId from "uuid/v4"

export function addList(name) {
    return function (dispatch) {
        let list = {
            name,
            id: generateId(),
            createdAt: new Date(),
            updatedAt: null,
            items: []
        }

        dispatch(listsActions.addList(list))
    }
}

export function addListItem(listId, item, quantity) {
    return function (dispatch) {
        dispatch(listsActions.addListItem(listId, item, quantity))
        dispatch(listsActions.listUpdated(listId))
    }
}

export function removeListItem(listId, item) {
    return function (dispatch) {
        dispatch(listsActions.removeListItem(listId, item))
        dispatch(listsActions.listUpdated(listId))
    }
}

