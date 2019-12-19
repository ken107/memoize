"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = jest.fn((x) => Promise.resolve(x ? 42 + x : -100));
    const get = index_1.default(fetch);
    yield expect(get(1)).resolves.toBe(43);
    yield expect(get(2)).resolves.toBe(44);
    yield expect(get(2)).resolves.toBe(44);
    expect(fetch.mock.calls.length).toBe(2);
    yield expect(get(3)).resolves.toBe(45);
    yield expect(get(3)).resolves.toBe(45);
    yield expect(get(3)).resolves.toBe(45);
    yield expect(get()).resolves.toBe(-100);
    yield expect(get()).resolves.toBe(-100);
    yield expect(get(1)).resolves.toBe(43);
    yield expect(get(4)).resolves.toBe(46);
    expect(fetch.mock.calls.length).toBe(5);
}));
test("singleton", () => __awaiter(void 0, void 0, void 0, function* () {
    const fetch = jest.fn(() => Promise.resolve(50));
    const get = index_1.default(fetch);
    yield expect(get(1)).resolves.toBe(50);
    yield expect(get()).resolves.toBe(50);
    yield expect(get()).resolves.toBe(50);
    expect(fetch.mock.calls.length).toBe(2);
}));
