import { Cache } from "multilayer-async-cache-builder";
export default function <K extends void | string | {
    hashKey: string;
}, V>(fetch: (key: K) => Promise<V>, caches?: Cache<V>[]): (key: K) => Promise<V>;
