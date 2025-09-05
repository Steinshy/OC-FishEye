/**
 * Photographer Page => Contact Modal
 * Todo: Import GameOn modal code
 */
let contactElements = {};

function initializeContactElements() {
  contactElements = {
    contactModal: document.getElementById("modal_container"),
    contactModalClose: document.getElementById("modal_close"),
    contactButton: document.getElementById("contact_button")
  };
}

const setContactModalVisibility = (show) => {
  const { contactModal } = contactElements;
  if (!contactModal) return;
  if (show) {
    contactModal.classList.add("show");
  } else {
    contactModal.classList.remove("show");
  }
};

function handleContactModal() {
  initializeContactElements();
  const { contactButton, contactModalClose } = contactElements;

  contactButton?.addEventListener("click", () =>
    setContactModalVisibility(true)
  );

  contactModalClose?.addEventListener("click", () =>
    setContactModalVisibility(false)
  );

  document.addEventListener("keydown", handleModalClose);
  document.addEventListener("click", handleModalClose);
}

function handleModalClose(e) {
  const { contactModal } = contactElements;
  if (
    (e.type === "click" && e.target === contactModal) ||
    (e.key === "Escape" && contactModal.classList.contains("show"))
  ) {
    setContactModalVisibility(false);
  }
}

// Global access for backward compatibility
window.handleContactModal = handleContactModal;