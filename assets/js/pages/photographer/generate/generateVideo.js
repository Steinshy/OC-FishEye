export const generateVideo = media => {
  if (!media) return;

  const container = document.createElement('div');
  container.className = 'media-video';
  container.setAttribute('data-media-type', 'video');
  container.setAttribute('data-media-id', media.id);

  container.innerHTML = `
    <video
      data-media-type="video"
      data-media-id="${media.id}"
      poster="${media.medias.posterUrl}"
      preload="none"
      controls
      controlsList="nodownload"
      playsinline
      class="media-video-player"
      aria-label="${media.title || 'Vidéo'}"
      aria-describedby="media-info-${media.id}"
      tabindex="0"
    >
      <source src="${media.medias.mp4Url}" type="video/mp4">
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  `;

  const video = container.querySelector('video');
  video.addEventListener('click', e => {
    if (e.clientY < video.getBoundingClientRect().bottom - 50) {
      e.stopPropagation();
      video.paused ? video.play() : video.pause();
    }
  });
  return container;
};
