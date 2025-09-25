import { createAccessibilityManager } from '../../../accessibilityManagement.js';
import { modalElements, formConfig } from '../../../constants.js';

import { submitButtonState, errorDisplay } from './ui-helper.js';

// To do: Focus input is broken
export const resetCharacterCount = () => {
  if (modalElements.formElements.characterCount) {
    modalElements.formElements.characterCount.textContent = '0/500';
    modalElements.formElements.characterCount.classList.remove('warning', 'danger');
  }
};

export const resetInputStates = () => {
  formConfig.fieldNames.forEach(fieldName => {
    const element = modalElements.formGroup[fieldName];
    if (element) {
      element.value = '';
      element.classList.remove('success', 'warning', 'danger');
      element.disabled = false;
      element.setAttribute('data-valid', 'false');
      element.setAttribute('data-error-visible', 'false');
    }
  });
};

export const resetFormAndModal = () => {
  (window.requestAnimationFrame || setTimeout)(() => {
    modalElements.formElements.contactForm?.reset();
    modalElements.formElements.contactModal?.classList.remove('show');
    resetInputStates();
    errorDisplay.resetErrorVisibility();
    resetCharacterCount();
  });
};

let previouslyFocusedElement = null;

export const resetInputsAndFocus = () => {
  (window.requestAnimationFrame || setTimeout)(() => {
    resetInputStates();
    if (modalElements.formGroup.firstName) {
      modalElements.formGroup.firstName.focus();
    }

    if (submitButtonState) {
      submitButtonState.init();
      submitButtonState.hide();
    }
  });
};

const accessibilityManager = createAccessibilityManager();

export const trapFocus = element => {
  return accessibilityManager.focusManager.trapFocus(element);
};

export const restoreFocus = () => {
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
};

let focusTrapCleanup = null;

const setModalAriaHidden = hidden => {
  accessibilityManager.ariaManager.setHidden(modalElements.mainModal.main, hidden);
  accessibilityManager.ariaManager.setHidden(modalElements.mainModal.form, hidden);
  accessibilityManager.ariaManager.setHidden(modalElements.mainModal.submitButton, hidden);
};

const setModalClasses = show => {
  const action = show ? 'add' : 'remove';
  modalElements.mainModal.header.classList[action]('show');
  modalElements.mainModal.main.classList[action]('show');
  modalElements.mainModal.form.classList[action]('show');
};

export const toggleModal = isOpen => {
  if (isOpen) {
    previouslyFocusedElement = document.activeElement;
    setModalAriaHidden(false);
    setModalClasses(true);

    document.documentElement.classList.add('no-scroll');
    document.body.style.overflow = 'hidden';

    focusTrapCleanup = trapFocus(modalElements.mainModal.main);

    setTimeout(() => {
      if (modalElements.formGroup.firstName) {
        modalElements.formGroup.firstName.focus();
      }
    }, 0);
  } else {
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }

    document.documentElement.classList.remove('no-scroll');
    document.body.style.overflow = '';

    if (document.activeElement && modalElements.mainModal.main.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    setModalClasses(false);
    setModalAriaHidden(true);

    setTimeout(() => {
      restoreFocus();
    }, 100);
  }

  if (isOpen) {
    resetInputsAndFocus();
  } else {
    resetFormAndModal();
  }
};
