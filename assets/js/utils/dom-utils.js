/**
 * DOM Utilities
 * General DOM manipulation utilities
 */

/**
 * Update DOM element if it exists
 */
function updateElement(id, value, attribute = "textContent") {
  const element = document.getElementById(id) || document.querySelector(id);
  if (element) {
    if (attribute === "textContent") {
      element.textContent = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
}

/**
 * Get element by ID with error handling
 */
function getElementById(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
}

/**
 * Get elements by class name
 */
function getElementsByClassName(className) {
  return document.getElementsByClassName(className);
}

/**
 * Query selector with error handling
 */
function querySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
}

/**
 * Add event listener with error handling
 */
function addEventListener(element, event, handler) {
  if (element && typeof element.addEventListener === 'function') {
    element.addEventListener(event, handler);
  } else {
    console.warn('Cannot add event listener to element:', element);
  }
}

/**
 * Remove event listener
 */
function removeEventListener(element, event, handler) {
  if (element && typeof element.removeEventListener === 'function') {
    element.removeEventListener(event, handler);
  }
}

// Global access for backward compatibility
window.DOMUtils = {
  updateElement,
  getElementById,
  getElementsByClassName,
  querySelector,
  addEventListener,
  removeEventListener
};
