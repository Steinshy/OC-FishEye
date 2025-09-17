import { modalElements, formConfig } from '../../../constants.js';

import { submitButtonState, errorDisplay } from './ui-helper.js';
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

export const toggleModal = isOpen => {
  if (isOpen) {
    // Remove aria-hidden from all modal elements
    modalElements.mainModal.main.setAttribute('aria-hidden', 'false');
    modalElements.mainModal.form.setAttribute('aria-hidden', 'false');
    modalElements.mainModal.submitButton.setAttribute('aria-hidden', 'false');

    modalElements.mainModal.header.classList.add('show');
    modalElements.mainModal.main.classList.add('show');
    modalElements.mainModal.form.classList.add('show');
  } else {
    // Blur any focused elements before hiding
    if (document.activeElement && modalElements.mainModal.main.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    modalElements.mainModal.header.classList.remove('show');
    modalElements.mainModal.main.classList.remove('show');
    modalElements.mainModal.form.classList.remove('show');

    // Restore aria-hidden on all modal elements
    modalElements.mainModal.main.setAttribute('aria-hidden', 'true');
    modalElements.mainModal.form.setAttribute('aria-hidden', 'true');
    modalElements.mainModal.submitButton.setAttribute('aria-hidden', 'true');
  }
  resetInputsAndFocus();
  resetFormAndModal();
};
