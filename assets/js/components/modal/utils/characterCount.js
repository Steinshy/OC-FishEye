import { Modal } from "../../../core/constants.js";
import { validationRules } from "../../../core/constants.js";

/* Photographer Page => Character Counter Utility*/

export const handleCharacterCount = () => {
  if (!Modal?.messageInput || !Modal?.characterCount) {
    console.log("Character count elements not found:", {
      messageInput: !!Modal?.messageInput,
      characterCount: !!Modal?.characterCount
    });
    return;
  }

  const currentLength = Modal.messageInput.value.length;
  const maxLength = validationRules?.maxlength;

  // Update the character count display in "current/max" format
  Modal.characterCount.textContent = `${currentLength}/${maxLength}`;

  const isWarning = currentLength >= maxLength * 0.9 && currentLength < maxLength;
  const isDanger = currentLength >= maxLength;

  // Apply warning/danger classes to the textarea and character count
  if (Modal.messageInput) {
    Modal.messageInput.classList.remove("warning", "danger");
    if (isDanger) {
      Modal.messageInput.classList.add("danger");
    } else if (isWarning) {
      Modal.messageInput.classList.add("warning");
    }
  }

  if (Modal.characterCount) {
    Modal.characterCount.classList.remove("warning", "danger");
    if (isDanger) {
      Modal.characterCount.classList.add("danger");
    } else if (isWarning) {
      Modal.characterCount.classList.add("warning");
    }
  }

  if (Modal.messageError) {
    Modal.messageError.classList.remove("danger");
    if (isDanger) {
      Modal.messageError.classList.add("danger");
    }
  }
};