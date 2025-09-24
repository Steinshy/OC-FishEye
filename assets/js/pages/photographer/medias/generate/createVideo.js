export const createVideo = media => {
  if (!media) return;

  const video = document.createElement('video');

  video.setAttribute('role', 'video');
  video.setAttribute('aria-label', media.title || '');
  video.setAttribute('data-media-type', 'video');
  video.setAttribute('controls', 'true');
  video.setAttribute('muted', 'true');
  video.setAttribute('loop', 'true');
  video.setAttribute('playsinline', 'true');
  video.setAttribute('preload', 'metadata');

  // Chrome warning Fix
  video.addEventListener('wheel', () => {}, { passive: true });
  video.addEventListener('loadedmetadata', () => {});

  video.innerHTML = `
  <source src="${media.medias.mp4Url}" type="video/mp4">
  <p>Votre navigateur ne supporte pas la balise vidéo.</p>
`;

  return video;
};
