import { populateModalElements, modalElements, formConfig } from '../../../constants.js';
import { setupFieldValidationListeners } from '../../../utils/helpers/formEventListeners.js';
import { setupModalEventListeners } from '../../../utils/helpers/modalEventListeners.js';

import { submitButtonState, errorDisplay } from './ui-helper.js';
import { validateFields } from './validators.js';

let isInitialized = false;

const getValidationClass = (hasValue, isValid) => {
  if (!hasValue) return null;
  return isValid ? 'success' : 'danger';
};

const updateFieldState = (element, hasValue, isValid) => {
  Object.assign(element.dataset, {
    errorVisible: hasValue && !isValid,
    valid: hasValue && isValid,
  });

  element.classList.remove('success', 'warning', 'danger');
  const validationClass = getValidationClass(hasValue, isValid);
  if (validationClass) element.classList.add(validationClass);
};

const updateSubmitButton = () => {
  if (!submitButtonState) return;
  const allValid = formConfig.fieldNames.every(fieldName => {
    const input = modalElements.formGroup[fieldName];
    const isValid = input && validateFields(fieldName, input.value.trim());
    return isValid;
  });

  allValid ? submitButtonState.show() : submitButtonState.hide();
};

const validateField = (element, fieldName) => {
  const value = element.value.trim();
  const isValid = validateFields(fieldName, value);
  const hasValue = Boolean(value);

  updateFieldState(element, hasValue, isValid);
  errorDisplay?.toggleError(fieldName, hasValue && !isValid);
  updateSubmitButton();
};

const setupFieldValidation = field => {
  const validate = () => validateField(field.element, field.name);
  const hideErrorOnFocus = () => {
    if (field.element.dataset.valid === 'true') {
      field.element.dataset.errorVisible = 'false';
    }
  };

  setupFieldValidationListeners(field.element, validate, hideErrorOnFocus);
};

export const modalListeners = () => {
  if (isInitialized) return;
  isInitialized = true;

  populateModalElements();

  formConfig.fieldNames.forEach(fieldName => {
    const element = modalElements.formGroup[fieldName];
    if (element) setupFieldValidation({ element, name: fieldName });
  });

  setupModalEventListeners();
};
