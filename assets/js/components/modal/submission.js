import { getTrimmedValues } from "../../core/constants.js";
import { ErrorHandler } from "../../core/constants.js";
import { ButtonState } from "../../core/constants.js";
import { Validators } from "./validators.js";
import { handleFormSubmission } from "./submission.js";
import { disableFormInputs } from "./submission.js";
import { preventModalClosing } from "./submission.js";
import { addSuccessBorders } from "./submission.js";
import { Modal } from "../../core/constants.js";
import { closeModal } from "./handler.js";
import { resetFormAndModal } from "./cleanup.js";

/* Handles form submission, validation, and feedback for the Photographer Page contact form */

export const submitForm = (e) => {
  e.preventDefault();
  const formValues = getTrimmedValues?.() || {};
  ErrorHandler?.resetErrorVisibility();

  if (!Validators?.submitValidation(formValues)) {
    ButtonState?.hide();
    return;
  }

  handleFormSubmission();
};

export const handleFormSubmission = () => {
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
};

// Disable/enable all form inputs
export const disableFormInputs = (disable) => {
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
};

// Prevent/allow modal closing
export const preventModalClosing = (prevent) => {
  if (!Modal.modalCloseButton) return;

  Modal.modalCloseButton.disabled = prevent;
  Modal.modalCloseButton.style.pointerEvents = prevent ? 'none' : 'auto';
  Modal.modalCloseButton.style.opacity = prevent ? '0.5' : '1';

  modalClosingPrevented = prevent;
};

// Add green borders to all inputs for success state
export const addSuccessBorders = () => {
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
};