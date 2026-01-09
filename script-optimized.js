// ============================================
// OPTIMIZED PERFORMANCE SCRIPT
// Ultra-fast, smooth, professional
// ============================================

// Portfolio data - Optimized structure
const portfolioData = {
  'chassis-gallery': {
    title: 'Chassis Gallery',
    images: [
      'shell eco marathon chassis 2025.webp',
      'shell eco marathon chassis 2023.webp',
      'Formula Student chassis.webp',
      'Global chassis.webp',
      'Ever Chassis.webp'
    ]
  },
  'formula-chassis': {
    title: 'Formula Student Chassis',
    images: [
      'Photos/Formula Student Chassis/A.webp',
      'Photos/Formula Student Chassis/B.webp',
      'Photos/Formula Student Chassis/C.webp',
      'Photos/Formula Student Chassis/D.webp',
      'Photos/Formula Student Chassis/E.webp',
      'Photos/Formula Student Chassis/R.webp'
    ]
  },
  'ever': {
    title: 'EVER Monaco',
    images: [
      'Photos/EVER/1.webp',
      'Photos/EVER/2.webp',
      'Photos/EVER/C.webp'
    ]
  },
  'shell-eco': {
    title: 'Shell Eco-Marathon Vehicle',
    images: [
      'Photos/Shell Eco-Marathon Vehicle/1.webp',
      'Photos/Shell Eco-Marathon Vehicle/2.webp',
      'Photos/Shell Eco-Marathon Vehicle/3.webp',
      'Photos/Shell Eco-Marathon Vehicle/4.webp',
      'Photos/Shell Eco-Marathon Vehicle/5.webp',
      'Photos/Shell Eco-Marathon Vehicle/6.webp',
      'Photos/Shell Eco-Marathon Vehicle/7.webp',
      'Photos/Shell Eco-Marathon Vehicle/8.webp',
      'Photos/Shell Eco-Marathon Vehicle/9.webp',
      'Photos/Shell Eco-Marathon Vehicle/A.webp'
    ]
  },
  'achievements': {
    title: 'Engineering Achievements',
    images: [
      'Photos/Achievements/A-1.webp',
      'Photos/Achievements/A.webp',
      'Photos/Achievements/B.webp',
      'Photos/Achievements/C.webp',
      'Photos/Achievements/D.webp',
      'Photos/Achievements/E.webp'
    ]
  },
  'helmet': {
    title: 'Helmet Design & FEA',
    images: [
      'Photos/Helemt/A.webp',
      'Photos/Helemt/B.webp',
      'Photos/Helemt/C.webp',
      'Photos/Helemt/D.webp',
      'Photos/Helemt/FEA-Helmet.webp'
    ]
  },
  'manufacturing': {
    title: 'Manufacturing & Prototyping',
    images: [
      'Photos/Manufacturing & Prototyping/1.webp',
      'Photos/Manufacturing & Prototyping/2.webp',
      'Photos/Manufacturing & Prototyping/3.webp',
      'Photos/Manufacturing & Prototyping/4.webp',
      'Photos/Manufacturing & Prototyping/5.webp'
    ]
  },
  'sheet-metal': {
    title: 'Sheet Metal Analysis',
    images: [
      'Photos/Sheet Metal Analysis/1.jpeg',
      'Photos/Sheet Metal Analysis/2.jpeg',
      'Photos/Sheet Metal Analysis/3.jpeg',
      'Photos/Sheet Metal Analysis/4.jpeg',
      'Photos/Sheet Metal Analysis/Punch.jpeg'
    ]
  },
  'seating-chairs': {
    title: 'Sheet Metal - Seating Chairs',
    images: [
      'Photos/Sheet Metal -Seating chairs/1.png',
      'Photos/Sheet Metal -Seating chairs/2.jpg',
      'Photos/Sheet Metal -Seating chairs/3.jpg',
      'Photos/Sheet Metal -Seating chairs/5.png',
      'Photos/Sheet Metal -Seating chairs/6.png',
      'Photos/Sheet Metal -Seating chairs/A.jpg',
      'Photos/Sheet Metal -Seating chairs/B.png',
      'Photos/Sheet Metal -Seating chairs/C.png',
      'Photos/Sheet Metal -Seating chairs/D.png',
      'Photos/Sheet Metal -Seating chairs/E.png',
      'Photos/Sheet Metal -Seating chairs/G.jpg',
      'Photos/Sheet Metal -Seating chairs/H.png',
      'Photos/Sheet Metal -Seating chairs/W-1.png',
      'Photos/Sheet Metal -Seating chairs/W-2.jpg',
      'Photos/Sheet Metal -Seating chairs/W-4.jpg',
      'Photos/Sheet Metal -Seating chairs/W.jpg'
    ]
  },
  'solidworks-champion': {
    title: 'SolidWorks Champion',
    images: [
      'Photos/Solidwork Champion/1-optimized.jpg',
      'Photos/Solidwork Champion/2-optimized.jpg',
      'Photos/Solidwork Champion/3-optimized.jpg'
    ]
  },
    'injection-molding': {
    title: 'Injection Molding Design',
    images: [
      'Photos/Injection Molding Design/1.jpg',
      'Photos/Injection Molding Design/2.jpg',
      'Photos/Injection Molding Design/3.jpg',
      'Photos/Injection Molding Design/4.jpg',
      'Photos/Injection Molding Design/5.jpg',
      'Photos/Injection Molding Design/6.jpg',
      'Photos/Injection Molding Design/7.jpg',
      'Photos/Injection Molding Design/8.jpg',
      'Photos/Injection Molding Design/9.png',
      'Photos/Injection Molding Design/10.png'
    ]
  },
  'wall-mounted-motor': {
    title: 'Wall Mounted Motor Holder',
    images: [
      'Photos/Wall Mounted Motor Holder/1.png',
      'Photos/Wall Mounted Motor Holder/2.png',
      'Photos/Wall Mounted Motor Holder/3.png',
      'Photos/Wall Mounted Motor Holder/4.png',
      'Photos/Wall Mounted Motor Holder/5.png',
      'Photos/Wall Mounted Motor Holder/6.png',
      'Photos/Wall Mounted Motor Holder/7.png',
      'Photos/Wall Mounted Motor Holder/8.png',
      'Photos/Wall Mounted Motor Holder/9.png'
    ]
  }
};

