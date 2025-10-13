import { aria } from '../../../utils/accessibility/aria.js';

import { generateContactButton } from './generateContactButton.js';
import { generateInfoSection } from './generateInfoSection.js';
import { generatePictureSection } from './generatePictureSection.js';

export const generatePhotographerHeader = photographer => {
  const section = document.createElement('section');
  section.id = 'photographer-section';
  section.className = 'photographer-section';
  aria.setLabel(section, 'Section du photographe');

  const container = document.createElement('div');
  container.className = 'section-container';

  const infoSection = generateInfoSection(photographer);
  const contactButton = generateContactButton(photographer.name);
  const pictureSection = generatePictureSection({ name: photographer.name, ...photographer.portraits });

  container.append(infoSection, contactButton, pictureSection);
  section.appendChild(container);

  return section;
};
