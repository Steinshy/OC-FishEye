/**
 * Handles form submission, validation, and feedback for the Photographer Page.
 */

function submitForm(e) {
  e.preventDefault();
  const formValues = getTrimmedValues?.() || {};
  ErrorHandler?.resetErrorVisibility();

  if (!window.Validators?.submitValidation(formValues)) {
    ButtonState?.hide();
    return;
  }

  handleFormSubmission();
}

function handleFormSubmission() {
  try {
    // Disable all form inputs and prevent modal closing
    disableFormInputs(true);
    preventModalClosing(true);
    ButtonState?.setLoading(true);

    setTimeout(() => {
      ButtonState?.setSuccess(true);
      // Add green borders to indicate success
      addSuccessBorders();

      setTimeout(() => {
        // Re-enable modal closing and inputs before closing
        preventModalClosing(false);
        disableFormInputs(false);
        closeModal?.();
        ButtonState?.reset();
        resetFormAndModal?.();
      }, 1500);
    }, 1000);

  } catch (err) {
    // Re-enable everything on error
    preventModalClosing(false);
    disableFormInputs(false);
    submissionError?.(err);
  }
}

// Disable/enable all form inputs
function disableFormInputs(disable) {
  if (!Modal) return;

  const inputs = [
    Modal.firstNameInput,
    Modal.lastNameInput,
    Modal.emailInput,
    Modal.messageInput
  ];

  inputs.forEach(input => {
    if (input) {
      input.disabled = disable;
    }
  });
}

// Prevent/allow modal closing
function preventModalClosing(prevent) {
  if (!Modal.modalCloseButton) return;

  Modal.modalCloseButton.disabled = prevent;
  Modal.modalCloseButton.style.pointerEvents = prevent ? 'none' : 'auto';
  Modal.modalCloseButton.style.opacity = prevent ? '0.5' : '1';

  // Also disable Escape key functionality
  window.modalClosingPrevented = prevent;
}

// Add green borders to all inputs for success state
function addSuccessBorders() {
  if (!Modal) return;

  const inputs = [
    Modal.firstNameInput,
    Modal.lastNameInput,
    Modal.emailInput,
    Modal.messageInput
  ];

  inputs.forEach(input => {
    if (input) {
      input.classList.add('success');
      input.setAttribute('data-valid', 'true');
      input.setAttribute('data-error-visible', 'false');
    }
  });
}

window.submitForm = submitForm;