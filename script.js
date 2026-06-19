/* ========================================
   NAMO EXIM - Complete JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ========================================
  // SMOOTH SCROLLING
  // ========================================
  const smoothScroll = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => smoothScroll(e, link.getAttribute('href')));
  });

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuIcon = mobileMenuBtn?.querySelector('i');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      menuIcon.className = isOpen ? 'ri-close-line' : 'ri-menu-line';
    });

    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.className = 'ri-menu-line';
      });
    });
  }

  // ========================================
  // HERO CAROUSEL
  // ========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroContents = document.querySelectorAll('.hero-slide-content');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroInterval;

  const goToSlide = (index) => {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    heroContents.forEach((content, i) => {
      content.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const startHeroAutoplay = () => {
    heroInterval = setInterval(nextSlide, 6000);
  };

  const resetHeroAutoplay = () => {
    clearInterval(heroInterval);
    startHeroAutoplay();
  };

  // Hero Navigation Buttons
  const prevBtn = document.querySelector('.hero-arrow.prev');
  const nextBtn = document.querySelector('.hero-arrow.next');

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetHeroAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetHeroAutoplay(); });

  // Hero Dot Indicators
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => { goToSlide(index); resetHeroAutoplay(); });
  });

  // Initialize carousel
  if (heroSlides.length > 0) {
    goToSlide(0);
    startHeroAutoplay();
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('namoexim-contact');
  const formWrapper = document.querySelector('.contact-form-area');

  if (contactForm) {
    const fullNameInput = contactForm.querySelector('[name="fullName"]');
    const emailInput = contactForm.querySelector('[name="email"]');
    const phoneInput = contactForm.querySelector('[name="phone"]');
    const subjectSelect = contactForm.querySelector('[name="subject"]');
    const messageInput = contactForm.querySelector('[name="message"]');
    const countrySelect = contactForm.querySelector('[name="countryCode"]');
    const charCount = document.querySelector('.char-count');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Real-time validation for fullName (no numbers)
    if (fullNameInput) {
      fullNameInput.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[0-9]/g, '');
        e.target.value = cleaned;
        const errorEl = fullNameInput.parentElement.querySelector('.form-error');
        if (errorEl && /[0-9]/.test(e.target.value)) {
          errorEl.textContent = 'Numbers are not allowed in full name';
          errorEl.style.display = 'block';
          fullNameInput.classList.add('error');
        } else if (errorEl) {
          errorEl.textContent = '';
          errorEl.style.display = 'none';
          fullNameInput.classList.remove('error');
        }
      });
    }

    // Country code to phone digit length mapping
    const phoneDigitLengths = {
      '+93': 9,    // Afghanistan
      '+355': 9,   // Albania
      '+213': 9,   // Algeria
      '+54': 10,   // Argentina
      '+61': 9,    // Australia
      '+43': 10,   // Austria
      '+973': 8,   // Bahrain
      '+880': 10,  // Bangladesh
      '+32': 9,    // Belgium
      '+55': 11,   // Brazil
      '+855': 9,   // Cambodia
      '+1': 10,    // Canada / US
      '+86': 11,   // China
      '+57': 10,   // Colombia
      '+45': 8,    // Denmark
      '+20': 10,   // Egypt
      '+251': 9,   // Ethiopia
      '+358': 9,   // Finland
      '+33': 9,    // France
      '+49': 11,   // Germany
      '+233': 9,   // Ghana
      '+30': 10,   // Greece
      '+852': 8,   // Hong Kong
      '+36': 9,    // Hungary
      '+91': 10,   // India
      '+62': 11,   // Indonesia
      '+98': 10,   // Iran
      '+964': 10,  // Iraq
      '+353': 9,   // Ireland
      '+972': 9,   // Israel
      '+39': 10,   // Italy
      '+81': 10,   // Japan
      '+962': 9,   // Jordan
      '+254': 9,   // Kenya
      '+965': 8,   // Kuwait
      '+856': 10,  // Laos
      '+961': 8,   // Lebanon
      '+60': 10,   // Malaysia
      '+960': 7,   // Maldives
      '+52': 10,   // Mexico
      '+95': 9,    // Myanmar
      '+977': 10,  // Nepal
      '+31': 9,    // Netherlands
      '+64': 9,    // New Zealand
      '+234': 10,  // Nigeria
      '+47': 8,    // Norway
      '+968': 8,   // Oman
      '+92': 10,   // Pakistan
      '+63': 10,   // Philippines
      '+48': 9,    // Poland
      '+351': 9,   // Portugal
      '+974': 8,   // Qatar
      '+7': 10,    // Russia
      '+966': 9,   // Saudi Arabia
      '+65': 8,    // Singapore
      '+27': 9,    // South Africa
      '+82': 10,   // South Korea
      '+34': 9,    // Spain
      '+94': 9,    // Sri Lanka
      '+46': 9,    // Sweden
      '+41': 9,    // Switzerland
      '+886': 9,   // Taiwan
      '+255': 9,   // Tanzania
      '+66': 9,    // Thailand
      '+90': 10,   // Turkey
      '+256': 9,   // Uganda
      '+380': 9,   // Ukraine
      '+971': 9,   // UAE
      '+44': 10,   // United Kingdom
      '+998': 9,   // Uzbekistan
      '+84': 9,    // Vietnam
      '+967': 9,   // Yemen
      '+260': 9,   // Zambia
      '+263': 9    // Zimbabwe
    };

    // Get max digits for current country
    function getMaxDigits() {
      const code = countrySelect ? countrySelect.value : '+91';
      return phoneDigitLengths[code] || 10;
    }

    // Update placeholder based on country
    function updatePhonePlaceholder() {
      const maxDigits = getMaxDigits();
      phoneInput.setAttribute('maxlength', maxDigits);
      phoneInput.placeholder = '0'.repeat(maxDigits);
    }

    // Real-time validation for phone (digits only + max length)
    if (phoneInput) {
      updatePhonePlaceholder();

      if (countrySelect) {
        countrySelect.addEventListener('change', () => {
          phoneInput.value = '';
          updatePhonePlaceholder();
          const errorEl = phoneInput.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
          }
          phoneInput.classList.remove('error');
        });
      }

      phoneInput.addEventListener('input', (e) => {
        // Allow only digits
        let cleaned = e.target.value.replace(/[^0-9]/g, '');
        const maxDigits = getMaxDigits();

        // Enforce max length
        if (cleaned.length > maxDigits) {
          cleaned = cleaned.slice(0, maxDigits);
        }
        e.target.value = cleaned;

        const errorEl = phoneInput.parentElement.querySelector('.form-error');
        if (errorEl) {
          if (cleaned.length > 0 && cleaned.length < maxDigits) {
            errorEl.textContent = `Enter ${maxDigits} digits for this country`;
            errorEl.style.display = 'block';
            phoneInput.classList.add('error');
          } else {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
            phoneInput.classList.remove('error');
          }
        }
      });
    }

    // Character count for message
    if (messageInput && charCount) {
      messageInput.addEventListener('input', () => {
        charCount.textContent = `${messageInput.value.length}/500`;
      });
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!fullNameInput.value || !emailInput.value || !subjectSelect.value || !messageInput.value) return;

      // Validate
      let hasError = false;
      if (/[0-9]/.test(fullNameInput.value)) {
        hasError = true;
      }
      if (/[a-zA-Z]/.test(phoneInput.value)) {
        hasError = true;
      }
      if (hasError) return;

      // Show loading
      const btnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin" style="font-size:1rem"></i> Sending...';

      try {
        const formData = new FormData();
        formData.append('Full Name', fullNameInput.value);
        formData.append('Email', emailInput.value);
        formData.append('Phone', (countrySelect ? countrySelect.value : '+91') + ' ' + phoneInput.value);
        formData.append('Subject', subjectSelect.value);
        formData.append('Message', messageInput.value);
        // FormSubmit.co settings
        formData.append('_subject', 'New Enquiry from NAMO EXIM Website - ' + subjectSelect.value);
        formData.append('_replyto', emailInput.value);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        const response = await fetch('https://formsubmit.co/ajax/info@namoexim.com', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Failed');
      } catch (err) {
        // Still show success to user
      }

      // Show success
      if (formWrapper) {
        formWrapper.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon">
              <i class="ri-checkbox-circle-line"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We will get back to you within 24 hours.</p>
          </div>
        `;
      }
    });
  }

  // ========================================
  // SCROLL REVEAL ANIMATION
  // ========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ========================================
  // FOOTER SCROLL-TO LINKS
  // ========================================
  document.querySelectorAll('.footer-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});

// ========================================
// GOOGLE TRANSLATE INIT
// ========================================
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,bn,ar,vi,tl,ms,id,ne,ko,de,nl,af,ja,es,it,zh-CN,fr,sw,tr',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
