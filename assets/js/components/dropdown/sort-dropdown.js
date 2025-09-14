/* Photographer Page => Sort Dropdown Todo: Refactor this code */

import { MediaDropdown } from '../../core/constants.js';
import { MediaSorter } from '../../pages/photographer/media-sorter.js';

export const openDropdown = () => {
  if (MediaDropdown.options && MediaDropdown.button) {
    MediaDropdown.options.classList.add('show');
    MediaDropdown.options.hidden = false;
    MediaDropdown.button.setAttribute('aria-expanded', 'true');
  }
};

export const closeDropdown = () => {
  if (MediaDropdown.options && MediaDropdown.button) {
    MediaDropdown.options.classList.remove('show');
    MediaDropdown.options.hidden = true;
    MediaDropdown.button.setAttribute('aria-expanded', 'false');
  }
};

export const handleDropdownClose = e => {
  const shouldClose =
    (e.type === 'keydown' && e.key === 'Escape') ||
    (e.type === 'click' &&
      !MediaDropdown.options.contains(e.target) &&
      e.target !== MediaDropdown.button);

  shouldClose ? closeDropdown() : null;
};

export const handleSortDropdown = e => {
  e.stopPropagation();
  const isExpanded = MediaDropdown.button.getAttribute('aria-expanded');
  isExpanded === 'true' ? closeDropdown() : openDropdown();
};

export const createSortDropdown = () => {
  if (!MediaDropdown.button || !MediaDropdown.options) {
    console.warn('Sort dropdown elements not found');
    return;
  }

  // Add event listeners
  MediaDropdown.button.addEventListener('click', handleSortDropdown);
  document.addEventListener('keydown', handleDropdownClose);
  document.addEventListener('click', handleDropdownClose);

  MediaDropdown.options.addEventListener('click', e => {
    if (e.target && e.target.matches("li[role='option']")) {
      const selected = e.target.textContent.trim();
      MediaDropdown.button.textContent = selected;

      // Update aria-selected for all options
      MediaDropdown.popularOption.setAttribute(
        'aria-selected',
        e.target === MediaDropdown.popularOption
      );
      MediaDropdown.dateOption.setAttribute('aria-selected', e.target === MediaDropdown.dateOption);
      MediaDropdown.titleOption.setAttribute(
        'aria-selected',
        e.target === MediaDropdown.titleOption
      );
      MediaDropdown.likesOption.setAttribute(
        'aria-selected',
        e.target === MediaDropdown.likesOption
      );

      // Handle sorting if MediaSorter is available
      if (MediaSorter?.handleSortSelection && MediaSorter.getCurrentMedia().length > 0) {
        // Get photographer folder name from MediaSorter or other source
        const folderName = MediaSorter.getCurrentPhotographerFolder?.() || 'default';
        MediaSorter.handleSortSelection(selected, MediaSorter.getCurrentMedia(), folderName);
      }

      closeDropdown();
    }
  });
};
