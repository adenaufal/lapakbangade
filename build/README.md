<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1EzrxpWeI_W6YkQq753ujdmsjxOMD2yNn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Set `EXCHANGE_RATE_API_KEY` in [.env.local](.env.local) (and in Netlify env) for live USD/IDR rates. The key is used server-side via Netlify Function.
3. Run the app:
   `npm run dev`

For local testing of the rate function, run with `netlify dev` so the function endpoint `/.netlify/functions/rate` is available.

## Deploy to Netlify

This repo includes `netlify.toml` configured to build the app from the `build` directory and publish the `build/dist` output.

1. In Netlify, set the base directory to the repository root (config sets `base = build` automatically).
2. Build command: `npm run build`
3. Publish directory: `dist`
