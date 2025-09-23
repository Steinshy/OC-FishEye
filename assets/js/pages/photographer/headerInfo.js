export const generateHeaderHTML = photographer => {
  const { name, tagline, city, country, portraits } = photographer;
  const photographerSection = document.getElementById('photographer-section');
  const folderName = name.replace(/[\s-]+/g, '');

  photographerSection.innerHTML = `
    <div class="section-container">
      <div class="section-info" id="bio-info">
        <h1 data-label="Nom du photographe">${name}</h1>
        <p data-label="Ville, Pays">${city}, ${country}</p>
        <p data-label="Tagline">${tagline}</p>
      </div>
      <!-- contact button -->
      <div class="contact-container">
        <button id="contact-button" aria-label="Contacter ${name}">Contactez-moi</button>
      </div>
      <!-- profile picture -->
      <div class="container-picture">
        <picture>
          <source srcset="assets/photographers/${folderName}/${portraits.profile_webp}" type="image/webp">
          <source srcset="assets/photographers/${folderName}/${portraits.profile_jpg}" type="image/jpeg">
          <img
            class="profile-picture"
            src="assets/photographers/${folderName}/${portraits.profile_jpg}"
            alt="Portrait de ${name}, photographe"
            loading="lazy"
          >
        </picture>
      </div>
    </div>`;
};
