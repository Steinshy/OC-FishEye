// Form field validation logic

import { formFieldNames, getFormElements } from '../../config.js';
import { sanitizeAndValidate, validateEmail, validate, getFormValues, forEachFormField } from '../../helpers/helper.js';
import { errorDisplay } from '../errorHandler.js';

import { submitButtonState } from './submitButtonState.js';

// Validation rules for each field
const validationRules = {
  firstname: value => sanitizeAndValidate(value, v => v.length >= 2),
  lastname: value => sanitizeAndValidate(value, v => v.length >= 2),
  email: validateEmail,
  message: value => sanitizeAndValidate(value, v => v.length > 0 && v.length <= 500),
};

// Validate single field
export const validateFields = (fieldName, value) => validate(validationRules, fieldName, value);

// Validate all fields before submission
export const submitValidation = () => {
  const form = getFormElements();
  if (validate(validationRules, getFormValues(form))) return true;

  let hasErrors = false;
  forEachFormField(form, formFieldNames, (element, name) => {
    if (!validateFields(name, element.value)) {
      errorDisplay.toggleError(name, true);
      hasErrors = true;
    }
  });

  return !hasErrors;
};

// Update field visual state
const updateState = (element, hasValue, isValid) => {
  if (!element) return;
  element.dataset.errorVisible = hasValue && !isValid;
  element.dataset.valid = hasValue && isValid;
  element.classList.remove('success', 'warning', 'danger');
  if (hasValue) element.classList.add(isValid ? 'success' : 'danger');
};

// Update submit button state based on validation
const updateButton = () =>
  formFieldNames.every(name => getFormElements()[name] && validateFields(name, getFormElements()[name].value.trim()))
    ? submitButtonState.show()
    : submitButtonState.hide();

// Validate field on input change
const validateField = (element, name) => {
  if (!element) return;
  const value = element.value.trim();
  const hasValue = !!value;
  const isValid = validateFields(name, value);
  const shouldShowError = !isValid;
  updateState(element, hasValue, isValid);
  errorDisplay?.toggleError(name, shouldShowError);
  updateButton();
};

// Setup validation listeners for field
export const setupFieldValidation = ({ element, name }) => {
  if (!element) return;
  const validate = () => validateField(element, name);
  element.addEventListener('input', validate);
  element.addEventListener('blur', validate);
  element.addEventListener('focus', () => {
    if (element.dataset.valid === 'true') element.dataset.errorVisible = 'false';
  });
};
