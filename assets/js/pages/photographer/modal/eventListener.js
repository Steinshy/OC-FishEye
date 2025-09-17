import { modalElements, validationRules, formConfig } from '../../../constants.js';

import { toggleModal } from './modalManager.js';
import { submitForm } from './submission.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { validateFields } from './validators.js';

// Modal Field Updates
const updateFieldAttributes = (element, fieldName, shouldShowError, shouldShowValid) => {
  if (fieldName !== 'message') {
    element.setAttribute('data-error-visible', shouldShowError);
    element.setAttribute('data-valid', shouldShowValid);
  }
};

const handleErrorDisplay = (fieldName, shouldShowError) =>
  errorDisplay?.toggleError(fieldName, shouldShowError);

// Modal Submit Button State
const updateSubmitButton = () => {
  if (!submitButtonState) return;
  const allFieldsValid = formConfig.fieldNames.every(fieldName =>
    validateFields(fieldName, modalElements?.formGroup?.[fieldName]?.value?.trim() || '')
  );
  allFieldsValid ? submitButtonState.show() : submitButtonState.hide();
};

// Modal Real Time Validation
const realTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();
  const isValid = validateFields(fieldName, fieldValue);
  const shouldShowError = fieldValue && !isValid;
  const shouldShowValid = fieldValue && isValid;

  updateFieldAttributes(element, fieldName, shouldShowError, shouldShowValid);
  handleErrorDisplay(fieldName, shouldShowError);
  updateSubmitButton();
};

// Modal Field Listeners
const setupFieldListeners = field => {
  const validate = () => realTimeValidation(field.element, field.name);
  field.element.addEventListener('input', validate);
  field.element.addEventListener('blur', validate);
  field.element.addEventListener(
    'focus',
    () =>
      field.element.getAttribute('data-valid') === 'true' &&
      field.element.setAttribute('data-error-visible', 'false')
  );
};

// Modal Form Validation Listeners
export const formValidationListeners = () => {
  formConfig.fieldNames.forEach(
    fieldName =>
      modalElements.formGroup[fieldName] &&
      setupFieldListeners({ element: modalElements.formGroup[fieldName], name: fieldName })
  );
};

// Modal Character Counter
const counterStatus = (length, maxLength) =>
  length >= maxLength ? 'danger' : length >= maxLength * 0.9 ? 'warning' : '';

// Modal Event Listeners
const eventTypes = ['input', 'keyup', 'paste'];
const addEventListeners = (element, handler) =>
  eventTypes.forEach(event => element.addEventListener(event, handler));
const removeEventListeners = (element, handler) =>
  eventTypes.forEach(event => element.removeEventListener(event, handler));

// Modal Create Character Counter
export const createCharacterCounter = (inputElement, displayElement, maxLength) => {
  const updateDisplay = () => {
    const { length } = inputElement.value;
    displayElement.textContent = `${length}/${maxLength}`;

    // Remove existing status classes
    displayElement.classList.remove('warning', 'danger');

    // Add new status class if needed
    const status = counterStatus(length, maxLength);
    if (status) {
      displayElement.classList.add(status);
    }
  };

  addEventListeners(inputElement, updateDisplay);
  return () => removeEventListeners(inputElement, updateDisplay);
};

// Modal Character Count Listeners
export const characterCountListeners = () => {
  if (!modalElements.formGroup.message || !modalElements.formElements.characterCount) return null;

  return createCharacterCounter(
    modalElements.formGroup.message,
    modalElements.formElements.characterCount,
    validationRules?.maxlength || 500
  );
};

// Modal Submit Form Listeners
export const submitFormListeners = () => {
  modalElements.mainModal.form.addEventListener('submit', submitForm);
};

// Modal Modal Listeners
export const modalListeners = () => {
  modalElements.contactButton.onclick = () => toggleModal(true);
  modalElements.mainModal.closeButton.onclick = () => toggleModal(false);
  document.onkeydown = e => {
    if (
      e.key === 'Escape' &&
      modalElements.mainModal.main.classList.contains('show') &&
      !modalElements.mainModal.closeButton.disabled
    ) {
      e.preventDefault();
      toggleModal(false);
    }
  };
};
