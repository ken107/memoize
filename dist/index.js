"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multilayer_async_cache_builder_1 = require("multilayer-async-cache-builder");
class DumbMemCache {
    constructor() {
        this.mem = {};
    }
    get(key) {
        const hashKey = String(key);
        return this.mem[hashKey];
    }
    set(key, value) {
        const hashKey = String(key);
        this.mem[hashKey] = value;
    }
}
function default_1(fetch, caches = [new DumbMemCache()]) {
    let x = new multilayer_async_cache_builder_1.Fetch(fetch);
    for (let i = caches.length - 1; i >= 0; i--)
        x = x.cache(caches[i]);
    return x.dedupe();
}
exports.default = default_1;
