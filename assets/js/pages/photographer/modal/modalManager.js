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
    // Focus the first input field using accessibility manager
    const firstInput = accessibilityManager.focusManager.focusFirst(modalElements.mainModal.main, 'input, textarea');
    if (!firstInput && modalElements.formGroup.firstname) {
      modalElements.formGroup.firstname.focus();
    }

    if (submitButtonState) {
      submitButtonState.init();
      submitButtonState.hide();
    }
  });
};

const accessibilityManager = createAccessibilityManager();

export const trapFocus = element => {
  const originalTrap = accessibilityManager.focusManager.trapFocus(element);

  // Enhanced focus trap with additional safety
  const enhancedTrap = () => {
    // Check if focus is still within the modal
    const { activeElement } = document;
    if (activeElement && !element.contains(activeElement)) {
      // Focus escaped, bring it back
      const firstFocusable = accessibilityManager.focusManager.focusFirst(element, 'input, textarea, button');
      if (!firstFocusable) {
        element.focus();
      }
    }
  };

  // Check focus every 100ms as additional safety
  const focusCheckInterval = setInterval(enhancedTrap, 100);

  return () => {
    originalTrap();
    clearInterval(focusCheckInterval);
  };
};

const handleModalFocusIn = e => {
  // If focus goes outside the modal, immediately bring it back
  if (!modalElements.mainModal.main.contains(e.target)) {
    e.preventDefault();
    e.stopPropagation();
    accessibilityManager.focusManager.focusFirst(modalElements.mainModal.main, 'input, textarea, button');
  }
};

const handleModalFocusOut = e => {
  // If focus is about to leave the modal, prevent it
  if (!modalElements.mainModal.main.contains(e.relatedTarget)) {
    e.preventDefault();
    e.stopPropagation();
    // Force focus back to the first focusable element
    setTimeout(() => {
      const firstFocusable = accessibilityManager.focusManager.focusFirst(modalElements.mainModal.main, 'input, textarea, button');
      if (!firstFocusable) {
        // If no focusable element found, focus the modal itself
        modalElements.mainModal.main.focus();
      }
    }, 0);
  }
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
  modalElements.mainModal.main.classList[action]('show');
  modalElements.mainModal.form.classList[action]('show');
};

export const toggleModal = isOpen => {
  if (isOpen) {
    previouslyFocusedElement = document.activeElement;
    setModalAriaHidden(false);
    setModalClasses(true);

    // Prevent body scroll
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');

    focusTrapCleanup = trapFocus(modalElements.mainModal.main);

    // Make modal focusable and add focus management event listeners
    modalElements.mainModal.main.setAttribute('tabindex', '-1');
    modalElements.mainModal.main.addEventListener('focusin', handleModalFocusIn);
    modalElements.mainModal.main.addEventListener('focusout', handleModalFocusOut);

    setTimeout(() => {
      // Use accessibility manager to focus the first input
      const firstInput = accessibilityManager.focusManager.focusFirst(modalElements.mainModal.main, 'input, textarea');
      if (!firstInput && modalElements.formGroup.firstname) {
        modalElements.formGroup.firstname.focus();
      }
    }, 0);
  } else {
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }

    // Remove focus management event listeners
    modalElements.mainModal.main.removeEventListener('focusin', handleModalFocusIn);
    modalElements.mainModal.main.removeEventListener('focusout', handleModalFocusOut);
    modalElements.mainModal.main.removeAttribute('tabindex');

    // Restore body scroll
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');

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
