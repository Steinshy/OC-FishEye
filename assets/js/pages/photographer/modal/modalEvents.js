import { modalElements, formConfig, selectorTypes } from '../../../constants.js';
import { accessibilityManager } from '../../../utils/accessibility.js';

import { closeModal, openModal } from './modalManager.js';
import { submitForm } from './submission.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { validateFields } from './validators.js';

const { focusManager, keyboardHandler } = accessibilityManager();

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

  field.element.addEventListener('input', validate);
  field.element.addEventListener('blur', validate);
  field.element.addEventListener('focus', hideErrorOnFocus);
};

const canCloseModal = () => {
  return modalElements.mainModal.main.classList.contains('show') && !modalElements.mainModal.closeButton.disabled;
};

const ensureFocusWithinModal = () => {
  if (!modalElements.mainModal.main.contains(document.activeElement)) {
    focusManager.focusFirst(modalElements.mainModal.main, selectorTypes.formInputs);
  }
};

export const modalListeners = () => {
  if (isInitialized) return;
  isInitialized = true;

  formConfig.fieldNames.forEach(fieldName => {
    const element = modalElements.formGroup[fieldName];
    if (element) setupFieldValidation({ element, name: fieldName });
  });

  const escapeHandler = keyboardHandler.createEscapeHandler(() => {
    if (canCloseModal()) closeModal();
  });

  const focusHandler = keyboardHandler.createActivationHandler(ensureFocusWithinModal);

  if (modalElements.contactButton) {
    modalElements.contactButton.addEventListener('click', openModal);
    modalElements.contactButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  }

  if (modalElements.mainModal.submitButton) {
    modalElements.mainModal.submitButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        submitForm(e);
      }
    });
  }

  modalElements.mainModal.closeButton?.addEventListener('click', closeModal);
  modalElements.mainModal.form?.addEventListener('submit', submitForm);
  modalElements.mainModal.main?.addEventListener('keydown', focusHandler);
  document.addEventListener('keydown', escapeHandler);
};
