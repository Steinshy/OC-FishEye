import { modalElements, accessibility } from '../../constants.js';
import { closeModal, openModal } from '../../pages/photographer/modal/modalManager.js';
import { submitForm } from '../../pages/photographer/modal/submission.js';

const { focusManager, keyboardHandler } = accessibility;

const canCloseModal = () => {
  return modalElements.mainModal.main.classList.contains('show') && !modalElements.mainModal.closeButton.disabled;
};

const ensureFocusWithinModal = () => {
  if (!modalElements.mainModal.main.contains(document.activeElement)) {
    focusManager.focusFirst(modalElements.mainModal.main, 'input, textarea, button');
  }
};

export const setupModalEventListeners = () => {
  // Enable contact button after photographer data is loaded
  const contactButton = document.getElementById('contact-button');
  if (contactButton) {
    contactButton.disabled = false;
    contactButton.removeAttribute('aria-disabled');
  }

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
