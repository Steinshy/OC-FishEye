import { focusNext, focusPrevious } from './focus.js';

export const handlers = {
  createArrowNavigation({ elements, orientation = 'vertical', onNavigate, onActivate }) {
    return e => {
      const isVertical = orientation === true || orientation === 'vertical';
      const downKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const upKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

      if (e.key === downKey || e.key === upKey) {
        e.preventDefault();
        e.stopPropagation();
        const currentElement = document.activeElement;
        const nextElement = e.key === downKey ? focusNext(elements, currentElement) : focusPrevious(elements, currentElement);
        onNavigate?.(nextElement, currentElement);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onActivate?.(document.activeElement);
      }
    };
  },

  createEscapeHandler(onEscape) {
    return e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onEscape();
      }
    };
  },

  createActivationHandler(onActivate) {
    return e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onActivate?.(document.activeElement);
      }
    };
  },

  createKeyMapHandler({ keyMap, shouldPreventDefault = true, condition }) {
    return e => {
      if (condition && !condition()) return;
      const action = keyMap[e.key];
      if (action) {
        if (shouldPreventDefault) {
          e.preventDefault();
        }
        action(e);
      }
    };
  },
};

export const media = {
  createVideoToggleHandler(getVideoElement) {
    return () => {
      const video = getVideoElement();
      if (video) {
        video.paused ? video.play() : video.pause();
      }
    };
  },

  pauseVideo(video) {
    if (video && !video.paused) {
      video.pause();
    }
  },

  playVideo(video) {
    if (video && video.paused) {
      video.play();
    }
  },

  isPlaying(video) {
    return video && !video.paused;
  },
};

export const events = {
  createClickHandler(callback, { preventDefault = true, stopPropagation = true } = {}) {
    return e => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();
      callback(e);
    };
  },

  attachClickAndKeyboard(element, callback, options = {}) {
    if (!element) return;
    const clickHandler = events.createClickHandler(callback, options);
    const keyHandler = handlers.createActivationHandler(callback);
    element.addEventListener('click', clickHandler);
    element.addEventListener('keydown', keyHandler);
  },

  createEventManager(listeners) {
    const eventMap = new Map();

    return {
      attach() {
        listeners.forEach(({ element, event, handler, options }) => {
          if (!element) return;
          element.addEventListener(event, handler, options);
          if (!eventMap.has(element)) eventMap.set(element, []);
          eventMap.get(element).push({ event, handler, options });
        });
      },

      detach() {
        eventMap.forEach((events, element) => {
          events.forEach(({ event, handler, options }) => {
            element.removeEventListener(event, handler, options);
          });
        });
        eventMap.clear();
      },
    };
  },
};
