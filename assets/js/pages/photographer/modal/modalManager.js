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

export const trapFocus = element => {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const [firstFocusableElement, ..._] = focusableElements;
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = e => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  document.addEventListener('keydown', handleTabKey);
  return () => document.removeEventListener('keydown', handleTabKey);
};

export const restoreFocus = () => {
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
};

let focusTrapCleanup = null;

export const toggleModal = isOpen => {
  if (isOpen) {
    previouslyFocusedElement = document.activeElement;

    modalElements.mainModal.main.setAttribute('aria-hidden', 'false');
    modalElements.mainModal.form.setAttribute('aria-hidden', 'false');
    modalElements.mainModal.submitButton.setAttribute('aria-hidden', 'false');

    modalElements.mainModal.header.classList.add('show');
    modalElements.mainModal.main.classList.add('show');
    modalElements.mainModal.form.classList.add('show');

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

    if (document.activeElement && modalElements.mainModal.main.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    modalElements.mainModal.header.classList.remove('show');
    modalElements.mainModal.main.classList.remove('show');
    modalElements.mainModal.form.classList.remove('show');

    modalElements.mainModal.main.setAttribute('aria-hidden', 'true');
    modalElements.mainModal.form.setAttribute('aria-hidden', 'true');
    modalElements.mainModal.submitButton.setAttribute('aria-hidden', 'true');

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