// Chassis data
const chassisData = [
  { src: 'shell eco marathon chassis 2023.webp', title: 'Shell Eco-Marathon Chassis 2023' },
  { src: 'shell eco marathon chassis 2025.webp', title: 'Shell Eco-Marathon Chassis 2025' },
  { src: 'Global chassis.webp', title: 'Global Chassis Design' },
  { src: 'Ever Chassis.webp', title: 'EVER Chassis' },
  { src: 'Formula Student chassis.webp', title: 'Formula Student Chassis' }
];

// Gallery state
let currentGallery = [];
let currentImageIndex = 0;

// Cache DOM elements
const DOM = {};

// Performance optimization: Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Performance optimization: Throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Idle/RAF helpers for non-critical work scheduling (no visual change)
const idle = (cb, timeout = 2000) => (window.requestIdleCallback ? requestIdleCallback(cb, { timeout }) : setTimeout(cb, 0));
const raf = (cb) => (window.requestAnimationFrame ? requestAnimationFrame(cb) : setTimeout(cb, 16));

// Cache DOM elements on init
function cacheDOMElements() {
  DOM.galleryModal = document.getElementById('galleryModal');
  DOM.galleryTitle = document.getElementById('galleryTitle');
  DOM.galleryMainImage = document.getElementById('galleryMainImage');
  DOM.galleryCounter = document.getElementById('galleryCounter');
  DOM.galleryThumbnails = document.getElementById('galleryThumbnails');
  DOM.galleryClose = document.getElementById('galleryClose');
  DOM.galleryNext = document.getElementById('galleryNext');
  DOM.galleryPrev = document.getElementById('galleryPrev');
  DOM.chassisGrid = document.getElementById('chassisGrid');
  DOM.navbar = document.getElementById('navbar');
  DOM.heroTitle = document.getElementById('hero-title');
  DOM.heroName = document.getElementById('hero-name');
}

// ============================================
// GALLERY FUNCTIONS - Optimized
// ============================================

