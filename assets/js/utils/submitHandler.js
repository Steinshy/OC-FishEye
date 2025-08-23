const submitElements = {
  contactForm: document.getElementById("contact_form"),
  submitButton: document.querySelector(".submit_button"),
  firstName: document.getElementById("first_name"),
  lastName: document.getElementById("last_name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
  // Form group containers for error state management
  firstNameGroup: document.getElementById("first_name")?.closest(".form_group"),
  lastNameGroup: document.getElementById("last_name")?.closest(".form_group"),
  emailGroup: document.getElementById("email")?.closest(".form_group"),
  messageGroup: document.getElementById("message")?.closest(".form_group"),
};

const setFormFieldState = (formGroup, hasError, hasSuccess) => {
  if (!formGroup) return;

  formGroup.setAttribute("data-error-visible", hasError);
  formGroup.setAttribute("data-success-visible", hasSuccess);
};

const validateForm = (formData) => {
  let isValid = true;

  // Clear all error states first
  setFormFieldState(submitElements.firstNameGroup, false, false);
  setFormFieldState(submitElements.lastNameGroup, false, false);
  setFormFieldState(submitElements.emailGroup, false, false);
  setFormFieldState(submitElements.messageGroup, false, false);

  // Validate first name
  if (
    !formData.first_name ||
    formData.first_name.trim() === "" ||
    formData.first_name.trim().length < 2
  ) {
    setFormFieldState(submitElements.firstNameGroup, true, false);
    isValid = false;
  } else {
    setFormFieldState(submitElements.firstNameGroup, false, true);
  }

  // Validate last name
  if (
    !formData.last_name ||
    formData.last_name.trim() === "" ||
    formData.last_name.trim().length < 2
  ) {
    setFormFieldState(submitElements.lastNameGroup, true, false);
    isValid = false;
  } else {
    setFormFieldState(submitElements.lastNameGroup, false, true);
  }

  // Validate email
  if (!formData.email || formData.email.trim() === "") {
    setFormFieldState(submitElements.emailGroup, true, false);
    isValid = false;
  } else if (!formData.email.includes("@")) {
    setFormFieldState(submitElements.emailGroup, true, false);
    isValid = false;
  } else {
    setFormFieldState(submitElements.emailGroup, false, true);
  }

  // Validate message
  if (!formData.message || formData.message.trim() === "") {
    setFormFieldState(submitElements.messageGroup, true, false);
    isValid = false;
  } else {
    setFormFieldState(submitElements.messageGroup, false, true);
  }

  return isValid;
};

// Process form submission
const processFormSubmission = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, message: "Message envoyé avec succès!" };
};

// Handle form submission
const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (!submitElements.contactForm) {
    console.error("Contact form not found");
    return;
  }

  // Get form data
  const formData = new FormData(submitElements.contactForm);
  const formObject = Object.fromEntries(formData);

  // Validate form
  const isValid = validateForm(formObject);

  if (!isValid) {
    return;
  }

  try {
    // Disable submit button during processing
    if (submitElements.submitButton) {
      submitElements.submitButton.disabled = true;
      submitElements.submitButton.textContent = "Envoi en cours...";
    }

    // Process the form
    const result = await processFormSubmission(formObject);

    if (result.success) {
      // Show success message
      alert(result.message);

      // Reset modal and URL using resetForm.js
      if (typeof resetModalAndURL === "function") {
        resetModalAndURL();
      }
    }
  } catch (error) {
    console.error("Form submission error:", error);
    alert(
      "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."
    );
  } finally {
    // Re-enable submit button
    if (submitElements.submitButton) {
      submitElements.submitButton.disabled = false;
      submitElements.submitButton.textContent = "Envoyer";
    }
  }
};

// Real-time validation handlers
const handleRealTimeValidation = (element, fieldName) => {
  const value = element.value.trim();
  let isValid = true;
  let formGroup = null;

  switch (fieldName) {
    case "first_name":
      formGroup = submitElements.firstNameGroup;
      isValid = value.length >= 2;
      break;
    case "last_name":
      formGroup = submitElements.lastNameGroup;
      isValid = value.length >= 2;
      break;
    case "email":
      formGroup = submitElements.emailGroup;
      isValid = value !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case "message":
      formGroup = submitElements.messageGroup;
      isValid = value !== "";
      break;
  }

  if (formGroup) {
    if (value === "") {
      // Clear both error and success states when field is empty
      setFormFieldState(formGroup, false, false);
    } else {
      setFormFieldState(formGroup, !isValid, isValid);
    }
  }
};

// Initialize form submission handling
const initializeSubmitHandler = () => {
  if (submitElements.contactForm) {
    submitElements.contactForm.addEventListener("submit", handleFormSubmit);
  }

  // Add real-time validation listeners
  if (submitElements.firstName) {
    submitElements.firstName.addEventListener("blur", () =>
      handleRealTimeValidation(submitElements.firstName, "first_name")
    );
    submitElements.firstName.addEventListener("input", () =>
      handleRealTimeValidation(submitElements.firstName, "first_name")
    );
  }

  if (submitElements.lastName) {
    submitElements.lastName.addEventListener("blur", () =>
      handleRealTimeValidation(submitElements.lastName, "last_name")
    );
    submitElements.lastName.addEventListener("input", () =>
      handleRealTimeValidation(submitElements.lastName, "last_name")
    );
  }

  if (submitElements.email) {
    submitElements.email.addEventListener("blur", () =>
      handleRealTimeValidation(submitElements.email, "email")
    );
    submitElements.email.addEventListener("input", () =>
      handleRealTimeValidation(submitElements.email, "email")
    );
  }

  if (submitElements.message) {
    submitElements.message.addEventListener("blur", () =>
      handleRealTimeValidation(submitElements.message, "message")
    );
    submitElements.message.addEventListener("input", () =>
      handleRealTimeValidation(submitElements.message, "message")
    );
  }

  // Alternative: Handle submit button click directly
  if (submitElements.submitButton) {
    submitElements.submitButton.addEventListener("click", (e) => {
      // Always handle submission - our custom validation will take care of it
      handleFormSubmit(e);
    });
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    handleFormSubmit,
    validateForm,
    processFormSubmission,
    initializeSubmitHandler,
    handleRealTimeValidation,
    setFormFieldState,
  };
} else {
  window.handleFormSubmit = handleFormSubmit;
  window.validateForm = validateForm;
  window.processFormSubmission = processFormSubmission;
  window.initializeSubmitHandler = initializeSubmitHandler;
  window.handleRealTimeValidation = handleRealTimeValidation;
  window.setFormFieldState = setFormFieldState;
}
