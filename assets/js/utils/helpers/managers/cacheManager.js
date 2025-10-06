const cache = new Map();

const store = {
  getStore(storeName) {
    if (!cache.has(storeName)) {
      cache.set(storeName, new Map());
    }
    return cache.get(storeName);
  },

  has(storeName, key) {
    return this.getStore(storeName).has(String(key));
  },

  get(storeName, key) {
    return this.getStore(storeName).get(String(key));
  },

  set(storeName, key, value) {
    this.getStore(storeName).set(String(key), value);
  },
};

export const mediaCache = {
  getOrCreate(storeName, key, createFn) {
    if (store.has(storeName, key)) {
      const cached = store.get(storeName, key);
      return cached?.cloneNode ? cached.cloneNode(true) : cached;
    }

    const data = createFn();
    if (data) {
      const toStore = data.cloneNode ? data.cloneNode(true) : data;
      store.set(storeName, key, toStore);
    }
    return data;
  },
};
