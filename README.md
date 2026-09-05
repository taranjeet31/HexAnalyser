# Hex Analyser — Gradient Color Picker & Converter

A lightweight, offline-first hex colour analyser with a gradient picker, live preview, and instant conversion to every common colour format. Runs in any browser or as a standalone desktop app (no browser needed).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Electron](https://img.shields.io/badge/electron-44.x-47848F?logo=electron&logoColor=white)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)


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

**Desktop**
- Native Electron window (`main.js:6`), hiddenInset title bar on macOS, dark theme, app menu
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

### Option 2 — Desktop App (standalone, no browser)

Requires Node.js 18+.

```bash
# install dependencies
npm install

# run as desktop app
npm start
# or: npm run dev
```

The app window is defined in `main.js:6` (1120×840, vibrancy, `loadFile` at `main.js:24`).

A pre-built binary is available after building:

```bash
open "dist/mac-arm64/Hex Analyser.app"   # macOS (Apple Silicon)
```

> First launch on macOS (unsigned build): Right-click → **Open** → **Open** to bypass Gatekeeper. No Apple Developer ID required for local use.

## 📦 Building Distributables

Configured in `package.json:16` (`electron-builder`).

```bash
# build for current platform (DMG + ZIP on macOS)
npm run build:mac

# build for all platforms (mac dmg/zip, win nsis/portable, linux AppImage)
npm run build

# unpacked dir only (fast, no installer)
npm run pack   # → dist/mac-arm64/Hex Analyser.app
```

Outputs:
- `dist/*.dmg` — macOS installer
- `dist/*.zip` — macOS portable
- `dist/*.exe` — Windows installer (when built on Windows)
- `dist/*.AppImage` — Linux (when built on Linux)

## 🗂 Project Structure

```
.
├── index.html      # Single-file UI — gradient picker, conversions, styles, logic
├── main.js         # Electron main process — BrowserWindow + menu
├── preload.js      # Secure preload (contextIsolation, exposes isDesktop)
├── package.json    # Scripts + electron-builder config
└── dist/           # Built apps (generated, gitignored)
```

- `index.html:46` — CSS variables & layout
- `index.html:111` — SV box / hue / alpha sliders
- `index.html:180` — format generation (hsvToRgb, rgbToHsl, rgbToCmyk, etc.)
- `main.js:24` — `loadFile(path.join(__dirname, 'index.html'))`

## 🛠 Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no bundler
- **Electron 44** — desktop wrapper
- **electron-builder 26** — packaging

No runtime dependencies in the browser version.

## 📋 Scripts

| Script | Description |
|---|---|
| `npm start` / `npm run dev` | Launch Electron desktop app |
| `npm run pack` | Build unpacked app dir (`dist/mac-arm64`) |
| `npm run build:mac` | Build macOS DMG + ZIP |
| `npm run build` | Build for mac, win, linux |

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

Made with vanilla JS + Electron. If you find it useful, give it a ⭐ on GitHub.
