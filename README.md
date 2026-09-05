# Hex Analyser — Gradient Color Picker & Converter

A lightweight, offline-first hex colour analyser with a gradient picker, live preview, and instant conversion to every common colour format. Runs in any browser or as a standalone desktop app (no browser needed).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Tauri](https://img.shields.io/badge/tauri-2.x-FFC131?logo=tauri&logoColor=black) ![Electron](https://img.shields.io/badge/electron-44.x-47848F?logo=electron&logoColor=white)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
![Size](https://img.shields.io/badge/bundle-9.5MB%20(Tauri)%20vs%20288MB%20(Electron)-success)


## ✨ Features

**Picker**
- 2D Saturation / Value gradient box + vertical Hue slider + Opacity slider
- Drag, click, or use arrow keys for precise control
- Native system colour picker and EyeDropper API (Chrome/Edge) support
- Large live preview with checkerboard for transparency

**Input**
- Type any hex — `#RGB`, `#RRGGBB`, `#RRGGBBAA` — live-validated, instant preview
- Input swatch and error hint inline

**Conversions — one click to copy**
- `HEX`, `HEX (no #)`, `RGB`, `RGBA`, `HSL`, `HSLA`, `HSV / HSB`, `CMYK`, `Decimal / Int`, `CSS`

**Palettes**
- Quick variations (10 tints via HSL lightness scale)
- Harmonies: Complementary, Analogous, Triadic, Shades — click any swatch to load

**Desktop — two builds, same UI**
- **Tauri (lightweight, recommended)** — 9.5MB `.app` via native WebView, `src-tauri/tauri.conf.json:6` → `tauri-frontend/index.html`
- **Electron (fallback)** — 288MB `.app` via bundled Chromium, `main.js:6` → `index.html:1`
- Fully offline — no network requests

## 📸 Preview

> Open `index.html` or launch the desktop app to see:

- Left: gradient picker + big preview + hex input
- Right: all formats with copy buttons + harmonies

Add a screenshot for your repo:
```md
![Hex Analyser Screenshot](screenshot.png)
```

## 🚀 Quick Start

### Option 1 — Browser (no install)

Just open the file:

```bash
open index.html
# or double-click index.html in Finder / Explorer
```

No build step, no dependencies.

### Option 2 — Desktop App (Tauri, lightweight, 9.5MB)

Recommended — uses native WebView, not Chromium.

Requires Node.js 18+ and Rust (`rustc --version`).

```bash
npm install

# dev (hot reload)
npm run tauri:dev

# release build — 9.5MB .app
npm run tauri:build
# bypass DMG: npm run tauri -- build --bundles app
# output: src-tauri/target/release/bundle/macos/Hex Analyser.app  (~9.5MB)
open "src-tauri/target/release/bundle/macos/Hex Analyser.app"
```

> First launch: Right-click → Open → Open (ad-hoc signed).

### Option 3 — Desktop App (Electron, 288MB fallback)

```bash
npm start
# or: npm run dev
```

Window defined in `main.js:6` (1120×840, vibrancy, `loadFile` at `main.js:24`).

```bash
open "dist/mac-arm64/Hex Analyser.app"   # 288MB Electron build
```

## 📦 Building Distributables

**Tauri (lightweight)**

Configured in `src-tauri/tauri.conf.json:6`. `beforeBuildCommand` auto-copies `index.html` → `tauri-frontend/index.html`.

```bash
npm run tauri:build        # app + dmg (dmg needs create-dmg, optional)
npm run tauri -- build --bundles app   # app only, no dmg (fastest, ~9.5MB)
```

**Electron (heavy, fallback)**

Configured in `package.json:16` (`electron-builder`).

```bash
npm run build:mac   # DMG + ZIP on macOS — 288MB unpacked
npm run build       # all platforms
npm run pack        # → dist/mac-arm64/Hex Analyser.app (unpacked)
```

| Build | Unpacked .app | Installer | Engine |
|---|---|---|---|
| Tauri `src-tauri/target/release/bundle/macos/Hex Analyser.app` | **9.5MB** | ~10MB dmg/app.zip | Native WebView |
| Electron `dist/mac-arm64/Hex Analyser.app` | 288MB | ~80-120MB dmg | Bundled Chromium |

## 🗂 Project Structure

```
.
├── index.html                  # Single-file UI — gradient picker, conversions, styles, logic
├── tauri-frontend/index.html   # Copied from index.html for Tauri (beforeBuildCommand)
├── main.js                     # Electron main process — BrowserWindow + menu
├── preload.js                  # Secure preload (contextIsolation, exposes isDesktop)
├── src-tauri/                  # Tauri/Rust wrapper (lightweight)
│   ├── tauri.conf.json         # frontendDist, window size, bundle id
│   ├── Cargo.toml
│   └── src/{main,lib}.rs
├── package.json                # Scripts + electron-builder + tauri
└── dist/ / src-tauri/target/   # Built apps (gitignored)
```

- `index.html:46` — CSS variables & layout
- `index.html:111` — SV box / hue / alpha sliders
- `index.html:180` — format generation (hsvToRgb, rgbToHsl, rgbToCmyk, etc.)
- `main.js:24` — `loadFile(path.join(__dirname, 'index.html'))`

## 🛠 Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no bundler
- **Tauri 2 + Rust** — lightweight desktop wrapper (9.5MB, native WebView)
- **Electron 44** — alternative wrapper (288MB, bundled Chromium)
- **electron-builder 26 / tauri-bundler** — packaging

No runtime dependencies in the browser version.

## 📋 Scripts

| Script | Description | Size |
|---|---|---|
| `npm run tauri:dev` | Tauri dev (native WebView) | — |
| `npm run tauri:build` | Tauri release .app + dmg | **9.5MB** |
| `npm start` / `npm run dev` | Electron desktop app | 288MB |
| `npm run pack` | Electron unpacked (`dist/mac-arm64`) | 288MB |
| `npm run build:mac` | Electron DMG + ZIP | ~100MB dmg |
| `npm run build` | Electron all platforms | — |

## 🎨 Supported Formats

| Label | Example |
|---|---|
| HEX | `#1F6FEB` |
| RGB | `rgb(31, 111, 235)` |
| RGBA | `rgba(31, 111, 235, 1.00)` |
| HSL | `hsl(215, 87%, 52%)` |
| HSV | `hsv(215, 87%, 92%)` |
| CMYK | `cmyk(87%, 53%, 0%, 8%)` |
| Decimal | `2062571 (0x1F6FEB)` |

Colour math: `hsvToRgb` / `rgbToHsv` / `rgbToHsl` / `rgbToCmyk` / `hexToRgb` in `index.html`.

## 💻 Development

```bash
git clone https://github.com/yourname/hex-analyser.git
cd hex-analyser
npm install
npm start
```

Edit `index.html` — reload the Electron window (View → Reload) or refresh the browser.

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit (`git commit -m "feat: add xyz"`)
4. Push & open a PR

Issues and feature requests welcome.

## 📄 License

MIT — see [LICENSE](LICENSE) if added. Free for personal and commercial use.

---

Made with vanilla JS + Tauri (lightweight) / Electron. If you find it useful, give it a ⭐ on GitHub.
