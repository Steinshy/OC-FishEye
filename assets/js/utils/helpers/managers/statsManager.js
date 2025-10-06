let totalLikes = 0;
let statsElements = null;

const getStatsElements = () => {
  if (!statsElements) {
    statsElements = {
      totalLikesCount: document.getElementById('total-likes-count'),
      statsPrice: document.getElementById('stats-price'),
    };
  }
  return statsElements;
};

export const initializeStats = (photographerMedias, photographerPrice) => {
  const elements = getStatsElements();
  if (!elements.totalLikesCount || !elements.statsPrice) return;

  // Calculate total likes from all media
  totalLikes = photographerMedias.reduce((sum, media) => sum + (media.likes || 0), 0);

  // Update DOM
  elements.totalLikesCount.textContent = totalLikes;
  elements.statsPrice.textContent = `${photographerPrice}€ / jour`;
};

export const incrementTotalLikes = () => {
  const elements = getStatsElements();
  if (!elements.totalLikesCount) return;

  totalLikes += 1;
  elements.totalLikesCount.textContent = totalLikes;
  elements.totalLikesCount.setAttribute('aria-live', 'polite');
};

export const getTotalLikes = () => totalLikes;
