document.addEventListener("DOMContentLoaded", () => {
  createSortDropdown();
  handleContactModal();
  initCharacterCount();
  initializeRealTimeValidation();
  initializeSubmitHandler();
  // Initialize media gallery if we're on a photographer page
  if (window.mediaGallery && window.mediaGallery.init) {
    mediaGallery
      .init()
      .then((result) => {
        if (result.success) {
          console.log(
            `🎉 MediaGallery initialized successfully with ${result.mediaCount} media items`
          );
        } else {
          console.log(`ℹ️ MediaGallery not needed: ${result.reason}`);
        }
      })
      .catch((error) => {
        console.error("❌ Failed to initialize MediaGallery:", error);
      });
  }
});
