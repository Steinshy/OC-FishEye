// Inert attribute management for accessibility

export const inert = {
  // Set inert property on element
  setInert(element, isInert) {
    if (!element) return;
    element.inert = isInert;
  },

  // Set inert on multiple elements
  setMultipleInert(selectors, isInert) {
    selectors.forEach(selector => inert.setInert(typeof selector === 'string' ? document.querySelector(selector) : selector, isInert));
  },

  // Toggle inert on background elements
  toggleBackgroundContent(hide, selectors = ['main', 'header']) {
    inert.setMultipleInert(selectors, hide);
  },
};
