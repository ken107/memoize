import { Fetch, Cache } from "multilayer-async-cache-builder"

class DumbMemCache<K, V> implements Cache<K, V> {
    private readonly mem: {[key: string]: V} = {};
    get(key: K): V {
        const hashKey = String(key);
        return this.mem[hashKey];
    }
    set(key: K, value: V) {
        const hashKey = String(key);
        this.mem[hashKey] = value;
    }
}

export default function<K, V>(fetch: (key?: K) => Promise<V>, caches: Cache<K, V>[] = [new DumbMemCache<K, V>()]) {
    let x = new Fetch(fetch);
    for (let i=caches.length-1; i>=0; i--) x = x.cache(caches[i]);
    return x.dedupe();
}
