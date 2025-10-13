import { getStatsElements } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';
import { addPulseAnimation } from '../helper.js';

let totalLikes = 0;

export const initializeStats = (photographerMedias, photographerPrice) => {
  const { totalLikesCount, statsPrice } = getStatsElements();
  if (!totalLikesCount || !statsPrice) return;

  totalLikes = photographerMedias.reduce((sum, media) => sum + (media.likes || 0), 0);
  totalLikesCount.textContent = totalLikes;
  statsPrice.textContent = `${photographerPrice}€ / jour`;
};

export const addLikeToTotal = () => {
  const { totalLikesCount, statsLikes } = getStatsElements();
  if (!totalLikesCount) return;

  totalLikes += 1;
  totalLikesCount.textContent = totalLikes;
  aria.setLive(totalLikesCount);

  addPulseAnimation(totalLikesCount);
  addPulseAnimation(statsLikes);
};

export const incrementLike = (media, likesButton) => {
  const likesCount = likesButton.querySelector('span');
  const heartIcon = likesButton.querySelector('.fa-heart');

  if (!likesCount) return;

  const currentLikes = parseInt(likesCount.textContent, 10) || 0;
  const newLikes = currentLikes + 1;
  likesCount.textContent = newLikes;
  media.likes = newLikes;
  aria.setLive(likesCount);

  addPulseAnimation(heartIcon);
  addLikeToTotal();
};
