/**
 * ✨ Optimized Video Handler - Clean & Efficient
 * Handles all video functionality without duplication
 * Fixes page refresh issues and ensures videos load properly
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    observerOptions: {
      root: null,
      rootMargin: '50px',
      threshold: 0.25
    },
    autoPlayDelay: 300
  };

  // State management
  const state = {
    initialized: false,
    videoObservers: new Map(),
    activeVideo: null
  };

  /**
   * Initialize video controls for all video cards
   */
  function initVideoControls() {
    if (state.initialized) return;
    state.initialized = true;

    const videoCards = document.querySelectorAll('.video-card');
    if (videoCards.length === 0) return;

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const video = card.querySelector('.video-player');
        if (!video) return;

        if (entry.isIntersecting) {
          // Video is in view - attempt to play
          attemptVideoPlay(video, card);
        } else {
          // Video is out of view - pause it
          video.pause();
          card.classList.remove('auto-playing');
        }
      });
    }, CONFIG.observerOptions);

    // Setup each video card
    videoCards.forEach((card, index) => {
      const video = card.querySelector('.video-player');
      if (!video) return;

      // Set video attributes for better compatibility
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('preload', 'metadata');

      // Add click handler for manual play/pause
      const playButton = card.querySelector('.play-button');
      if (playButton) {
        playButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleVideoPlay(video, card);
        });
      }

      // Handle video end event
      video.addEventListener('ended', () => {
        if (!card.classList.contains('manual-control')) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Auto-play prevented by browser
          });
        }
      }, { once: false });

      // Handle video errors
      video.addEventListener('error', (e) => {
        console.warn('Video error:', e);
        card.classList.add('video-error');
      });

      // Observe this video card
      observer.observe(card);
      state.videoObservers.set(card, observer);
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden - pause all videos
        videoCards.forEach(card => {
          const video = card.querySelector('.video-player');
          if (video) video.pause();
        });
      } else {
        // Page is visible again - resume if needed
        videoCards.forEach(card => {
          const video = card.querySelector('.video-player');
          if (video && card.classList.contains('auto-playing')) {
            video.play().catch(() => {});
          }
        });
      }
    });
  }

  /**
   * Attempt to play a video
   */
  function attemptVideoPlay(video, card) {
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            card.classList.add('auto-playing');
            updateIndicator(card, 'PLAYING');
          })
          .catch((error) => {
            console.log('Auto-play prevented:', error);
            card.classList.remove('auto-playing');
            updateIndicator(card, 'AUTO-PLAY');
          });
      }
    }
  }

  /**
   * Toggle video play/pause
   */
  function toggleVideoPlay(video, card) {
    if (video.paused) {
      // Pause all other videos
      document.querySelectorAll('.video-player').forEach(v => {
        if (v !== video) {
          v.pause();
          v.closest('.video-card')?.classList.remove('auto-playing', 'manual-control');
        }
      });

      // Play this video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            card.classList.add('auto-playing', 'manual-control');
            updateIndicator(card, 'PLAYING');
          })
          .catch((error) => {
            console.log('Play prevented:', error);
          });
      }
    } else {
      // Pause this video
      video.pause();
      card.classList.remove('auto-playing', 'manual-control');
      updateIndicator(card, 'AUTO-PLAY');
    }
  }

  /**
   * Update the auto-play indicator text
   */
  function updateIndicator(card, text) {
    const indicator = card.querySelector('.auto-play-indicator');
    if (indicator) {
      indicator.textContent = text;
    }
  }

  /**
   * Handle page refresh - restore video state
   */
  function handlePageRefresh() {
    // Reset all videos on page refresh
    document.querySelectorAll('.video-player').forEach(video => {
      video.currentTime = 0;
      video.pause();
    });

    document.querySelectorAll('.video-card').forEach(card => {
      card.classList.remove('auto-playing', 'manual-control');
      updateIndicator(card, 'AUTO-PLAY');
    });

    // Re-initialize after a short delay
    setTimeout(() => {
      state.initialized = false;
      initVideoControls();
    }, 100);
  }

  /**
   * Initialize when DOM is ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initVideoControls, CONFIG.autoPlayDelay);
      }, { once: true });
    } else {
      setTimeout(initVideoControls, CONFIG.autoPlayDelay);
    }

    // Handle page refresh
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        handlePageRefresh();
      }
    }, { passive: true });

    // Handle beforeunload to clean up
    window.addEventListener('beforeunload', () => {
      document.querySelectorAll('.video-player').forEach(video => {
        video.pause();
      });
    }, { passive: true });
  }

  // Start initialization
  init();

  // Expose for debugging
  window.VideoHandler = {
    reinit: () => {
      state.initialized = false;
      initVideoControls();
    },
    pauseAll: () => {
      document.querySelectorAll('.video-player').forEach(v => v.pause());
    },
    playAll: () => {
      document.querySelectorAll('.video-player').forEach(v => v.play().catch(() => {}));
    }
  };
})();
