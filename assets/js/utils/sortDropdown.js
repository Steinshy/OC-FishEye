const elements = {
  mediaSortButton: document.getElementById("media_sort_button"),
  mediaSortDropdown: document.getElementById("sort_dropdown"),
};

const openSortDropdown = () => {
  elements.mediaSortDropdown.classList.add("show");
  elements.mediaSortDropdown.hidden = false;
  elements.mediaSortButton.setAttribute("aria-expanded", "true");
};

const closeDropdown = () => {
  elements.mediaSortDropdown.classList.remove("show");
  elements.mediaSortDropdown.hidden = true;
  elements.mediaSortButton.setAttribute("aria-expanded", "false");
};

const handleDropdownClose = (e) => {
  if (
    (e.type === "keydown" && e.key === "Escape") ||
    (e.type === "click" &&
      !elements.mediaSortDropdown.contains(e.target) &&
      e.target !== elements.mediaSortButton)
  ) {
    closeDropdown();
  }
};

const handleSortDropdown = (e) => {
  e.stopPropagation();
  const isExpanded = elements.mediaSortButton.getAttribute("aria-expanded");
  isExpanded === "true" ? closeDropdown() : openSortDropdown();
};

const createSortDropdown = () => {
  elements.mediaSortButton.addEventListener("click", handleSortDropdown);
  document.addEventListener("keydown", handleDropdownClose);
  document.addEventListener("click", handleDropdownClose);
};
