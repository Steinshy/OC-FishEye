// Submit button state management

import { getModalRefs, submissionButtonText } from '../../config.js';
import { aria } from '../accessibility/aria.js';

// Update submit button text and state
const updateButton = (text, disabled, classes = []) => {
  const button = getModalRefs().submitButton;
  if (!button) return;
  button.textContent = text || submissionButtonText.defaultText;
  aria.setDisabled(button, disabled);
  button.classList.remove('success', 'disabled');
  if (classes.length) button.classList.add(...classes);
};

// Submit button state controls
export const submitButtonState = {
  init: () => updateButton(submissionButtonText.defaultText, false),
  show: () => updateButton(submissionButtonText.defaultText, false),
  hide: () => updateButton(submissionButtonText.defaultText, true, ['disabled']),
  setLoading: () => updateButton(submissionButtonText.loadingText, true, ['disabled']),
  setSuccess: () => updateButton(submissionButtonText.successText, false, ['success']),
  reset: () => updateButton(submissionButtonText.defaultText, false),
};
