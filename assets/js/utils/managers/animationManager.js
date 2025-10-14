export const waitForAnimation = (element, animationName) => {
  return new Promise(resolve => {
    const handleAnimationEnd = event => {
      if (event.animationName === animationName) {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);
  });
};

export const waitForTransition = (element, propertyName = null) => {
  return new Promise(resolve => {
    const handleTransitionEnd = event => {
      if (!propertyName || event.propertyName === propertyName) {
        element.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      }
    };

    element.addEventListener('transitionend', handleTransitionEnd);
  });
};

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

export const fadeIn = (element, duration = 300) => {
  if (!element) return;

  element.style.transition = `opacity ${duration}ms ease`;
  element.style.opacity = '0';

  requestAnimationFrame(() => {
    element.style.opacity = '1';
  });
};

export const fadeOut = (element, duration = 300) => {
  if (!element) return Promise.resolve();

  return new Promise(resolve => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '1';

    requestAnimationFrame(() => {
      element.style.opacity = '0';
    });

    setTimeout(resolve, duration);
  });
};

export const slideIn = (element, direction = 'up', duration = 300) => {
  if (!element) return;

  const transforms = {
    up: 'translateY(100%)',
    down: 'translateY(-100%)',
    left: 'translateX(100%)',
    right: 'translateX(-100%)',
  };

  element.style.transition = `transform ${duration}ms ease`;
  element.style.transform = transforms[direction] || transforms.up;

  requestAnimationFrame(() => {
    element.style.transform = 'translate(0, 0)';
  });
};

export const staggerAnimation = async (elements, animationFn, delay = 100) => {
  const elementArray = Array.from(elements);

  for (let i = 0; i < elementArray.length; i++) {
    animationFn(elementArray[i], i);
    if (i < elementArray.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getSafeDuration = (duration = 300) => {
  return prefersReducedMotion() ? 1 : duration;
};
