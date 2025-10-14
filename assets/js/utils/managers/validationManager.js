import { formFieldNames, getFormElements } from '../../constants.js';
import { sanitizeAndValidate, validateEmail, validate, getFormValues, forEachFormField } from '../../helpers/helper.js';
import { errorDisplay } from '../errorHandler.js';

import { submitButtonState } from './submitButtonState.js';

const validationRules = {
  firstname: value => sanitizeAndValidate(value, v => v.length >= 2),
  lastname: value => sanitizeAndValidate(value, v => v.length >= 2),
  email: validateEmail,
  message: value => sanitizeAndValidate(value, v => v.length > 0 && v.length <= 500),
};

export const validateFields = (fieldName, value) => validate(validationRules, fieldName, value);

export const submitValidation = () => {
  const formElements = getFormElements();
  if (validate(validationRules, getFormValues(formElements))) return true;

  let hasErrors = false;
  forEachFormField(formElements, formFieldNames, (element, fieldName) => {
    if (!validateFields(fieldName, element.value)) {
      errorDisplay.toggleError(fieldName, true);
      hasErrors = true;
    }
  });

  return !hasErrors;
};

const updateFieldState = (element, hasValue, isValid) => {
  if (!element) return;

  element.dataset.errorVisible = hasValue && !isValid;
  element.dataset.valid = hasValue && isValid;
  element.classList.remove('success', 'warning', 'danger');

  if (hasValue) {
    element.classList.add(isValid ? 'success' : 'danger');
  }
};

const updateSubmitButton = () => {
  if (!submitButtonState) return;

  const isAllValid = formFieldNames.every(fieldName => {
    const element = getFormElements()[fieldName];
    return element && validateFields(fieldName, element.value.trim());
  });

  isAllValid ? submitButtonState.show() : submitButtonState.hide();
};

const validateField = (element, fieldName) => {
  if (!element) return;

  const value = element.value.trim();
  const hasValue = !!value;
  const isValid = validateFields(fieldName, value);

  updateFieldState(element, hasValue, isValid);
  errorDisplay?.toggleError(fieldName, hasValue && !isValid);
  updateSubmitButton();
};

export const setupFieldValidation = ({ element, name }) => {
  if (!element) return;

  const handleValidation = () => validateField(element, name);
  const handleFocus = () => {
    if (element.dataset.valid === 'true') {
      element.dataset.errorVisible = 'false';
    }
  };

  element.addEventListener('input', handleValidation);
  element.addEventListener('blur', handleValidation);
  element.addEventListener('focus', handleFocus);
};
