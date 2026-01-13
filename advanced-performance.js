/* ============================================
   ADVANCED PERFORMANCE OPTIMIZATIONS
   Ultra-smooth, GPU-accelerated, 60fps+
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // 1. REQUEST ANIMATION FRAME OPTIMIZATION
  // ============================================
  
  let rafId = null;
  let rafCallbacks = [];
  
  function scheduleRAF(callback) {
    rafCallbacks.push(callback);
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        const callbacks = rafCallbacks.slice();
        rafCallbacks = [];
        rafId = null;
        callbacks.forEach(cb => cb());
      });
    }
  }

  // ============================================
  // 2. SMOOTH SCROLL WITH RAF
  // ============================================
  
  function smoothScrollTo(target, duration = 800) {
    const start = window.pageYOffset;
    const targetPos = target.getBoundingClientRect().top + start;
    const distance = targetPos - start;
    const startTime = performance.now();

    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out-cubic)
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Override smooth scroll (ONLY for normal in-page anchors).
  // Do NOT interfere with navbar navigation; navbar has its own dedicated handler.
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    // Ignore navbar links completely (fixes first-tap wrong target on mobile)
    const nav = document.querySelector('.nav');
    if (nav && nav.contains(anchor)) return;

    // Only handle if the target exists
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    smoothScrollTo(target);
  }, { capture: true });

  // ============================================
  // 3. IMAGE PRELOADING WITH PRIORITY
  // ============================================
  
  function preloadCriticalImages() {
    const criticalImages = [
      'Certificat.png',
      'shell eco marathon chassis 2023.webp',
      'shell eco marathon chassis 2025.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // ============================================
  // 4. INTERSECTION OBSERVER POOL
  // ============================================
  
  const observerPool = new Map();
  
  function getObserver(options) {
    const key = JSON.stringify(options);
    if (!observerPool.has(key)) {
      observerPool.set(key, new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const callbacks = entry.target._ioCallbacks || [];
          callbacks.forEach(cb => cb(entry));
        });
      }, options));
    }
    return observerPool.get(key);
  }

  function observeElement(element, callback, options = {}) {
    if (!element._ioCallbacks) element._ioCallbacks = [];
    element._ioCallbacks.push(callback);
    getObserver(options).observe(element);
  }

  // ============================================
  // 5. GPU ACCELERATION HINTS
  // ============================================
  
  function enableGPUAcceleration() {
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .floating-element, .hero-name, .certification-badge, .nav'
    );

    animatedElements.forEach(el => {
      el.style.transform = el.style.transform || 'translateZ(0)';
      el.style.backfaceVisibility = 'hidden';
      el.style.perspective = '1000px';
    });
  }

  // ============================================
  // 6. PASSIVE EVENT LISTENERS
  // ============================================
  
  function optimizeEventListeners() {
    try {
      if (EventTarget.prototype.__passivePatched) return;
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        try {
          // Only default passive for scroll and wheel to avoid breaking touch preventDefault
          if (type === 'scroll' || type === 'wheel') {
            if (options === undefined) {
              options = { passive: true };
            } else if (typeof options === 'boolean') {
              options = { capture: !!options, passive: true };
            } else if (options && typeof options === 'object' && options.passive === undefined) {
              options = Object.assign({}, options, { passive: true });
            }
          }
        } catch (e) {}
        return originalAddEventListener.call(this, type, listener, options);
      };
      Object.defineProperty(EventTarget.prototype, '__passivePatched', { value: true, configurable: true });
    } catch (e) {}
  }

  // ============================================
  // 7. REDUCE LAYOUT THRASHING
  // ============================================
  
  let readQueue = [];
  let writeQueue = [];
  let scheduled = false;

  function scheduleLayout() {
    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      // Read phase
      readQueue.forEach(fn => fn());
      readQueue = [];

      // Write phase
      writeQueue.forEach(fn => fn());
      writeQueue = [];

      scheduled = false;
    });
  }

  window.scheduleRead = function(fn) {
    readQueue.push(fn);
    scheduleLayout();
  };

  window.scheduleWrite = function(fn) {
    writeQueue.push(fn);
    scheduleLayout();
  };

  // ============================================
  // 8. MEMORY MANAGEMENT
  // ============================================
  
  function cleanupUnusedResources() {
    // Remove offscreen images from memory
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
      observeElement(img, (entry) => {
        if (!entry.isIntersecting && img.complete) {
          // Store src for later
          if (!img.dataset.originalSrc) {
            img.dataset.originalSrc = img.src;
          }
          // Do not clear src; just deprioritize to avoid flicker/broken icons
          const rect = img.getBoundingClientRect();
          if (Math.abs(rect.top) > window.innerHeight * 3) {
            try { img.setAttribute('loading', 'lazy'); } catch(e){}
            try { img.setAttribute('decoding', 'async'); } catch(e){}
            try { img.setAttribute('fetchpriority', 'low'); } catch(e){}
          }
        } else if (entry.isIntersecting && !img.src && img.dataset.originalSrc) {
          // Restore src when back in viewport
          img.src = img.dataset.originalSrc;
        }
      }, { rootMargin: '300% 0px' });
    });
  }

  // ============================================
  // 9. FONT LOADING OPTIMIZATION
  // ============================================
  
  function optimizeFontLoading() {
    if ('fonts' in document) {
      // Preload critical fonts
      const criticalFonts = [
        'Space Grotesk',
        'Inter',
        'Orbitron'
      ];

      criticalFonts.forEach(font => {
        document.fonts.load(`1em ${font}`).catch(() => {});
      });

      // Show content when fonts are ready
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }

  // ============================================
  // 10. REDUCE PAINT COMPLEXITY
  // ============================================
  
  function optimizePaintLayers() {
    // Promote frequently animated elements to their own layer
    const promotedElements = document.querySelectorAll(
      '.hero-name-animate, .certification-badge, .floating-element, .gallery-modal'
    );

    promotedElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
      
      // Remove will-change after animation completes
      el.addEventListener('animationend', () => {
        el.style.willChange = 'auto';
      }, { once: true });
    });
  }

  // ============================================
  // 11. DEBOUNCED RESIZE HANDLER
  // ============================================
  
  let resizeTimer;
  let resizeCallbacks = [];

  function onResize(callback) {
    resizeCallbacks.push(callback);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCallbacks.forEach(cb => cb());
    }, 150);
  }, { passive: true });

  // ============================================
  // 12. PREFETCH NEXT IMAGES
  // ============================================
  
  function prefetchNextImages() {
    const portfolioProjects = document.querySelectorAll('.portfolio-project');
    
    portfolioProjects.forEach(project => {
      project.addEventListener('mouseenter', () => {
        const projectKey = project.getAttribute('data-project');
        const projectData = window.portfolioData?.[projectKey];
        
        if (projectData && projectData.images) {
          // Prefetch first 3 images
          projectData.images.slice(0, 3).forEach(src => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = src;
            document.head.appendChild(link);
          });
        }
      }, { once: true, passive: true });
    });
  }

  // ============================================
  // 13. VIRTUAL SCROLLING FOR GALLERY
  // ============================================
  
  function optimizeGalleryThumbnails() {
    const galleryModal = document.getElementById('galleryModal');
    if (!galleryModal) return;

    const observer = new MutationObserver(() => {
      const thumbnails = document.querySelectorAll('.gallery-thumbnail');
      if (thumbnails.length > 20) {
        // Only render visible thumbnails
        thumbnails.forEach((thumb, index) => {
          observeElement(thumb, (entry) => {
            if (entry.isIntersecting) {
              if (!thumb.src && thumb.dataset.src) {
                thumb.src = thumb.dataset.src;
              }
            }
          }, { rootMargin: '50px' });
        });
      }
    });

    observer.observe(galleryModal, { childList: true, subtree: true });
  }

  // ============================================
  // 14. REDUCE JAVASCRIPT EXECUTION TIME
  // ============================================
  
  function deferNonCriticalJS() {
    // Defer heavy operations until idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        cleanupUnusedResources();
        prefetchNextImages();
        optimizeGalleryThumbnails();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        cleanupUnusedResources();
        prefetchNextImages();
        optimizeGalleryThumbnails();
      }, 2000);
    }
  }

  // ============================================
  // 15. PERFORMANCE MONITORING
  // ============================================
  
  function monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor Long Tasks
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              // Long task detected - could log or optimize
              scheduleRAF(() => {
                // Break up long tasks
              });
            }
          });
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API not supported
      }

      // Monitor Layout Shifts
      try {
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.hadRecentInput) return;
            // Could log CLS for optimization
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Layout shift API not supported
      }
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    // Critical optimizations (run immediately)
    optimizeEventListeners();
    enableGPUAcceleration();
    preloadCriticalImages();
    optimizeFontLoading();
    optimizePaintLayers();

    // Deferred optimizations (run when idle)
    deferNonCriticalJS();
    
    // Monitoring (development only)
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      monitorPerformance();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  // Expose utilities globally
  window.performanceUtils = {
    scheduleRAF,
    smoothScrollTo,
    observeElement,
    onResize,
    scheduleRead: window.scheduleRead,
    scheduleWrite: window.scheduleWrite
  };

})();
