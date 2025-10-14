// Cache system for storing and retrieving data

// Main cache storage
const cache = new Map();

// Cache store operations
const store = {
  // Get or create named store
  getStore(storeName) {
    if (!cache.has(storeName)) cache.set(storeName, new Map());
    return cache.get(storeName);
  },
  // Check if key exists in store
  has(storeName, key) {
    return this.getStore(storeName).has(String(key));
  },
  // Get value from store
  get(storeName, key) {
    return this.getStore(storeName).get(String(key));
  },
  // Set value in store
  set(storeName, key, value) {
    this.getStore(storeName).set(String(key), value);
  },
};

// Wrap index for circular navigation
const getWrappedIndex = (index, length) => (index < 0 ? length - 1 : index >= length ? 0 : index);

// Media-specific cache operations
export const mediaCache = {
  // Get cached value or create new one
  getOrCreate(storeName, key, createFn, shouldClone = false) {
    if (store.has(storeName, key)) {
      const cached = store.get(storeName, key);
      return shouldClone && cached?.cloneNode ? cached.cloneNode(true) : cached;
    }
    const data = createFn();
    if (data) store.set(storeName, key, data);
    return data;
  },

  // Preload previous and next items in list
  preloadAdjacent(storeName, items, currentIndex, createFn, getKey = item => item.id) {
    if (!items?.length) return;
    [getWrappedIndex(currentIndex - 1, items.length), getWrappedIndex(currentIndex + 1, items.length)].forEach(index => {
      const item = items[index];
      if (item) this.getOrCreate(storeName, getKey(item), () => createFn(item));
    });
  },
};
