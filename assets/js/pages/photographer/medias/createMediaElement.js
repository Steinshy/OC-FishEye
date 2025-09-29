import { createPicture } from './generate/createPicture.js';
import { createVideo } from './generate/createVideo.js';

export const createMediaElement = photographerMedia => {
  if (!photographerMedia) return null;

  // Add default dimensions if not provided
  const mediaWithDefaults = {
    ...photographerMedia,
    medias: {
      ...photographerMedia.medias,
      width: photographerMedia.medias.width || 1200,
      height: photographerMedia.medias.height || 800,
    },
  };

  switch (photographerMedia.mediaType) {
    case 'image':
      return createPicture(mediaWithDefaults);
    case 'video':
      return createVideo(mediaWithDefaults);
    default:
      return null;
  }
};
