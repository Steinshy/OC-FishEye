export const createHeader = photographer => {
  const { name, tagline, city, country, price } = photographer;
  const { jpgUrl, webpUrl } = photographer.portraits;
  const responsiveWebp = webpUrl.replace(/(\.\w+)$/, '-1200$1');
  const responsiveJpg = jpgUrl.replace(/(\.\w+)$/, '-1200$1');
  const section = document.getElementById('photographer-section');

  section.innerHTML = `
    <div class="section-container">
      <div class="section-info" id="bio-info">
        <h1 data-label="Nom du photographe">${name}</h1>
        <p data-label="Ville, Pays">${city}, ${country}</p>
        <p data-label="Tagline">${tagline}</p>
        <p data-label="Prix">${price}€ / jour</p>
      </div>
      <!-- contact button -->
      <div class="contact-container">
        <button id="contact-button" aria-label="Contacter ${name}">Contactez-moi</button>
      </div>
      <!-- profile picture -->
      <div class="container-picture">
        <picture>
          <source srcset="${responsiveWebp} 1x, ${webpUrl} 2x" type="image/webp">
          <source srcset="${responsiveJpg} 1x, ${jpgUrl} 2x" type="image/jpeg">
          <img
            class="profile-picture"
            src="${responsiveJpg}"
            alt="Portrait de ${name}"
            loading="lazy"
            decoding="async"
            width="900"
            height="900"
          >
        </picture>
      </div>
    </div>`;
};
