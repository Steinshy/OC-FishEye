import { generatePicture } from '../../../pages/photographer/generate/generatePicture.js';
import { generateVideo } from '../../../pages/photographer/generate/generateVideo.js';

export const generateMedias = (photographerMedia, isLCP = false) => {
  if (!photographerMedia) return null;
  switch (photographerMedia.mediaType) {
    case 'image':
      return generatePicture(photographerMedia, isLCP);
    case 'video':
      return generateVideo(photographerMedia, isLCP);
    default:
      return null;
  }
};
