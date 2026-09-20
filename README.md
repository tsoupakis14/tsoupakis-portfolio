# Anastasis Tsoupakis — Portfolio

A fast, responsive creative-tech portfolio built only with HTML5, CSS3 and vanilla JavaScript. No framework, backend, build step, database, paid API or dependency is required.

## Local preview

Open `index.html` directly, or serve the folder with any simple local server (for example VS Code Live Server). The site is fully static.

## Editing the site

- Personal copy and contact details: `index.html`
- Games, selected work and media: `data/projects.js`
- Colors and design tokens: the `:root` block at the top of `css/style.css`
- Interaction and rendering logic: `js/main.js`

### Add a game

Add an object to the `games` array in `data/projects.js`. Provide `number`, `title`, `type`, `description`, `thumbnail` (optional) and `url`.

### Add selected work

Add an object to `selectedWork`. A commented example is included. Until a real entry is added, the site intentionally displays “New work is being added.”

### Add video or media

Add an object to `media` with `title`, `type`, `year`, `description`, `thumbnail`, `viewUrl`, `downloadUrl` and `featured`. Only thumbnails and metadata load; videos never autoplay.

### Assets

- Put project images in `assets/thumbnails/` (WebP or AVIF recommended).
- Put general images in `assets/images/`.
- Replace or extend icons in `assets/icons/`.
- Put the real CV at `assets/cv/Anastasis-Tsoupakis-CV.pdf`. This PDF is intentionally not included.

## GitHub and Cloudflare Pages

1. Create a new GitHub repository.
2. Upload or push this entire folder to the repository root.
3. In Cloudflare Pages choose **Create a project → Connect to Git** and select the repository.
4. Choose no framework preset. There is no build command.
5. Set the output directory to the repository root (`.`), then deploy.

The free Cloudflare Pages plan is sufficient for this static site. The included `404.html` works as the custom not-found page.

## Before publishing

Add the real CV, replace the three temporary project labels/descriptions when ready, add real portfolio/media entries, and optionally add optimized thumbnails. Do not add a canonical URL until the final domain is known.
