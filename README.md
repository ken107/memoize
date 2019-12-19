[![Build Status](https://travis-ci.org/ken107/memoize.svg?branch=master)](https://travis-ci.org/ken107/memoize)

### Usage

```typescript
import memoize from "extensible-memoize";
const getItem = memoize(fetchItem);

//define your fetch function:
function fetchItem(key: K): Promise<V> {
  //fetch the item identified by key
}
```

*Note*: if key is an object, its toString() method must return a unique hash.


### Caching

By default, memoize uses a mem cache with no expiration.  To specify your own caching implementation, pass an array of Caches as the second parameter.

```typescript
interface Cache<K, V> {
  get: (key: K) => Promise<V>
  set: (key: K, value: V) => Promise<void>
}

const getItem = memoize(fetchItem, [cache1, cache2, ...]);
```

Memoize will first look for the item in `cache1`, then in `cache2`, and so on.  If the item is not found in the caches, `fetchItem` will be called.  Note that your cache implementations do not have to worry about dealing with concurrency, memoize will take care of that.
