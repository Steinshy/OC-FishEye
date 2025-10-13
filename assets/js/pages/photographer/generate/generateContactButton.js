export const generateContactButton = name => {
  const contactContainer = document.createElement('div');
  contactContainer.className = 'contact-container';
  contactContainer.innerHTML = `<button id="contact-button" aria-label="Contacter ${name}" disabled aria-disabled="true">Contactez-moi</button>`;
  return contactContainer;
};
