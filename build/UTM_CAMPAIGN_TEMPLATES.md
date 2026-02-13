# UTM Campaign Templates - Lapak Bang Ade

**Purpose:** Standardized UTM parameters for campaign tracking across all marketing channels.

---

## UTM Parameter Structure

```
https://lapakbangade.com/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}
```

### Parameter Definitions

| Parameter | Purpose | Required | Example |
|-----------|---------|----------|---------|
| `utm_source` | Traffic source | ✅ Yes | `facebook`, `google`, `instagram` |
| `utm_medium` | Marketing medium | ✅ Yes | `cpc`, `social`, `email` |
| `utm_campaign` | Campaign name | ✅ Yes | `convert_usd_idr_feb2026` |
| `utm_content` | Ad variation | ⚠️ Recommended | `hero_image_v1`, `carousel_ad` |
| `utm_term` | Paid keywords | ⬜ Optional | `convert+paypal` |

---

## Naming Conventions

### Rules

1. **Always lowercase** - `facebook` not `Facebook`
2. **Use underscores** - `convert_usd_idr` not `convert-usd-idr`
3. **Include month/year** - `feb2026` for time-based analysis
4. **Be specific** - `hero_image_v1` not `ad1`
5. **No spaces** - Use `_` instead

### Format Pattern

```
utm_campaign = {service}_{objective}_{month}{year}
utm_content = {ad_format}_{version}
```

**Examples:**
- ✅ `convert_usd_idr_feb2026`
- ✅ `topup_paypal_promo_mar2026`
- ❌ `Campaign 1` (has space, not descriptive)
- ❌ `Feb-Campaign` (not descriptive, uses dash)

---

## Facebook/Instagram Ads

### Convert PayPal Campaign

**Campaign Name:** Convert USD to IDR - February 2026

**Ad Sets:**
- Lookalike Audiences (Freelancers)
- Interest: PayPal + Online Work
- Retargeting: Website Visitors

#### Template URLs

**Image Ad - Variant 1**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=convert_usd_idr_feb2026&utm_content=image_ad_v1
```

**Image Ad - Variant 2 (Value Prop)**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=convert_usd_idr_feb2026&utm_content=image_ad_value_v2
```

**Carousel Ad - How It Works**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=convert_usd_idr_feb2026&utm_content=carousel_how_it_works
```

**Video Ad - Testimonial**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=convert_usd_idr_feb2026&utm_content=video_testimonial_v1
```

**Retargeting - Special Offer**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=retargeting&utm_campaign=convert_remarketing_feb2026&utm_content=special_offer_banner
```

### Top-Up PayPal Campaign

**Campaign Name:** Top-Up PayPal - February 2026

**Template URLs**

**Image Ad - Cheap Rates**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=topup_paypal_feb2026&utm_content=image_cheap_rate
```

