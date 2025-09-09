// Main Application Init
document.addEventListener("DOMContentLoaded", function () {
  initModal();
  attachFormEventListeners();
});

const initModal = () => {
  if (!Modal.modalMain) return;

  // Ensure modal is closed on page load
  if (Modal.modalMain.classList?.contains?.("show")) {
    closeModal();
  }

  initializeFormHandlers();
  attachFormValidationListeners();
  attachCharacterCountListeners();
};
