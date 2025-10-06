import { lightboxState } from './helpers/events/lightboxEventListeners.js';
import { isModalOpen } from './helpers/managers/modalManager.js';

export const scrollToTop = {
  button: null,

  init() {
    this.button = document.getElementById('scroll-to-top');
    if (!this.button) return;

    this.setupEventListeners();
    this.handleScroll();
  },

  setupEventListeners() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.button.addEventListener('click', this.scrollToTop.bind(this));
  },

  handleScroll() {
    if (!this.button) return;
    const shouldShow = window.pageYOffset > 300 && !isModalOpen() && !lightboxState();
    this.button.classList.toggle('show', shouldShow);
  },

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
};
