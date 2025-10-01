import { modalElements } from '../../../constants.js';
import { sleep } from '../../../utils/helpers/utils.js';

import { closeModal } from './modalManager.js';
import { submitButtonState, errorDisplay } from './ui-helper.js';
import { submitValidation } from './validators.js';

const getInputs = () => Object.values(modalElements?.formGroup ?? {}).filter(Boolean);

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
    input.classList.add('success');
    input.setAttribute('data-valid', 'true');
    input.setAttribute('data-error-visible', 'false');
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
  closeModal();
  submitButtonState?.reset();
};

export const disableFormInputs = disable => {
  getInputs().forEach(input => {
    input.disabled = disable;
  });
};

export const preventModalClosing = prevent => {
  if (!modalElements.mainModal.closeButton) return;
  modalElements.mainModal.closeButton.disabled = prevent;
};
