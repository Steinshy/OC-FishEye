import { createPicture } from '../../../pages/photographer/medias/generate/createPicture.js';
import { createVideo } from '../../../pages/photographer/medias/generate/createVideo.js';

export const createMediaElement = photographerMedia => {
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
