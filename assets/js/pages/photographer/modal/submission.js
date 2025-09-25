import { modalElements, getInputs } from '../../../constants.js';

import { resetFormAndModal, toggleModal } from './modalManager.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { submitValidation } from './validators.js';

// To do: Rework The submission process
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const submitForm = async e => {
  e.preventDefault();
  errorDisplay?.resetErrorVisibility();

  if (!submitValidation()) {
    submitButtonState?.hide();
    return;
  }

  await handleFormSubmission();
};

const markInputsSuccess = () => {
  getInputs().forEach(input => {
    if (input) {
      input.classList.add('success');
      input.setAttribute('data-valid', 'true');
      input.setAttribute('data-error-visible', 'false');
    }
  });
};

export const handleFormSubmission = async () => {
  disableFormInputs(true);
  preventModalClosing(true);
  submitButtonState?.setLoading(true);

  await sleep(1000);
  submitButtonState?.setSuccess(true);
  markInputsSuccess();

  await sleep(1500);
  preventModalClosing(false);
  disableFormInputs(false);
  toggleModal(false);
  submitButtonState?.reset();
  resetFormAndModal?.();
};

export const disableFormInputs = disable => {
  if (!modalElements) return;

  getInputs().forEach(input => {
    if (input) {
      input.disabled = disable;
    }
  });
};

export const preventModalClosing = prevent => {
  if (!modalElements.mainModal.closeButton) return;
  modalElements.mainModal.closeButton.disabled = prevent;
};
