const eventTypes = ['input', 'keyup', 'paste'];

export const addFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.addEventListener(event, handler));
};

export const removeFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.removeEventListener(event, handler));
};

export const setupFieldValidationListeners = (element, validate, hideErrorOnFocus) => {
  element.addEventListener('input', validate);
  element.addEventListener('blur', validate);
  element.addEventListener('focus', hideErrorOnFocus);
};
