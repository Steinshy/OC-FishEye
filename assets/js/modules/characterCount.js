class CharacterCount {
  constructor(textareaId, counterElementId, maxLength = 500) {
    this.textarea = document.getElementById(textareaId);
    this.counterElement = document.getElementById(counterElementId);
    this.maxLength = maxLength;

    if (!this.textarea || !this.counterElement) {
      console.error("CharacterCount: Required elements not found");
      return;
    }

    this.init();
  }

  updateCharacterCount(currentCount, maxCount = this.maxLength) {
    if (!this.counterElement) return;

    const countElement = this.counterElement.querySelector(".count");
    if (countElement) {
      countElement.textContent = currentCount;
    }

    // Remove existing warning classes
    this.counterElement.classList.remove("warning", "danger");

    // Apply warning classes based on usage percentage
    if (currentCount >= maxCount * 0.9) {
      this.counterElement.classList.add("danger");
    } else if (currentCount >= maxCount * 0.75) {
      this.counterElement.classList.add("warning");
    }
  }

  handleTextareaInput() {
    if (!this.textarea) return;

    const currentLength = this.textarea.value.length;
    const maxLength =
      parseInt(this.textarea.getAttribute("maxlength")) || this.maxLength;

    this.updateCharacterCount(currentLength, maxLength);
  }

  reset() {
    this.updateCharacterCount(0);
  }

  init() {
    if (!this.textarea) return;

    // Bind the event handler to preserve 'this' context
    const handleInput = () => this.handleTextareaInput();

    // Add event listeners for various input events
    this.textarea.addEventListener("input", handleInput);
    this.textarea.addEventListener("keyup", handleInput);
    this.textarea.addEventListener("paste", handleInput);

    // Initialize with current content
    this.handleTextareaInput();
  }

  destroy() {
    if (!this.textarea) return;

    const handleInput = () => this.handleTextareaInput();
    this.textarea.removeEventListener("input", handleInput);
    this.textarea.removeEventListener("keyup", handleInput);
    this.textarea.removeEventListener("paste", handleInput);
  }
}

function createCharacterCounter(textareaId, counterElementId, maxLength = 500) {
  return new CharacterCount(textareaId, counterElementId, maxLength);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CharacterCount, createCharacterCounter };
}

window.CharacterCount = CharacterCount;
window.createCharacterCounter = createCharacterCounter;
