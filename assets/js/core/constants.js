/**
 * Constants and Configuration
 */

const appConfig = {
  photographersDataUrl: './assets/photographers/data.json',
  baseAssetsUrl: 'assets/photographers/'
};


/**
 * Modal => Validation Rules
 */
const validationRules = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minlength: 2,
  maxlength: 500
};

/**
 * Modal => References
 */
const ModalRefs = {
  contactButton: document.getElementById("contact-button"),
  mainModal: {
    main: document.getElementById("modal-signup"),
    content: document.getElementById("modal-content"),
    header: document.getElementById("modal-header"),
    closeButton: document.getElementById("modal-close"),
    modalFooter: document.getElementById("modal-footer"),
    submitButton: document.getElementById("footer-submit-button"),
  },
  mainForm: document.getElementById("form-signup"),
  formGroup: {
    firstName: document.getElementById("firstname"),
    lastName: document.getElementById("lastname"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  },
  formError: {
    firstName: document.getElementById("error-firstname"),
    lastName: document.getElementById("error-lastname"),
    email: document.getElementById("error-email"),
    message: document.getElementById("error-message"),
  },
  formElements: {
    contactForm: document.getElementById("contact_form"),
    contactModal: document.getElementById("modal_container"),
    characterCount: document.getElementById("character-count"),
    minCount: document.getElementById("character-count"),
    maxCount: document.getElementById("character-count"),
  }
};

/**
 * Modal => Main Constants
 */const Modal = {
  // Main elements
  contactButton: ModalRefs.contactButton,
  mainForm: ModalRefs.mainForm,

  // Form elements
  contactForm: ModalRefs.formElements.contactForm,
  contactModal: ModalRefs.formElements.contactModal,
  characterCount: ModalRefs.formElements.characterCount,
  minCount: ModalRefs.formElements.minCount,
  maxCount: ModalRefs.formElements.maxCount,

  // Form inputs
  firstNameInput: ModalRefs.formGroup.firstName,
  lastNameInput: ModalRefs.formGroup.lastName,
  emailInput: ModalRefs.formGroup.email,
  messageInput: ModalRefs.formGroup.message,

  // Form errors
  formError: ModalRefs.formError,
  firstNameError: ModalRefs.formError.firstName,
  lastNameError: ModalRefs.formError.lastName,
  emailError: ModalRefs.formError.email,
  messageError: ModalRefs.formError.message,

  // Modal elements
  modalMain: ModalRefs.mainModal.main,
  modalContent: ModalRefs.mainModal.content,
  modalHeader: ModalRefs.mainModal.header,
  modalCloseButton: ModalRefs.mainModal.closeButton,
  modalFooter: ModalRefs.mainModal.modalFooter,
  modalSubmitButton: ModalRefs.mainModal.submitButton,

  // Arrays for iteration
  formFieldNames: ['firstNameInput', 'lastNameInput', 'emailInput', 'messageInput'],
  formErrorNames: ['firstNameError', 'lastNameError', 'emailError', 'messageError']
};

/**
 * Modal => Field to error mapping for validation
 */
const fieldErrorMap = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  message: "message"
};

/**
 * Modal => Get trimmed form values from DOM
 */
const getTrimmedValues = () => ({
  first_name: Modal?.firstNameInput?.value?.trim() || "",
  last_name: Modal?.lastNameInput?.value?.trim() || "",
  email: Modal?.emailInput?.value?.trim() || "",
  message: Modal?.messageInput?.value?.trim() || ""
});

// Global access
window.appConfig = appConfig;
window.validationRules = validationRules;
window.ModalRefs = ModalRefs;
window.Modal = Modal;
window.fieldErrorMap = fieldErrorMap;
window.getTrimmedValues = getTrimmedValues;