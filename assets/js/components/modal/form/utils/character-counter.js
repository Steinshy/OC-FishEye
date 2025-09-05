/**
 * Photographer Page => Character Counter Utility
 * Todo: Import GameOn form code
 */

const getMessageElements = () => {
  const message = document.getElementById("message");
  return {
    message,
    characterCount: document.getElementById("form_textarea"),
    min: document.getElementById("min"),
    max: document.getElementById("max"),
    error: document.getElementById("message_error"),
    maxLength: window.APP_CONFIG.MAX_MESSAGE_LENGTH,
    defaultLength: 0
  };
};

const { message, characterCount, min, max, maxLength, error } = getMessageElements();

const setCharacterCountState = (isWarning, isDanger) => {
  characterCount.classList.toggle("warning", isWarning);
  characterCount.classList.toggle("danger", isDanger);
  max.classList.toggle("danger", isDanger);
  error.classList.toggle("danger", isDanger);
};

const updateCharacterCount = () => {
  const currentLength = message.value.length;
  min.textContent = currentLength;
  setCharacterCountState(
    currentLength >= maxLength * 0.9 && currentLength < maxLength,
    currentLength >= maxLength
  );
};

const initCharacterCount = () => {
  if (message && characterCount) {
    ["input", "keyup", "paste"].forEach((event) => {
      message.addEventListener(event, updateCharacterCount);
    });
    updateCharacterCount();
  }
};

const destroyCharacterCount = () => {
  if (message) {
    ["input", "keyup", "paste"].forEach((event) => {
      message.removeEventListener(event, updateCharacterCount);
    });
  }
};

// Global access for backward compatibility
window.initCharacterCount = initCharacterCount;
window.updateCharacterCount = updateCharacterCount;
window.destroyCharacterCount = destroyCharacterCount;
