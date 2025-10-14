// Keyboard event handlers and utilities

import { focusNext, focusPrevious } from './focus.js';

// Keyboard event handler creators
export const handlers = {
  // Create arrow key navigation handler
  createArrowNavigation({ elements, orientation = 'vertical', onNavigate, onActivate }) {
    return e => {
      const isVertical = orientation === true || orientation === 'vertical';
      const down = isVertical ? 'ArrowDown' : 'ArrowRight';
      const up = isVertical ? 'ArrowUp' : 'ArrowLeft';

      if (e.key === down || e.key === up) {
        e.preventDefault();
        e.stopPropagation();
        const current = document.activeElement;
        onNavigate?.(e.key === down ? focusNext(elements, current) : focusPrevious(elements, current), current);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onActivate?.(document.activeElement);
      }
    };
  },

  // Create escape key handler
  createEscapeHandler(onEscape) {
    return e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onEscape();
      }
    };
  },

  // Create enter and space key handler
  createActivationHandler(onActivate) {
    return e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        onActivate?.(document.activeElement);
      }
    };
  },

  // Create custom key mapping handler
  createKeyMapHandler({ keyMap, shouldPreventDefault = true, condition }) {
    return e => {
      if (condition && !condition()) return;
      if (keyMap[e.key]) {
        if (shouldPreventDefault) e.preventDefault();
        keyMap[e.key](e);
      }
    };
  },
};

// Video media controls
export const media = {
  // Create video play pause toggle handler
  createVideoToggleHandler(getVideoElement) {
    return () => {
      const video = getVideoElement();
      if (video) video.paused ? video.play() : video.pause();
    };
  },

  // Pause video if playing
  pauseVideo(video) {
    if (video && !video.paused) {
      video.pause();
    }
  },

  // Play video if paused
  playVideo(video) {
    if (video && video.paused) {
      video.play();
    }
  },

  // Check if video is playing
  isPlaying(video) {
    return video && !video.paused;
  },
};

// Event handler utilities
export const events = {
  // Create click event handler with options
  createClickHandler(callback, { preventDefault = true, stopPropagation = true } = {}) {
    return e => {
      if (preventDefault) e.preventDefault();
      if (stopPropagation) e.stopPropagation();
      callback(e);
    };
  },

  // Attach both click and keyboard handlers
  attachClickAndKeyboard(element, callback, options = {}) {
    if (!element) return;
    element.addEventListener('click', events.createClickHandler(callback, options));
    element.addEventListener('keydown', handlers.createActivationHandler(callback));
  },

  // Create event listener manager
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
