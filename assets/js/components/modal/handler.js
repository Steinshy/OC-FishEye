/**
 * Photographer Page => Event Handler Functions
 * Contains all event handler functions for the contact form
 */

import { Modal } from '../../core/constants.js';

import { resetInputsAndFocus, resetFormAndModal } from './cleanup.js';
import { handleCharacterCount } from './utils/characterCount.js';
import { ButtonState } from './utils/submitButton.js';

// Open the modal and set initial states
export const openModal = () => {
  if (!Modal || !Modal.modalMain || !Modal.modalHeader || !Modal.mainForm) return;

  // Show modal immediately for instant visual feedback
  Modal.modalMain.removeAttribute('aria-hidden');
  Modal.modalHeader.classList.add('show');
  Modal.modalMain.classList.add('show');
  Modal.mainForm.classList.add('show');
  resetInputsAndFocus();
};

// Close the modal and reset form/modal state
export const closeModal = () => {
  if (!Modal || !Modal.modalMain || !Modal.modalHeader || !Modal.mainForm) return;

  // Set aria-hidden on the main modal only
  Modal.modalMain.setAttribute('aria-hidden', 'true');

  Modal.modalHeader.classList.remove('show');
  Modal.modalMain.classList.remove('show');
  Modal.mainForm.classList.remove('show');
  resetFormAndModal();

  // Return focus to the contact button for better accessibility
  if (Modal.contactButton) {
    Modal.contactButton.focus();
  }
};

// Initialize form handlers (button, character count, validation)
export const initializeFormHandlers = () => {
  if (ButtonState) {
    ButtonState.initialize();
    ButtonState.hide();
  }
  handleCharacterCount();
};
