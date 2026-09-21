(() => {
  'use strict';
  const data = window.portfolioData || { selectedWork: [], games: [], media: [] };
  const $ = (selector, context = document) => context.querySelector(selector);
  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  const safeUrl = (value = '') => /^(https?:\/\/|assets\/)/i.test(value) ? escapeHTML(value) : '#';

  const emptyState = (message) => `<div class="empty-state reveal"><span aria-hidden="true">✦</span><p>${escapeHTML(message)}</p></div>`;

  function renderSelectedWork() {
    const root = $('#selected-work-grid');
    if (!data.selectedWork.length) { root.innerHTML = emptyState('New work is being added.'); return; }
    root.innerHTML = data.selectedWork.map((item, index) => `<article class="work-card reveal ${item.featured ? 'featured' : ''}">
      <a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHTML(item.title)}">
        <div class="card-visual">${item.thumbnail ? `<img src="${safeUrl(item.thumbnail)}" alt="" loading="lazy" width="960" height="640">` : `<span>${String(index + 1).padStart(2, '0')}</span>`}</div>
        <div class="card-content"><p>${escapeHTML(item.type)} · ${escapeHTML(item.year)}</p><h3>${escapeHTML(item.title)}</h3><span>${escapeHTML(item.description)}</span></div>
      </a></article>`).join('');
  }

  function renderGames() {
    $('#games-grid').innerHTML = data.games.map((item, index) => `<article class="game-card reveal">
      <a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Launch ${escapeHTML(item.title)} in a new tab">
        <div class="game-number">${escapeHTML(item.number)}</div>
        
        <div class="game-visual ${item.thumbnail ? 'has-image' : ''}">
  ${item.thumbnail
    ? `<img src="${safeUrl(item.thumbnail)}" alt="" loading="lazy" width="800" height="500">`
    : `<span></span><i aria-hidden="true">${String(index + 1).padStart(2, '0')}</i>`
  }
</div>
        <div class="game-info"><p>${escapeHTML(item.type)}</p><h3>${escapeHTML(item.title)}</h3><span>${escapeHTML(item.description)}</span></div><div class="launch">ΠΑΙΞΕ ΤΩΡΑ</div>
      </a></article>`).join('');
  }

  function renderMedia() {
    const root = $('#media-grid');
    if (!data.media.length) { root.innerHTML = emptyState('New media is being prepared.'); return; }
    root.innerHTML = data.media.map(item => `<article class="media-card reveal ${item.featured ? 'featured' : ''}">
      <div class="media-thumb">${item.thumbnail ? `<img src="${safeUrl(item.thumbnail)}" alt="" loading="lazy" width="800" height="500">` : '<span>Media preview</span>'}</div>
      <div class="media-body"><p>${escapeHTML(item.type)} · ${escapeHTML(item.year)}</p><h3>${escapeHTML(item.title)}</h3><span>${escapeHTML(item.description)}</span><div class="media-actions">${item.viewUrl ? `<a href="${safeUrl(item.viewUrl)}" target="_blank" rel="noopener noreferrer">View ↗</a>` : ''}${item.downloadUrl ? `<a href="${safeUrl(item.downloadUrl)}" download>Download ↓</a>` : ''}</div></div>
    </article>`).join('');
  }

  const skillGroups = {
  'Web & Development': [
    'WordPress',
    'Elementor',
    'HTML',
    'CSS',
    'JavaScript'
  ],
  'Digital Marketing': [
    'SEO',
    'Google Search Console',
    'Google Analytics',
    'Google Ads',
    'Google Business Profile',
    'Meta Ads',
    'HubSpot Email Marketing'
  ],
  'Δημιουργία': [
    'Canva',
    'Photoshop'
  ],
  'Περιεχόμενο': [
    'Διαχείριση Social Media',
    'Διαχείριση Περιεχομένου'
  ]
};
  function renderSkills() { $('#skills').innerHTML = Object.entries(skillGroups).map(([group, items]) => `<article class="skill-group reveal"><p>${group}</p><div>${items.map(item => `<span>${escapeHTML(item)}</span>`).join('')}</div></article>`).join(''); }

  renderSelectedWork(); renderGames(); renderMedia(); renderSkills();
  $('#current-year').textContent = new Date().getFullYear();

  const header = $('[data-header]');
  const menuButton = $('.menu-toggle');
  const nav = $('.site-nav');
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('is-open', !open); document.body.classList.toggle('menu-open', !open); });
  nav.addEventListener('click', event => { if (event.target.matches('a')) { menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); document.body.classList.remove('menu-open'); } });
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 20), { passive: true });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('is-visible'));
  else { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -36px' }); reveals.forEach(el => observer.observe(el)); }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...nav.querySelectorAll('a')];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-30% 0px -60%' });
  sections.forEach(section => activeObserver.observe(section));

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) { const glow = $('.cursor-glow'); window.addEventListener('pointermove', event => { glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; glow.classList.add('visible'); }, { passive: true }); }
})();
