"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const jest = {
    fn(func) {
        const mock = { calls: { length: 0 } };
        const proxy = function () {
            mock.calls.length++;
            return func(...arguments);
        };
        proxy.mock = mock;
        return proxy;
    }
};
function expect(x) {
    return {
        toBe(y) {
            if (y !== x)
                throw new Error("Assertion failed");
        },
        resolves: {
            async toBe(y) {
                if (y !== await x)
                    throw new Error("Assertion failed");
            }
        }
    };
}
const tests = [];
function test(name, func) {
    tests.push({ name, func });
}
async function runAll() {
    for (const test of tests) {
        console.log("Running", test.name);
        await test.func();
    }
}
test("main", async () => {
    const fetch = jest.fn(({ x }) => Promise.resolve(x ? 42 + x : -100));
    const get0 = (0, index_1.default)(fetch);
    const get = (n) => get0({ x: n, hashKey: String(n) });
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
});
test("singleton", async () => {
    const fetch = jest.fn((key) => Promise.resolve(50));
    const get = (0, index_1.default)(fetch);
    await expect(get()).resolves.toBe(50);
    await expect(get()).resolves.toBe(50);
    expect(fetch.mock.calls.length).toBe(1);
});
runAll().catch(console.error);
