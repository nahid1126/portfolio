# Project screenshots

Keep each project’s screenshots in its own folder:

| Project | Folder |
| --- | --- |
| TMA | `tma/` |
| Smart Leaf | `smart_leaf/` |
| Employee Attendance | `employee_attendance/` |
| Cross Check | `cross_check/` |
| AkgAstha | `akg_astha/` |
| Expense Tracker | `expense_tracker/` |
| Warehouse Transfer | `warehouse_transfer/` |
| Smart Cultivation | `smart_cultivation/` |
| Leaf Support | `leaf_support/` |
| Book Orbit | `book_orbit/` |

Use consistent numbered filenames for new screenshots. Current gallery files are `tma1.png`–`tma8.png`, `et1.png`–`et5.png`, `wt1.png`–`wt5.png`, and `bo1.png`–`bo8.png`. Expense Tracker uses `expense_tracker/`, replacing the old `expanse_tracker/` spelling. The profile photo and favicon stay directly under `image/`.

After copying files into the appropriate folder, update that project in `projectGalleries` at the top of `js/script.js`:

```js
warehouse_transfer: { prefix: "wt", count: 5, preview: [2, 3] },
```

The loop generates `wt1.png` through `wt5.png` inside `image/warehouse_transfer/`. Increase `count` when adding screenshots; filenames must be consecutive starting at 1. Set `count: 0` for folders awaiting images. Omit `prefix` for filenames like `1.png`; the default extension is `png`, or set `extension: "jpg"` when needed.

`preview` chooses the one-based screenshot numbers for the card header; omit it to use the first two. The gallery includes all configured images in numerical order. HTML cards connect through `data-project="warehouse_transfer"` and need no image lists.

All 26 current screenshots are configured. Static hosting cannot enumerate folders, so the count must match the files available.
