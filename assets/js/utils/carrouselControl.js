function initializeCarrouselControl() {
  const slides = document.querySelectorAll(".carrousel_slide");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const previews = document.querySelectorAll(".carrousel_preview");
  const radios = [
    document.getElementById("radio1"),
    document.getElementById("radio2"),
    document.getElementById("radio3"),
    document.getElementById("radio4"),
    document.getElementById("radio5"),
  ];
  let currentSlide = radios.findIndex((radio) => radio.checked);

  // If no radio is checked, default to first slide
  if (currentSlide === -1) {
    currentSlide = 0;
    radios[0].checked = true;
  }

  function goToSlide(index) {
    if (index < 0) index = radios.length - 1;
    if (index >= radios.length) index = 0;
    radios[index].checked = true;
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  // Add click handlers for main slides
  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Add click handlers for preview thumbnails
  previews.forEach((preview, index) => {
    preview.addEventListener("click", () => {
      goToSlide(index);
    });

    // Add keyboard support for accessibility
    preview.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToSlide(index);
      }
    });

    // Make preview focusable for keyboard navigation
    preview.setAttribute("tabindex", "0");
    preview.setAttribute("role", "button");
    preview.setAttribute("aria-label", `Go to slide ${index + 1}`);
  });

  // Add event listeners for arrow controls
  if (prev) {
    prev.addEventListener("click", previousSlide);
    prev.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        previousSlide();
      }
    });
  }

  if (next) {
    next.addEventListener("click", nextSlide);
    next.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      }
    });
  }

  // Add keyboard navigation for the whole carousel
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      previousSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  });
}
