import { extendedUserHasChanged, ChangeTrigger } from "../store/actions/user"
import { MessageBroker, PredefinedMessageTopics } from "@ng-mw/framework-core"

export default function (store) {
    MessageBroker.registerListener(
        PredefinedMessageTopics.EXTENDED_USER_HAS_CHANGED_LOCALLY,
        (message) => store.dispatch(extendedUserHasChanged(ChangeTrigger.Local, message.data))  // data = prefferedStoreDidChange
    )
    MessageBroker.registerListener(
        PredefinedMessageTopics.EXTENDED_USER_HAS_CHANGED,
        (message) => store.dispatch(extendedUserHasChanged(ChangeTrigger.Sync, message.data))   // data = prefferedStoreDidChange
    )
}
