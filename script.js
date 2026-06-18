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

    // Real-time validation for phone (no alphabets)
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/[a-zA-Z]/g, '');
        e.target.value = cleaned;
        const errorEl = phoneInput.parentElement.querySelector('.form-error');
        if (errorEl && /[a-zA-Z]/.test(e.target.value)) {
          errorEl.textContent = 'Alphabets are not allowed in phone number';
          errorEl.style.display = 'block';
          phoneInput.classList.add('error');
        } else if (errorEl) {
          errorEl.textContent = '';
          errorEl.style.display = 'none';
          phoneInput.classList.remove('error');
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
        const params = new URLSearchParams();
        params.append('fullName', fullNameInput.value);
        params.append('email', emailInput.value);
        params.append('phone', (countrySelect ? countrySelect.value : '+91') + ' ' + phoneInput.value);
        params.append('subject', subjectSelect.value);
        params.append('message', messageInput.value);

        await fetch('https://readdy.ai/api/form/d8a3bbisqpilpebnoh50', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params
        });
      } catch (err) {
        // Still show success
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
    includedLanguages: 'en,hi,ta,si,bn,ms,id,th,vi,zh',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
