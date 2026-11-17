# Nahid Hasan — Portfolio

A responsive Android developer portfolio with a navy and teal visual theme, project filters, keyboard-accessible screenshot galleries, and reduced-motion support. Built with HTML, CSS, vanilla JavaScript, and Bootstrap 5; no build step is required.

## Preview locally

From the repository root, run `python3 scripts/preview.py`, then open http://127.0.0.1:8000.

Saving changes to `index.html`, CSS, JavaScript, or images automatically refreshes the page. No dependencies are needed. Use `--port 8001` to choose another port, and press Ctrl+C to stop. The reload script is injected by the preview server only; it is not included in the published portfolio.

## Editing

- `index.html`: biography, experience, skills, projects, and contact details.
- `css/style.css`: styles, responsive layouts, and reduced motion support.
- `js/script.js`: navigation state, project filters, and accessible screenshot galleries.
- `js/particles.js`: decorative hero animation, paused offscreen and in background tabs.
- `image/`: profile photo and project screenshots.

Add comma-separated screenshot paths to a project card’s `data-images` attribute:

```html
data-images="image/smart_leaf/1.png,image/smart_leaf/2.png"
```

Cards with empty or missing image paths display “Screenshots coming soon.” Keep paths relative to the repository root. Gallery buttons appear automatically once paths are added. TMA, Expense Tracker, and Book Orbit also use real screenshots in their card headers; edit their `.project-preview` images to change these previews.

Each project’s outer `.project-item` has a `data-category` containing `enterprise` or `personal`, plus `compose` where applicable. Update this attribute when changing the stack or category. The project filters use these values and update the project count automatically.

Bootstrap, Font Awesome, and Google Fonts load from external CDNs. Bootstrap JavaScript is required for the mobile menu and screenshot dialogs. If Bootstrap fails to load, gallery buttons open the first screenshot directly.

## Checks

Run `node --check js/script.js`, `node --check js/particles.js`, and `git diff --check`. Before publishing, check navigation and galleries with a keyboard and review the page at mobile and desktop widths.
