document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.getElementById("contact_button");
  const modalContainer = document.getElementById("modal_container");
  const modalClose = document.getElementById("modal_close");
  const contactForm = document.getElementById("contact_form");

  function openModal() {
    modalContainer.hidden = false;
    modalContainer.classList.add("show");
    document.body.style.overflow = "hidden";
    document.getElementById("first_name").focus();
  }

  function closeModal() {
    modalContainer.hidden = true;
    modalContainer.classList.remove("show");
    document.body.style.overflow = "";
  }

  contactButton.addEventListener("click", openModal);

  modalClose.addEventListener("click", closeModal);

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalContainer.hidden) {
      closeModal();
    }
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    contactForm.reset();
    alert("Message envoyé avec succès!");
  });
});
