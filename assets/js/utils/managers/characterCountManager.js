import { getFormElements } from '../../constants.js';
import { aria } from '../accessibility/aria.js';
import { events } from '../accessibility/keyboard.js';

const { characterCount, message } = getFormElements();

const maxLength = 500;
const eventTypes = ['input', 'keyup', 'paste'];
let eventManager = null;

const updateCounterClasses = (element, status) => {
  element.classList.remove('warning', 'danger');
  if (status) element.classList.add(status);
};

export const resetCharacterCount = () => {
  if (!characterCount) return;

  characterCount.textContent = '0/500';
  updateCounterClasses(characterCount, '');
  aria.setLive(characterCount, 'polite');
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
  updateCounterClasses(characterCount, status);
};

export const addCharacterCountListeners = () => {
  if (!message) return;

  const listeners = eventTypes.map(event => ({
    element: message,
    event,
    handler: updateCharacterCount,
  }));

  eventManager = events.createEventManager(listeners);
  eventManager.attach();
};

export const removeCharacterCountListeners = () => {
  eventManager?.detach();
  eventManager = null;
};
