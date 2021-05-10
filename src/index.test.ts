import memoize from "./index"

test("main", async () => {
    const fetch = jest.fn((x: number) => Promise.resolve(x ? 42+x : -100));
    const get = memoize(fetch);
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
