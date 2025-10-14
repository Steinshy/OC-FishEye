// Focus management and keyboard navigation utilities

import { selectorTypes } from '../../config.js';

import { aria } from './aria.js';
import { inert } from './inert.js';

// Remove focus from active element
export const blurActive = () => document.activeElement?.blur();

// Focus first focusable element in container
export const focusFirst = (container, selector = selectorTypes.focusable) => {
  container?.querySelector(selector)?.focus();
  return container?.querySelector(selector);
};

// Focus next element in array
export const focusNext = (elements, current, wrap = true) => {
  const index = elements.findIndex(element => element === current);
  elements[wrap ? (index + 1) % elements.length : Math.min(index + 1, elements.length - 1)]?.focus();
  return elements[wrap ? (index + 1) % elements.length : Math.min(index + 1, elements.length - 1)];
};

// Focus previous element in array
export const focusPrevious = (elements, current, wrap = true) => {
  const index = elements.findIndex(element => element === current);
  elements[wrap ? (index <= 0 ? elements.length - 1 : index - 1) : Math.max(index - 1, 0)]?.focus();
  return elements[wrap ? (index <= 0 ? elements.length - 1 : index - 1) : Math.max(index - 1, 0)];
};

// Create focus trap for modal dialogs
export const createFocusCycle = (container, selector = selectorTypes.focusable) => {
  if (!container) return () => {};

  const handleTab = e => {
    if (e.key !== 'Tab') return;
    e.preventDefault();

    const elements = Array.from(container.querySelectorAll(selector)).filter(
      element => !element.hasAttribute('disabled') && !element.hasAttribute('inert') && element.offsetParent !== null
    );

    if (!elements.length) return;

    const index = elements.findIndex(element => element === document.activeElement);
    elements[e.shiftKey ? (index <= 0 ? elements.length - 1 : index - 1) : index === -1 || index >= elements.length - 1 ? 0 : index + 1]?.focus();
  };

  document.addEventListener('keydown', handleTab);
  return () => document.removeEventListener('keydown', handleTab);
};

// Store focus state
let focusCycleCleanup = null;
let previousFocus = null;

// Toggle background content accessibility
export const toggleBackgroundContent = hide => {
  inert.toggleBackgroundContent(hide, [selectorTypes.main, selectorTypes.header]);
};

// Setup focus trap for modal
export const setupFocusCycle = (modal, focusTarget, delay = 0) => {
  if (!modal) return;

  previousFocus = document.activeElement;
  aria.setTabindex(modal, -1);
  focusCycleCleanup = createFocusCycle(modal, selectorTypes.focusable);

  if (focusTarget) {
    setTimeout(() => focusTarget.focus(), delay);
  }
};

// Remove focus trap and restore focus
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

// Prevent focus from leaving modal
export const handleFocusEscape = (modal, event) => {
  if (modal && !modal.contains(event.target)) {
    focusFirst(modal);
  }
};

// Reset focus state variables
export const resetFocusState = () => {
  focusCycleCleanup = null;
  previousFocus = null;
};
