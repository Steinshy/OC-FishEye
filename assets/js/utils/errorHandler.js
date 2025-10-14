// Error handling and form error display utilities

import { getFormElements, formFieldNames, getErrorElement } from '../config.js';

import { aria } from './accessibility/aria.js';

// Wrap async function with error handling
export const safeAsync = async (asyncFn, fallback = null, context = '') => {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`[${context}] ${error}`, error || '');
    return fallback;
  }
};

// Form error display manager
export const errorDisplay = {
  // Reset all form field error states
  resetErrorVisibility() {
    const form = getFormElements();
    formFieldNames.forEach(name => {
      const field = form[name];
      const error = getErrorElement(name);

      if (field) {
        aria.updateAttributes(field, {
          'data-error-visible': 'false',
          'data-valid': 'false',
        });
      }

      if (error) {
        aria.updateAttributes(error, { 'data-error-visible': 'false' });
      }
    });
  },

  // Show or hide error message for field
  toggleError(key, show, message) {
    const error = getErrorElement(key);
    if (error) {
      aria.updateAttributes(error, { 'data-error-visible': show ? 'true' : 'false' });
      if (message) error.textContent = message;
    }
  },
};
