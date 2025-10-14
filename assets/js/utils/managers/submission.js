// Form submission handling

import { getFormElements, getModalRefs } from '../../config.js';
import { sleep, toggleElementsDisabled, getFormInputsArray, getFormValues } from '../../helpers/helper.js';
import { logData } from '../../helpers/logData.js';
import { errorDisplay } from '../errorHandler.js';

import { submitButtonState } from './submitButtonState.js';
import { submitValidation } from './validation.js';

// Submit contact form with validation
export const submitForm = async (e, onComplete) => {
  e.preventDefault();
  errorDisplay?.resetErrorVisibility();
  if (!submitValidation()) {
    submitButtonState?.hide();
    return;
  }
  await handleFormSubmission(onComplete);
};

// Process form submission and update UI
const handleFormSubmission = async onComplete => {
  const inputs = getFormInputsArray(getFormElements());

  logData.formSubmission(getFormValues(getFormElements()));

  toggleElementsDisabled([...inputs, getModalRefs().closeButton], true);
  submitButtonState.setLoading();

  await sleep(1000);
  submitButtonState.setSuccess();
  inputs.forEach(input => {
    input.classList.add('success');
    input.dataset.valid = 'true';
    input.dataset.errorVisible = 'false';
  });

  await sleep(1500);
  toggleElementsDisabled([...inputs, getModalRefs().closeButton], false);
  submitButtonState.reset();
  onComplete?.();
};
