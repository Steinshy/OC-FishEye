const messageElements = {
  message: document.getElementById("message"),
  characterCount: document.getElementById("character_count"),
  defaultLength: 0,
  maxLength: 500,
};

const updateCharacterCount = () => {
  const currentLength =
    messageElements.message.value.length || messageElements.defaultLength;

  // Update count display
  const countElement = messageElements.characterCount.querySelector(".count");
  if (countElement) {
    countElement.textContent = currentLength;
  }

  // Update warning classes
  messageElements.characterCount.classList.remove("warning", "danger");
  const usagePercent = currentLength / messageElements.maxLength;

  if (usagePercent >= 0.9) {
    messageElements.characterCount.classList.add("danger");
  } else if (usagePercent >= 0.75) {
    messageElements.characterCount.classList.add("warning");
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

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    updateCharacterCount,
    initCharacterCount,
    destroyCharacterCount,
  };
} else {
  window.updateCharacterCount = updateCharacterCount;
  window.initCharacterCount = initCharacterCount;
  window.destroyCharacterCount = destroyCharacterCount;
}
