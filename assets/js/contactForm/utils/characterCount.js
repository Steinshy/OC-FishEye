const getMessageElements = () => {
  const message = document.getElementById("message");
  return {
    message,
    characterCount: document.getElementById("character_count"),
    min: document.getElementById("min"),
    max: document.getElementById("max"),
    error: document.getElementById("message_error"),
    maxLength: 500,
    defaultLength: 0,
  };
};

const { message, characterCount, min, max, maxLength, error } =
  getMessageElements();

const setCharacterCountState = (isWarning, isDanger) => {
  characterCount.classList.toggle("warning", isWarning);
  characterCount.classList.toggle("danger", isDanger);
  max.classList.toggle("danger", isDanger);
  error.classList.toggle("danger", isDanger);
};

const updateCharacterCount = () => {
  if (message && characterCount) {
    const currentLength = message.value.length;
    const isDanger = currentLength >= maxLength;
    const isWarning = !isDanger && currentLength >= maxLength * 0.9;

    currentLength = min.textContent;
    characterCount.textContent = `${currentLength}/${maxLength}`;

    setCharacterCountState(isWarning, isDanger);
  }
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
