const messageElements = {
  message: document.getElementById("message"),
  characterCount: document.getElementById("character_count"),
  min: document.getElementById("min"),
  max: document.getElementById("max"),
  error: document.getElementById("message_error"),
  defaultLength: 0,
  maxLength: 500,
  currentLength: 0,
};

const updateCharacterCount = () => {
  // Update count display

  messageElements.currentLength = messageElements.message.value.length;
  messageElements.min.textContent = messageElements.currentLength.toString();

  // Update warning classes
  messageElements.characterCount.classList.remove("danger");
  messageElements.error.classList.remove("danger");
  const usagePercent =
    messageElements.currentLength / messageElements.maxLength;

  if (usagePercent >= 0.9) {
    messageElements.characterCount.classList.add("danger");
    messageElements.max.classList.add("danger");
    messageElements.error.classList.add("danger");
  }
};

const initCharacterCount = () => {
  ["input", "keyup", "paste"].forEach((event) => {
    messageElements.message.addEventListener(event, updateCharacterCount);
  });
  updateCharacterCount();
};

const destroyCharacterCount = () => {
  ["input", "keyup", "paste"].forEach((event) => {
    messageElements.message.removeEventListener(event, updateCharacterCount);
  });
};
