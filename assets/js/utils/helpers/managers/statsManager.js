import { getStatsElements } from '../../../constants.js';
let totalLikes = 0;

const { totalLikesCount, statsPrice, statsLikes } = getStatsElements();
export const initializeStats = (photographerMedias, photographerPrice) => {
  if (!totalLikesCount || !statsPrice) return;
  totalLikes = photographerMedias.reduce((sum, media) => sum + (media.likes || 0), 0);

  totalLikesCount.textContent = totalLikes;
  statsPrice.textContent = `${photographerPrice}€ / jour`;
};
export const incrementTotalLikes = () => {
  if (!totalLikesCount) return;

  totalLikes += 1;
  totalLikesCount.textContent = totalLikes;
  totalLikesCount.setAttribute('aria-live', 'polite');

  if (statsLikes && totalLikesCount) {
    [statsLikes, totalLikesCount].forEach(element => {
      element.classList.add('pulse');
      setTimeout(() => element.classList.remove('pulse'), 400);
    });
  }
};
