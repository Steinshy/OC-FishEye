import { updateElement } from '../../utils/dom-utils.js';

/** Render photographer information */
export const renderPhotographerInfo = (photographerId) => {

  if (!photographerId) {
    console.error('No photographer ID found');
    return null;
  }

  // Update basic info
  const fullName = photographerId.lastname
    ? `${photographerId.name} ${photographerId.lastname}`
    : photographerId.name;
  updateElement('name', fullName);
  updateElement('tagline', photographerId.tagline);

  // Update location
  const location =
    photographerId.location?.city && photographerId.location?.country
      ? `${photographerId.location.city}, ${photographerId.location.country}`
      : photographerId.location?.city || '';
  updateElement('location', location);

  // Update picture
  const picture = document.getElementById('info-picture');
  if (picture && photographerId.portrait) {
    const pictureElement = picture.parentElement; // Get the <picture> element
    const newSrc = `assets/photographers/${photographerId.folder_name}/jpg/${photographerId.portrait.jpg}`;

    // Update the source element to use the photographer's image
    const sourceElement = pictureElement.querySelector('source');
    if (sourceElement) {
      sourceElement.srcset = newSrc;
    }

    // Also update the img element as fallback
    picture.src = newSrc;
    picture.alt = `Portrait de ${fullName}`;
  }

  // Update contact button
  updateElement('contact-button', `Contactez ${fullName}`, 'aria-label');

  // Update page title
  document.title = `FishEye - ${fullName}`;

  return photographerId;
};
