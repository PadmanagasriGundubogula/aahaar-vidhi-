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
  // 7. REGISTRATION (Migrated to Google Forms)
  // ==========================
  // Local validation and success overlay removed. Compulsory Google Form link handled directly in HTML.

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

  // ==========================
  // VENUE CAROUSEL
  // ==========================
  const vcTrack = document.getElementById('vcTrack');
  const vcPrev  = document.getElementById('vcPrev');
  const vcNext  = document.getElementById('vcNext');
  const vcDots  = document.querySelectorAll('.vc-dot');
  const vcTotal = vcDots.length;
  let vcCurrent = 0;
  let vcTimer   = null;

  function vcGoTo(idx) {
    vcCurrent = (idx + vcTotal) % vcTotal;
    vcTrack.style.transform = `translateX(-${vcCurrent * 100}%)`;
    vcDots.forEach((d, i) => d.classList.toggle('active', i === vcCurrent));
  }

  function vcAutoplay() {
    vcTimer = setInterval(() => vcGoTo(vcCurrent + 1), 3500);
  }

  function vcStopAuto() {
    clearInterval(vcTimer);
  }

  if (vcTrack) {
    vcPrev?.addEventListener('click', () => { vcStopAuto(); vcGoTo(vcCurrent - 1); vcAutoplay(); });
    vcNext?.addEventListener('click', () => { vcStopAuto(); vcGoTo(vcCurrent + 1); vcAutoplay(); });

    vcDots.forEach(dot => {
      dot.addEventListener('click', () => {
        vcStopAuto();
        vcGoTo(parseInt(dot.dataset.idx));
        vcAutoplay();
      });
    });

    // Touch / swipe support
    let vcTouchX = 0;
    vcTrack.addEventListener('touchstart', e => { vcTouchX = e.touches[0].clientX; }, { passive: true });
    vcTrack.addEventListener('touchend', e => {
      const diff = vcTouchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        vcStopAuto();
        vcGoTo(diff > 0 ? vcCurrent + 1 : vcCurrent - 1);
        vcAutoplay();
      }
    }, { passive: true });

    // Pause on hover
    const carousel = document.getElementById('venueCarousel');
    carousel?.addEventListener('mouseenter', vcStopAuto);
    carousel?.addEventListener('mouseleave', vcAutoplay);

    vcAutoplay();
  }

});
