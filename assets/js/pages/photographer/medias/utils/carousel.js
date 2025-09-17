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

const setupSlideHandlers = goToSlide => {
  const slides = document.querySelectorAll('.carrousel_slide');
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => goToSlide(index));
  });
};

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

export const initializeCarrouselControl = () => {
  const radios = [
    document.getElementById('radio1'),
    document.getElementById('radio2'),
    document.getElementById('radio3'),
    document.getElementById('radio4'),
    document.getElementById('radio5'),
  ];

  const validRadios = radios.filter(radio => radio !== null);
  if (validRadios.length === 0) {
    console.error('Carousel radio buttons not found, skipping carousel initialization');
    return;
  }

  let currentSlide = radios.findIndex(radio => radio && radio.checked);

  if (currentSlide === -1) {
    currentSlide = 0;
    if (radios[0]) {
      radios[0].checked = true;
    }
  }

  const goToSlide = index => {
    // Validate input to prevent injection
    let validIndex = Number.parseInt(index, 10);
    if (Number.isNaN(validIndex) || validIndex < 0) validIndex = validRadios.length - 1;
    else if (validIndex >= validRadios.length) validIndex = 0;

    if (radios[validIndex] && radios[validIndex] !== null) {
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
