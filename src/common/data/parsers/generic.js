export function uniqueArray(array) {
    let n = {}
    let r = []

    for (var i = 0; i < array.length; i++) {
        if (!n[array[i]]) {
            n[array[i]] = true
            r.push(array[i])
        }
    }

    return r
}