**Carousel Ad - Use Cases**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=topup_paypal_feb2026&utm_content=carousel_use_cases
```

### Instagram-Specific Ads

**Instagram Story - Swipe Up**
```
https://lapakbangade.com/?utm_source=instagram&utm_medium=story&utm_campaign=convert_usd_idr_feb2026&utm_content=story_swipe_up_v1
```

**Instagram Reels - Short Video**
```
https://lapakbangade.com/?utm_source=instagram&utm_medium=reels&utm_campaign=convert_usd_idr_feb2026&utm_content=reels_video_v1
```

**Instagram Post - Organic**
```
https://lapakbangade.com/?utm_source=instagram&utm_medium=social&utm_campaign=organic_post_feb2026&utm_content=feed_post
```

---

## Google Ads

### Search Ads

**Campaign:** PayPal Conversion - Search

**Ad Group 1: Convert PayPal**
```
https://lapakbangade.com/?utm_source=google&utm_medium=cpc&utm_campaign=convert_search_feb2026&utm_content=text_ad_v1&utm_term={keyword}
```

**Keywords to track:**
- `convert paypal ke rupiah`
- `jual saldo paypal`
- `cairkan paypal`
- `tukar paypal ke idr`

**Ad Group 2: Top-Up PayPal**
```
https://lapakbangade.com/?utm_source=google&utm_medium=cpc&utm_campaign=topup_search_feb2026&utm_content=text_ad_v1&utm_term={keyword}
```

**Keywords to track:**
- `beli saldo paypal`
- `top up paypal indonesia`
- `isi saldo paypal`

### Display Ads

**Banner Ad - General Awareness**
```
https://lapakbangade.com/?utm_source=google&utm_medium=display&utm_campaign=awareness_feb2026&utm_content=banner_300x250_v1
```

**Retargeting - Cart Abandoners**
```
https://lapakbangade.com/?utm_source=google&utm_medium=retargeting&utm_campaign=display_remarketing_feb2026&utm_content=banner_reminder
```

---

## Email Marketing

### Newsletter

**Monthly Update - February 2026**
```
https://lapakbangade.com/?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_update_feb2026&utm_content=cta_button
```

**Promotional Email - Friday Discount**
```
https://lapakbangade.com/?utm_source=email&utm_medium=promo&utm_campaign=friday_discount_feb2026&utm_content=hero_cta
```

### Transactional Emails

**Welcome Email**
```
https://lapakbangade.com/?utm_source=email&utm_medium=transactional&utm_campaign=welcome_email&utm_content=get_started_button
```

**Transaction Confirmation**
```
https://lapakbangade.com/?utm_source=email&utm_medium=transactional&utm_campaign=transaction_confirmation&utm_content=view_details
```

---

## Social Media Organic

### Facebook Posts

**Organic Post - Educational**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=social&utm_campaign=organic_feb2026&utm_content=educational_post
```

**Organic Post - Testimonial**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=social&utm_campaign=organic_feb2026&utm_content=testimonial_share
```

### Instagram

**Bio Link**
```
https://lapakbangade.com/?utm_source=instagram&utm_medium=bio_link&utm_campaign=organic&utm_content=profile_link
```

**Story Link Sticker**
```
https://lapakbangade.com/?utm_source=instagram&utm_medium=story&utm_campaign=organic_feb2026&utm_content=link_sticker
```

---

## Messenger & WhatsApp

### Facebook Messenger

**Auto-Reply Welcome Message**
```
https://lapakbangade.com/?utm_source=messenger&utm_medium=auto_reply&utm_campaign=organic&utm_content=welcome_message
```

**Bot CTA Button**
```
https://lapakbangade.com/?utm_source=messenger&utm_medium=bot&utm_campaign=organic&utm_content=rate_check_cta
```

### WhatsApp

**WhatsApp Status**
```
https://lapakbangade.com/?utm_source=whatsapp&utm_medium=status&utm_campaign=organic_feb2026&utm_content=status_link
```

**WhatsApp Bio**
```
https://lapakbangade.com/?utm_source=whatsapp&utm_medium=bio_link&utm_campaign=organic&utm_content=profile
```

**WhatsApp Business Catalog**
```
https://lapakbangade.com/?utm_source=whatsapp&utm_medium=catalog&utm_campaign=organic&utm_content=service_link
```

---

## Partnerships & Affiliates

### Affiliate Partners

**Affiliate Link - Partner 1**
```
https://lapakbangade.com/?utm_source=affiliate_partner1&utm_medium=referral&utm_campaign=affiliate_program&utm_content=text_link
```

**Affiliate Banner**
```
https://lapakbangade.com/?utm_source=affiliate_partner1&utm_medium=referral&utm_campaign=affiliate_program&utm_content=banner_468x60
```

### Blog Guest Posts

**Guest Post - Finance Blog**
```
https://lapakbangade.com/?utm_source=finance_blog&utm_medium=guest_post&utm_campaign=content_marketing_feb2026&utm_content=article_link
```

---

## Community & Forums

### Reddit

**Reddit Post - r/Indonesia**
```
https://lapakbangade.com/?utm_source=reddit&utm_medium=community&utm_campaign=organic&utm_content=r_indonesia_post
```

### Kaskus

**Kaskus Thread**
```
https://lapakbangade.com/?utm_source=kaskus&utm_medium=forum&utm_campaign=organic&utm_content=marketplace_thread
```

---

## QR Codes & Offline

### Printed Flyer**
```
https://lapakbangade.com/?utm_source=offline&utm_medium=qr_code&utm_campaign=flyer_feb2026&utm_content=printed_flyer
```

### Event Booth**
```
https://lapakbangade.com/?utm_source=offline&utm_medium=event&utm_campaign=freelancer_meetup_feb2026&utm_content=booth_qr
```

---

## Special Campaigns

### Friday Promo (Recurring)

**Week 1**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=friday_promo_week1_feb2026&utm_content=discount_banner
```

