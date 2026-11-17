
<<<<<<< HEAD
=======
A responsive Android developer portfolio with a navy and teal visual theme, project filters, keyboard-accessible screenshot galleries, and reduced-motion support. Built with HTML, CSS, vanilla JavaScript, and Bootstrap 5; no build step is required.

## Preview locally

From the repository root, run `python3 scripts/preview.py`, then open http://127.0.0.1:8000.

Saving changes to `index.html`, CSS, JavaScript, or images automatically refreshes the page. No dependencies are needed. Use `--port 8001` to choose another port, and press Ctrl+C to stop. The reload script is injected by the preview server only; it is not included in the published portfolio.

## Editing

- `index.html`: biography, experience, skills, projects, and contact details.
- `css/style.css`: styles, responsive layouts, and reduced motion support.
- `js/script.js`: navigation state, project filters, and accessible screenshot galleries.
- `js/particles.js`: decorative hero animation, paused offscreen and in background tabs.
- `image/`: profile photo and one screenshot folder per project; see the [folder map](image/README.md).

Save numbered screenshots in the project’s folder, then update its entry in `projectGalleries` at the top of `js/script.js`:

```js
warehouse_transfer: { prefix: "wt", count: 5, preview: [2, 3] },
```

A loop generates `image/warehouse_transfer/wt1.png` through `wt5.png`. Change `count` when adding images; use `count: 0` to show “Screenshots coming soon.” `preview` selects the one-based screenshot numbers for the card header and defaults to the first two. Both the gallery and preview use this single configuration.

Each HTML card only needs `data-project="warehouse_transfer"`. No image lists or preview paths are maintained in HTML. Use `prefix: ""` for filenames like `1.png`; optionally set `extension: "jpg"` for other image formats. Static hosting cannot list folder contents automatically, so keep `count` in sync with the files.

Each project’s outer `.project-item` has a `data-category` containing `enterprise` or `personal`, plus `compose` where applicable. Update this attribute when changing the stack or category. The project filters use these values and update the project count automatically.

Bootstrap, Font Awesome, and Google Fonts load from external CDNs. Bootstrap JavaScript is required for the mobile menu and screenshot dialogs. If Bootstrap fails to load, gallery buttons open the first screenshot directly.

## Checks

Run `node --check js/script.js`, `node --check js/particles.js`, and `git diff --check`. Before publishing, check navigation and galleries with a keyboard and review the page at mobile and desktop widths.
>>>>>>> e7de0ed (brushUp)
