/**
 * Photographer Page => Character Counter Utility
 */

function handleCharacterCount() {
  if (!window.Modal?.messageInput || !window.Modal?.characterCount) {
    console.log("Character count elements not found:", {
      messageInput: !!window.Modal?.messageInput,
      characterCount: !!window.Modal?.characterCount
    });
    return;
  }

  const currentLength = window.Modal.messageInput.value.length;
  const maxLength = window.validationRules?.maxlength;

  // Update the character count display in "current/max" format
  window.Modal.characterCount.textContent = `${currentLength}/${maxLength}`;

  const isWarning = currentLength >= maxLength * 0.9 && currentLength < maxLength;
  const isDanger = currentLength >= maxLength;

  // Apply warning/danger classes to the textarea and character count
  if (window.Modal.messageInput) {
    window.Modal.messageInput.classList.remove("warning", "danger");
    if (isDanger) {
      window.Modal.messageInput.classList.add("danger");
    } else if (isWarning) {
      window.Modal.messageInput.classList.add("warning");
    }
  }

  if (window.Modal.characterCount) {
    window.Modal.characterCount.classList.remove("warning", "danger");
    if (isDanger) {
      window.Modal.characterCount.classList.add("danger");
    } else if (isWarning) {
      window.Modal.characterCount.classList.add("warning");
    }
  }

  if (window.Modal.messageError) {
    window.Modal.messageError.classList.remove("danger");
    if (isDanger) {
      window.Modal.messageError.classList.add("danger");
    }
  }
}

// Global access
window.handleCharacterCount = handleCharacterCount;
