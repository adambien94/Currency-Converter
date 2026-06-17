# Currency-Converter

Vue recruitment task

## Design decisions

### Local amount calculation instead of calling `/convert` on every keystroke

When the user changes the source or target currency, the app calls `/v1/convert` once and derives an exchange-rate multiplier from the response (`value / amount`). Subsequent amount edits are calculated locally by multiplying or dividing by that multiplier.

This approach was chosen because:

- Currency conversion is linear — once the rate for a currency pair is known, any amount can be derived without another API call.
- It avoids unnecessary network traffic and API quota usage while the user is typing.
- It keeps the UI responsive, with no debounce delay or loading flicker on each keystroke.

The `/convert` endpoint is still used whenever the currency pair changes or on initial load, so the displayed rate always comes from the API.

### Dev proxy vs. full API URL in production

In development, `VITE_API_BASE_URL` is set to `/api`. Vite forwards those requests to `https://api.currencybeacon.com/v1` via a server-side proxy (see `vite.config.ts`).

Browsers block cross-origin requests from `localhost` to the CurrencyBeacon API because of CORS.

In production, the built app is served as static files with no Vite dev server, so the proxy is not available. The client must call the API directly, which is why `VITE_API_BASE_URL` should be set to `https://api.currencybeacon.com/v1` for production builds.

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

`VITE_API_BASE_URL=/api` uses the Vite dev proxy — see [Dev proxy vs. full API URL in production](#dev-proxy-vs-full-api-url-in-production). For a production build, use the full API URL instead:

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
