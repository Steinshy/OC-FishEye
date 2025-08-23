document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    contactButton: document.getElementById("contact_button"),
    contactForm: document.getElementById("contact_form"),
    messageTextarea: document.getElementById("message"),
  };

  let characterCounter = null;
  let modal = null;

  const validateElements = () => {
    const missingElements = Object.entries(elements)
      .filter(([key, element]) => !element)
      .map(([key]) => key);

    if (missingElements.length > 0) {
      return false;
    }
    return true;
  };

  function openContactModal() {
    if (!modal) return;

    modal.open({
      afterOpen: () => {
        // Reset character counter when opening modal
        if (characterCounter) {
          characterCounter.reset();
        }
      },
    });
  }

  function closeContactModal() {
    if (!modal) return;
    modal.close();
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    closeContactModal();
    elements.contactForm.reset();

    if (characterCounter) {
      characterCounter.reset();
    }

    alert("Message envoyé avec succès!");
  }

  function init() {
    if (!validateElements()) {
      console.error("Contact form module initialization failed");
      return;
    }

    // Initialize modal manager
    modal = createModal("modal_container", {
      closeOnBackdrop: true,
      closeOnEscape: true,
      focusFirstInput: true,
    });

    // Add event listeners
    elements.contactButton.addEventListener("click", openContactModal);
    elements.contactForm.addEventListener("submit", handleFormSubmit);

    if (elements.messageTextarea) {
      characterCounter = createCharacterCounter(
        "message",
        "character_count",
        500
      );
    }

    console.log("Contact form module initialized successfully");
  }

  // Start the module
  init();
});
