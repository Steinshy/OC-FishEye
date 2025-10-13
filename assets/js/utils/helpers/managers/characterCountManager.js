import { getFormElements } from '../../../constants.js';

const { characterCount, message } = getFormElements();

const maxLength = 500;
const eventTypes = ['input', 'keyup', 'paste'];

export const resetCharacterCount = () => {
  if (characterCount) {
    characterCount.textContent = '0/500';
    characterCount.classList.remove('warning', 'danger');
  }
};

const addFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.addEventListener(event, handler));
};

const removeFormEventListeners = (element, handler) => {
  eventTypes.forEach(event => element.removeEventListener(event, handler));
};

const getCounterStatus = (length, max) => {
  if (length >= max) return 'danger';
  if (length >= max * 0.9) return 'warning';
  return '';
};

const updateCharacterCount = () => {
  if (!message || !characterCount) return;
  const { length } = message.value;
  const status = getCounterStatus(length, maxLength);
  characterCount.textContent = `${length}/${maxLength}`;
  characterCount.classList.remove('warning', 'danger');
  if (status) characterCount.classList.add(status);
};

export const addCharacterCountListeners = () => {
  if (!message) return;
  addFormEventListeners(message, updateCharacterCount);
};

export const removeCharacterCountListeners = () => {
  if (!message) return;
  removeFormEventListeners(message, updateCharacterCount);
};
