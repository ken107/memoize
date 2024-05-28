import memoize from "./index"

const jest = {
    fn<F extends Function>(func: F) {
        const mock = {calls: {length: 0}}
        const proxy = function() {
            mock.calls.length++
            return func(...arguments)
        } as any
        proxy.mock = mock
        return proxy as F & {mock: typeof mock}
    }
}

function expect(x: any) {
    return {
        toBe(y: unknown) {
            if (y !== x) throw new Error("Assertion failed")
        },
        resolves: {
            async toBe(y: unknown) {
                if (y !== await x) throw new Error("Assertion failed")
            }
        }
    }
}


const tests: {name: string, func: () => Promise<void>}[] = []

function test(name: string, func: () => Promise<void>) {
    tests.push({name, func})
}

async function runAll() {
    for (const test of tests) {
        console.log("Running", test.name)
        await test.func()
    }
}


test("main", async () => {
    const fetch = jest.fn(({x}: {x: number, hashKey: string}) => Promise.resolve(x ? 42+x : -100))
    const get0 = memoize(fetch)
    const get = (n: number) => get0({x: n, hashKey: String(n)})
    await expect(get(1)).resolves.toBe(43);
    await expect(get(2)).resolves.toBe(44);
    await expect(get(2)).resolves.toBe(44);
    expect(fetch.mock.calls.length).toBe(2);
    await expect(get(3)).resolves.toBe(45);
    await expect(get(3)).resolves.toBe(45);
    await expect(get(3)).resolves.toBe(45);
    await expect(get(1)).resolves.toBe(43);
    await expect(get(4)).resolves.toBe(46);
    expect(fetch.mock.calls.length).toBe(4);
})


test("singleton", async () => {
    const fetch = jest.fn((key: void) => Promise.resolve(50));
    const get = memoize(fetch);
    await expect(get()).resolves.toBe(50);
    await expect(get()).resolves.toBe(50);
    expect(fetch.mock.calls.length).toBe(1);
})

runAll().catch(console.error)
