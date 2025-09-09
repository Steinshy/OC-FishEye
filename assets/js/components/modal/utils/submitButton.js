/**
 * Photographer Page => Button State Management
 * Handles show/hide functionality for submit button states
 */

const ButtonState = {
  // Prepare the submit button to a known baseline state
  initialize() {
    if (!Modal.modalSubmitButton) return;

    Modal.modalSubmitButton.textContent = "Envoyer";
    Modal.modalSubmitButton.classList.remove("success", "disabled");
    // Start disabled by default; validation toggles it
    Modal.modalSubmitButton.disabled = true;
    Modal.modalSubmitButton.setAttribute("aria-disabled", "true");
  },

  show() {
    if (!Modal.modalSubmitButton) return;

    Modal.modalSubmitButton.disabled = false;
    Modal.modalSubmitButton.classList.remove("disabled");
    Modal.modalSubmitButton.setAttribute("aria-disabled", "false");
  },

  hide() {
    if (!Modal.modalSubmitButton) return;

    Modal.modalSubmitButton.disabled = true;
    Modal.modalSubmitButton.classList.add("disabled");
    Modal.modalSubmitButton.setAttribute("aria-disabled", "true");
  },


  setLoading(isLoading = true) {
    if (!Modal.modalSubmitButton) return;

    if (isLoading) {
      ButtonState.hide();
      Modal.modalSubmitButton.textContent = "Envoi en cours...";
    } else {
      ButtonState.show();
      Modal.modalSubmitButton.textContent = "Envoyer";
    }
  },


  setSuccess(isSuccess = true) {
    if (!Modal.modalSubmitButton) return;

    if (isSuccess) {
      Modal.modalSubmitButton.textContent = "Message envoyé !";
      Modal.modalSubmitButton.classList.add("success");
    } else {
      Modal.modalSubmitButton.textContent = "Envoyer";
      Modal.modalSubmitButton.classList.remove("success");
    }
  },


  reset() {
    if (!Modal.modalSubmitButton) return;

    ButtonState.show();
    Modal.modalSubmitButton.textContent = "Envoyer";
    Modal.modalSubmitButton.classList.remove("success", "disabled");
    Modal.modalSubmitButton.setAttribute("aria-disabled", "false");
  },

  isEnabled() {
    return Modal.modalSubmitButton && !Modal.modalSubmitButton.disabled;
  },


  isDisabled() {
    return Modal.modalSubmitButton && Modal.modalSubmitButton.disabled;
  }
};


window.ButtonState = ButtonState;
