# Deploy ke Render

Project ini sudah dikonfigurasi untuk deploy ke Render menggunakan `render.yaml`.

## Langkah-langkah Deploy

### 1. Push Code ke Git Repository
Pastikan semua perubahan sudah di-commit dan push ke GitHub/GitLab/Bitbucket.

### 2. Connect Repository di Render
1. Login ke [Render Dashboard](https://dashboard.render.com)
2. Klik **New +** → **Blueprint**
3. Connect repository GitHub/GitLab Anda
4. Pilih repository `lapakbangade`
5. Render akan otomatis detect file `render.yaml`

### 3. Configure Environment Variables
Setelah service dibuat, tambahkan environment variable berikut di Render Dashboard:

- **EXCHANGE_RATE_API_KEY**: API key dari [ExchangeRate-API](https://www.exchangerate-api.com/)
  - Daftar gratis di exchangerate-api.com
  - Copy API key Anda
  - Paste ke Render environment variables

### 4. Deploy
Render akan otomatis:
1. Install dependencies (`npm install`)
2. Build frontend di folder `build` (`npm run build`)
3. Start server Express (`node server.js`)
4. Serve static files dari `build/dist`
5. Handle API endpoint di `/api/rate`

## Struktur Deploy

```
Root
├── render.yaml          # Render configuration
├── package.json         # Server dependencies (Express)
├── server.js            # Express server (static files + API)
└── build/
    ├── package.json     # Frontend dependencies
    ├── dist/            # Built static files (setelah build)
    └── ...
```

## Endpoints

Setelah deploy:
- **Website**: `https://lapakbangade.onrender.com`
- **API Rate**: `https://lapakbangade.onrender.com/api/rate`

## Free Plan Notes

Render Free Plan:
- ✅ Gratis selamanya
- ✅ SSL otomatis
- ✅ Custom domain support
- ⚠️ Service sleep setelah 15 menit idle (cold start ~30 detik)
- ⚠️ 750 jam/bulan (cukup untuk 1 service 24/7)

Untuk production dengan traffic tinggi, upgrade ke paid plan ($7/bulan) untuk menghindari cold start.

## Troubleshooting

### Blank White Page
**Penyebab umum:**
1. Build command gagal - cek logs di Render Dashboard
2. Path static files salah - pastikan `build/dist` folder ter-generate
3. HTML parse error - sudah diperbaiki (noscript tag dipindah ke body)

**Solusi:**
- Pastikan build berhasil: lihat "Build succeeded" di logs
- Check file structure: `build/dist/index.html` dan `build/dist/assets/` harus ada
- Test lokal: `cd build && npm run build` (harus sukses tanpa error)

### Service gagal build
- Periksa build logs di Render Dashboard
- Pastikan semua dependencies terinstall
- Cek error parse HTML jika ada - pastikan HTML valid

### API rate tidak bekerja
- Periksa environment variable `EXCHANGE_RATE_API_KEY` sudah diset
- Test endpoint: `curl https://your-app.onrender.com/api/rate`
- Should return: `{"baseRate":16500,"source":"fallback_no_key"}` jika API key belum diset

### 404 pada routing
- Sudah dihandle dengan `app.get('*')` di server.js untuk SPA routing
- Semua route akan serve index.html untuk client-side routing React

## Manual Deploy (Alternative)

Jika tidak menggunakan Blueprint, Anda bisa manual setup:

1. **New Web Service** di Render
2. **Build Command**: `cd build && npm install && npm run build`
3. **Start Command**: `node server.js`
4. **Environment**: Node
5. **Region**: Singapore (lebih dekat ke Indonesia)
