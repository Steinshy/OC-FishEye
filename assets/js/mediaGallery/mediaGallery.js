// Simple MediaGallery object - no complex module pattern
window.mediaGallery = {
  // Constants
  DATA_URL: "assets/photographers/data.json",
  BASE_ASSETS_URL: "assets/photographers",

  // State
  photographers: [],
  currentPhotographer: null,
  mediaItems: [],
  photographerFolderName: "",

  // Main function to get photographer data
  async getPhotographerData(photographerId) {
    try {
      // Fetch data only once
      if (!this.photographers.length) {
        const response = await fetch(this.DATA_URL);
        const data = await response.json();
        this.photographers = data.photographers;
      }

      // If photographer ID provided, select that photographer
      if (photographerId !== undefined) {
        console.log(`🔍 Looking for photographer with ID: ${photographerId}`);
        console.log(
          `📚 Available photographers:`,
          this.photographers.map((p) => ({
            id: p.id,
            name: p.name,
            folder: p.folder_name
          }))
        );

        this.currentPhotographer =
          this.photographers.find((p) => p.id === photographerId) || null;

        if (this.currentPhotographer) {
          console.log(`✅ Found photographer:`, this.currentPhotographer);
          this.mediaItems = this.currentPhotographer.media || [];
          this.photographerFolderName = this.currentPhotographer.folder_name;
          console.log(`📁 Folder name set to: ${this.photographerFolderName}`);
        } else {
          console.error(`❌ No photographer found with ID: ${photographerId}`);
        }
      }

      return {
        photographers: this.photographers,
        currentPhotographer: this.currentPhotographer,
        mediaItems: this.mediaItems
      };
    } catch (err) {
      console.error("Failed to load data.json", err);
      return null;
    }
  },

  // Load media for a specific photographer
  async loadMedia(photographerId) {
    const data = await this.getPhotographerData(photographerId);
    if (!data || !data.currentPhotographer) return;

    this.populatePhotographerInfo();
    this.renderGallery(this.mediaItems);
  },

  // Initialize the media gallery
  async init(options = {}) {
    console.log("🎯 MediaGallery initializing...");

    try {
      // Get photographer ID from URL or options
      let photographerId = options.photographerId;

      if (!photographerId) {
        const url = new URL(window.location.href);
        const idParam = url.searchParams.get("id");
        console.log(`🌐 URL: ${window.location.href}`);
        console.log(`🔍 ID parameter from URL: ${idParam}`);

        if (idParam) {
          photographerId = parseInt(idParam, 10);
          console.log(`📸 Parsed photographer ID: ${photographerId}`);
        } else {
          console.log(`ℹ️ No ID parameter found in URL`);
        }
      }

      // If we have a photographer ID, load their media
      if (photographerId) {
        await this.loadMedia(photographerId);
        console.log("✅ Media gallery loaded successfully");

        // Set up sorting if sort dropdown exists
        this.setupSorting();

        // Set up event listeners
        this.setupEventListeners();

        return {
          success: true,
          photographerId,
          mediaCount: this.mediaItems.length
        };
      } else {
        console.log("ℹ️ No photographer ID found - gallery not loaded");
        return {
          success: false,
          reason: "No photographer ID provided"
        };
      }
    } catch (error) {
      console.error("❌ Error initializing MediaGallery:", error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Set up sorting functionality
  setupSorting() {
    const sortDropdown = document.querySelector("#sort-dropdown");
    if (sortDropdown) {
      sortDropdown.addEventListener("change", (e) => {
        const criterion = e.target.value;
        console.log(`🔄 Sorting by: ${criterion}`);
        this.sortMedia(criterion);
      });
      console.log("✅ Sort dropdown configured");
    }
  },

  // Set up event listeners for media interactions
  setupEventListeners() {
    // Add click handlers for media cards if needed
    const mediaCards = document.querySelectorAll(".media_card");
    mediaCards.forEach((card) => {
      card.addEventListener("click", () => {
        // Future: Add lightbox/modal functionality
        console.log("🖼️ Media card clicked");
      });
    });

    console.log("✅ Event listeners configured");
  },
  // Sort media by criterion
  sortMedia(criterion = "popularité") {
    if (!this.mediaItems.length) return;

    const sorted = [...this.mediaItems];
    switch (criterion.toLowerCase()) {
      case "popularité":
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "titre":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        console.warn(`Unknown sort criterion: ${criterion}`);
    }

    this.renderGallery(sorted);
  },

  // Populate photographer info in header
  populatePhotographerInfo() {
    if (!this.currentPhotographer) return;

    // Update name
    const nameElement = document.querySelector(".photographer_section h1");
    if (nameElement) {
      nameElement.textContent = this.currentPhotographer.name;
    }

    // Update location
    const locationElement = document.querySelector(
      ".photographer_section p:first-of-type"
    );
    if (locationElement) {
      locationElement.innerHTML = `${this.currentPhotographer.city}, <span>${this.currentPhotographer.country}</span>`;
    }

    // Update tagline
    const taglineElement = document.querySelector(
      ".photographer_section p:last-of-type"
    );
    if (taglineElement) {
      taglineElement.textContent = this.currentPhotographer.tagline;
    }
  },

  // Render gallery
  renderGallery(list) {
    const container = document.querySelector(".media_cards");
    if (!container) return;

    // Check if we have the photographer folder name
    if (!this.photographerFolderName) {
      console.error(
        "❌ photographerFolderName is undefined! Cannot render gallery."
      );
      console.log("Current state:", {
        currentPhotographer: this.currentPhotographer,
        photographerFolderName: this.photographerFolderName,
        mediaItems: this.mediaItems
      });
      return;
    }

    // Clean up existing videos before rendering new ones
    this.cleanupVideos();

    console.log(
      `🎨 Rendering ${list.length} media items for photographer: ${this.photographerFolderName}`
    );

    container.innerHTML = "";

    list.forEach((item, index) => {
      console.log(`📸 Rendering item ${index + 1}:`, {
        id: item.id,
        title: item.title,
        hasImage: !!item.image,
        hasVideo: !!item.video,
        imageData: item.image,
        videoData: item.video,
        itemKeys: Object.keys(item)
      });
      const card = document.createElement("div");
      card.className = "media_card";

      // Media content
      const mediaWrapper = document.createElement("div");
      mediaWrapper.className = "card_image";

      if (item.image) {
        const img = document.createElement("img");
        // Always use JPG for images (WebP removed)
        img.src = `${this.BASE_ASSETS_URL}/${this.photographerFolderName}/jpg/${item.image.jpg}`;
        img.alt = item.title;
        img.loading = "lazy";
        img.id = item.id;

        mediaWrapper.appendChild(img);
      } else if (item.video) {
        console.log(`🎬 Creating video element for: ${item.title}`, item.video);

        // Check if video.mp4 exists
        if (!item.video.mp4) {
          console.error(`❌ Video item missing mp4 property:`, item.video);
          return;
        }

        const video = document.createElement("video");
        const videoPath = `${this.BASE_ASSETS_URL}/${this.photographerFolderName}/video/${item.video.mp4}`;

        // Enhanced video element with better attributes
        video.src = videoPath;
        video.setAttribute("aria-label", item.title);
        video.setAttribute("role", "application");
        video.controls = true;
        video.preload = "metadata"; // Load only metadata for better performance
        video.id = item.id;
        video.muted = true; // Muted by default (required for autoplay in some browsers)
        video.playsInline = true; // Better mobile support

        // Add loading state
        const loadingIndicator = document.createElement("div");
        loadingIndicator.className = "video-loading";
        loadingIndicator.innerHTML = `
          <div class="loading-spinner"></div>
          <p>Loading video...</p>
        `;
        mediaWrapper.appendChild(loadingIndicator);

        // Enhanced error handling with retry mechanism
        this.handleVideoError(video, videoPath);

        // Enhanced loading events
        video.onloadedmetadata = () => {
          console.log(`✅ Video metadata loaded: ${item.title}`);
          // Remove loading indicator and show video
          loadingIndicator.remove();
          mediaWrapper.appendChild(video);

          // Optimize video quality
          this.optimizeVideoQuality(video);
        };

        video.oncanplay = () => {
          console.log(`✅ Video ready to play: ${item.title}`);
        };

        // Add keyboard navigation support
        video.addEventListener("keydown", (e) => {
          switch (e.key) {
            case " ":
            case "Enter":
              e.preventDefault();
              if (video.paused) {
                video.play();
                this.trackVideoInteraction(video, "play");
              } else {
                video.pause();
                this.trackVideoInteraction(video, "pause");
              }
              break;
            case "ArrowRight":
              e.preventDefault();
              video.currentTime = Math.min(
                video.currentTime + 10,
                video.duration
              );
              this.trackVideoInteraction(video, "seek_forward");
              break;
            case "ArrowLeft":
              e.preventDefault();
              video.currentTime = Math.max(video.currentTime - 10, 0);
              this.trackVideoInteraction(video, "seek_backward");
              break;
          }
        });

        // Add focus styles for accessibility
        video.addEventListener("focus", () => {
          video.style.outline = "2px solid #007bff";
          video.style.outlineOffset = "2px";
        });

        video.addEventListener("blur", () => {
          video.style.outline = "none";
        });

        // Performance optimization: pause videos when not in viewport
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Video is visible, ensure it's ready
                if (video.readyState >= 2) {
                  console.log(`📹 Video ${item.title} is now visible`);
                }
              } else {
                // Video is not visible, pause it to save resources
                if (!video.paused) {
                  video.pause();
                  console.log(`⏸️ Video ${item.title} paused (not visible)`);
                }
              }
            });
          },
          {threshold: 0.1}
        );

        observer.observe(video);

        // Clean up observer when video is removed
        video.addEventListener("remove", () => {
          observer.disconnect();
        });

        // Don't append video yet - wait for metadata to load
        // This prevents showing broken video elements
      } else {
        // Neither image nor video found
        console.warn(`⚠️ Media item has neither image nor video:`, item);

        // Create a placeholder
        const placeholder = document.createElement("div");
        placeholder.className = "media-placeholder";
        placeholder.innerHTML = `<p>Media not available</p>`;
        placeholder.style.cssText =
          "display: flex; align-items: center; justify-content: center; height: 200px; background: #f0f0f0; color: #666;";

        mediaWrapper.appendChild(placeholder);
      }

      // Title and likes
      const content = document.createElement("div");
      content.className = "card_content";

      const h3 = document.createElement("h3");
      h3.textContent = item.title;

      const pLikes = document.createElement("p");
      pLikes.innerHTML = `${item.likes} likes <i class="fa-solid fa-heart"></i>`;

      content.appendChild(h3);
      content.appendChild(pLikes);

      card.appendChild(mediaWrapper);
      card.appendChild(content);
      container.appendChild(card);
    });
  },

  // Clean up videos to prevent memory leaks
  cleanupVideos() {
    const existingVideos = document.querySelectorAll(".media_card video");
    existingVideos.forEach((video) => {
      // Pause and reset video
      video.pause();
      video.currentTime = 0;
      video.src = "";

      // Remove all event listeners by cloning
      const newVideo = video.cloneNode(true);
      video.parentNode.replaceChild(newVideo, video);

      console.log(`🧹 Cleaned up video: ${video.id || "unknown"}`);
    });
  },

  // Enhanced video management utilities
  pauseAllVideos() {
    const videos = document.querySelectorAll(".media_card video");
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
        console.log(`⏸️ Paused video: ${video.id || "unknown"}`);
      }
    });
  },

  // Get video statistics for debugging
  getVideoStats() {
    const videos = document.querySelectorAll(".media_card video");
    const stats = {
      total: videos.length,
      playing: 0,
      paused: 0,
      loading: 0,
      error: 0
    };

    videos.forEach((video) => {
      if (video.error) {
        stats.error++;
      } else if (video.readyState < 2) {
        stats.loading++;
      } else if (video.paused) {
        stats.paused++;
      } else {
        stats.playing++;
      }
    });

    return stats;
  },

  // Optimize video quality based on device capabilities
  optimizeVideoQuality(video) {
    // Check if device supports high quality video
    const isHighEndDevice =
      navigator.hardwareConcurrency >= 4 && navigator.deviceMemory >= 4;

    if (isHighEndDevice) {
      video.preload = "auto";
      console.log(
        `🚀 High-end device detected, enabling full preload for: ${video.id}`
      );
    } else {
      video.preload = "metadata";
      console.log(
        `📱 Standard device, using metadata preload for: ${video.id}`
      );
    }

    // Set playback quality based on network conditions
    if (navigator.connection) {
      const connection = navigator.connection;
      if (connection.effectiveType === "4g" || connection.downlink > 10) {
        video.preload = "auto";
        console.log(`🌐 Fast connection detected, enabling full preload`);
      }
    }
  },

  // Handle video errors gracefully with retry mechanism
  handleVideoError(video, videoPath, maxRetries = 2) {
    let retryCount = 0;

    const retryLoad = () => {
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(
          `🔄 Retrying video load (attempt ${retryCount}): ${videoPath}`
        );

        // Reset video and try again
        video.src = "";
        setTimeout(() => {
          video.src = videoPath;
        }, 1000 * retryCount); // Exponential backoff
      } else {
        console.error(
          `❌ Video failed to load after ${maxRetries} attempts: ${videoPath}`
        );
        // Show error state
        this.showVideoError(video, videoPath);
      }
    };

    video.addEventListener("error", retryLoad, {once: true});
  },

  // Show video error state
  showVideoError(video, videoPath) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "video-error";
    errorContainer.innerHTML = `
      <div class="error-icon">⚠️</div>
      <p>Video unavailable</p>
      <small>Failed to load: ${videoPath.split("/").pop()}</small>
      <button class="retry-btn" onclick="this.parentElement.remove(); location.reload();">
        Retry
      </button>
    `;
    errorContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      background: #f8d7da;
      color: #721c24;
      font-size: 14px;
      text-align: center;
      border-radius: 8px;
    `;

    // Replace video with error container
    video.parentNode.replaceChild(errorContainer, video);
  },

  // Add video analytics tracking
  trackVideoInteraction(video, action) {
    const videoData = {
      id: video.id,
      title: video.getAttribute("aria-label"),
      action: action,
      timestamp: new Date().toISOString(),
      duration: video.duration || 0,
      currentTime: video.currentTime || 0
    };

    console.log(`📊 Video interaction tracked:`, videoData);

    // Here you could send data to analytics service
    // analytics.track('video_interaction', videoData);
  }
};
