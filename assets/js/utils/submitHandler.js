const submitElements = {
  contactForm: document.getElementById("contact_form"),
  submitButton: document.querySelector(".submit_button"),
};

// Form elements for validation on submit
const getFormElements = {
  firstName: document.getElementById("first_name"),
  lastName: document.getElementById("last_name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
};

const validateFormOnSubmit = (formData) => {
  let isValid = true;

  const validateFirstName = () => {
    const firstName = (formData.first_name || "").trim();
    const firstNameValid = firstName.length >= 2;
    getFormElements.firstName?.setAttribute(
      "data-error-visible",
      !firstNameValid
    );
    if (!firstNameValid) isValid = false;
    return firstNameValid;
  };

  const validateLastName = () => {
    const lastName = (formData.last_name || "").trim();
    const lastNameValid = lastName.length >= 2;
    getFormElements.lastName?.setAttribute(
      "data-error-visible",
      !lastNameValid
    );
    if (!lastNameValid) isValid = false;
    return lastNameValid;
  };

  const validateEmail = () => {
    const email = (formData.email || "").trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    getFormElements.email?.setAttribute("data-error-visible", !emailValid);
    if (!emailValid) isValid = false;
    return emailValid;
  };

  // Check if the message field is not empty
  const validateMessage = () => {
    const message = (formData.message || "").trim();
    const messageValid = message !== "";
    getFormElements.message?.setAttribute("data-error-visible", !messageValid);
    if (!messageValid) isValid = false;
    return messageValid;
  };

  // Call all validation functions
  validateFirstName();
  validateLastName();
  validateEmail();
  validateMessage();
  return isValid;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (!submitElements.contactForm) return;

  const formData = new FormData(submitElements.contactForm);
  const formObject = Object.fromEntries(formData);

  if (!validateFormOnSubmit(formObject)) return;

  try {
    if (submitElements.submitButton) {
      submitElements.submitButton.disabled = true;
      submitElements.submitButton.textContent = "Envoi en cours...";
    }
  } catch (err) {
    console.error("Une erreur s'est produite lors de l'envoi du message.", err);
  } finally {
    if (submitElements.submitButton) {
      submitElements.submitButton.disabled = false;
      submitElements.submitButton.textContent = "Envoyer";
    }
  }
};

const initializeSubmitHandler = () => {
  if (submitElements.contactForm) {
    submitElements.contactForm.addEventListener("submit", handleFormSubmit);
  }

  if (submitElements.submitButton) {
    submitElements.submitButton.addEventListener("click", handleFormSubmit);
  }
};
