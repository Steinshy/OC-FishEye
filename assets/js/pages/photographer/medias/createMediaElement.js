import { createPicture } from './generate/createPicture.js';
import { createVideo } from './generate/createVideo.js';

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
