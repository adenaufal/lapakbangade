# Assets & Image Guide

Panduan untuk menyiapkan file gambar (avatar) untuk testimoni agar tampilan website tetap optimal dan cepat.

## Lokasi Penyimpanan Gambar
Semua gambar testimoni sebaiknya diletakkan di dalam folder publik:
`build/public/assets/testimonials/`

*Jika folder belum ada, silakan buat manual.*

## Spesifikasi Gambar

| Kriteria | Rekomendasi |
| :--- | :--- |
| **Dimensi** | Minimal **96px x 96px** (Rasio 1:1 / Square) |
| **Format** | **.webp** (sangat disarankan) atau **.jpg** |
| **Ukuran File** | Di bawah **20 KB** per gambar |
| **Gaya** | Foto wajah dengan background yang bersih atau tidak terlalu ramai |

## Cara Menggunakan Gambar Lokal
Setelah gambar diupload ke `build/public/assets/testimonials/foto.webp`, Anda bisa memanggilnya di file data dengan path:

`avatar: "/assets/testimonials/foto.webp"`

*(Catatan: Folder `public` adalah root, jadi tidak perlu menuliskan kata `public` di dalam path coding).*

## Tool Optimasi Gambar
Untuk mengubah gambar menjadi format `.webp` yang ringan, anda bisa menggunakan:
1. **Squoosh.app** (Browser-based, sangat mudah)
2. **TinyJPG / TinyPNG** (Untuk kompresi)
3. **Photoshop / Canva** (Export as webp)

## Kenapa Harus WebP?
Format WebP memberikan kualitas yang setara dengan JPEG namun dengan ukuran file hingga 30% lebih kecil. Ini penting karena testimoni kita berjalan secara animasi (marquee), sehingga gambar yang ringan akan membuat animasi terasa jauh lebih smooth (lancar) di HP maupun Desktop.
