import { getFieldNames } from '../constants.js';

export const safeAsync = async (asyncFn, fallback = null, context = '') => {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`[${context}] ${error}`, error || '');
    return fallback;
  }
};

const getErrorElement = fieldName => document.getElementById(`${fieldName.toLowerCase()}-error`);

export const errorDisplay = {
  resetErrorVisibility() {
    getFieldNames().forEach(fieldName => {
      const field = document.getElementById(fieldName);
      if (field && fieldName !== 'message') {
        field.setAttribute('data-error-visible', 'false');
        field.setAttribute('data-valid', 'false');
      }
    });

    getFieldNames().forEach(errorElementName => {
      const errorElement = getErrorElement(errorElementName);
      errorElement?.setAttribute('data-error-visible', 'false');
    });
  },

  toggleError(targetKey, shouldShow, message) {
    const errorElement = getErrorElement(targetKey);
    if (errorElement) {
      errorElement.setAttribute('data-error-visible', shouldShow ? 'true' : 'false');
      if (message) {
        errorElement.textContent = message;
      }
    }
  },
};
