import { generatePicture } from '../../../pages/photographer/generate/generatePicture.js';
import { generateVideo } from '../../../pages/photographer/generate/generateVideo.js';

export const generateMedias = photographerMedia => {
  if (!photographerMedia) return null;
  switch (photographerMedia.mediaType) {
    case 'image':
      return generatePicture(photographerMedia);
    case 'video':
      return generateVideo(photographerMedia);
    default:
      return null;
  }
};
