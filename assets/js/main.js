// Main entry point for both pages

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
import { createSortDropdown } from './components/dropdown/sort-dropdown.js';
import { loadPhotographers } from './pages/index/loadPhotographers.js';
import { initializePhotographerPage } from './pages/photographer/photographer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Logic at Boot
  if (window.location.pathname.includes('photographer.html')) {
    // Photographer page
    initializePhotographerPage();
    createSortDropdown();
  } else {
    // Index page
    loadPhotographers();
  }
  // Dropdown Part
  createSortDropdown();
  closeModal();
  // Modal Form Part
  attachFormEventListeners();
  initializeFormHandlers();
  attachFormValidationListeners();
  attachCharacterCountListeners();
});
