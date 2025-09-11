// Main entry point for photographer page

// The order of initialization is important:
// 1. Modal and form listeners (for global UI)
// 2. Page-specific logic (photographer page or index page)
// 3. Modal state correction
// 4. Form handlers and validation

import { initPhotographerPage } from './pages/photographer/photographer-page.js';
import { loadPhotographers } from './pages/index/photographer-list.js';
import { attachFormEventListeners } from './components/modal/eventListener.js';
import { closeModal } from './components/modal/handler.js';
import { initializeFormHandlers } from './components/modal/handler.js';
import { attachFormValidationListeners } from './components/modal/eventListener.js';
import { attachCharacterCountListeners } from './components/modal/eventListener.js';
import { Modal } from './core/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize modal and form listeners
  attachFormEventListeners();

  // 2. Initialize page-specific logic
  // Both can be called; each will only act if on the correct page
  initPhotographerPage();
  loadPhotographers();

  // 3. Ensure modal is closed on page load
  if (Modal.modalMain.classList?.contains?.("show")) {
    closeModal();
  }

  // 4. Initialize form handlers and validation
  initializeFormHandlers();
  attachFormValidationListeners();
  attachCharacterCountListeners();
});