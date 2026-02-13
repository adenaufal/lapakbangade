# 🧪 Testing Guide - Programmatic SEO Pages

Panduan lengkap untuk memverifikasi apakah programmatic SEO sudah berjalan dengan benar.

---

## ✅ CARA 1: Test Manual di Browser

### Step 1: Jalankan Dev Server

```bash
cd build
npm run dev
```

Tunggu sampai muncul:
```
VITE v6.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 2: Test URLs di Browser

Buka browser dan test URL-URL ini satu per satu:

#### ✅ Test Bank Pages
- http://localhost:5173/convert-paypal-ke-bca
- http://localhost:5173/convert-paypal-ke-mandiri
- http://localhost:5173/convert-paypal-ke-bni
- http://localhost:5173/convert-paypal-ke-dana
- http://localhost:5173/convert-paypal-ke-ovo

**Yang harus dilihat**:
- ✅ Halaman load dengan benar (tidak 404)
- ✅ Title berbeda tiap halaman (cek tab browser)
- ✅ Konten spesifik untuk bank tersebut (bukan generic)
- ✅ Ada breadcrumb navigation
- ✅ Ada related pages di bawah

#### ✅ Test E-Wallet Pages
- http://localhost:5173/convert-paypal-ke-gopay
- http://localhost:5173/convert-paypal-ke-shopeepay
- http://localhost:5173/convert-paypal-ke-linkaja

**Yang harus dilihat**:
- ✅ Halaman load dengan benar
- ✅ Design berbeda dari bank pages (green theme)
- ✅ Konten spesifik untuk e-wallet

#### ✅ Test Use Case Pages
- http://localhost:5173/untuk-freelancer
- http://localhost:5173/untuk-online-seller
- http://localhost:5173/untuk-content-creator
- http://localhost:5173/untuk-gamer

**Yang harus dilihat**:
- ✅ Halaman load dengan benar
- ✅ Ada section "Pain Points"
- ✅ Ada section "How We Help"
- ✅ Konten spesifik untuk persona

### Step 3: Verifikasi SEO Elements

Pada **SETIAP halaman yang ditest**, klik kanan → **View Page Source**, lalu cari:

#### Meta Tags (di dalam `<head>`)
```html
<!-- Harus ada dan berbeda per halaman -->
<title>Convert PayPal ke BCA - Rate Terbaik & Proses Cepat | Lapak Bang Ade</title>
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<link rel="canonical" href="https://lapakbangade.com/convert-paypal-ke-bca" />
```

#### Open Graph Tags
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
```

#### Structured Data (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Convert PayPal ke BCA - Lapak Bang Ade",
  ...
}
</script>
```

**✅ PASS jika**:
- Title tag berbeda tiap halaman
- Description berbeda tiap halaman
- URL canonical sesuai dengan halaman
- Ada minimal 1 JSON-LD script

**❌ FAIL jika**:
- Title sama semua halaman
- Meta tags tidak ada
- Structured data tidak ada

---

## ✅ CARA 2: Test Otomatis dengan Script

Saya buatkan script untuk test semua URL sekaligus!

### Jalankan Test Script

```bash
# Pastikan dev server jalan di terminal 1
cd build
npm run dev

# Di terminal 2, jalankan test script
node ../scripts/test-seo-pages.js
```

Script akan:
- ✅ Test semua 44 URLs
- ✅ Verify status code 200
- ✅ Check meta tags ada
- ✅ Check structured data
- ✅ Report mana yang berhasil/gagal

---

## ✅ CARA 3: Test di Production (Setelah Deploy)

### Step 1: Deploy ke Production

```bash
cd build
npm run build
npm run deploy
```

### Step 2: Test URLs Production

Ganti `localhost:5173` dengan domain production kamu, contoh:

- https://lapakbangade.com/convert-paypal-ke-bca
- https://lapakbangade.com/convert-paypal-ke-dana
- https://lapakbangade.com/untuk-freelancer

### Step 3: Validate dengan Google Tools

#### A. Google Rich Results Test
1. Buka: https://search.google.com/test/rich-results
2. Masukkan URL: `https://lapakbangade.com/convert-paypal-ke-bca`
3. Klik "Test URL"

**✅ PASS jika**:
- Page is eligible for rich results
- Breadcrumb detected
- Organization detected

#### B. Google Mobile-Friendly Test
1. Buka: https://search.google.com/test/mobile-friendly
2. Masukkan URL programmatic page
3. Klik "Test URL"

**✅ PASS jika**:
- "Page is mobile-friendly"

#### C. PageSpeed Insights
1. Buka: https://pagespeed.web.dev/
2. Masukkan URL programmatic page
3. Check score

**✅ PASS jika**:
- Performance > 80
- SEO > 90
- Best Practices > 80

---

## ✅ CARA 4: Verifikasi Sitemap

### Test Sitemap.xml

```bash
# Local
curl http://localhost:5173/sitemap.xml

# Production
curl https://lapakbangade.com/sitemap.xml
```

**✅ PASS jika**:
- File exist (status 200)
- Contains 44 `<url>` entries
- Valid XML format
- Contains all programmatic URLs

### Validate XML

Online validator:
1. Buka: https://www.xml-sitemaps.com/validate-xml-sitemap.html
2. Paste sitemap URL
3. Click "Validate"

**✅ PASS jika**: "Valid sitemap"

---

## ✅ CARA 5: Verifikasi Robots.txt

