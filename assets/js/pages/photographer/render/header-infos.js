export const createHeaderInfos = photographer => {
  const { name, lastname, tagline } = photographer;
  const { city, country } = photographer.location;
  const photographerSection = document.getElementById('photographer-section');

  photographerSection.innerHTML = `<div class="section-container">
      <div class="section-info" id="bio-info">
        <h1 id="name" data-label="Nom du photographe">${name} ${lastname}</h1>
        <p id="location" data-label="Ville, Pays">${city}, ${country}</p>
        <p id="tagline" data-label="Tagline">${tagline}</p>
      </div>
    </div>`;

  return photographerSection;
};
