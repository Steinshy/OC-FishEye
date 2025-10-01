import { modalState, timeoutConfig, selectorTypes } from '../../../constants.js';
import { accessibilityManager } from '../../../utils/accessibility.js';
import { toggleScroll } from '../../../utils/helpers/utils.js';

import { errorDisplay, submitButtonState } from './ui-helper.js';

const validationCriteria = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minlength: 2,
  maxlength: 500,
};

const { focusManager, ariaManager } = accessibilityManager();
const eventTypes = ['input', 'keyup', 'paste'];
const addEventListeners = (element, handler) => eventTypes.forEach(event => element.addEventListener(event, handler));
const removeEventListeners = (element, handler) => eventTypes.forEach(event => element.removeEventListener(event, handler));

const getCounterStatus = (length, maxLength) => {
  if (length >= maxLength) return 'danger';
  if (length >= maxLength * 0.9) return 'warning';
  return '';
};

const characterCountListeners = () => {
  const { message } = modalState.formGroup;
  const { characterCount } = modalState.formElements;
  const max = validationCriteria?.maxlength;

  if (!message || !characterCount) return null;

  const update = () => {
    const { length } = message.value;
    characterCount.textContent = `${length}/${max}`;
    characterCount.classList.remove('warning', 'danger');
    const status = getCounterStatus(length, max);
    if (status) characterCount.classList.add(status);
  };

  addEventListeners(message, update);
  return () => removeEventListeners(message, update);
};

const resetElement = element => {
  if (!element) return;
  element.value = '';
  element.classList.remove('success', 'warning', 'danger');
  element.disabled = false;
  Object.assign(element.dataset, { valid: 'false', errorVisible: 'false' });
};

export const resetCharacterCount = () => {
  const counter = modalState.formElements.characterCount;
  if (counter) {
    counter.textContent = '0/500';
    counter.classList.remove('warning', 'danger');
  }
};

export const resetInputStates = () => {
  Object.keys(modalState.formGroup).forEach(fieldName => resetElement(modalState.formGroup[fieldName]));
};

export const resetFormAndModal = () => {
  requestAnimationFrame(() => {
    modalState.formElements.contactForm?.reset();
    modalState.formElements.contactModal?.classList.remove('show');
    resetInputStates();
    errorDisplay.resetErrorVisibility();
    resetCharacterCount();
  });
};

export const resetInputsAndFocus = () => {
  requestAnimationFrame(() => {
    resetInputStates();
    const firstInput = focusManager.focusFirst(modalState.mainModal.main, selectorTypes.formInputs);
    if (!firstInput) modalState.formGroup.firstname?.focus();

    if (submitButtonState) {
      submitButtonState.init();
      submitButtonState.hide();
    }
  });
};

const focusFirstInput = () => {
  const firstInput = focusManager.focusFirst(modalState.mainModal.main, selectorTypes.formInputs);
  if (!firstInput) modalState.formGroup.firstname?.focus();
};

const toggleBackgroundContent = hide => {
  const main = document.querySelector(selectorTypes.main);
  const header = document.querySelector(selectorTypes.header);

  if (main) main.inert = hide;
  if (header) header.inert = hide;
};

const toggleModalDisplay = show => {
  const action = show ? 'add' : 'remove';
  modalState.mainModal.main.classList[action]('show');
  modalState.mainModal.form.classList[action]('show');
};

const toggleModalAria = hidden => {
  ariaManager.setHidden(modalState.mainModal.main, hidden);
  ariaManager.setHidden(modalState.mainModal.form, hidden);
  ariaManager.setHidden(modalState.mainModal.submitButton, hidden);
};

const setupFocusManagement = () => {
  modalState.mainModal.main.setAttribute('tabindex', '-1');
  modalState.focusTrap = focusManager.trapFocus(modalState.mainModal.main, selectorTypes.focusable);
};

const cleanupFocusManagement = () => {
  modalState.mainModal.main.removeAttribute('tabindex');

  if (modalState.focusTrap) {
    modalState.focusTrap();
    modalState.focusTrap = null;
  }
};

const restorePreviousFocus = () => {
  if (modalState.previousFocus) {
    modalState.previousFocus.focus();
    modalState.previousFocus = null;
  }
};

export const openModal = () => {
  modalState.previousFocus = document.activeElement;
  toggleModalAria(false);
  toggleModalDisplay(true);
  toggleScroll(true);
  toggleBackgroundContent(true);

  if (modalState.mainModal.submitButton) {
    modalState.mainModal.submitButton.disabled = true;
    modalState.mainModal.submitButton.classList.add('disabled');
    modalState.mainModal.submitButton.setAttribute('aria-disabled', 'true');
  }

  setupFocusManagement();
  setTimeout(focusFirstInput, timeoutConfig.focus);
  resetInputsAndFocus();
  if (!modalState.characterCountCleanup) {
    modalState.characterCountCleanup = characterCountListeners();
  }
};

export const closeModal = () => {
  cleanupFocusManagement();
  toggleScroll(false);
  toggleBackgroundContent(false);

  if (document.activeElement && modalState.mainModal.main.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  toggleModalDisplay(false);
  toggleModalAria(true);
  setTimeout(restorePreviousFocus, timeoutConfig.focus);
  resetFormAndModal();
  if (modalState.characterCountCleanup) {
    modalState.characterCountCleanup();
    modalState.characterCountCleanup = null;
  }
};
