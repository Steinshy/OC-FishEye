export const updateElement = (id, value, attribute = 'textContent') => {
  const element = document.getElementById(id) || document.querySelector(id);
  if (element) {
    if (attribute === 'textContent') {
      element.textContent = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
};

export const getElementById = id => {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
};

export const getElementsByClassName = className => {
  return document.getElementsByClassName(className);
};

export const querySelector = selector => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
};

export const addEventListener = (element, event, handler) => {
  if (element && typeof element.addEventListener === 'function') {
    element.addEventListener(event, handler);
  } else {
    console.warn('Cannot add event listener to element:', element);
  }
};

export const removeEventListener = (element, event, handler) => {
  if (element && typeof element.removeEventListener === 'function') {
    element.removeEventListener(event, handler);
  }
};

export const DOMUtils = {
  updateElement,
  getElementById,
  getElementsByClassName,
  querySelector,
  addEventListener,
  removeEventListener
};
