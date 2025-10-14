// Photographer stats display and likes management

import { getStatsElements, interactive } from '../../config.js';
import { addPulseAnimation } from '../../helpers/helper.js';
import { aria } from '../accessibility/aria.js';

// Total likes counter
let totalLikes = 0;

// Initialize stats display with data
export const initializeStats = (photographerMedias, photographerPrice) => {
  const { totalLikesCount, statsPrice } = getStatsElements();
  if (!totalLikesCount || !statsPrice) return;

  totalLikes = photographerMedias.reduce((sum, media) => sum + (media.likes || 0), 0);
  totalLikesCount.textContent = totalLikes;
  statsPrice.textContent = `${photographerPrice}€ / jour`;
};

// Increment total likes counter
export const addLikeToTotal = () => {
  const { totalLikesCount, statsLikes } = getStatsElements();
  if (!totalLikesCount) return;

  totalLikesCount.textContent = ++totalLikes;
  aria.setLive(totalLikesCount);
  addPulseAnimation(totalLikesCount);
  addPulseAnimation(statsLikes);
};

// Increment likes for specific media
export const incrementLike = (media, likesButton) => {
  const likesCount = likesButton.querySelector(interactive.likesCount);
  if (!likesCount) return;

  const newLikes = (parseInt(likesCount.textContent, 10) || 0) + 1;
  likesCount.textContent = newLikes;
  media.likes = newLikes;
  aria.setLive(likesCount);

  addPulseAnimation(likesButton.querySelector(interactive.heartIcon));
  addLikeToTotal();
};