function openGallery(projectKey) {
  // FIXED: Add comprehensive validation
  if (!projectKey || typeof projectKey !== 'string') {
    console.error('Invalid project key:', projectKey);
    return;
  }
  
  const project = portfolioData[projectKey];
  if (!project) {
    console.error('Project not found:', projectKey);
    return;
  }
  
  if (!project.images || !Array.isArray(project.images) || project.images.length === 0) {
    console.error('Project has no images:', projectKey);
    return;
  }

  // Validate DOM elements exist
  if (!DOM.galleryModal || !DOM.galleryTitle) {
    console.error('Gallery modal elements not found');
    return;
  }

  currentGallery = project.images;
  currentImageIndex = 0;

  DOM.galleryTitle.textContent = project.title;
  DOM.galleryModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  updateGalleryImage();
  createThumbnails();
}

function updateGalleryImage() {
  const imgEl = DOM.galleryMainImage;
  if (!imgEl) return;

  const nextSrc = currentGallery[currentImageIndex];
  imgEl.setAttribute('fetchpriority', 'high');
  imgEl.decoding = 'async';

  // If already showing the same source, just update counter and thumbnails
  const currentAttrSrc = imgEl.getAttribute('src') || '';
  if (currentAttrSrc === nextSrc) {
    DOM.galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
  } else {
    // Pre-decode next image to avoid flicker and ensure instant swap
    const preImg = new Image();
    preImg.decoding = 'async';
    preImg.src = nextSrc;
    const done = () => {
      imgEl.setAttribute('src', nextSrc);
      DOM.galleryCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    };
    if (preImg.decode) {
      preImg.decode().then(done).catch(() => done());
    } else {
      done();
    }
  }
  
  // Update active thumbnail - optimized
  const thumbnails = DOM.galleryThumbnails.querySelectorAll('.gallery-thumbnail');
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentImageIndex);
  });
}

