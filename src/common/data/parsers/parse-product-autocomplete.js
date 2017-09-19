export default function parseProductAutocomplete(data) {
    if (data.suggestedQuery) {
        return data.suggestedQuery
    }

    return false
}
