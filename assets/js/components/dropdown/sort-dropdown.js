/**
 * Photographer Page => Sort Dropdown
 * Todo: Refactor this code
 */
let dropdownElements = {};

function initializeSortElements() {
  dropdownElements = {
    mediaSortButton: document.getElementById("media_sort_button"),
    mediaSortDropdown: document.getElementById("sort_dropdown")
  };
}

const openSortDropdown = () => {
  dropdownElements.mediaSortDropdown.classList.add("show");
  dropdownElements.mediaSortDropdown.hidden = false;
  dropdownElements.mediaSortButton.setAttribute("aria-expanded", "true");
};

const closeDropdown = () => {
  dropdownElements.mediaSortDropdown.classList.remove("show");
  dropdownElements.mediaSortDropdown.hidden = true;
  dropdownElements.mediaSortButton.setAttribute("aria-expanded", "false");
};

const handleDropdownClose = (e) => {
  if (
    (e.type === "keydown" && e.key === "Escape") ||
    (e.type === "click" &&
      !dropdownElements.mediaSortDropdown.contains(e.target) &&
      e.target !== dropdownElements.mediaSortButton)
  ) {
    closeDropdown();
  }
};

const handleSortDropdown = (e) => {
  e.stopPropagation();
  const isExpanded =
    dropdownElements.mediaSortButton.getAttribute("aria-expanded");
  isExpanded === "true" ? closeDropdown() : openSortDropdown();
};

const createSortDropdown = () => {
  initializeSortElements();

  if (dropdownElements.mediaSortButton) {
    dropdownElements.mediaSortButton.addEventListener(
      "click",
      handleSortDropdown
    );
    document.addEventListener("keydown", handleDropdownClose);
    document.addEventListener("click", handleDropdownClose);
  }
  if (dropdownElements.mediaSortDropdown) {
    dropdownElements.mediaSortDropdown.addEventListener("click", (e) => {
      if (e.target && e.target.matches("li[role='option']")) {
        const selected = e.target.textContent.trim();
        dropdownElements.mediaSortButton.textContent = selected;
        dropdownElements.mediaSortDropdown
          .querySelectorAll("li")
          .forEach((li) => li.setAttribute("aria-selected", li === e.target));
        if (window.MediaGallery?.sortMedia) {
          window.MediaGallery.sortMedia(selected);
        }
        closeDropdown();
      }
    });
  }
};

// Global access for backward compatibility
window.createSortDropdown = createSortDropdown;