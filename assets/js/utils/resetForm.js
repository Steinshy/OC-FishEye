const resetFormElements = {
  contactForm: document.getElementById("contact_form"),
  contactModal: document.getElementById("modal_container"),
  message: document.getElementById("message"),
  characterCount: document.getElementById("character_count"),
};

// Reset form fields and character count
const resetFormFields = () => {
  if (resetFormElements.contactForm) {
    resetFormElements.contactForm.reset();
  }

  // Reset character count display
  resetCharacterCount();
};

// Reset character count display
const resetCharacterCount = () => {
  if (resetFormElements.message) {
    const countElement =
      resetFormElements.characterCount?.querySelector(".count");
    if (countElement) {
      countElement.textContent = "0";
    }

    // Remove warning classes
    resetFormElements.characterCount?.classList.remove("warning", "danger");
  }
};

// Clear URL parameters
const resetURL = () => {
  // Clear URL parameters without page reload
  if (window.history && window.history.replaceState) {
    const url = new URL(window.location);
    url.search = ""; // Clear all query parameters
    window.history.replaceState({}, document.title, url.toString());
  }
};

// Close modal
const closeModal = () => {
  if (resetFormElements.contactModal) {
    resetFormElements.contactModal.classList.remove("show");
  }
};

// Complete reset: form, character count, URL, and close modal
const resetModalAndURL = () => {
  resetFormFields();
  resetURL();
  closeModal();
};

// Reset form and character count (without closing modal)
const resetFormOnly = () => {
  resetFormFields();
  resetURL();
};

// Export for both Node.js and browser environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    resetFormFields,
    resetCharacterCount,
    resetURL,
    closeModal,
    resetModalAndURL,
    resetFormOnly,
  };
} else {
  window.resetFormFields = resetFormFields;
  window.resetCharacterCount = resetCharacterCount;
  window.resetURL = resetURL;
  window.closeModal = closeModal;
  window.resetModalAndURL = resetModalAndURL;
  window.resetFormOnly = resetFormOnly;
}
