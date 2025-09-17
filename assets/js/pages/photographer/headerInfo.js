export const generateHeaderHTML = photographer => {
  const { name, lastname, tagline } = photographer;
  const { city, country } = photographer.location;
  const { profile_jpg, profile_webp } = photographer.portrait;

  const htmlContent = `
    <div class="section-container">
      <div class="section-info" id="bio-info">
        <h1 data-label="Nom du photographe">${name} ${lastname}</h1>
        <p data-label="Ville, Pays">${city}, ${country}</p>
        <p data-label="Tagline">${tagline}</p>
      </div>
      <!-- contact button -->
      <div class="contact-container">
        <button id="contact-button" aria-label="Contacter ${name} ${lastname}">Contactez-moi</button>
      </div>
      <!-- profile picture -->
      <div class="container-picture">
        <picture>
          <source srcset="assets/photographers/${photographer.folder_name}/${profile_webp}" type="image/webp">
          <source srcset="assets/photographers/${photographer.folder_name}/${profile_jpg}" type="image/jpeg">
          <img
            class="profile-picture"
            src="assets/photographers/${photographer.folder_name}/${profile_jpg}"
            alt="Portrait de ${name} ${lastname}, photographe"
            loading="lazy"
          >
        </picture>
      </div>
    </div>`;

  const photographerSection = document.getElementById('photographer-section');
  if (photographerSection) {
    photographerSection.innerHTML = htmlContent;
  }

  return htmlContent;
};
