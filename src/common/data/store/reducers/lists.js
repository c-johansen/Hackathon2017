import { ListsAction } from "../actions/creators/lists"
import * as transformers from "./transformers/lists"

const init = {
    loading: false,
    items: [],
    error: null,
    query: ""
}

export default function (state = init, action) {
    switch (action.type) { 
        case ListsAction.Success:
            return { ...state, items: action.payload, error: null }
        case ListsAction.Loading:
            return { ...state, loading: true }
        case ListsAction.Loaded:
            return { ...state, loading: false }
        case ListsAction.Error:
            return { ...state, error: action.payload }
        case ListsAction.AddList:
            return { ...state, items: [action.payload, ...state.items] }
        case ListsAction.ListUpdated:
            return { 
                ...state, 
                items: [
                    ...state.items.filter(l => l.id !== action.payload),
                    {
                        ...state.items.find(l => l.id === action.payload),
                        updatedAt: new Date()
                    }
                ] 
            }
        case ListsAction.AddListItem: 
            return transformers.addListItem(state, action)
        case ListsAction.RemoveListItem:
            return transformers.removeListItem(state, action)
        default:
            return state
    }
}
