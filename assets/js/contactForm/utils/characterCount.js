let messageElements = {};

function initializeMessageElements() {
  messageElements = {
    message: document.getElementById("message"),
    characterCount: document.getElementById("character_count"),
    min: document.getElementById("min"),
    max: document.getElementById("max"),
    error: document.getElementById("message_error"),
    defaultLength: 0,
    maxLength: 500,
    currentLength: 0,
  };
}

const setCharacterCountState = (isWarning, isDanger) => {
  messageElements.characterCount.classList.toggle("warning", isWarning);
  messageElements.characterCount.classList.toggle("danger", isDanger);
  messageElements.max.classList.toggle("danger", isDanger);
  messageElements.error.classList.toggle("danger", isDanger);
};

const updateCharacterCount = () => {
  messageElements.currentLength = messageElements.message.value.length;
  messageElements.min.textContent = messageElements.currentLength.toString();

  const ratio = messageElements.currentLength / messageElements.maxLength;
  const isWarning = ratio >= 0.9 && ratio < 1;
  const isDanger = ratio >= 1;

  setCharacterCountState(isWarning, isDanger);
};

const initCharacterCount = () => {
  initializeMessageElements();

  if (messageElements.message && messageElements.characterCount) {
    ["input", "keyup", "paste"].forEach((event) => {
      messageElements.message.addEventListener(event, updateCharacterCount);
    });
    updateCharacterCount();
  }
};

const destroyCharacterCount = () => {
  if (messageElements.message) {
    ["input", "keyup", "paste"].forEach((event) => {
      messageElements.message.removeEventListener(event, updateCharacterCount);
    });
  }
};
