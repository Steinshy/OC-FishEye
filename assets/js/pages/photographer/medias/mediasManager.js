import { createCard } from './generate/createCard.js';
import { createPicture } from './generate/createPicture.js';
import { createVideo } from './generate/createVideo.js';

export const createMediasCards = photographerMedias => {
  if (!photographerMedias) return;
  const mediasCards = document.createElement('div');
  mediasCards.className = 'medias-cards';

  photographerMedias.forEach(photographerMedia => {
    const mediaElement = handleTypeCard(photographerMedia);
    if (mediaElement) {
      mediasCards.appendChild(createCard(photographerMedia, mediaElement));
    }
  });

  return mediasCards;
};

const handleTypeCard = photographerMedia => {
  if (!photographerMedia) return null;

  switch (photographerMedia.mediaType) {
    case 'image':
      return createPicture(photographerMedia);
    case 'video':
      return createVideo(photographerMedia);
    default:
      return null;
  }
};
