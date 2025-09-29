import { createAccessibilityManager } from '../../../accessibilityManagement.js';
import { modalElements, validationConfig, getFieldNames, formConfig } from '../../../constants.js';

import { toggleModal } from './modalManager.js';
import { submitForm } from './submission.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { validateFields } from './validators.js';

const updateFieldAttributes = (element, shouldShowError, shouldShowValid) => {
  element.setAttribute('data-error-visible', shouldShowError);
  element.setAttribute('data-valid', shouldShowValid);

  // Remove all validation classes first
  element.classList.remove('success', 'warning', 'danger');

  // Add appropriate validation class
  if (shouldShowValid) {
    element.classList.add('success');
  } else if (shouldShowError) {
    element.classList.add('danger');
  }
};

const handleErrorDisplay = (fieldName, shouldShowError) => errorDisplay?.toggleError(fieldName, shouldShowError);
const counterStatus = (length, maxLength) => (length >= maxLength ? 'danger' : length >= maxLength * 0.9 ? 'warning' : '');
const eventTypes = ['input', 'keyup', 'paste'];
const accessibilityManager = createAccessibilityManager();

const updateSubmitButton = () => {
  if (!submitButtonState) return;
  const allFieldsValid = getFieldNames().every(fieldName => {
    const input = modalElements.formGroup[fieldName];
    return input && validateFields(fieldName, input.value.trim());
  });
  allFieldsValid ? submitButtonState.show() : submitButtonState.hide();
};

const realTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();
  const isValid = validateFields(fieldName, fieldValue);
  const shouldShowError = fieldValue && !isValid;
  const shouldShowValid = fieldValue && isValid;

  updateFieldAttributes(element, shouldShowError, shouldShowValid);
  handleErrorDisplay(fieldName, shouldShowError);
  updateSubmitButton();
};

const addEventListeners = (element, handler) => eventTypes.forEach(event => element.addEventListener(event, handler));
const removeEventListeners = (element, handler) => eventTypes.forEach(event => element.removeEventListener(event, handler));

let characterCountCleanup = null;

export const characterCountListeners = () => {
  const input = modalElements.formGroup.message,
    display = modalElements.formElements.characterCount,
    max = validationConfig?.maxlength || 500;
  if (!input || !display) return null;

  const update = () => {
    const len = input.value.length;
    display.textContent = `${len}/${max}`;
    display.classList.remove('warning', 'danger');
    const status = counterStatus(len, max);
    if (status) display.classList.add(status);
  };

  addEventListeners(input, update);
  return () => removeEventListeners(input, update);
};

let modalEventsBound = false;

export const modalListeners = () => {
  if (modalEventsBound) return;

  modalEventsBound = true;

  // Setup form validation listeners
  const setupFieldListeners = field => {
    const validate = () => realTimeValidation(field.element, field.name);
    field.element.addEventListener('input', validate);
    field.element.addEventListener('blur', validate);
    field.element.addEventListener(
      'focus',
      () => field.element.getAttribute('data-valid') === 'true' && field.element.setAttribute('data-error-visible', 'false')
    );
  };

  formConfig.fieldNames.forEach(
    fieldName => modalElements.formGroup[fieldName] && setupFieldListeners({ element: modalElements.formGroup[fieldName], name: fieldName })
  );

  const openHandler = () => {
    toggleModal(true);
    // Activate character count when modal opens
    if (!characterCountCleanup) {
      characterCountCleanup = characterCountListeners();
    }
  };

  const closeHandler = () => {
    toggleModal(false);
    // Deactivate character count when modal closes
    if (characterCountCleanup) {
      characterCountCleanup();
      characterCountCleanup = null;
    }
  };

  const escapeHandler = accessibilityManager.keyboardHandler.createEscapeHandler(() => {
    if (modalElements.mainModal.main.classList.contains('show') && !modalElements.mainModal.closeButton.disabled) {
      closeHandler();
    }
  });

  // Add focus management for better keyboard navigation
  const focusHandler = accessibilityManager.keyboardHandler.createActivationHandler(() => {
    // Ensure focus stays within modal
    if (!modalElements.mainModal.main.contains(document.activeElement)) {
      accessibilityManager.focusManager.focusFirst(modalElements.mainModal.main, 'input, textarea, button');
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

  // Form submit listener
  if (modalElements.mainModal.form) {
    modalElements.mainModal.form.addEventListener('submit', submitForm);
  }

  // Add focus management to modal
  if (modalElements.mainModal.main) {
    modalElements.mainModal.main.addEventListener('keydown', focusHandler);
  }

  document.addEventListener('keydown', escapeHandler);
};
