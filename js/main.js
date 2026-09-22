(() => {
  'use strict';

  const data = window.portfolioData || {
    selectedWork: [],
    games: [],
    media: []
  };

  const $ = (selector, context = document) =>
    context.querySelector(selector);

  const escapeHTML = (value = '') =>
    String(value).replace(
      /[&<>'"]/g,
      char =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        })[char]
    );

  const safeUrl = (value = '') =>
    /^(https?:\/\/|assets\/)/i.test(value)
      ? escapeHTML(value)
      : '#';

  const emptyState = message => `
    <div class="empty-state reveal">
      <span aria-hidden="true">✦</span>
      <p>${escapeHTML(message)}</p>
    </div>
  `;

  /* =========================================
     SELECTED WORK
     ========================================= */

  function renderSelectedWork() {
    const root = $('#selected-work-grid');

    /* Η ενότητα έχει αφαιρεθεί, οπότε σταματάμε με ασφάλεια */
    if (!root) return;

    if (!data.selectedWork.length) {
      root.innerHTML = emptyState('New work is being added.');
      return;
    }

    root.innerHTML = data.selectedWork
      .map(
        (item, index) => `
          <article class="work-card reveal ${
            item.featured ? 'featured' : ''
          }">
            <a
              href="${safeUrl(item.url)}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View ${escapeHTML(item.title)}"
            >
              <div class="card-visual">
                ${
                  item.thumbnail
                    ? `
                      <img
                        src="${safeUrl(item.thumbnail)}"
                        alt=""
                        loading="lazy"
                        width="960"
                        height="640"
                      >
                    `
                    : `
                      <span>
                        ${String(index + 1).padStart(2, '0')}
                      </span>
                    `
                }
              </div>

              <div class="card-content">
                <p>
                  ${escapeHTML(item.type)} ·
                  ${escapeHTML(item.year)}
                </p>

                <h3>${escapeHTML(item.title)}</h3>

                <span>
                  ${escapeHTML(item.description)}
                </span>
              </div>
            </a>
          </article>
        `
      )
      .join('');
  }

  /* =========================================
     GAMES
     ========================================= */

  function renderGames() {
    const root = $('#games-grid');

    if (!root) return;

    root.innerHTML = data.games
      .map(
        (item, index) => `
          <article class="game-card reveal">
            <a
              href="${safeUrl(item.url)}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Launch ${escapeHTML(
                item.title
              )} in a new tab"
            >
              <div class="game-number">
                ${escapeHTML(item.number)}
              </div>

              <div class="game-visual ${
                item.thumbnail ? 'has-image' : ''
              }">
                ${
                  item.thumbnail
                    ? `
                      <img
                        src="${safeUrl(item.thumbnail)}"
                        alt=""
                        loading="lazy"
                        width="800"
                        height="500"
                      >
                    `
                    : `
                      <span></span>
                      <i aria-hidden="true">
                        ${String(index + 1).padStart(2, '0')}
                      </i>
                    `
                }
              </div>

              <div class="game-info">
                <p>${escapeHTML(item.type)}</p>
                <h3>${escapeHTML(item.title)}</h3>
                <span>${escapeHTML(item.description)}</span>
              </div>

              <div class="launch">
                ΠΑΙΞΕ ΤΩΡΑ
              </div>
            </a>
          </article>
        `
      )
      .join('');
  }

  /* =========================================
     MEDIA
     ========================================= */

  function renderMedia() {
    const root = $('#media-grid');

    if (!root) return;

    if (!data.media.length) {
      root.innerHTML = emptyState(
        'New media is being prepared.'
      );
      return;
    }

    root.innerHTML = data.media
      .map(
        item => `
          <article class="media-card reveal ${
            item.featured ? 'featured' : ''
          }">
            <div class="media-thumb">
              ${
                item.thumbnail
                  ? `
                    <img
                      src="${safeUrl(item.thumbnail)}"
                      alt=""
                      loading="lazy"
                      width="800"
                      height="500"
                    >
                  `
                  : '<span>Media preview</span>'
              }
            </div>

            <div class="media-body">
              <p>
                ${escapeHTML(item.type)} ·
                ${escapeHTML(item.year)}
              </p>

              <h3>${escapeHTML(item.title)}</h3>

              <span>
                ${escapeHTML(item.description)}
              </span>

              <div class="media-actions">
                ${
                  item.viewUrl
                    ? `
                      <a
                        href="${safeUrl(item.viewUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View ↗
                      </a>
                    `
                    : ''
                }

                ${
                  item.downloadUrl
                    ? `
                      <a
                        href="${safeUrl(item.downloadUrl)}"
                        download
                      >
                        Download ↓
                      </a>
                    `
                    : ''
                }
              </div>
            </div>
          </article>
        `
      )
      .join('');
  }

  /* =========================================
     SKILLS
     ========================================= */

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

  function renderSkills() {
    const root = $('#skills');

    if (!root) return;

    root.innerHTML = Object.entries(skillGroups)
      .map(
        ([group, items]) => `
          <article class="skill-group reveal">
            <p>${escapeHTML(group)}</p>

            <div>
              ${items
                .map(
                  item =>
                    `<span>${escapeHTML(item)}</span>`
                )
                .join('')}
            </div>
          </article>
        `
      )
      .join('');
  }

  /* =========================================
     ΑΡΧΙΚΗ ΕΜΦΑΝΙΣΗ
     ========================================= */

  renderSelectedWork();
  renderGames();
  renderMedia();
  renderSkills();

  const currentYear = $('#current-year');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================================
     HEADER ΚΑΙ MOBILE MENU
     ========================================= */

  const header = $('[data-header]');
  const menuButton = $('.menu-toggle');
  const nav = $('.site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open =
        menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute(
        'aria-expanded',
        String(!open)
      );

      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    nav.addEventListener('click', event => {
      if (!event.target.matches('a')) return;

      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );

      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  }

  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle(
          'is-scrolled',
          window.scrollY > 20
        );
      },
      { passive: true }
    );
  }

  /* =========================================
     REDUCED MOTION
     ========================================= */

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* =========================================
     REVEAL ANIMATIONS
     ========================================= */

  const reveals = document.querySelectorAll('.reveal');

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    reveals.forEach(element => {
      element.classList.add('is-visible');
    });
  } else {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -36px'
      }
    );

    reveals.forEach(element => {
      revealObserver.observe(element);
    });
  }

  /* =========================================
     ACTIVE MENU LINK
     ========================================= */

  if (
    nav &&
    'IntersectionObserver' in window
  ) {
    const sections = [
      ...document.querySelectorAll('main section[id]')
    ];

    const navLinks = [
      ...nav.querySelectorAll('a')
    ];

    const activeObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') ===
                `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin: '-30% 0px -60%'
      }
    );

    sections.forEach(section => {
      activeObserver.observe(section);
    });
  }

  /* =========================================
     CURSOR GLOW
     ========================================= */

  if (
    !reducedMotion &&
    window.matchMedia('(pointer: fine)').matches
  ) {
    const glow = $('.cursor-glow');

    if (glow) {
      window.addEventListener(
        'pointermove',
        event => {
          glow.style.transform =
            `translate3d(
              ${event.clientX}px,
              ${event.clientY}px,
              0
            )`;

          glow.classList.add('visible');
        },
        { passive: true }
      );
    }
  }

})();

/* HERO ORBIT — SCROLL TEST */
(() => {
  const startOrbitAnimation = () => {
    const orbit = document.querySelector('.hero-orbit');

    if (!orbit) {
      console.log('Hero orbit not found');
      return;
    }

    /* Απενεργοποίηση της παλιάς αυτόματης κίνησης */
    orbit.style.setProperty(
      'animation',
      'none',
      'important'
    );

    orbit.style.setProperty(
      'transition',
      'none',
      'important'
    );

    const updateOrbit = () => {
      /* Αρχική θέση της κουκκίδας πιο πίσω */
      const startAngle = -35;

      /* Πιο αργή περιστροφή */
      const angle = startAngle + window.scrollY * 0.08;

      /* Πιο διακριτική κάθετη κίνηση */
      const moveY = Math.min(window.scrollY * 0.015, 20);

      orbit.style.setProperty(
        'transform',
        `translate3d(0, ${moveY}px, 0) rotate(${angle}deg)`,
        'important'
      );
    };

    window.addEventListener(
      'scroll',
      updateOrbit,
      { passive: true }
    );

    updateOrbit();
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      startOrbitAnimation
    );
  } else {
    startOrbitAnimation();
  }
})();
/* Profile card — εμφάνιση φωτογραφίας */
(() => {
  const profileCard = document.querySelector(".profile-code");

  if (!profileCard) return;

  profileCard.addEventListener("click", () => {
    const showingPhoto = profileCard.classList.toggle("is-photo");

    profileCard.setAttribute("aria-pressed", String(showingPhoto));

    profileCard.setAttribute(
      "aria-label",
      showingPhoto
        ? "Πάτησε για να επιστρέψεις στον κώδικα"
        : "Πάτησε για να εμφανίσεις τη φωτογραφία του Τάσου"
    );

    profileCard.querySelector(".profile-hint").textContent = showingPhoto
      ? "πάτησε για κώδικα"
      : "πάτησε για φωτογραφία";
  });
})();
