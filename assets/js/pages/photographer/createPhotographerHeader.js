import { createFragment } from '../../utils/helpers/utils.js';

export const photographerHeader = photographer => {
  const photographerSection = document.createElement('section');
  photographerSection.id = 'photographer-section';
  photographerSection.className = 'photographer-section';
  photographerSection.setAttribute('aria-label', 'Section du photographe');

  const { name, tagline, city, country, price } = photographer;
  const { jpgUrl, webpUrl } = photographer.portraits;
  const placeholderUrl = 'assets/photographers/account.png';

  photographerSection.innerHTML = `
    <div class="section-container">
      <div class="section-info" id="bio-info">
        <h1 data-label="Nom du photographe">${name}</h1>
        <p data-label="Ville, Pays">${city}, ${country}</p>
        <p data-label="Tagline">${tagline}</p>
        <p data-label="Prix">${price}€ / jour</p>
      </div>
      <!-- contact button -->
      <div class="contact-container">
        <button id="contact-button" aria-label="Contacter ${name}" disabled aria-disabled="true">Contactez-moi</button>
      </div>
      <!-- profile picture -->
      <div class="container-picture">
        <picture>
          <source data-srcset="${webpUrl}" type="image/webp">
          <source data-srcset="${jpgUrl}" type="image/jpeg">
          <img
            class="profile-picture"
            src="${placeholderUrl}"
            alt="Portrait de ${name}"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="900"
            height="900"
          >
        </picture>
      </div>
    </div>`;

  return createFragment(photographerSection, {
    img: photographerSection.querySelector('.profile-picture'),
    picture: photographerSection.querySelector('picture'),
    jpgUrl: photographer.portraits.jpgUrl,
    webpUrl: photographer.portraits.webpUrl,
  });
};