**Week 2**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=friday_promo_week2_feb2026&utm_content=discount_banner
```

### Seasonal Campaigns

**Ramadan Special 2026**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=ramadan_special_2026&utm_content=image_ad_v1
```

**End of Year Bonus 2026**
```
https://lapakbangade.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=eoy_bonus_2026&utm_content=carousel_ad
```

---

## UTM Builder Tool

### Quick Link Generator

Use this format to build custom URLs:

```
Base URL: https://lapakbangade.com/

utm_source = _______________  (e.g., facebook, google, instagram)
utm_medium = _______________  (e.g., cpc, social, email)
utm_campaign = ______________ (e.g., convert_usd_idr_feb2026)
utm_content = _______________  (e.g., image_ad_v1)

Final URL:
https://lapakbangade.com/?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]&utm_content=[content]
```

### Online Tools

- **Google Campaign URL Builder:** https://ga-dev-tools.google/campaign-url-builder/
- **Use for:** One-off campaign creation
- **Remember to:** Follow naming conventions above

---

## Tracking & Management

### UTM Tracking Spreadsheet

Create a Google Sheet with these columns:

| Date | Campaign Name | Source | Medium | Campaign | Content | Full URL | Notes |
|------|---------------|--------|--------|----------|---------|----------|-------|
| 2026-02-13 | Convert Feb | facebook | cpc | convert_usd_idr_feb2026 | image_ad_v1 | https://... | Initial test |

### Best Practices

1. **Document every campaign** - Add to tracking sheet before launch
2. **Test URLs** - Click to verify they work
3. **Use consistently** - Same naming across all platforms
4. **Review monthly** - Check for typos or inconsistencies
5. **Archive old campaigns** - Keep sheet organized

---

## GA4 Custom Reports

### Campaign Performance Report

**Dimensions:**
- Session source
- Session medium
- Session campaign name
- Session manual term

**Metrics:**
- Users
- Sessions
- Conversions (`generate_lead`)
- Conversion value

### UTM Analysis Report

**Filters:**
- Session source (contains `facebook`, `google`, etc.)

**Breakdown:**
- By `utm_content` to compare ad variations
- By `utm_campaign` to compare campaigns
- By date to see trends

---

## Quick Reference

### Source Values
- `facebook` - Facebook platform
- `instagram` - Instagram platform
- `google` - Google Ads
- `email` - Email marketing
- `newsletter` - Newsletter
- `messenger` - Facebook Messenger
- `whatsapp` - WhatsApp
- `reddit` - Reddit
- `kaskus` - Kaskus forum
- `affiliate_[name]` - Affiliate partners
- `offline` - Offline/QR codes

### Medium Values
- `cpc` - Paid ads (cost-per-click)
- `social` - Organic social
- `email` - Email campaigns
- `referral` - Referral/affiliate
- `display` - Display ads
- `retargeting` - Remarketing
- `bio_link` - Profile link
- `story` - Social story
- `qr_code` - QR code

### Campaign Structure
`{service}_{objective}_{month}{year}`

Examples:
- `convert_usd_idr_feb2026`
- `topup_paypal_mar2026`
- `friday_promo_week1_feb2026`

---

**Last Updated:** February 13, 2026
**Maintained by:** Marketing Team
**Questions?** Review `ANALYTICS_TRACKING_PLAN.md` for strategy
