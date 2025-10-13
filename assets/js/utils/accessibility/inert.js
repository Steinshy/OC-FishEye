export const inert = {
  setInert(element, isInert) {
    if (!element) return;
    element.inert = isInert;
  },

  setMultipleInert(selectors, isInert) {
    selectors.forEach(selector => {
      const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
      inert.setInert(element, isInert);
    });
  },

  toggleBackgroundContent(hide, selectors = ['main', 'header']) {
    inert.setMultipleInert(selectors, hide);
  },
};
