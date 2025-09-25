import { createAccessibilityManager } from '../../../../accessibilityManagement.js';

const accessibilityManager = createAccessibilityManager();

export const createVideo = media => {
  if (!media) return;

  const video = document.createElement('video');

  // Basic attributes
  video.setAttribute('data-media-type', 'video');
  video.setAttribute('data-media-id', media.id);
  video.setAttribute('controls', 'true');
  video.setAttribute('muted', 'true');
  video.setAttribute('loop', 'true');
  video.setAttribute('playsinline', 'true');
  video.setAttribute('preload', 'metadata');

  // Set up ARIA attributes using accessibility manager
  accessibilityManager.ariaManager.updateAttributes(video, {
    'aria-label': `${media.title || 'Vidéo'} - ${media.mediaType}`,
    'aria-describedby': `media-info-${media.id}`,
    'aria-expanded': 'false',
    role: 'application',
  });

  // Chrome warning Fix
  video.addEventListener('wheel', () => {}, { passive: true });
  video.addEventListener('loadedmetadata', () => {});

  // Create caption file path
  // const captionFileName = media.medias.mp4Url.split('/').pop().replace('.mp4', '.vtt');
  const captionPath = media.medias.mp4Url.replace(/\/media\//, '/media/captions/').replace('.mp4', '.vtt');

  video.innerHTML = `
  <source src="${media.medias.mp4Url}" type="video/mp4">
  <track kind="captions" src="${captionPath}" srclang="fr" label="Français" default>
  <p>Votre navigateur ne supporte pas la balise vidéo.</p>
`;

  return video;
};
