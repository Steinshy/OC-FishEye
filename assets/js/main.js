// Main entry point for photographer page

// The order of initialization is important:
// 1. Modal and form listeners (for global UI)
// 2. Page-specific logic (photographer page or index page)
// 3. Modal state correction
// 4. Form handlers and validation

import {
  attachFormEventListeners,
  attachFormValidationListeners,
  attachCharacterCountListeners
} from './components/modal/eventListener.js';
import { closeModal, initializeFormHandlers } from './components/modal/handler.js';
import { Modal } from './core/constants.js';
import { loadPhotographers } from './pages/index/photographer-list.js';
import { initPhotographerPage } from './pages/photographer/photographer-page.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize modal and form listeners
  attachFormEventListeners();

  // 2. Initialize page-specific logic based on current page
  const isPhotographerPage = window.location.pathname.includes('photographer.html');
  const isIndexPage =
    window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

  if (isPhotographerPage) {
    initPhotographerPage();
  } else if (isIndexPage) {
    loadPhotographers();
  }

  // 3. Ensure modal is closed on page load
  if (Modal.modalMain.classList?.contains?.('show')) {
    closeModal();
  }

  // 4. Initialize form handlers and validation
  initializeFormHandlers();
  attachFormValidationListeners();
  attachCharacterCountListeners();
});
