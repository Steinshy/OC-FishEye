document.addEventListener("DOMContentLoaded", () => {
  const mediaSortButton = document.getElementById("media_sort_button");
  const mediaSortDropdown = document.getElementById("sort_dropdown");
  const dropdownOptions =
    mediaSortDropdown.querySelectorAll("li[role='option']");

  function openDropdown() {
    mediaSortDropdown.classList.add("show");
    mediaSortDropdown.hidden = false;
    mediaSortButton.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    mediaSortDropdown.classList.remove("show");
    mediaSortDropdown.hidden = true;
    mediaSortButton.setAttribute("aria-expanded", "false");
  }

  function toggleDropdown(e) {
    e.stopPropagation();
    const isExpanded = mediaSortButton.getAttribute("aria-expanded") === "true";
    isExpanded ? closeDropdown() : openDropdown();
  }

  function selectOption(option) {
    const arrow = mediaSortButton.querySelector(".dropdown_arrow");
    mediaSortButton.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
    });
    mediaSortButton.firstChild.textContent = option.textContent + " ";
    if (arrow) mediaSortButton.appendChild(arrow);

    dropdownOptions.forEach((opt) =>
      opt.setAttribute("aria-selected", "false")
    );
    option.setAttribute("aria-selected", "true");

    closeDropdown();
  }

  mediaSortButton.addEventListener("click", toggleDropdown);

  dropdownOptions.forEach((option) => {
    option.addEventListener("click", () => selectOption(option));
  });

  document.addEventListener("click", (e) => {
    if (
      !mediaSortButton.contains(e.target) &&
      !mediaSortDropdown.contains(e.target)
    ) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  });
});
