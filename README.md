# Currency-Converter

Vue recruitment task

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Environment variables

The app uses the [CurrencyBeacon API](https://currencybeacon.com/register). Register for a free account and copy your API key from the dashboard under **API Token Information**.

Create a local env file from the example:

```sh
cp .env.example .env.local
```

Edit `.env.local` and replace `your_api_key_here` with your API key:

```env
VITE_API_BASE_URL=/api
VITE_API_KEY=your_api_key_here
```

`VITE_API_BASE_URL=/api` uses the Vite dev proxy (see `vite.config.ts`) to avoid CORS issues. For a production build, use the full API URL instead:

```env
VITE_API_BASE_URL=https://api.currencybeacon.com/v1
```

`.env.local` is gitignored and should not be committed.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
