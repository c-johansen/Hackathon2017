import HandoverType from "./HandoverType"

export const ClientStatus = {
    User: "USER",
    Local: "LOCAL",
    Open: "OPEN",
    Processing: "PROCESSING",
    Delivered: "DELIVERED",
    Cancelled: "CANCELLED",
}

export const SubstitutionType = {
    Similar: "SIMILAR",
    History: "HISTORY",
    None: "NONE",
}

export const SubstitutionTypes = [
    SubstitutionType.Similar,
    //SubstitutionType.History, // Discontinued
    SubstitutionType.None,
]

export const SubstitutionTypeLabel = {
    [SubstitutionType.Similar]: "Finn lignende vare",
    [SubstitutionType.History]: "Finn lignende vare som jeg har kjøpt før", // Discontinued, but keep label for backwards-compability
    [SubstitutionType.None]: "Ikke velg noe annet",
}

export const SubstitutionTypeSubLabel = {
    [SubstitutionType.Similar]: "Som er tilnærmet lik i pris, kvalitet og type",
    [SubstitutionType.History]: null,
    [SubstitutionType.None]: null,
}

export const Defaults = {
    substitutePreference: SubstitutionType.Similar,
    handoverType: HandoverType.Store,
}

export default {
    Defaults,
    ClientStatus,
    HandoverType,
    SubstitutionType,
    SubstitutionTypes,
    SubstitutionTypeLabel,
}
