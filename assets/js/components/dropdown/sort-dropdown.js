/* Photographer Page => Sort Dropdown Todo: Refactor this code */

import { Dropdown } from '../../core/constants.js';
import { MediaSorter } from '../../pages/photographer/media-sorter.js';
import { currentPhotographer } from '../../pages/photographer/photographer-page.js';

export const openSortDropdown = () => {
  const sortDropdown = document.getElementById('sort-dropdown');
  const sortButton = document.getElementById('media-sort-button');

  if (sortDropdown && sortButton) {
    sortDropdown.classList.add('show');
    sortDropdown.hidden = false;
    sortButton.setAttribute('aria-expanded', 'true');
  }
};

export const closeDropdown = () => {
  const sortDropdown = document.getElementById('sort-dropdown');
  const sortButton = document.getElementById('media-sort-button');

  if (sortDropdown && sortButton) {
    sortDropdown.classList.remove('show');
    sortDropdown.hidden = true;
    sortButton.setAttribute('aria-expanded', 'false');
  }
};

export const handleDropdownClose = e => {
  if (
    (e.type === 'keydown' && e.key === 'Escape') ||
    (e.type === 'click' &&
      !Dropdown.mediaSortDropdown.contains(e.target) &&
      e.target !== Dropdown.mediaSortButton)
  ) {
    closeDropdown();
  }
};

export const handleSortDropdown = e => {
  e.stopPropagation();
  const isExpanded = Dropdown.mediaSortButton.getAttribute('aria-expanded');
  isExpanded === 'true' ? closeDropdown() : openSortDropdown();
};

export const createSortDropdown = () => {
  // Get elements directly to ensure they exist
  const sortButton = document.getElementById('media-sort-button');
  const sortDropdown = document.getElementById('sort-dropdown');

  if (!sortButton || !sortDropdown) {
    console.warn('Sort dropdown elements not found');
    return;
  }

  // Add event listeners
  sortButton.addEventListener('click', handleSortDropdown);
  document.addEventListener('keydown', handleDropdownClose);
  document.addEventListener('click', handleDropdownClose);

  sortDropdown.addEventListener('click', e => {
    if (e.target && e.target.matches("li[role='option']")) {
      const selected = e.target.textContent.trim();
      sortButton.textContent = selected;
      sortDropdown
        .querySelectorAll('li')
        .forEach(li => li.setAttribute('aria-selected', li === e.target));
      if (MediaSorter?.handleSortSelection) {
        const currentMedia = MediaSorter.getCurrentMedia();
        const photographer = currentPhotographer;
        if (currentMedia.length > 0 && photographer) {
          MediaSorter.handleSortSelection(selected, currentMedia, photographer.folder_name);
        }
      }
      closeDropdown();
    }
  });
};
