const contactElements = {
  contactModal: document.getElementById("modal_container"),
  contactModalClose: document.getElementById("modal_close"),
  contactButton: document.getElementById("contact_button"),
};

const openContactModal = () => {
  // Reset form when opening modal using resetForm.js
  if (typeof resetFormOnly === "function") {
    resetFormOnly();
  }
  return contactElements.contactModal.classList.add("show");
};

const closeContactModal = () => {
  return contactElements.contactModal.classList.remove("show");
};

// Initialize contact modal functionality
function handleContactModal() {
  const { contactButton, contactModalClose } = contactElements;

  if (contactButton) {
    contactButton.addEventListener("click", openContactModal);
  }

  if (contactModalClose) {
    contactModalClose.addEventListener("click", closeContactModal);
  }

  document.addEventListener("keydown", handleModalClose);
  document.addEventListener("click", handleModalClose);
}

function handleModalClose(e) {
  const isBackdropClick =
    e.type === "click" && e.target === contactElements.contactModal;
  const isEscapeKey =
    e.key === "Escape" &&
    contactElements.contactModal.classList.contains("show");

  if (isBackdropClick || isEscapeKey) {
    closeContactModal();
  }
}
