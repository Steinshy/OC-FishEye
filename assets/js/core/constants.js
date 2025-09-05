/**
 * Constants and Configuration
 */

const APP_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  MIN_NAME_LENGTH: 2,
  PHOTOGRAPHERS_DATA_URL: './assets/photographers/data.json',
  BASE_ASSETS_URL: 'assets/photographers/'
};

const SELECTORS = {
  PHOTOGRAPHERS_CONTAINER: '#photographers_container',
  LOADING_MESSAGE: '#loading_message',
  CONTACT_MODAL: '#modal_container',
  CONTACT_FORM: '#contact_form',
  INFO_NAME: '#info_name',
  MEDIA_CARDS: '.media_cards'
};

const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_NAME_LENGTH: 2,
  MAX_MESSAGE_LENGTH: 500
};

const ARIA_LABELS = {
  CONTACT_BUTTON: 'Contactez-moi',
  CLOSE_MODAL: 'Fermer le modal',
  SORT_DROPDOWN: 'Trier par'
};

// Global access
window.APP_CONFIG = APP_CONFIG;
window.SELECTORS = SELECTORS;
window.VALIDATION_RULES = VALIDATION_RULES;
window.ARIA_LABELS = ARIA_LABELS;
