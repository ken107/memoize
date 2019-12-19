import { Cache } from "multilayer-async-cache-builder";
export default function <K, V>(fetch: (key: K) => Promise<V>, caches?: Cache<K, V>[]): (key: K) => Promise<V>;
