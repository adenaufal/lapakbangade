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
2. Set analytics IDs in [.env.local](.env.local):
   - `VITE_GA_MEASUREMENT_ID=G-ZTR1QX14YK`
   - `VITE_META_PIXEL_ID=837636162306241`
3. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
4. Set `EXCHANGE_RATE_API_KEY` in [.env.local](.env.local) (and in Netlify env) for live USD/IDR rates. The key is used server-side via Netlify Function.
5. Run the app:
   `npm run dev`

For local testing of the rate function, run with `netlify dev` so the function endpoint `/.netlify/functions/rate` is available.

## Deploy to Netlify

This repo includes `netlify.toml` configured to build the app from the `build` directory and publish the `build/dist` output.

1. In Netlify, set the base directory to the repository root (config sets `base = build` automatically).
2. Build command: `npm run build`
3. Publish directory: `dist`

## Analytics testing checklist

- Install the Facebook Pixel Helper extension and open the site; you should see the Meta Pixel ID `837636162306241` with `PageView` and `ViewContent` events on load, plus `InitiateCheckout` and `Lead` after clicking the primary CTA.
- Open GA4 Realtime for property `G-ZTR1QX14YK`; expect `page_view` on load, `view_item` on load, `begin_checkout` on CTA click, and `generate_lead` (with currency/value) when the CTA is clicked.
- CTA clicks fire both Meta and GA4 events; scrolling, FAQ, and CTA events still send custom analytics events for behavioral insight.
