(() => {
  'use strict';

  const data = window.portfolioData || { games: [], media: [] };
  const $ = (selector, context = document) => context.querySelector(selector);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHTML = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[char]);

  const safeUrl = value => /^(https?:\/\/|assets\/)/i.test(value || '') ? escapeHTML(value) : '#';

  function renderGames() {
    const root = $('#games-grid');
    if (!root) return;

    root.innerHTML = data.games.map(item => `
      <article class="game-card reveal">
        <a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Άνοιγμα ${escapeHTML(item.title)} σε νέα καρτέλα">
          <div class="game-visual">
            <img src="${safeUrl(item.thumbnail)}" alt="" loading="lazy" width="800" height="500">
          </div>
          <div class="game-info">
            <p>${escapeHTML(item.type)}</p>
            <h3>${escapeHTML(item.title)}</h3>
            <span>${escapeHTML(item.description)}</span>
          </div>
          <span class="launch">ΠΑΙΞΕ ΤΩΡΑ</span>
        </a>
      </article>
    `).join('');
  }

  function renderMedia() {
    const root = $('#media-grid');
    if (!root) return;

    root.innerHTML = data.media.map(item => `
      <article class="media-card reveal">
        <img src="${safeUrl(item.thumbnail)}" alt="" loading="lazy" width="800" height="500">
      </article>
    `).join('');
  }

  renderGames();
  renderMedia();

  const currentYear = $('#current-year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const header = $('[data-header]');
  const menuButton = $('.menu-toggle');
  const nav = $('.site-nav');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const shouldOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(shouldOpen));
      nav.classList.toggle('is-open', shouldOpen);
      document.body.classList.toggle('menu-open', shouldOpen);
    });

    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
  }

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  const revealElements = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(element => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

    revealElements.forEach(element => revealObserver.observe(element));
  }

  if (nav && 'IntersectionObserver' in window) {
    const navLinks = [...nav.querySelectorAll('a')];
    const sections = [...document.querySelectorAll('main section[id]')];
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55%' });

    sections.forEach(section => activeObserver.observe(section));
  }

  const profileCard = $('.profile-code');
  if (profileCard) {
    profileCard.addEventListener('click', () => {
      const showingPhoto = profileCard.classList.toggle('is-photo');
      profileCard.setAttribute('aria-pressed', String(showingPhoto));
      profileCard.setAttribute('aria-label', showingPhoto
        ? 'Πάτησε για να επιστρέψεις στον κώδικα'
        : 'Πάτησε για να εμφανίσεις τη φωτογραφία του Τάσου');
    });
  }

  const orbit = $('.hero-orbit');
  if (orbit && !reducedMotion) {
    let ticking = false;
    const updateOrbit = () => {
      const angle = -35 + window.scrollY * 0.08;
      const moveY = Math.min(window.scrollY * 0.015, 20);
      orbit.style.transform = `translate3d(0, ${moveY}px, 0) rotate(${angle}deg)`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      window.requestAnimationFrame(updateOrbit);
      ticking = true;
    }, { passive: true });
    updateOrbit();
  }

  const contact = $('.contact');
  const showContactDecoration = () => contact?.classList.add('is-decoration-visible');

  if (contact && !reducedMotion && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      window.requestAnimationFrame(() => window.requestAnimationFrame(showContactDecoration));
      footerObserver.unobserve(contact);
    }, { threshold: 0.15 });
    footerObserver.observe(contact);
  } else {
    showContactDecoration();
  }

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const glow = $('.cursor-glow');
    if (glow) {
      window.addEventListener('pointermove', event => {
        glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        glow.classList.add('visible');
      }, { passive: true });
    }
  }
})();
