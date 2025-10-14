import { selectorTypes } from '../../constants.js';

import { aria } from './aria.js';
import { inert } from './inert.js';

// Core focus utilities
export const blurActive = () => document.activeElement?.blur();

export const focusFirst = (container, selector = selectorTypes.focusable) => {
  const element = container?.querySelector(selector);
  element?.focus();
  return element;
};

export const focusNext = (elements, current, wrap = true) => {
  const currentIndex = elements.findIndex(element => element === current);
  const nextIndex = wrap ? (currentIndex + 1) % elements.length : Math.min(currentIndex + 1, elements.length - 1);
  const element = elements[nextIndex];
  element?.focus();
  return element;
};

export const focusPrevious = (elements, current, wrap = true) => {
  const currentIndex = elements.findIndex(element => element === current);
  const previousIndex = wrap ? (currentIndex <= 0 ? elements.length - 1 : currentIndex - 1) : Math.max(currentIndex - 1, 0);
  const element = elements[previousIndex];
  element?.focus();
  return element;
};

export const createFocusCycle = (container, selector = selectorTypes.focusable) => {
  if (!container) return () => {};

  const handleTab = e => {
    if (e.key !== 'Tab') return;
    e.preventDefault();

    const elements = Array.from(container.querySelectorAll(selector)).filter(
      element => !element.hasAttribute('disabled') && !element.hasAttribute('inert') && element.offsetParent !== null
    );

    if (!elements.length) return;

    const { activeElement } = document;
    const currentIndex = elements.findIndex(el => el === activeElement);

    if (e.shiftKey) {
      const prevIndex = currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
      elements[prevIndex]?.focus();
    } else {
      const nextIndex = currentIndex === -1 || currentIndex >= elements.length - 1 ? 0 : currentIndex + 1;
      elements[nextIndex]?.focus();
    }
  };

  document.addEventListener('keydown', handleTab);
  return () => document.removeEventListener('keydown', handleTab);
};

// Focus state manager
let focusCycleCleanup = null;
let previousFocus = null;

export const toggleBackgroundContent = hide => {
  inert.toggleBackgroundContent(hide, [selectorTypes.main, selectorTypes.header]);
};

export const setupFocusCycle = (modal, focusTarget, delay = 0) => {
  if (!modal) return;

  previousFocus = document.activeElement;
  aria.setTabindex(modal, -1);
  focusCycleCleanup = createFocusCycle(modal, selectorTypes.focusable);

  if (focusTarget) {
    setTimeout(() => focusTarget.focus(), delay);
  }
};

export const cleanupFocusCycle = modal => {
  if (modal) {
    aria.setTabindex(modal, null);
  }

  if (focusCycleCleanup) {
    focusCycleCleanup();
    focusCycleCleanup = null;
  }

  if (previousFocus) {
    setTimeout(() => {
      previousFocus?.focus();
      previousFocus = null;
    }, 50);
  }
};

export const handleFocusEscape = (modal, event) => {
  if (modal && !modal.contains(event.target)) {
    focusFirst(modal);
  }
};

export const resetFocusState = () => {
  focusCycleCleanup = null;
  previousFocus = null;
};
