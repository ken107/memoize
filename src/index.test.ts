import memoize from "./index"

test("main", async () => {
    const fetch = jest.fn((x: number) => Promise.resolve(42+x));
    const get = memoize(fetch);
    await expect(get(1)).resolves.toBe(43);
    await expect(get(2)).resolves.toBe(44);
    await expect(get(2)).resolves.toBe(44);
    await expect(fetch.mock.calls.length).toBe(2);
    await expect(get(3)).resolves.toBe(45);
    await expect(get(3)).resolves.toBe(45);
    await expect(get(3)).resolves.toBe(45);
    await expect(get(1)).resolves.toBe(43);
    await expect(get(4)).resolves.toBe(46);
    await expect(fetch.mock.calls.length).toBe(4);
})
