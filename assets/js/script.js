document.addEventListener("DOMContentLoaded", () => {
  // Initialize sort dropdown
  createSortDropdown();

  // Initialize contact modal
  handleContactModal();

  // Initialize real-time validation
  console.log("Initializing real-time validation...");
  initializeRealTimeValidation();

  // Initialize form submission handler
  console.log("Initializing submit handler...");
  initializeSubmitHandler();

  // Initialize character count
  initCharacterCount();
});
