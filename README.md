# PayPal Conversion Bot

Chatbot Facebook Messenger untuk layanan konversi saldo PayPal ke Rupiah dengan rate kompetitif dan proses yang aman. Bot ini menyediakan layanan konversi otomatis 24/7.

## 🚀 Fitur Utama

- 💱 Konversi PayPal ke IDR dengan rate real-time yang kompetitif
- 💬 Layanan otomatis 24/7 via Facebook Messenger
- 🔒 Sistem verifikasi bukti transfer yang aman
- 📊 Update rate otomatis setiap 5 menit
- 📱 Notifikasi status transaksi real-time

## 📋 Spesifikasi Teknis

- Framework: Flask 2.0.1
- Database: MongoDB Atlas
- Deployment: Render
- Bahasa: Python 3.9.12
- API: Facebook Messenger Platform v21.0

## 💻 Cara Menggunakan Bot

1. Mulai chat dengan bot via [Messenger](https://m.me/lapakbangade)
2. Klik button yang tersedia di menu utama:
   - 💰 **Convert PayPal**: Mulai proses konversi
   - 💱 **Cek Rate**: Lihat kurs USD-IDR terkini
   - ❓ **FAQ**: Informasi dan bantuan

### Alur Konversi
1. Klik button "Convert PayPal"
2. Masukkan data yang diminta:
   - Email PayPal
   - Bank/E-wallet tujuan
   - Nomor rekening/ID
3. Input jumlah USD yang akan dikonversi
4. Upload bukti transfer PayPal
5. Tunggu verifikasi dan proses transfer (30-60 menit)
6. Terima notifikasi saat transfer selesai

## 🔒 Sistem Keamanan

- Verifikasi multi-layer untuk setiap transaksi
- Tracking ID unik untuk setiap transaksi
- Penyimpanan data terenkripsi di MongoDB Atlas
- Monitoring transaksi real-time oleh sistem

## 📊 Status Transaksi

| Status | Deskripsi |
|--------|-----------|
| `pending` | Menunggu verifikasi admin |
| `processing` | Sedang dalam proses transfer |
| `completed` | Transaksi selesai |
| `rejected` | Bukti transfer ditolak |

## 🛡️ Batasan Layanan

- Minimal konversi: $10
- Maksimal konversi: $5,000/hari
- Fee konversi: $5/transaksi
- Waktu proses: 30-60 menit (jam kerja)
- Jam operasional CS: 08.00-20.00 WIB

## 🔄 Changelog

### v1.0.0 (November 2024)
- Implementasi sistem konversi otomatis dengan UI button
- Integrasi verifikasi bukti transfer
- Sistem tracking status transaksi
- Notifikasi real-time via Messenger
- Implementasi rate limiting

## 📞 Kontak Support

- Facebook: [@aadenaufall](https://facebook.com/aadenaufall)
- WhatsApp: [0821-1330-4116](https://wa.me/6282113304116)
- Email: ade.naufal@gmail.com

## 🛡️ Disclaimer

```
Bot ini adalah layanan independen dan tidak berafiliasi dengan PayPal, Inc.
Semua merek dagang yang disebutkan adalah milik dari pemiliknya masing-masing.
Pengguna diwajibkan membaca dan menyetujui syarat & ketentuan sebelum menggunakan layanan.
```

## 📜 Lisensi

Copyright © 2024 Lapak Bang Ade. All rights reserved.

Made with ❤️ in Indonesia
