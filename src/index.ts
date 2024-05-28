import { Fetch, Cache } from "multilayer-async-cache-builder"

class DumbMemCache<V> implements Cache<V> {
    private readonly mem = new Map<string, V>()
    async get(hashKey: string) {
        return this.mem.get(hashKey)
    }
    async set(hashKey: string, value: V) {
        this.mem.set(hashKey, value)
    }
}

export default function<K extends void|string|{hashKey: string}, V>(
    fetch: (key: K) => Promise<V>,
    caches: Cache<V>[] = [new DumbMemCache<V>()]
) {
    let x = new Fetch(fetch);
    for (let i=caches.length-1; i>=0; i--) x = x.cache(caches[i]);
    return x.dedupe();
}
