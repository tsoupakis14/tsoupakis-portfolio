# Anastasis Tsoupakis — Portfolio

A fast, responsive portfolio built with HTML, CSS and vanilla JavaScript. It has no framework, build step, database or paid dependency.

## Local preview

Open `index.html` directly, or run it through a simple local server such as VS Code Live Server.

## Edit the website

- Text, navigation and contact details: `index.html`
- Games and Content images: `data/projects.js`
- Colours, layout and responsive styles: `css/style.css`
- Menu, scroll effects and dynamic cards: `js/main.js`

### Add a game

Add an object to the `games` array in `data/projects.js` with `title`, `type`, `description`, `thumbnail` and `url`.

### Add Content images

Add an image to `assets/images/`, then add its filename to the `media` list in `data/projects.js`.

### Assets

- Game thumbnails: `assets/thumbnails/`
- Content images and profile photo: `assets/images/`
- Favicon: `assets/icons/`
- CV: `assets/cv/`

## Deploy with Cloudflare

1. Upload the folder contents to the root of your GitHub repository.
2. Create a Cloudflare Pages project and connect that repository.
3. Choose no framework preset and no build command.
4. Set the output directory to `.` and deploy.
