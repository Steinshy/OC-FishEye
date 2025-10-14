// DOM element selectors and configuration constants

// Get main page container elements
export const getPageElements = () => ({
  main: document.getElementById('main'),
  mainMedias: document.getElementById('main-medias'),
});

// Get loading screen element
export const getLoadingScreen = () => document.getElementById('loading-screen');

// Get modal dialog elements
export const getModalRefs = () => ({
  contactButton: document.getElementById('contact-button'),
  mainModal: document.getElementById('modal-signup'),
  form: document.getElementById('form-signup'),
  header: document.getElementById('modal-header'),
  content: document.getElementById('modal-content'),
  closeButton: document.getElementById('modal-close'),
  modalFooter: document.getElementById('modal-footer'),
  submitButton: document.getElementById('footer-submit-button'),
  photographerName: document.getElementById('modal-photographer-name'),
});

// Get contact form input elements
export const getFormElements = () => ({
  firstname: document.getElementById('firstname'),
  lastname: document.getElementById('lastname'),
  email: document.getElementById('email'),
  message: document.getElementById('message'),
  contactForm: document.getElementById('form-signup'),
  contactModal: document.getElementById('modal-signup'),
  characterCount: document.getElementById('character-count'),
  formGroup: document.querySelectorAll('.form-group'),
});

// Array of form field names for validation
export const formFieldNames = ['firstname', 'lastname', 'email', 'message'];

// Get error message element for form field
export const getErrorElement = fieldName => document.getElementById(`${fieldName.toLowerCase()}-error`);

// Get photographer stats display elements
export const getStatsElements = () => ({
  totalLikesCount: document.getElementById('total-likes-count'),
  statsPrice: document.getElementById('stats-price'),
  statsLikes: document.querySelector('.stats-likes'),
});

// Get media sort button elements
export const getSortButtonElements = () => ({
  button: document.getElementById('media-button'),
  optionsContainer: document.getElementById('sort-options'),
  sortOptions: document.querySelectorAll('[role="option"]'),
});

// Get scroll to top button element
export const getScrollToTopButton = () => document.getElementById('scroll-to-top');

// Lightbox modal elements and state
export const lightboxElements = {
  mainModal: document.getElementById('lightbox-modal'),
  container: document.getElementById('lightbox-media-container'),
  title: document.getElementById('lightbox-title'),
  likes: document.getElementById('lightbox-likes-count'),
  counter: document.getElementById('lightbox-counter'),
  prev: document.getElementById('lightbox-prev'),
  next: document.getElementById('lightbox-next'),
  close: document.getElementById('lightbox-close'),
  medias: [],
  currentIndex: 0,
  isNavigating: false,
  isInitialized: false,
  minDistance: 50,
};

// CSS selectors for common element types
export const selectorTypes = {
  focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  sortOptions: '[role="option"]',
  main: 'main',
  header: 'header',
};

// CSS classes for lightbox transitions
export const lightboxClasses = {
  visible: 'show',
  transition: 'lightbox-transition',
  hidden: 'lightbox-hidden',
  showing: 'lightbox-visible',
};

// Form submission button text states
export const submissionButtonText = {
  defaultText: 'Envoyer le message',
  loadingText: 'Envoi en cours...',
  successText: 'Message envoyé !',
};

// Media card element selectors
export const media = {
  card: '.media-card',
  content: '.media-content',
  mediaElement: 'img, video',
  videoElement: 'video',
  image: 'img',
};

// Picture element selectors
export const picture = {
  profile: '.profile-picture',
  webpSource: 'source[type="image/webp"]',
  jpegSource: 'source[type="image/jpeg"]',
};

// Interactive element selectors
export const interactive = {
  likesButton: '.likes',
  likesCount: 'span',
  heartIcon: '.fa-heart',
};

// Form element selectors
export const form = {
  group: '.form-group',
};

// Stats element selectors
export const stats = {
  likes: '.stats-likes',
};
