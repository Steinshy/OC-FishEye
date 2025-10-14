import { getFormElements, formFieldNames, getErrorElement } from '../constants.js';

import { aria } from './accessibility/aria.js';

export const safeAsync = async (asyncFn, fallback = null, context = '') => {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`[${context}] ${error}`, error || '');
    return fallback;
  }
};

export const errorDisplay = {
  resetErrorVisibility() {
    const formElements = getFormElements();
    formFieldNames.forEach(fieldName => {
      const field = formElements[fieldName];
      const errorElement = getErrorElement(fieldName);

      if (field) {
        aria.updateAttributes(field, {
          'data-error-visible': 'false',
          'data-valid': 'false',
        });
      }

      if (errorElement) {
        aria.updateAttributes(errorElement, { 'data-error-visible': 'false' });
      }
    });
  },

  toggleError(targetKey, shouldShow, message) {
    const errorElement = getErrorElement(targetKey);
    if (errorElement) {
      aria.updateAttributes(errorElement, { 'data-error-visible': shouldShow ? 'true' : 'false' });
      if (message) {
        errorElement.textContent = message;
      }
    }
  },
};
