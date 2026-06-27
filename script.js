/* =============================================
   AAHAAR VIDHI – CULINARY WORKSHOP
   Complete Interactive JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================
  // 1. PAGE LOADER
  // ==========================
  const loader = document.getElementById('pageLoader');
  const hideLoader = () => loader && loader.classList.add('hidden');
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
  }
  setTimeout(hideLoader, 3000); // Hard fallback

  // ==========================
  // 2. HEADER SCROLL EFFECT
  // ==========================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================
  // 3. HAMBURGER / MOBILE NAV
  // ==========================
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('mainNav');

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mainNav.classList.toggle('open');
  });

  // Close nav when any link is clicked
  mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (mainNav?.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
    }
  });

  // ==========================
  // 4. DAY-WISE TABS
  // ==========================
  const dayTabs  = document.querySelectorAll('.day-tab');
  const dayPanes = document.querySelectorAll('.day-pane');

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.day;

      dayTabs.forEach(t => t.classList.remove('active'));
      dayPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  // ==========================
  // 5. FAQ ACCORDION
  // ==========================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherAnswer = other.querySelector('.faq-a');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        const otherBtn = other.querySelector('.faq-q');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================
  // 6. MOBILE STICKY CTA VISIBILITY
  // ==========================
  const mobCta        = document.getElementById('mobCta');
  const heroSection   = document.querySelector('.hero');
  const registerSec   = document.getElementById('register');

  const updateMobCta = () => {
    if (!mobCta) return;
    const scrollY      = window.scrollY;
    const heroBottom   = (heroSection?.offsetTop + heroSection?.offsetHeight) || 500;
    const regTop       = registerSec ? registerSec.offsetTop - window.innerHeight + 120 : 999999;

    if (scrollY > heroBottom - 80 && scrollY < regTop) {
      mobCta.style.transform = 'translateY(0)';
      mobCta.style.opacity   = '1';
    } else {
      mobCta.style.transform = 'translateY(100%)';
      mobCta.style.opacity   = '0';
    }
  };

  // Initial setup: hide below screen
  if (mobCta) {
    mobCta.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    mobCta.style.transform  = 'translateY(100%)';
    mobCta.style.opacity    = '0';
  }

  window.addEventListener('scroll', updateMobCta, { passive: true });
  updateMobCta();

  // ==========================
  // 7. REGISTRATION FORM
  // ==========================
  const regForm      = document.getElementById('regForm');
  const fnameInput   = document.getElementById('fname');
  const fphoneInput  = document.getElementById('fphone');
  const fslotSelect  = document.getElementById('fslot');
  const fnameErr     = document.getElementById('fnameErr');
  const fphoneErr    = document.getElementById('fphoneErr');
  const fslotErr     = document.getElementById('fslotErr');
  const successOverlay = document.getElementById('successOverlay');
  const closeSuccess   = document.getElementById('closeSuccess');
  const successMsg     = document.getElementById('successMsg');

  // Real-time validation clearing
  fnameInput?.addEventListener('input', () => clearErr(fnameInput, fnameErr));
  fphoneInput?.addEventListener('input', () => clearErr(fphoneInput, fphoneErr));
  fslotSelect?.addEventListener('change', () => clearErr(fslotSelect, fslotErr));

  function clearErr(input, errEl) {
    input.classList.remove('err');
    errEl.classList.remove('show');
  }

  function showErr(input, errEl) {
    input.classList.add('err');
    errEl.classList.add('show');
  }

  regForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validate name
    if (!fnameInput.value.trim()) {
      showErr(fnameInput, fnameErr);
      valid = false;
    } else {
      clearErr(fnameInput, fnameErr);
    }

    // Validate phone (Indian 10-digit starting 6-9)
    const phone = fphoneInput.value.replace(/[\s\-\+]/g, '');
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showErr(fphoneInput, fphoneErr);
      valid = false;
    } else {
      clearErr(fphoneInput, fphoneErr);
    }

    // Validate slot
    if (!fslotSelect.value) {
      showErr(fslotSelect, fslotErr);
      valid = false;
    } else {
      clearErr(fslotSelect, fslotErr);
    }

    if (!valid) return;

    // Show success
    const name = fnameInput.value.trim();
    const slotText = fslotSelect.options[fslotSelect.selectedIndex]?.text || '';
    if (successMsg) {
      successMsg.innerHTML = `Namaste, <strong>${name}</strong>! Your registration for the <strong>Aahaar Vidhi Culinary Workshop</strong> has been received.`;
    }
    if (successOverlay) {
      successOverlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
    regForm.reset();
  });

  // Close success modal
  closeSuccess?.addEventListener('click', () => {
    successOverlay?.classList.remove('visible');
    document.body.style.overflow = '';
  });

  // Also close on overlay background click
  successOverlay?.addEventListener('click', (e) => {
    if (e.target === successOverlay) {
      successOverlay.classList.remove('visible');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successOverlay?.classList.contains('visible')) {
      successOverlay.classList.remove('visible');
      document.body.style.overflow = '';
    }
  });

  // ==========================
  // 8. SMOOTH ANCHOR SCROLLING
  // ==========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = header?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================
  // 9. ACTIVE NAV HIGHLIGHT
  // ==========================
  const sections = document.querySelectorAll('section[id], div[id="overview"]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

});
