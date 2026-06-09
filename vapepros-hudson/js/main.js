/* ===== Vape Pro's & Dispensary — global JS ===== */

(function () {
  'use strict';

  // ---------- Age verification (21+) ----------
  const AGE_KEY = 'vpd_age_verified';
  const ageModal = document.getElementById('ageModal');
  const ageDeny = document.getElementById('ageDeny');

  function showAgeModal() {
    if (!ageModal) return;
    if (sessionStorage.getItem(AGE_KEY) === 'yes') return;
    ageModal.classList.add('show');
    document.body.classList.add('modal-open');
  }
  function hideAgeModal() {
    if (!ageModal) return;
    ageModal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }
  function confirmAge() {
    sessionStorage.setItem(AGE_KEY, 'yes');
    hideAgeModal();
  }
  function denyAge() {
    hideAgeModal();
    if (ageDeny) {
      ageDeny.classList.add('show');
      document.body.classList.add('modal-open');
    }
  }

  document.addEventListener('DOMContentLoaded', showAgeModal);

  const yesBtn = document.getElementById('ageYes');
  const noBtn = document.getElementById('ageNo');
  if (yesBtn) yesBtn.addEventListener('click', confirmAge);
  if (noBtn) noBtn.addEventListener('click', denyAge);

  // ---------- Mobile nav toggle ----------
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.setAttribute('aria-expanded', 'false');

    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', navLinks.classList.contains('open') ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---------- Scroll-triggered fade-up ----------
  const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, observerOpts);
  document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));

  // ---------- Contact form (mailto fallback) ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || 'General').toString();
      const message = (data.get('message') || '').toString().trim();

      const encName = encodeURIComponent(name);
      const encEmail = encodeURIComponent(email);
      const encSubject = encodeURIComponent(subject);
      const encMessage = encodeURIComponent(message);

      const body =
        `Name: ${encName}%0D%0A` +
        `Email: ${encEmail}%0D%0A` +
        `Subject: ${encSubject}%0D%0A%0D%0A` +
        `${encMessage}`;

      // Trigger user's mail client
      window.location.href = `mailto:hello@vapeproshudson.com?subject=${encodeURIComponent(
        '[Website] ' + subject
      )}&body=${body}`;

      const ok = document.getElementById('formSuccess');
      if (ok) {
        ok.classList.add('show');
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  // ---------- Footer year ----------
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- Catalog Filtering ----------
  const filterBtns = document.querySelectorAll('.catalog-filter-btn');
  const caviarCards = document.querySelectorAll('.caviar-card');

  if (filterBtns.length > 0 && caviarCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        caviarCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
            // Re-trigger fade effect
            card.classList.remove('visible');
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
})();
