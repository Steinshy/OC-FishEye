import { generatePicture } from '../../../pages/photographer/generate/generatePicture.js';
import { generateVideo } from '../../../pages/photographer/generate/generateVideo.js';

export const generateMedias = (photographerMedia, isLCP = false, forceDesktop = false) => {
  if (!photographerMedia) return null;
  switch (photographerMedia.mediaType) {
    case 'image':
      return generatePicture(photographerMedia, isLCP, forceDesktop);
    case 'video':
      return generateVideo(photographerMedia, isLCP, forceDesktop);
    default:
      return null;
  }
};
