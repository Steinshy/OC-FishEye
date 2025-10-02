const mediaStorage = new Map();

const getMediaStorage = name => {
  if (!mediaStorage.has(name)) {
    mediaStorage.set(name, new Map());
  }
  return mediaStorage.get(name);
};

const exists = (mediaStore, key) => {
  const store = getMediaStorage(mediaStore);
  return store.has(String(key));
};

const retrieve = (mediaStore, key) => {
  const store = getMediaStorage(mediaStore);
  return store.get(String(key));
};

const store = (mediaStore, key, value) => {
  const store = getMediaStorage(mediaStore);
  store.set(String(key), value);
};

const remove = (mediaStore, key) => {
  const store = getMediaStorage(mediaStore);
  return store.delete(String(key));
};

const empty = mediaStore => {
  const store = getMediaStorage(mediaStore);
  store.clear();
};

const emptyAll = () => {
  mediaStorage.clear();
};

const count = mediaStore => {
  const store = getMediaStorage(mediaStore);
  return store.size;
};

const getOrCreateElement = (mediaStore, key, createFn, clone = true) => {
  if (exists(mediaStore, key)) {
    const stored = retrieve(mediaStore, key);
    return clone ? stored?.cloneNode(true) : stored;
  }

  const element = createFn();
  if (element) {
    store(mediaStore, key, clone ? element.cloneNode(true) : element);
  }
  return element;
};

const storeElement = (mediaStore, key, element, clone = true) => {
  if (element) {
    store(mediaStore, key, clone ? element.cloneNode(true) : element);
  }
};

const findExistingElements = (container, selector, attribute, mediaStore) => {
  const foundElements = new Map();
  const elements = Array.from(container.querySelectorAll(selector));

  elements.forEach(element => {
    const key = element.getAttribute(attribute);
    if (key) {
      foundElements.set(key, element);
    }
  });

  store(mediaStore, 'found', foundElements);
  return foundElements;
};

const getExistingElement = (mediaStore, key) => {
  const foundElements = retrieve(mediaStore, 'found');
  return foundElements?.get(String(key));
};

const getOrCreateData = (dataStore, key, createFn) => {
  if (exists(dataStore, key)) {
    return retrieve(dataStore, key);
  }

  const data = createFn();
  store(dataStore, key, data);
  return data;
};

export const mediaCache = {
  exists,
  retrieve,
  store,
  remove,
  empty,
  emptyAll,
  count,
  getOrCreateElement,
  storeElement,
  findExistingElements,
  getExistingElement,
  getOrCreateData,
};
