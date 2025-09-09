/**
 * Photographer Page => Form Reset
 */

const resetCharacterCount = () => {
  if (Modal.characterCount) {
    Modal.characterCount.textContent = "0/500";
    Modal.characterCount.classList.remove("warning", "danger");
  }
};

const resetInputStates = () =>
  Modal.formFieldNames.forEach(name => Modal[name] && (
    Modal[name].value = "",
    Modal[name].classList.remove('success', 'warning', 'danger'),
    Modal[name].disabled = false,
    Modal[name].setAttribute('data-valid', 'false'),
    Modal[name].setAttribute('data-error-visible', 'false')
  ));

const resetFormAndModal = () => {
  Modal.contactForm?.reset();
  Modal.contactModal?.classList.remove("show");
  resetInputStates();
  resetErrorVisibility();
  resetCharacterCount();
};

// Global access
window.resetFormAndModal = resetFormAndModal;
window.resetCharacterCount = resetCharacterCount;

