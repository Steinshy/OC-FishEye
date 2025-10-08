import { getModalRefs, getFormElements, getFieldNames } from '../../../constants.js';
import { accessibilityManager } from '../../accessibility.js';
import { openModal, closeModal, setupFieldValidation } from '../managers/modalManager.js';
import { submitForm } from '../managers/submissionManager.js';

const { focusManager, keyboardHandler } = accessibilityManager();

const ensureFocusWithinModal = () => {
  const modalRefs = getModalRefs();
  if (modalRefs.mainModal && !modalRefs.mainModal.contains(document.activeElement)) {
    focusManager.focusFirst(modalRefs.mainModal, 'input, textarea, button');
  }
};

export const setupModalEventListeners = () => {
  const modalRefs = getModalRefs();
  const formElements = getFormElements();
  const fieldNames = getFieldNames();

  fieldNames.forEach(fieldName => {
    const element = formElements[fieldName];
    if (element) setupFieldValidation({ element, name: fieldName });
  });

  const contactButton = modalRefs.contactButton || document.getElementById('contact-button');
  if (contactButton) {
    contactButton.disabled = false;
    contactButton.removeAttribute('aria-disabled');
  }

  const escapeHandler = keyboardHandler.createEscapeHandler(() => {
    closeModal();
  });

  const focusHandler = keyboardHandler.createActivationHandler(ensureFocusWithinModal);
  if (modalRefs.contactButton) {
    modalRefs.contactButton.addEventListener('click', openModal);
    modalRefs.contactButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  }

  if (modalRefs.submitButton) {
    modalRefs.submitButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        submitForm(e, closeModal);
      }
    });
  }

  if (modalRefs.closeButton) {
    modalRefs.closeButton.addEventListener('click', closeModal);
    modalRefs.closeButton.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      }
    });
  }

  modalRefs.form?.addEventListener('submit', e => submitForm(e, closeModal));
  modalRefs.mainModal?.addEventListener('keydown', focusHandler);
  document.addEventListener('keydown', escapeHandler);
};
