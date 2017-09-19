import Cacher from "../../../src/common/data/Cacher"

const data = { fakeData: true }
const predicate = { test: 1, iAmUndefined: undefined }

test("Cacher.cache() should store data, and inject memberId as predicate", async () => {
    await Cacher.cache("test", predicate, data)

    expect(Cacher._data.length).toEqual(1)
    expect(Cacher._data[0].expiresAt).toBeInstanceOf(Date)
    expect(Cacher._data[0].data).toEqual(data)
    expect(Cacher._data[0].predicate).toEqual({ ...predicate, memberId: null })
    expect(Cacher._data[0].predicate.iAmUndefined).toEqual(null)

    Cacher.empty()
})

test("Cacher.empty() should empty data", async () => {
    await Cacher.cache("test", predicate, data)
    await Cacher.cache("test", predicate, data)
    await Cacher.cache("test2", predicate, data)

    expect(Cacher._data.length).toEqual(3)

    Cacher.empty("test2")

    expect(Cacher._data.length).toEqual(2)

    Cacher.empty()

    expect(Cacher._data.length).toEqual(0)
})

test("Cacher.get() should get cached data with matching predicate", async () => {
    await Cacher.cache("test", predicate, data)
    let cached = await Cacher.get("test", predicate)

    expect(cached).toEqual(data)
    expect(cached.fakeData).toEqual(data.fakeData)

    Cacher.empty()
})

test("Cacher.get() should get null without matching predicate or key", async () => {
    await Cacher.cache("test", predicate, data)
    let cached = await Cacher.get("test", { test: 2 })
    let cached2 = await Cacher.get("test2", { test: 1 })

    expect(cached).toEqual(null)
    expect(cached2).toEqual(null)

    Cacher.empty()
})

test("Cacher.get() should get null with expired data", async () => {
    await Cacher.cache("test2", predicate, data, -10)

    expect(Cacher._data.length).toEqual(1)
    expect(Cacher._data[0].expiresAt.getTime()).toBeLessThan(new Date().getTime())

    let cached = await Cacher.get("test2", { predicate, memberId: null })

    expect(cached).toEqual(null)
    expect(Cacher._data.length).toEqual(0)

    Cacher.empty()
})
