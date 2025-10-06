import { getModalRefs, getFormElements, getFieldNames } from '../../../constants.js';
import { accessibilityManager } from '../../accessibility.js';
import { openModal, closeModal, setupFieldValidation } from '../managers/modalManager.js';
import { submitForm } from '../managers/submissionManager.js';

const eventTypes = ['input', 'keyup', 'paste'];

const { focusManager, keyboardHandler } = accessibilityManager();

const ensureFocusWithinModal = () => {
  const modalRefs = getModalRefs();
  if (modalRefs.mainModal && !modalRefs.mainModal.contains(document.activeElement)) {
    focusManager.focusFirst(modalRefs.mainModal, 'input, textarea, button');
  }
};

const addFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.addEventListener(event, handler));
};

const removeFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.removeEventListener(event, handler));
};

export const characterCountListeners = () => {
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
        submitForm(e);
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

  modalRefs.form?.addEventListener('submit', submitForm);
  modalRefs.mainModal?.addEventListener('keydown', focusHandler);
  document.addEventListener('keydown', escapeHandler);
};
