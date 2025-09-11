/**
 * Photographer Information Renderer
 * Handles photographer personal data display and rendering
 * - Fetches photographer data by ID from URL
 * - Renders photographer name, tagline, location
 * - Updates profile picture and contact button
 * - Sets page title
 */
import { getPhotographerIdFromData, getPhotographerInformation } from '../../core/data-manager.js';
import { updateElement } from '../../utils/dom-utils.js';

/**
 * Render photographer information
 */
export const renderPhotographerInfo = async () => {
  const photographerId = await getPhotographerIdFromData();

  if (!photographerId) {
    console.error('No photographer ID found');
    return null;
  }

  const photographer = await getPhotographerInformation(photographerId);

  if (!photographer) {
    console.error('Photographer not found');
    return null;
  }

  // Update basic info
  const fullName = photographer.lastname
    ? `${photographer.name} ${photographer.lastname}`
    : photographer.name;
  updateElement('name', fullName);
  updateElement('tagline', photographer.tagline);

  // Update location
  const location =
    photographer.location?.city && photographer.location?.country
      ? `${photographer.location.city}, ${photographer.location.country}`
      : photographer.location?.city || '';
  updateElement('location', location);

  // Update picture
  const picture = document.getElementById('info-picture');
  if (picture && photographer.portrait) {
    const pictureElement = picture.parentElement; // Get the <picture> element
    const newSrc = `assets/photographers/${photographer.folder_name}/jpg/${photographer.portrait.jpg}`;

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

  return photographer;
};
