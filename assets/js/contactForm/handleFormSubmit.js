function handleFormSubmit(e) {
  e.preventDefault();
  if (!submitElements.contactForm) {
    setFieldError("global", true, "Formulaire introuvable.");
    return;
  }

  const formData = new FormData(submitElements.contactForm);
  const formObject = Object.fromEntries(formData);

  Object.keys(errorElements).forEach((field) => {
    if (errorElements[field] && field !== "global") {
      errorElements[field].setAttribute("data-error-visible", "true");

      const snakeField = toSnakeField(field);
      const value = (formObject[snakeField] || "").trim();
      const isValid = window.Validators.validateField(snakeField, value);

      setFieldError(field, !isValid);

      if (!isValid) {
        if (field === "firstName") {
          errorElements[field].textContent =
            "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
        } else if (field === "lastName") {
          errorElements[field].textContent =
            "Veuillez entrer 2 caractères ou plus pour le champ du Nom.";
        } else if (field === "email") {
          errorElements[field].textContent =
            "Veuillez entrer une adresse email valide.";
        } else if (field === "message") {
          errorElements[field].textContent =
            "Veuillez entrer un message entre 0 et 500 caractères.";
        }
      }
    }
  });

  if (!validateForm(formObject)) {
    return;
  }

  try {
    if (submitElements.submitButton) {
      submitElements.submitButton.disabled = true;
      submitElements.submitButton.textContent = "Envoi en cours...";
    }

    setTimeout(() => {
      if (submitElements.submitButton) {
        submitElements.submitButton.textContent = "Message envoyé !";
        submitElements.submitButton.style.backgroundColor = "#28a745";
      }

      setTimeout(() => {
        if (typeof resetModalAndURL === "function") {
          resetModalAndURL();
        } else {
          if (submitElements.contactForm) {
            submitElements.contactForm.reset();
          }
          if (typeof resetCharacterCount === "function") {
            resetCharacterCount();
          }
          const modal = document.getElementById("modal_container");
          if (modal) {
            modal.classList.remove("show");
          }
        }

        if (submitElements.submitButton) {
          submitElements.submitButton.disabled = false;
          submitElements.submitButton.textContent = "Envoyer";
          submitElements.submitButton.style.backgroundColor = "";
        }
      }, 2000);
    }, 1000);
  } catch (err) {
    setFieldError(
      "global",
      true,
      "Une erreur s'est produite lors de l'envoi du message."
    );
    if (submitElements.submitButton) {
      submitElements.submitButton.disabled = false;
      submitElements.submitButton.textContent = "Envoyer";
    }
  }
}
