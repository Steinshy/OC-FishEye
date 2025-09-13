/**
 * Photographer Header Information Renderer
 * Handles photographer header information display and rendering
 */


// create the section - info or use the HTML one
// No update on the elements data, just generate it
// create a outside const for pictures container / videos container
export const createHeaderInfos = (photographer) => {
  const { name, lastname, tagline } = photographer;
  const { city, country } = photographer.location;
  console.log('photographer', photographer);

  const headerInfos = document.createElement('div');
  headerInfos.className = 'section-container';
  headerInfos.innerHTML =
    `<div class="section-info" id="bio-info">
      <h1 id="name" data-label="Nom du photographe">${name} ${lastname}</h1>
      <p id="location" data-label="Ville, Pays">${city}, ${country}</p>
      <p id="tagline" data-label="Tagline">${tagline}</p>
    </div>`;

  return headerInfos;
};