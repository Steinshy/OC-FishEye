/**
 * Setup slide navigation controls
 * @param {Function} goToSlide - Function to navigate to specific slide
 * @param {Function} previousSlide - Function to go to previous slide
 * @param {Function} nextSlide - Function to go to next slide
 */
const setupNavigationControls = (goToSlide, previousSlide, nextSlide) => {
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  if (prev) {
    prev.addEventListener('click', previousSlide);
    prev.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        previousSlide();
      }
    });
  }

  if (next) {
    next.addEventListener('click', nextSlide);
    next.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
    });
  }
};

/**
 * Setup slide click handlers
 * @param {Function} goToSlide - Function to navigate to specific slide
 */
const setupSlideHandlers = goToSlide => {
  const slides = document.querySelectorAll('.carrousel_slide');
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => goToSlide(index));
  });
};

/**
 * Setup preview handlers
 * @param {Function} goToSlide - Function to navigate to specific slide
 */
const setupPreviewHandlers = goToSlide => {
  const previews = document.querySelectorAll('.carrousel_preview');
  previews.forEach((preview, index) => {
    preview.addEventListener('click', () => goToSlide(index));
    preview.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(index);
      }
    });
    preview.setAttribute('tabindex', '0');
    preview.setAttribute('role', 'button');
    preview.setAttribute('aria-label', `Go to slide ${index + 1}`);
  });
};

/**
 * Setup keyboard navigation
 * @param {Function} previousSlide - Function to go to previous slide
 * @param {Function} nextSlide - Function to go to next slide
 */
const setupKeyboardNavigation = (previousSlide, nextSlide) => {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      previousSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  });
};

/**
 * Todo: Refactor this code. Need to Import to Photographer Page
 */
export const initializeCarrouselControl = () => {
  const radios = [
    document.getElementById('radio1'),
    document.getElementById('radio2'),
    document.getElementById('radio3'),
    document.getElementById('radio4'),
    document.getElementById('radio5')
  ];
  let currentSlide = radios.findIndex(radio => radio.checked);

  if (currentSlide === -1) {
    currentSlide = 0;
    radios[0].checked = true;
  }

  const goToSlide = index => {
    // Validate input to prevent injection
    let validIndex = Number.parseInt(index, 10);
    if (Number.isNaN(validIndex) || validIndex < 0) validIndex = radios.length - 1;
    else if (validIndex >= radios.length) validIndex = 0;

    if (radios[validIndex]) {
      radios[validIndex].checked = true;
      currentSlide = validIndex;
    }
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const previousSlide = () => goToSlide(currentSlide - 1);

  setupSlideHandlers(goToSlide);
  setupPreviewHandlers(goToSlide);
  setupNavigationControls(goToSlide, previousSlide, nextSlide);
  setupKeyboardNavigation(previousSlide, nextSlide);
};
