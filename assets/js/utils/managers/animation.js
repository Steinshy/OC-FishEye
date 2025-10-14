// Animation utilities with accessibility support

// Add animation class then remove after duration
export const animateWithClass = async (element, animationClass, duration = 300) => {
  if (!element) return;
  element.classList.add(animationClass);
  return new Promise(resolve => {
    setTimeout(() => {
      element.classList.remove(animationClass);
      resolve();
    }, duration);
  });
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Get safe animation duration respecting user preference
export const getSafeDuration = (duration = 300) => (prefersReducedMotion() ? 1 : duration);