function createThumbnails() {
  // Use DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  
  currentGallery.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Thumbnail ${index + 1}`;
    img.className = 'gallery-thumbnail';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.onclick = () => goToImage(index);
    fragment.appendChild(img);
  });
  
  DOM.galleryThumbnails.innerHTML = '';
  DOM.galleryThumbnails.appendChild(fragment);
}

function goToImage(index) {
  currentImageIndex = index;
  updateGalleryImage();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
  updateGalleryImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
  updateGalleryImage();
}

function closeGallery() {
  DOM.galleryModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// PORTFOLIO HANDLERS - Optimized
// ============================================

function initPortfolioHandlers() {
  // Event delegation for better performance - FIXED: Prevent event bubbling issues
  document.addEventListener('click', (e) => {
    const project = e.target.closest('.portfolio-project');
    if (project && !DOM.galleryModal.classList.contains('active')) {
      const projectKey = project.getAttribute('data-project');
      if (projectKey && portfolioData[projectKey]) {
        e.preventDefault();
        e.stopPropagation();
        openGallery(projectKey);
      }
    }
  }, false);

  // Gallery controls - FIXED: Add null checks
  if (DOM.galleryClose) {
    DOM.galleryClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeGallery();
    });
  }
  
  if (DOM.galleryNext) {
    DOM.galleryNext.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextImage();
    });
  }
  
  if (DOM.galleryPrev) {
    DOM.galleryPrev.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevImage();
    });
  }

  // Close on backdrop click - FIXED: Better modal detection
  if (DOM.galleryModal) {
    DOM.galleryModal.addEventListener('click', (e) => {
      if (e.target === DOM.galleryModal) {
        e.preventDefault();
        e.stopPropagation();
        closeGallery();
      }
    });
  }

  // Keyboard navigation - optimized
  document.addEventListener('keydown', (e) => {
    if (!DOM.galleryModal || !DOM.galleryModal.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape': 
        e.preventDefault();
        closeGallery(); 
        break;
      case 'ArrowLeft': 
        e.preventDefault();
        prevImage(); 
        break;
      case 'ArrowRight': 
        e.preventDefault();
        nextImage(); 
        break;
    }
  });

  // Prefetch first few images on hover/touch to accelerate lightbox opening
  const prefetchHandler = (ev) => {
    const el = ev.target && ev.target.closest ? ev.target.closest('.portfolio-project') : null;
    if (!el) return;
    const key = el.getAttribute('data-project');
    if (!key || !portfolioData[key]) return;
    
    idle(() => {
      const project = portfolioData[key];
      if (!project || !project.images || project.images.length === 0) return;
      const count = Math.min(project.images.length, 4);
      for (let i = 0; i < count; i++) {
        const src = project.images[i];
        if (src) {
          const img = new Image();
          img.decoding = 'async';
          img.loading = 'eager';
          img.src = src;
        }
      }
    }, 800);
  };
  document.addEventListener('mouseenter', prefetchHandler, { capture: true, passive: true });
  document.addEventListener('touchstart', prefetchHandler, { capture: true, passive: true });

  // Ensure gallery state is reset on pagehide to release scroll lock
  window.addEventListener('pagehide', () => { try { closeGallery(); } catch(e){} }, { once: true });
}

// ============================================
// TEXT ANIMATIONS - Optimized
// ============================================

function animateHeroTitle() {
  if (!DOM.heroTitle) return;
  
  const text = 'Mechanical Design Engineer';
  DOM.heroTitle.textContent = '';
  DOM.heroTitle.style.borderRight = '2px solid var(--accent-primary)';
  DOM.heroTitle.style.animation = 'blink-cursor 0.8s infinite';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      DOM.heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 60);
    } else {
      setTimeout(() => {
        DOM.heroTitle.style.borderRight = 'none';
        DOM.heroTitle.style.animation = 'none';
        DOM.heroTitle.style.textShadow = '0 0 8px rgba(14, 165, 233, 0.4), 0 0 16px rgba(14, 165, 233, 0.2)';
        animateNameWithEngineering();
      }, 300);
    }
  };
  
  setTimeout(typeWriter, 500);
}

function animateNameWithEngineering() {
  if (DOM.heroName) {
    DOM.heroName.classList.add('hero-name-animate');
  }
}

// ============================================
// CHASSIS GALLERY - Optimized with DocumentFragment
// ============================================

function populateChassisGallery() {
  if (!DOM.chassisGrid) return;
  
  const fragment = document.createDocumentFragment();
  
  chassisData.forEach((chassis, index) => {
    const card = document.createElement('div');
    card.className = 'chassis-card animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const img = document.createElement('img');
    img.src = chassis.src;
    img.alt = chassis.title;
    img.className = 'chassis-image';
    img.decoding = 'async';
    if (index === 0) { img.loading = 'eager'; img.fetchPriority = 'high'; } else { img.loading = 'lazy'; img.fetchPriority = 'low'; }
    
    const info = document.createElement('div');
    info.className = 'chassis-info';
    
    const title = document.createElement('h3');
    title.className = 'chassis-title';
    title.textContent = chassis.title;
    
    info.appendChild(title);
    card.appendChild(img);
    card.appendChild(info);
    fragment.appendChild(card);
  });
  
  DOM.chassisGrid.innerHTML = '';
  DOM.chassisGrid.appendChild(fragment);
}

// ============================================
// SCROLL ANIMATIONS - Optimized with IntersectionObserver
// ============================================

function initScrollAnimations() {
  const targets = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    targets.forEach(el => observer.observe(el));
  } else {
    targets.forEach(el => el.classList.add('visible'));
  }
}

// ============================================
// NAVBAR EFFECTS - Optimized with throttle
// ============================================

function initNavbarEffects() {
  if (!DOM.navbar) return;
  
  let lastScrollY = window.scrollY;
  
  const onScroll = throttle(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      DOM.navbar.classList.add('scrolled');
    } else {
      DOM.navbar.classList.remove('scrolled');
    }

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      DOM.navbar.style.transform = 'translateY(-100%)';
    } else {
      DOM.navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================
// SMOOTH SCROLLING - Optimized
// ============================================

function initSmoothScrolling() {
  // If advanced smooth scrolling is available, avoid double-handling
  if (window.performanceUtils && typeof window.performanceUtils.smoothScrollTo === 'function') {
    return;
  }
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
}

// ============================================
// VIDEO CONTROLS - Optimized
// ============================================

function initVideoControls() {
  const videoCards = document.querySelectorAll('.video-card');
  
  videoCards.forEach((card, index) => {
    const video = card.querySelector('.video-player');
    const playButton = card.querySelector('.play-button');

    if (!video) return;

    // Set attributes
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    if (video.preload !== 'auto') { video.preload = 'metadata'; } // keep 'auto' if already set for instant start
    
    // Auto-play first video
    if (index === 0) {
      video.play().catch(() => {});
      card.classList.add('auto-playing');
    }
    
    // Play button handler
    if (playButton) {
      playButton.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          card.classList.add('auto-playing');
        } else {
          video.pause();
          card.classList.remove('auto-playing');
        }
      });
    }
    
    // Intersection observer for auto-play
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            video.play().catch(() => {});
            card.classList.add('auto-playing');
          } else {
            video.pause();
            card.classList.remove('auto-playing');
          }
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
      
      observer.observe(card);
    }
  });

  // Pause/resume videos when tab visibility changes to keep UX smooth and save CPU
  document.addEventListener('visibilitychange', () => {
    const vids = document.querySelectorAll('.video-card .video-player');
    if (document.hidden) {
      vids.forEach(v => { try { v.pause(); } catch(e){} });
    } else {
      vids.forEach(v => {
        const c = v.closest('.video-card');
        if (c && c.classList.contains('auto-playing')) {
          v.play().catch(() => {});
        }
      });
    }
  }, { passive: true });
}

// ============================================
// METRICS ROW ARRANGEMENT - Optimized
// ============================================

function arrangeHeroMetricsRow() {
  const visual = document.querySelector('.hero-visual');
  if (!visual) return;

  let wrapper = visual.querySelector('.metrics-row');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'metrics-row';
    visual.prepend(wrapper);
  }

  const boxes = Array.from(visual.querySelectorAll('.floating-element'));
  const badge = document.querySelector('.certification-badge');

  const getRank = (el) => {
    const t = (el.textContent || '').toLowerCase();
    if (t.includes('certified') && t.includes('expert')) return 3;
    if (t.includes('cswe') && t.includes('certified')) return 0;
    if (t.includes('years') && t.includes('experience')) return 1;
    if (t.includes('projects') && t.includes('completed')) return 2;
    return 4;
  };

  boxes.sort((a, b) => getRank(a) - getRank(b));
  boxes.forEach(el => { if (el) wrapper.appendChild(el); });
  if (badge) wrapper.appendChild(badge);

  const titleEl = document.querySelector('.hero-title .line2') ||
                  document.querySelector('.hero-title .line1') ||
                  document.querySelector('.hero-title');
  
  if (titleEl) {
    const visRect = visual.getBoundingClientRect();
    const titleRect = titleEl.getBoundingClientRect();
    const topOffset = Math.max(0, Math.round(titleRect.top - visRect.top));
    wrapper.style.top = `${topOffset}px`;
  } else {
    wrapper.style.top = '0px';
  }
  
  wrapper.style.position = 'absolute';
  wrapper.style.right = '0px';
}

// ============================================
// LAZY LOADING - Optimized
// ============================================

function setLazyLoadingForImages() {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    // Skip critical images to ensure instant display (hero, certification, chassis, metric boxes)
    if (
      img.closest('.hero') ||
      img.closest('.certification-badge') ||
      img.closest('.certification-cover') ||
      img.classList.contains('chassis-image') ||
      img.closest('.floating-element')
    ) {
      try { img.setAttribute('fetchpriority', 'high'); } catch(e){}
      try { img.setAttribute('decoding', 'async'); } catch(e){}
      return; // do not set lazy
    }
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
}

// ============================================
// INITIALIZATION - Optimized
// ============================================

function init() {
  // Cache DOM elements first
  cacheDOMElements();
  
  // Apply lazy loading
  setLazyLoadingForImages();

  // Initialize all features
  animateHeroTitle();
  populateChassisGallery();
  initScrollAnimations();
  initNavbarEffects();
  // Defer non-critical initializations to idle time (no UX change)
  idle(initSmoothScrolling, 800);
  idle(initVideoControls, 800);
  initPortfolioHandlers();

  // Arrange metrics row
  setTimeout(arrangeHeroMetricsRow, 50);
  window.addEventListener('resize', debounce(arrangeHeroMetricsRow, 250));
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// CONTENT PROTECTION - Optimized
// ============================================




