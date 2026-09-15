# rosemarytosanwumi.github.io

Source for my portfolio website: **https://rosemarytosanwumi.github.io/**

It's a plain static site — no build step.

- `site/index.html` — all page content (edit this to update experience, projects, awards, etc.)
- `site/styles.css` — styling, including light/dark theme colors at the top
- `site/script.js` — theme toggle, mobile menu, scroll animations
- `site/images/` — portrait and highlight photos (real JPEGs; iPhone HEIC files must be converted first)

To preview locally, open `site/index.html` in a browser.

Every push to `master` runs `.github/workflows/deploy.yml`, which publishes the `site/` folder to the `gh-pages` branch that GitHub Pages serves.
