import { createAccessibilityManager } from '../../../accessibilityManagement.js';
import { modalElements, validationConfig, formConfig } from '../../../constants.js';

import { toggleModal } from './modalManager.js';
import { submitForm } from './submission.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { validateFields } from './validators.js';

const updateFieldAttributes = (element, fieldName, shouldShowError, shouldShowValid) => {
  if (fieldName !== 'message') {
    element.setAttribute('data-error-visible', shouldShowError);
    element.setAttribute('data-valid', shouldShowValid);
  }
};

const handleErrorDisplay = (fieldName, shouldShowError) => errorDisplay?.toggleError(fieldName, shouldShowError);

const updateSubmitButton = () => {
  if (!submitButtonState) return;
  const allFieldsValid = formConfig.fieldNames.every(fieldName => validateFields(fieldName, modalElements?.formGroup?.[fieldName]?.value?.trim() || ''));
  allFieldsValid ? submitButtonState.show() : submitButtonState.hide();
};

const realTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();
  const isValid = validateFields(fieldName, fieldValue);
  const shouldShowError = fieldValue && !isValid;
  const shouldShowValid = fieldValue && isValid;

  updateFieldAttributes(element, fieldName, shouldShowError, shouldShowValid);
  handleErrorDisplay(fieldName, shouldShowError);
  updateSubmitButton();
};

const setupFieldListeners = field => {
  const validate = () => realTimeValidation(field.element, field.name);
  field.element.addEventListener('input', validate);
  field.element.addEventListener('blur', validate);
  field.element.addEventListener(
    'focus',
    () => field.element.getAttribute('data-valid') === 'true' && field.element.setAttribute('data-error-visible', 'false')
  );
};

export const formValidationListeners = () => {
  formConfig.fieldNames.forEach(
    fieldName => modalElements.formGroup[fieldName] && setupFieldListeners({ element: modalElements.formGroup[fieldName], name: fieldName })
  );
};

const counterStatus = (length, maxLength) => (length >= maxLength ? 'danger' : length >= maxLength * 0.9 ? 'warning' : '');

const eventTypes = ['input', 'keyup', 'paste'];
const addEventListeners = (element, handler) => eventTypes.forEach(event => element.addEventListener(event, handler));
const removeEventListeners = (element, handler) => eventTypes.forEach(event => element.removeEventListener(event, handler));

export const createCharacterCounter = (inputElement, displayElement, maxLength) => {
  const updateDisplay = () => {
    const { length } = inputElement.value;
    displayElement.textContent = `${length}/${maxLength}`;
    displayElement.classList.remove('warning', 'danger');
    const status = counterStatus(length, maxLength);
    if (status) {
      displayElement.classList.add(status);
    }
  };

  addEventListeners(inputElement, updateDisplay);
  return () => removeEventListeners(inputElement, updateDisplay);
};

export const characterCountListeners = () => {
  if (!modalElements.formGroup.message || !modalElements.formElements.characterCount) return null;

  return createCharacterCounter(modalElements.formGroup.message, modalElements.formElements.characterCount, validationConfig?.maxlength || 500);
};

export const submitFormListeners = () => {
  modalElements.mainModal.form.addEventListener('submit', submitForm);
};

const accessibilityManager = createAccessibilityManager();

let modalEventsBound = false;

export const modalListeners = () => {
  if (modalEventsBound) return;

  modalEventsBound = true;

  const openHandler = () => toggleModal(true);
  const closeHandler = () => toggleModal(false);

  const escapeHandler = accessibilityManager.keyboardHandler.createEscapeHandler(() => {
    if (modalElements.mainModal.main.classList.contains('show') && !modalElements.mainModal.closeButton.disabled) {
      toggleModal(false);
    }
  });

  if (modalElements.contactButton) {
    modalElements.contactButton.addEventListener('click', openHandler);
    modalElements.contactButton.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openHandler();
      }
    });
  }

  if (modalElements.mainModal.closeButton) {
    modalElements.mainModal.closeButton.addEventListener('click', closeHandler);
  }

  document.addEventListener('keydown', escapeHandler);
};
