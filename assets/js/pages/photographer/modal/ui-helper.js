import { modalElements, formConfig } from '../../../constants.js';

// To do: Rework The submission process
export const submitButtonState = {
  init() {
    if (!modalElements.mainModal.submitButton) return;

    modalElements.mainModal.submitButton.textContent = 'Envoyer';
    modalElements.mainModal.submitButton.classList.remove('success', 'disabled');
    modalElements.mainModal.submitButton.disabled = true;
    modalElements.mainModal.submitButton.setAttribute('aria-disabled', 'true');
  },

  show() {
    if (!modalElements.mainModal.submitButton) return;

    modalElements.mainModal.submitButton.disabled = false;
    modalElements.mainModal.submitButton.classList.remove('disabled');
    modalElements.mainModal.submitButton.setAttribute('aria-disabled', 'false');
  },

  hide() {
    if (!modalElements.mainModal.submitButton) return;

    modalElements.mainModal.submitButton.disabled = true;
    modalElements.mainModal.submitButton.classList.add('disabled');
    modalElements.mainModal.submitButton.setAttribute('aria-disabled', 'true');
  },

  setLoading(isLoading = true) {
    if (!modalElements.mainModal.submitButton) return;

    if (isLoading) {
      submitButtonState.hide();
      modalElements.mainModal.submitButton.textContent = 'Envoi en cours...';
    } else {
      submitButtonState.show();
      modalElements.mainModal.submitButton.textContent = 'Envoyer';
    }
  },

  setSuccess(isSuccess = true) {
    if (!modalElements.mainModal.submitButton) return;

    if (isSuccess) {
      modalElements.mainModal.submitButton.textContent = 'Message envoyé !';
      modalElements.mainModal.submitButton.classList.add('success');
    } else {
      modalElements.mainModal.submitButton.textContent = 'Envoyer';
      modalElements.mainModal.submitButton.classList.remove('success');
    }
  },

  reset() {
    if (!modalElements.mainModal.submitButton) return;

    submitButtonState.show();
    modalElements.mainModal.submitButton.textContent = 'Envoyer';
    modalElements.mainModal.submitButton.classList.remove('success', 'disabled');
    modalElements.mainModal.submitButton.setAttribute('aria-disabled', 'false');
  },

  isEnabled() {
    return modalElements.mainModal.submitButton && !modalElements.mainModal.submitButton.disabled;
  },

  isDisabled() {
    return modalElements.mainModal.submitButton && modalElements.mainModal.submitButton.disabled;
  },
};

export const errorDisplay = {
  resetErrorVisibility() {
    formConfig.fieldNames.forEach(fieldName => {
      const field = modalElements.formGroup[fieldName];
      if (field && field !== modalElements.formGroup.message) {
        field.setAttribute('data-error-visible', 'false');
        field.setAttribute('data-valid', 'false');
      }
    });

    formConfig.errorElements.forEach(errorElementName => {
      const errorElement = modalElements.formError[errorElementName];
      errorElement?.setAttribute('data-error-visible', 'false');
    });
  },

  toggleError(targetKey, shouldShow, message) {
    if (!modalElements) return;
    const errorElement = modalElements.formError[targetKey];
    if (errorElement) {
      errorElement.setAttribute('data-error-visible', shouldShow ? 'true' : 'false');
      if (message) {
        errorElement.textContent = message;
      }
    }
  },
};
