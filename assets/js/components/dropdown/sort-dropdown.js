/* Photographer Page => Sort Dropdown Todo: Refactor this code */

import { Dropdown } from "../../core/constants.js";
import { MediaSorter } from "../photographer/media-sorter.js";
import { currentPhotographer } from "../photographer/photographer-page.js";

let dropdownElements = {};

export const openSortDropdown = () => {
  Dropdown.mediaSortDropdown.classList.add("show");
  Dropdown.mediaSortDropdown.hidden = false;
  Dropdown.mediaSortButton.setAttribute("aria-expanded", "true");
};

export const closeDropdown = () => {
  Dropdown.mediaSortDropdown.classList.remove("show");
  Dropdown.mediaSortDropdown.hidden = true;
  Dropdown.mediaSortButton.setAttribute("aria-expanded", "false");
};

export const handleDropdownClose = (e) => {
  if (
    (e.type === "keydown" && e.key === "Escape") ||
    (e.type === "click" &&
      !Dropdown.mediaSortDropdown.contains(e.target) &&
      e.target !== Dropdown.mediaSortButton)
  ) {
    closeDropdown();
  }
};

export const handleSortDropdown = (e) => {
  e.stopPropagation();
  const isExpanded =
    Dropdown.mediaSortButton.getAttribute("aria-expanded");
  isExpanded === "true" ? closeDropdown() : openSortDropdown();
};

export const createSortDropdown = () => {
  if (Dropdown.mediaSortButton) {
    Dropdown.mediaSortButton.addEventListener(
      "click",
      handleSortDropdown
    );
    document.addEventListener("keydown", handleDropdownClose);
    document.addEventListener("click", handleDropdownClose);
  }
  if (Dropdown.mediaSortDropdown) {
    Dropdown.mediaSortDropdown.addEventListener("click", (e) => {
      if (e.target && e.target.matches("li[role='option']")) {
        const selected = e.target.textContent.trim();
        Dropdown.mediaSortButton.textContent = selected;
        Dropdown.mediaSortDropdown
          .querySelectorAll("li")
          .forEach((li) => li.setAttribute("aria-selected", li === e.target));
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
  }
};