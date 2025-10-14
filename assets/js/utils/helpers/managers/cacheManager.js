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

const getWrappedIndex = (index, length) => {
  if (index < 0) return length - 1;
  if (index >= length) return 0;
  return index;
};

export const mediaCache = {
  getOrCreate(storeName, key, createFn, shouldClone = false) {
    if (store.has(storeName, key)) {
      const cached = store.get(storeName, key);
      return shouldClone && cached?.cloneNode ? cached.cloneNode(true) : cached;
    }

    const data = createFn();
    if (data) {
      store.set(storeName, key, data);
    }
    return data;
  },

  preloadAdjacent(storeName, items, currentIndex, createFn, getKey = item => item.id) {
    if (!items?.length) return;

    const indicesToPreload = [getWrappedIndex(currentIndex - 1, items.length), getWrappedIndex(currentIndex + 1, items.length)];

    indicesToPreload.forEach(index => {
      const item = items[index];
      if (item) {
        this.getOrCreate(storeName, getKey(item), () => createFn(item));
      }
    });
  },
};
