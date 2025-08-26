function toSnakeField(fieldKey) {
  if (fieldKey === "firstName") return "first_name";
  if (fieldKey === "lastName") return "last_name";
  return fieldKey;
}

function handleFormSubmit(e) {
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData);

  const contactForm = document.getElementById("contact_form");
  const submitButton = document.querySelector(".submit_button");
  const contactModal = document.getElementById("modal_container");
  const errorElements = {
    firstName: document.getElementById("first_name_error"),
    lastName: document.getElementById("last_name_error"),
    email: document.getElementById("email_error"),
    message: document.getElementById("message_error"),
    global: document.getElementById("form_global_error")
  };

  e.preventDefault();
  if (!contactForm) {
    setFieldError("global", true, "Formulaire introuvable.");
    return;
  }

  Object.keys(errorElements).forEach((field) => {
    if (errorElements[field] && field !== "global") {
      errorElements[field].setAttribute("data-error-visible", "false");
      setFieldError(field, false);
    }
  });

  if (!validateForm(formObject)) {
    Object.keys(errorElements).forEach((field) => {
      if (errorElements[field] && field !== "global") {
        const snakeField = toSnakeField(field);
        const value = (formObject[snakeField] || "").trim();
        const isValid = window.Validators.validateField(snakeField, value);

        if (!isValid) {
          errorElements[field].setAttribute("data-error-visible", "true");
          setFieldError(field, true);
        }
      }
    });
    return;
  }

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
        if (typeof resetModalAndURL === "function") {
          resetModalAndURL();
        } else {
          if (contactForm) {
            contactForm.reset();
          }
          if (typeof resetCharacterCount === "function") {
            resetCharacterCount();
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
  } catch (err) {
    setFieldError(
      "global",
      true,
      "Une erreur s'est produite lors de l'envoi du message."
    );
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Envoyer";
      submitButton.classList.remove("success");
    }
  }
}
