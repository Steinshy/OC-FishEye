import { modalElements, inputs } from '../../../constants.js';

import { resetFormAndModal, toggleModal } from './modalManager.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { submitValidation } from './validators.js';

export const submitForm = e => {
  e.preventDefault();
  errorDisplay?.resetErrorVisibility();

  if (!submitValidation()) {
    submitButtonState?.hide();
    return;
  }

  handleFormSubmission();
};

export const handleFormSubmission = () => {
  try {
    disableFormInputs(true);
    preventModalClosing(true);
    submitButtonState?.setLoading(true);

    setTimeout(() => {
      submitButtonState?.setSuccess(true);
      inputs.forEach(input => {
        if (input) {
          input.classList.add('success');
          input.setAttribute('data-valid', 'true');
          input.setAttribute('data-error-visible', 'false');
        }
      });

      setTimeout(() => {
        preventModalClosing(false);
        disableFormInputs(false);
        toggleModal(false);
        submitButtonState?.reset();
        resetFormAndModal?.();
      }, 1500);
    }, 1000);
  } catch (err) {
    preventModalClosing(false);
    disableFormInputs(false);
    console.error('Form submission error:', err);
  }
};

export const disableFormInputs = disable => {
  if (!modalElements) return;

  inputs.forEach(input => {
    if (input) {
      input.disabled = disable;
    }
  });
};

export const preventModalClosing = prevent => {
  if (!modalElements.mainModal.closeButton) return;
  modalElements.mainModal.closeButton.disabled = prevent;
  modalElements.mainModal.closeButton.style.pointerEvents = prevent ? 'none' : 'auto';
  modalElements.mainModal.closeButton.style.opacity = prevent ? '0.5' : '1';
};
