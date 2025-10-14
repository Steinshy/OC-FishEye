import { generatePicture } from '../../../pages/photographer/generate/generatePicture.js';
import { generateVideo } from '../../../pages/photographer/generate/generateVideo.js';

export const generateMedias = (photographerMedia, useHighQuality = false) => {
  if (!photographerMedia) return null;
  switch (photographerMedia.mediaType) {
    case 'image':
      return generatePicture(photographerMedia, useHighQuality);
    case 'video':
      return generateVideo(photographerMedia, useHighQuality);
    default:
      return null;
  }
};