```bash
# Local
curl http://localhost:5173/robots.txt

# Production
curl https://lapakbangade.com/robots.txt
```

**✅ PASS jika**:
- Contains: `Allow: /convert-paypal-ke-*`
- Contains: `Allow: /untuk-*`
- Contains: `Sitemap: https://lapakbangade.com/sitemap.xml`
- Contains: `Disallow: /dashboard`

---

## ✅ CARA 6: Monitor Indexing (1-2 Minggu Setelah Deploy)

### Google Search Console

1. Login: https://search.google.com/search-console
2. Select property: lapakbangade.com
3. Go to: **Sitemaps**
4. Submit: `https://lapakbangade.com/sitemap.xml`

**Check Results**:
- Go to: **Pages** → **Indexed**
- Search filter: `/convert-paypal-ke-`
- **✅ PASS jika**: 9+ pages indexed (bank pages)

### Manual Search Test

Di Google search:

```
site:lapakbangade.com convert paypal ke bca
site:lapakbangade.com convert paypal ke dana
site:lapakbangade.com untuk freelancer
```

**✅ PASS jika**:
- Muncul hasil pencarian
- Title sesuai dengan halaman
- Description muncul di SERP

---

## ✅ CARA 7: Test Internal Links

### Check Footer Links

1. Buka: http://localhost:5173/
2. Scroll ke footer
3. Cari section "Convert ke Bank" dan "Convert ke E-Wallet"

**✅ PASS jika**:
- Ada links ke bank pages
- Ada links ke e-wallet pages
- Links berfungsi (klik untuk test)

### Check Landing Page Section

1. Buka: http://localhost:5173/
2. Scroll ke section "Layanan Convert PayPal Kami"

**✅ PASS jika**:
- Ada 3 kategori: Banks, E-Wallets, Use Cases
- Setiap kategori punya multiple links
- Links berfungsi

### Check Related Pages Widget

1. Buka: http://localhost:5173/convert-paypal-ke-bca
2. Scroll ke section "Layanan Convert PayPal Lainnya"

**✅ PASS jika**:
- Ada 3-5 related links
- Links ke bank/e-wallet lain
- Links berfungsi

---

## 🚨 Troubleshooting

### Problem: Page 404 Not Found

**Penyebab**:
- Routing belum setup dengan benar
- Build belum include component

**Solusi**:
```bash
# Rebuild
cd build
npm run build

# Check dist folder
ls dist/assets/*Page*.js

# Should see:
# BankPage-xxx.js
# EWalletPage-xxx.js
# UseCasePage-xxx.js
```

### Problem: Meta Tags Sama Semua

**Penyebab**:
- SEO component belum di-render
- Helmet tidak berfungsi

**Solusi**:
- Check console browser untuk error
- Pastikan `<HelmetProvider>` ada di App.tsx
- Rebuild: `npm run build`

### Problem: Structured Data Tidak Muncul

**Penyebab**:
- JSON-LD script belum ter-inject

**Solusi**:
- View page source
- Search: `application/ld+json`
- Check console untuk JSON errors

### Problem: Sitemap Empty atau Error

**Penyebab**:
- Script generate sitemap belum jalan

**Solusi**:
```bash
cd build
npm run generate:sitemap

# Check output
cat public/sitemap.xml | grep "<url>" | wc -l
# Should return: 44
```

---

## ✅ Quick Checklist

Gunakan checklist ini untuk verify:

### Local Testing
- [ ] Dev server berjalan (`npm run dev`)
- [ ] Test 3 bank pages → Load dengan benar
- [ ] Test 2 e-wallet pages → Load dengan benar
- [ ] Test 2 use case pages → Load dengan benar
- [ ] View source → Meta tags berbeda per page
- [ ] View source → Structured data ada
- [ ] Footer → Internal links berfungsi
- [ ] Landing page → Programmatic section ada

### Production Testing (After Deploy)
- [ ] Production URLs accessible
- [ ] Google Rich Results Test → PASS
- [ ] Mobile-Friendly Test → PASS
- [ ] PageSpeed Insights → Score > 80
- [ ] Sitemap.xml accessible
- [ ] Robots.txt correct

### Search Engine Verification (1-2 weeks)
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Pages indexed (check in GSC)
- [ ] Manual search → Pages appear in results
- [ ] Monitor rankings for target keywords

---

## 📊 Success Criteria

**READY FOR PRODUCTION** jika:
- ✅ All local tests pass
- ✅ All URLs return 200 status
- ✅ Meta tags unique per page
- ✅ Structured data present
- ✅ Sitemap generated (44 URLs)
- ✅ Robots.txt optimized
- ✅ Internal linking works
- ✅ Mobile-responsive
- ✅ No console errors

**PRODUCTION SUCCESS** jika (1-2 minggu):
- ✅ 90%+ pages indexed
- ✅ Rich results eligible
- ✅ Mobile-friendly
- ✅ PageSpeed > 80

**SEO SUCCESS** jika (1-3 bulan):
- ✅ Organic impressions meningkat
- ✅ Rankings untuk long-tail keywords
- ✅ Click-through rate meningkat
- ✅ Organic traffic naik 20-30%

---

## 🆘 Need Help?

Jika ada masalah:
1. Check browser console untuk error
2. Check Network tab untuk failed requests
3. Review documentation di `PROGRAMMATIC_SEO_IMPLEMENTATION.md`
4. Test dengan script otomatis
5. Verify build output di `dist/` folder

---

**Last Updated**: February 13, 2026
**Version**: 1.0
