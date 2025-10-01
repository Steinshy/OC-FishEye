export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const toggleScroll = add => {
  document.documentElement.classList.toggle('no-scroll', add);
  document.body.classList.toggle('no-scroll', add);
};
