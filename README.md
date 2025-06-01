# WordGlow

A browser extension to instantly translate selected text on any website using a modern tooltip UI.

## Why?

- I often read online in English and want quick, in-place translation to other languages without copy-paste.
- I'm too lazy to open Google Translate in another tab.

## Technologies & Skills Demonstrated

- **Browser Extension APIs** (Manifest V3, content/background scripts, message passing)
- **DOM manipulation** (injecting and positioning tooltips)
- **Event handling** (text selection, mouse, scroll)
- **Async JavaScript** (fetching translations from a public API)
- **chrome.storage** (saving user language preference)
- **Responsive CSS** (custom tooltip, dark mode)
- **Cross-browser support** (Chrome & Firefox)

## How it works

- Select any text on a webpage.
- Tooltip appears with a loading spinner.
- Translation is fetched and shown in the tooltip.
- User can set default target language in the extension popup.

## Stack

- JavaScript (ES6)
- HTML/CSS
- Chrome/Firefox Extension APIs
- MyMemory Translation API (free tier)

## Setup (Dev)

- Load as unpacked extension in Chrome or Firefox (see manifest for details).
- **For Firefox:** In `manifest.json`, use `"background": { "scripts": ["background.js"] }` instead of `service_worker`.
- No build step required.

---

MIT License
