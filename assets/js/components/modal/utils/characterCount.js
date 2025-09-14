import { Modal, validationRules } from '../../../core/constants.js';

/* Photographer Page => Character Counter Utility*/

/**
 * Apply warning/danger classes to an element
 * @param {HTMLElement} element - The element to style
 * @param {boolean} isWarning - Whether to apply warning class
 * @param {boolean} isDanger - Whether to apply danger class
 */
const applyClasses = (element, isWarning, isDanger) => {
  if (!element) return;

  element.classList.remove('warning', 'danger');
  if (isDanger) {
    element.classList.add('danger');
  } else if (isWarning) {
    element.classList.add('warning');
  }
};

/**
 * Update character count display and styling
 * @param {number} currentLength - Current text length
 * @param {number} maxLength - Maximum allowed length
 */
const updateCharacterDisplay = (currentLength, maxLength) => {
  // Update the character count display
  Modal.characterCount.textContent = `${currentLength}/${maxLength}`;

  const isWarning = currentLength >= maxLength * 0.9 && currentLength < maxLength;
  const isDanger = currentLength >= maxLength;

  // Apply styling to elements
  applyClasses(Modal.messageInput, isWarning, isDanger);
  applyClasses(Modal.characterCount, isWarning, isDanger);
  applyClasses(Modal.messageError, false, isDanger);
};

export const handleCharacterCount = () => {
  if (!Modal?.messageInput || !Modal?.characterCount) {
    console.warn('Character count elements not found:', {
      messageInput: !!Modal?.messageInput,
      characterCount: !!Modal?.characterCount
    });
    return;
  }

  const currentLength = Modal.messageInput.value.length;
  const maxLength = validationRules?.maxlength;

  updateCharacterDisplay(currentLength, maxLength);
};
