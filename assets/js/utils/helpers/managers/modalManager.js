import { selectorTypes, getModalRefs, getFormElements, getFieldNames } from '../../../constants.js';
import { accessibilityManager } from '../../accessibility.js';
import { errorDisplay } from '../../errorHandler.js';
import { toggleScroll } from '../helper.js';

import { submitButtonState } from './submissionManager.js';
import { validateFields } from './validationManager.js';

const { focusManager, ariaManager, mobileKeyboard } = accessibilityManager();

const resetElement = element => {
  if (!element) return;
  element.value = '';
  element.classList.remove('success', 'warning', 'danger');
  element.disabled = false;
  Object.assign(element.dataset, { valid: 'false', errorVisible: 'false' });
};

export const resetCharacterCount = () => {
  const counter = getFormElements().characterCount;
  if (counter) {
    counter.textContent = '0/500';
    counter.classList.remove('warning', 'danger');
  }
};

const eventTypes = ['input', 'keyup', 'paste'];

const addFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.addEventListener(event, handler));
};

const removeFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.removeEventListener(event, handler));
};

const characterCountListeners = () => {
  const maxLength = 500;
  const { message, characterCount } = getFormElements();

  if (!message || !characterCount) return null;

  const getCounterStatus = (length, max) => {
    if (length >= max) return 'danger';
    if (length >= max * 0.9) return 'warning';
    return '';
  };

  const update = () => {
    const { length } = message.value;
    characterCount.textContent = `${length}/${maxLength}`;
    characterCount.classList.remove('warning', 'danger');
    const status = getCounterStatus(length, maxLength);
    if (status) characterCount.classList.add(status);
  };

  addFormEventListeners(message, update);
  return () => removeFormEventListeners(message, update);
};

export const resetInputStates = () => {
  const formElements = getFormElements();
  getFieldNames().forEach(fieldName => {
    const element = formElements[fieldName];
    if (element) resetElement(element);
  });
};

// Modal state management
export const resetFormAndModal = () => {
  requestAnimationFrame(() => {
    const formElements = getFormElements();
    formElements.contactForm?.reset();
    formElements.contactModal?.classList.remove('show');
    resetInputStates();
    errorDisplay.resetErrorVisibility();
    resetCharacterCount();
  });
};

export const resetInputsAndFocus = () => {
  requestAnimationFrame(() => {
    resetInputStates();
    const modalRefs = getModalRefs();
    const firstInput = focusManager.focusFirst(modalRefs.mainModal, selectorTypes.formInputs);
    if (!firstInput) getFormElements().firstname?.focus();

    if (submitButtonState) {
      submitButtonState.init();
      submitButtonState.hide();
    }
  });
};

const toggleBackgroundContent = hide => {
  const main = document.querySelector(selectorTypes.main);
  const header = document.querySelector(selectorTypes.header);

  if (main) main.inert = hide;
  if (header) header.inert = hide;
};

const toggleModalDisplay = show => {
  const modalRefs = getModalRefs();
  const action = show ? 'add' : 'remove';
  if (modalRefs.mainModal) modalRefs.mainModal.classList[action]('show');
  if (modalRefs.form) modalRefs.form.classList[action]('show');
};

const toggleModalAria = hidden => {
  const modalRefs = getModalRefs();
  if (modalRefs.mainModal) ariaManager.setHidden(modalRefs.mainModal, hidden);
  if (modalRefs.form) ariaManager.setHidden(modalRefs.form, hidden);
  if (modalRefs.submitButton) ariaManager.setHidden(modalRefs.submitButton, hidden);
};

let focusTrapCleanup = null;

const setupFocusManagement = () => {
  const modalRefs = getModalRefs();
  if (modalRefs.mainModal) {
    modalRefs.mainModal.setAttribute('tabindex', '-1');
    focusTrapCleanup = focusManager.trapFocus(modalRefs.mainModal, selectorTypes.focusable);
    setTimeout(() => getFormElements().firstname?.focus(), 250);
  }
};

const cleanupFocusManagement = () => {
  const modalRefs = getModalRefs();
  if (modalRefs.mainModal) {
    modalRefs.mainModal.removeAttribute('tabindex');
  }
  if (focusTrapCleanup) {
    focusTrapCleanup();
    focusTrapCleanup = null;
  }
};

let previousFocus = null;
let characterCountCleanup = null;

const restorePreviousFocus = () => {
  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }
};

// Modal lifecycle management
export const openModal = () => {
  const modalRefs = getModalRefs();
  previousFocus = document.activeElement;
  toggleModalAria(false);
  toggleModalDisplay(true);
  toggleScroll(true);
  toggleBackgroundContent(true);
  mobileKeyboard.resetModalPosition();
  if (modalRefs.submitButton) {
    modalRefs.submitButton.disabled = true;
    modalRefs.submitButton.classList.add('disabled');
    modalRefs.submitButton.setAttribute('aria-disabled', 'true');
  }

  resetInputStates();
  resetCharacterCount();
  characterCountCleanup = characterCountListeners();
  setupFocusManagement();
};

export const closeModal = () => {
  const modalRefs = getModalRefs();

  if (modalRefs.mainModal) {
    modalRefs.mainModal.classList.add('closing');
  }

  setTimeout(() => {
    cleanupFocusManagement();
    toggleScroll(false);
    toggleBackgroundContent(false);
    mobileKeyboard.resetModalPosition();
    toggleModalDisplay(false);
    toggleModalAria(true);

    if (modalRefs.mainModal) {
      modalRefs.mainModal.classList.remove('closing');
    }

    restorePreviousFocus();
    resetFormAndModal();
    if (document.activeElement && modalRefs.mainModal && modalRefs.mainModal.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    if (characterCountCleanup) {
      characterCountCleanup();
      characterCountCleanup = null;
    }
  }, 200);
};

// Form validation functions
const getValidationClass = (hasValue, isValid) => {
  if (!hasValue) return null;
  return isValid ? 'success' : 'danger';
};

const validateField = (element, fieldName) => {
  if (!element) return;
  const value = element.value.trim();
  const isValid = Boolean(validateFields(fieldName, value));
  const hasValue = Boolean(value);

  updateFieldState(element, hasValue, isValid);
  const shouldShowError = hasValue && !isValid;
  errorDisplay?.toggleError(fieldName, shouldShowError);
  updateSubmitButton();
};

const updateFieldState = (element, hasValue, isValid) => {
  if (!element) return;
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
  const formElements = getFormElements();
  const allValid = getFieldNames().every(fieldName => {
    const input = formElements[fieldName];
    const isValid = Boolean(input && validateFields(fieldName, input.value.trim()));
    return isValid;
  });

  allValid ? submitButtonState.show() : submitButtonState.hide();
};

export const setupFieldValidation = field => {
  if (!field || !field.element) return;
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

export const isModalOpen = () => {
  const modalRefs = getModalRefs();
  return Boolean(modalRefs.mainModal?.classList?.contains('show'));
};
