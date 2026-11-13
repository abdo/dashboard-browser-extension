# Agent notes

Happiness Dashboard is a Manifest V3 new-tab extension (React 18, Vite, `@crxjs`).

Compliments are chosen at random from the local list in `src/helpers/localQuotes.js`. The settings switch still reads and writes the `showQuote` key, with the labels Show Compliment and Hide Compliment.

Wallpapers come from Unsplash. Copy `src/keys.example.js` to `src/keys.ignore.js` and set `unsplashApiKey`. That file is gitignored. Do not commit it. The only key the extension needs is the Unsplash access key.

The extension version and the store description live in `manifest.json`. Permissions stay limited to `bookmarks`.
