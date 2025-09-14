import { fieldErrorMap, getTrimmedValues } from '../../../core/constants.js';
import { Validators } from '../validators.js';

import { ErrorHandler } from './displayError.js';
import { ButtonState } from './submitButton.js';

/**
 * Update field attributes based on validation state
 * @param {HTMLElement} element - The form element
 * @param {string} fieldName - The field name
 * @param {boolean} shouldShowError - Whether to show error state
 * @param {boolean} shouldShowValid - Whether to show valid state
 */
const updateFieldAttributes = (element, fieldName, shouldShowError, shouldShowValid) => {
  if (fieldName !== 'message') {
    element.setAttribute('data-error-visible', shouldShowError ? 'true' : 'false');
    element.setAttribute('data-valid', shouldShowValid ? 'true' : 'false');
  }
};

/**
 * Handle error display for the field
 * @param {string} fieldName - The field name
 * @param {boolean} shouldShowError - Whether to show error
 */
const handleErrorDisplay = (fieldName, shouldShowError) => {
  if (ErrorHandler) {
    const errorKey = fieldErrorMap[fieldName] || fieldName;
    ErrorHandler.setError(errorKey, shouldShowError);
  }
};

/**
 * Check if all form fields are valid
 * @param {object} values - Form field values
 * @returns {boolean} Whether all fields are valid
 */
const areAllFieldsValid = values => {
  return Object.keys(values).every(
    field => Validators?.validateFields(field, values[field]) || false
  );
};

/**
 * Update submit button state based on form validation
 * @param {object} values - Form field values
 */
const updateSubmitButton = values => {
  if (ButtonState) {
    const allFieldsValid = areAllFieldsValid(values);
    allFieldsValid ? ButtonState.show() : ButtonState.hide();
  }
};

// Real-time validation handler
export const realTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();
  const isValid = Validators?.validateFields(fieldName, fieldValue) || false;
  const shouldShowError = Boolean(fieldValue && !isValid);
  const shouldShowValid = Boolean(fieldValue && isValid);

  updateFieldAttributes(element, fieldName, shouldShowError, shouldShowValid);
  handleErrorDisplay(fieldName, shouldShowError);

  // Get all form values for complete validation
  const values = getTrimmedValues() || {};
  updateSubmitButton(values);
};
