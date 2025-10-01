export const EventManager = {
  listeners: new Map(),

  add(element, event, handler, key, options = {}) {
    this.remove(key);
    element.addEventListener(event, handler, options);
    this.listeners.set(key, { element, event, handler, options });
  },

  remove(key) {
    if (!key) return;
    const listener = this.listeners.get(key);
    if (listener) {
      listener.element.removeEventListener(listener.event, listener.handler, listener.options);
      this.listeners.delete(key);
    }
  },
};
