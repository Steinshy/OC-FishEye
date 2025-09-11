/**
 * Photographer Page => Form Reset
 */

import { Modal } from '../../core/constants.js';

import { resetErrorVisibility } from './utils/displayError.js';
import { ButtonState } from './utils/submitButton.js';

export const resetCharacterCount = () => {
  if (Modal.characterCount) {
    Modal.characterCount.textContent = '0/500';
    Modal.characterCount.classList.remove('warning', 'danger');
  }
};

export const resetInputStates = () => {
  // Reset each form field to its initial state
  for (const fieldName of Modal.formFieldNames) {
    const element = Modal[fieldName];
    if (element) {
      element.value = '';
      element.classList.remove('success', 'warning', 'danger');
      element.disabled = false;
      element.setAttribute('data-valid', 'false');
      element.setAttribute('data-error-visible', 'false');
    }
  }
};

export const resetFormAndModal = () => {
  // Defer heavy operations to next frame to avoid blocking
  (window.requestAnimationFrame || setTimeout)(() => {
    Modal.contactForm?.reset();
    Modal.contactModal?.classList.remove('show');
    resetInputStates();
    resetErrorVisibility();
    resetCharacterCount();
  });
};

export const resetInputsAndFocus = () => {
  (window.requestAnimationFrame || setTimeout)(() => {
    resetInputStates();
    if (Modal.firstNameInput) {
      Modal.firstNameInput.focus();
    }

    if (ButtonState) {
      ButtonState.initialize();
      ButtonState.hide();
    }
  });
};
