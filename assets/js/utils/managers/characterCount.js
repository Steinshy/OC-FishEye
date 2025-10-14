// Character counter for message textarea

import { getFormElements } from '../../config.js';
import { aria } from '../accessibility/aria.js';
import { events } from '../accessibility/keyboard.js';

// Maximum message length
const maxLength = 500;
let eventManager = null;

// Update counter visual state
const updateCounterClasses = (element, status) => {
  element.classList.remove('warning', 'danger');
  if (status) element.classList.add(status);
};

// Reset character count to zero
export const resetCharacterCount = () => {
  const { characterCount } = getFormElements();
  if (!characterCount) return;
  characterCount.textContent = '0/500';
  updateCounterClasses(characterCount, '');
  aria.setLive(characterCount, 'polite');
};

// Update character count display
const updateCharacterCount = () => {
  const { message, characterCount } = getFormElements();
  if (!message || !characterCount) return;

  const { length } = message.value;
  const status = length >= maxLength ? 'danger' : length >= maxLength * 0.9 ? 'warning' : '';

  characterCount.textContent = `${length}/${maxLength}`;
  updateCounterClasses(characterCount, status);
};

// Attach character count event listeners
export const addCharacterCountListeners = () => {
  const { message } = getFormElements();
  if (!message) return;

  eventManager = events.createEventManager(
    ['input', 'keyup', 'paste'].map(event => ({
      element: message,
      event,
      handler: updateCharacterCount,
    }))
  );
  eventManager.attach();
};

// Remove character count event listeners
export const removeCharacterCountListeners = () => {
  eventManager?.detach();
  eventManager = null;
};
