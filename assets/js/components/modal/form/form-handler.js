/**
 * Photographer Page => Form Handler
 * Todo: Import GameOn form code
 */

function toSnakeField(fieldKey) {
  if (fieldKey === "firstName") return "first_name";
  if (fieldKey === "lastName") return "last_name";
  return fieldKey;
}

function setFieldError(field, shouldShow, message = "") {
  if (window.ErrorHandler && typeof window.ErrorHandler.setError === "function") {
    window.ErrorHandler.setError(field, shouldShow, message);
  } else {
    const errorElement = document.getElementById(`${field}_error`);
    if (errorElement) {
      errorElement.setAttribute("data-error-visible", shouldShow ? "true" : "false");
      if (message) {
        errorElement.textContent = message;
      }
    }
  }
}

function handleFormSubmit(e) {
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData);

  const contactForm = document.getElementById("contact_form");
  const submitButton = document.querySelector(".submit_button");
  const contactModal = document.getElementById("modal_container");
  const errorElements = window.ErrorHandler?.globalErrorElements || {};

  e.preventDefault();
  if (!contactForm) {
    setFieldError("global", true, "Formulaire introuvable.");
    return;
  }

  // Clear previous errors
  Object.keys(errorElements).forEach((field) => {
    if (errorElements[field] && field !== "global") {
      errorElements[field].setAttribute("data-error-visible", "false");
      setFieldError(field, false);

      const snakeField = toSnakeField(field);
      if (snakeField !== "message") {
        const inputElement = document.getElementById(snakeField);
        if (inputElement) {
          inputElement.setAttribute("data-error-visible", "false");
          inputElement.setAttribute("data-valid", "false");
        }
      }
    }
  });

  // Validate form
  if (!window.Validators.areAllFieldsValid(formObject)) {
    Object.keys(errorElements).forEach((field) => {
      if (errorElements[field] && field !== "global") {
        const snakeField = toSnakeField(field);
        const value = (formObject[snakeField] || "").trim();
        const isValid = window.Validators.validateField(snakeField, value);

        if (!isValid) {
          errorElements[field].setAttribute("data-error-visible", "true");
          setFieldError(field, true);

          if (snakeField !== "message") {
            const inputElement = document.getElementById(snakeField);
            if (inputElement) {
              inputElement.setAttribute("data-error-visible", "true");
              inputElement.setAttribute("data-valid", "false");
            }
          }
        } else if (value) {
          if (snakeField !== "message") {
            const inputElement = document.getElementById(snakeField);
            if (inputElement) {
              inputElement.setAttribute("data-error-visible", "false");
              inputElement.setAttribute("data-valid", "true");
            }
          }
        }
      }
    });
    return;
  }

  // Process successful submission
  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours...";
    }

    setTimeout(() => {
      if (submitButton) {
        submitButton.textContent = "Message envoyé !";
        submitButton.classList.add("success");
      }

      setTimeout(() => {
        if (typeof window.resetFormAndModal === "function") {
          window.resetFormAndModal();
        } else {
          if (contactForm) {
            contactForm.reset();
          }
          if (typeof window.resetCharacterCount === "function") {
            window.resetCharacterCount();
          }
          if (typeof window.resetErrorVisibility === "function") {
            window.resetErrorVisibility();
          }
          if (contactModal) {
            contactModal.classList.remove("show");
          }
        }

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Envoyer";
          submitButton.classList.remove("success");
        }
      }, 2000);
    }, 1000);
  } catch (error) {
    setFieldError("global", true, "Une erreur s'est produite lors de l'envoi du message.");
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Envoyer";
      submitButton.classList.remove("success");
    }
  }
}

// Global access for backward compatibility
window.handleFormSubmit = handleFormSubmit;
