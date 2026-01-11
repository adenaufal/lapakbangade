# Testimonial Data Template

Dokumen ini berisi panduan untuk menambahkan atau mengubah data testimoni yang muncul di website.

## Lokasi File
Data testimoni saat ini berada di dalam file:
`build/TESTIMONIALS.ts`.

## Struktur Data
Setiap testimoni harus mengikuti struktur (interface) berikut:

```typescript
{
  id: number;           // ID unik (harus berurutan/unik)
  name: string;         // Nama pengirim testimoni
  avatar: string;       // URL foto/avatar (bisa link luar atau path lokal)
  content: string;      // Isi testimoni (gunakan tanda kutip ganda)
  platform: string;      // Platform asal (contoh: 'Facebook', 'WhatsApp', 'Upwork')
}
```

## Cara Menambah Testimoni Baru

1. Buka file `build/TESTIMONIALS.ts`.
2. Cari variabel `export const TESTIMONIALS`.
3. Tambahkan objek baru di akhir array. Contoh:

```typescript
  {
    id: 11,
    name: "Nama Customer",
    avatar: "/assets/testimonials/foto-customer.webp",
    content: "Puas banget sama layanannya, prosesnya praktis dan aman.",
    platform: "WhatsApp"
  },
```

4. Simpan file dan jalankan `npm run build` untuk melihat perubahan di production.

## Tips Penulisan
- **Authenticity**: Biarkan tipografi asli (seperti penggunaan "gw", "sy") jika ingin terlihat lebih organik, namun tetap pastikan mudah dibaca.
- **Panjang Teks**: Usahakan panjang teks testimoni seragam (sekitar 2-3 baris) agar tampilan marquee terlihat rapi.
