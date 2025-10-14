import { getModalRefs, submissionButtonText } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';

const { defaultText, loadingText, successText } = submissionButtonText;

const updateButton = (text, disabled, classes = []) => {
  const button = getModalRefs().submitButton;
  if (!button) return;

  button.textContent = text || defaultText;
  aria.setDisabled(button, disabled);
  button.classList.remove('success', 'disabled');
  if (classes.length) button.classList.add(...classes);
};

const setButtonDisabled = () => updateButton(defaultText, true, ['disabled']);
const setButtonEnabled = () => updateButton(defaultText, false);

export const submitButtonState = {
  init: setButtonEnabled,
  show: setButtonEnabled,
  hide: setButtonDisabled,
  setLoading: () => updateButton(loadingText, true, ['disabled']),
  setSuccess: () => updateButton(successText, false, ['success']),
  reset: setButtonEnabled,
};
