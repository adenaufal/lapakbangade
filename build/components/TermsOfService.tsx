import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CONFIG } from '../constants';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Syarat dan Ketentuan</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <p className="lead text-lg text-gray-700">
              Selamat datang di <strong>{CONFIG.APP_NAME}</strong>. Dengan menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui Syarat dan Ketentuan berikut ini.
            </p>
            <p className="text-sm text-gray-500">Terakhir diperbarui: Desember 2025</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Definisi Layanan</h2>
            <p>
              {CONFIG.APP_NAME} adalah jasa perseorangan yang melayani penukaran (convert) saldo PayPal (USD) menjadi mata uang Rupiah (IDR) yang dikirimkan ke rekening bank atau e-wallet lokal.
              Kami juga menyediakan top-up saldo PayPal (IDR ke USD) dan layanan manual tertentu (misal: pembelian online) sesuai kesepakatan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Sumber Dana (Source of Funds)</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Saldo PayPal wajib berasal dari sumber yang <strong>LEGAL</strong> dan <strong>SAH</strong> (misal: hasil freelance, gaji, penjualan barang/jasa digital yang sah).</li>
              <li>Kami <strong>MENOLAK TEGAS</strong> saldo hasil carding, hacking, fraud, atau tindak kejahatan lainnya.</li>
              <li>Jika dikemudian hari ditemukan indikasi dana ilegal yang menyebabkan akun PayPal kami terkena limit atau dispute, kami berhak melaporkan data Anda ke pihak berwajib dan mempublikasikan data penipu di jaringan exchanger Indonesia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Mekanisme Transaksi</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Rate kurs bersifat fluktuatif dan dapat berubah sewaktu-waktu mengikuti pasar. Rate yang berlaku adalah rate saat Anda melakukan deal transaksi.</li>
              <li>Pengiriman saldo PayPal wajib menggunakan metode <strong>Friends & Family</strong> agar tidak terkena hold 21 hari. Jika Anda mengirim menggunakan Goods & Services, kami berhak menolak atau melakukan refund (potongan fee PayPal ditanggung pengirim).</li>
              <li>Proses pencairan Rupiah dilakukan setelah saldo PayPal masuk dan terverifikasi aman oleh Admin.</li>
              <li>Untuk top-up (IDR ke USD), pengguna mentransfer Rupiah sesuai nominal yang disepakati sebelum USD dikirim ke akun PayPal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Pembatalan dan Refund</h2>
            <p>
              Transaksi yang sudah diproses (Rupiah sudah dikirim) tidak dapat dibatalkan. Jika saldo PayPal terkena dispute/chargeback oleh pengirim setelah transaksi selesai, pengguna wajib bertanggung jawab penuh mengganti kerugian materiil yang dialami {CONFIG.APP_NAME}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Jam Operasional</h2>
            <p>
              Layanan diproses pada jam operasional {CONFIG.OPERATIONAL_HOURS}. Transaksi di luar jam tersebut akan diproses pada jam kerja berikutnya atau sesuai ketersediaan Admin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Batas dan Struktur Fee</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Minimal transaksi $1 dan maksimal $5,000 per hari per pengguna.</li>
              <li>Fee convert: 10% untuk nominal di bawah $50, atau flat $5 untuk nominal $50 ke atas.</li>
              <li>Promo Jumat: potongan 50% fee untuk transaksi di bawah $50 pada transaksi pertama di hari Jumat (WIB), jika tersedia.</li>
              <li>Top-up: tidak ada fee tambahan; nominal Rupiah dihitung dari rate yang disepakati.</li>
              <li>Express (jika ditawarkan): dikenakan surcharge transparan sesuai informasi saat pemesanan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Rate dan Pembaruan</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Rate diperbarui berkala: umumnya setiap 1 jam pada 08:00-20:00 WIB dan setiap 3 jam di luar jam tersebut.</li>
              <li>Kesepakatan rate terjadi saat pengguna menyetujui transaksi (deal). Perubahan setelah deal tidak berlaku surut.</li>
              <li>Penyesuaian atau promo khusus dapat diinformasikan langsung oleh admin pada saat transaksi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Kewajiban dan Larangan Pengguna</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Memberikan data yang benar (email PayPal, nama rekening, nomor rekening/e-wallet, bukti transfer).</li>
              <li>Tidak menggunakan layanan untuk aktivitas ilegal, pencucian uang, pendanaan terlarang, atau pelanggaran hak cipta.</li>
              <li>Tidak mengunggah bukti palsu atau memanipulasi transaksi.</li>
              <li>Bersedia memberikan bukti tambahan jika diminta untuk verifikasi keamanan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Sengketa dan Dispute</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Setelah Rupiah ditransfer sesuai data yang diberikan pengguna, transaksi dianggap selesai.</li>
              <li>Jika terjadi dispute di PayPal (misal chargeback), pengguna berkewajiban menyelesaikan dispute dan mengganti kerugian jika merugikan {CONFIG.APP_NAME}.</li>
              <li>Jika terjadi kesalahan transfer akibat data yang diberikan pengguna, {CONFIG.APP_NAME} tidak menanggung kerugian tersebut.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Pembatasan Tanggung Jawab</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Layanan disediakan secara “as is” dan bergantung pada ketersediaan PayPal, perbankan, dan jaringan pihak ketiga.</li>
              <li>{CONFIG.APP_NAME} tidak bertanggung jawab atas keterlambatan yang disebabkan gangguan bank/e-wallet, PayPal hold, atau kendala teknis pihak ketiga.</li>
              <li>Tanggung jawab maksimum atas klaim apa pun dibatasi pada nilai transaksi terkait.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Perubahan Ketentuan</h2>
            <p>
              {CONFIG.APP_NAME} dapat memperbarui Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diumumkan di situs atau halaman kebijakan. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan atas versi terbaru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Privasi dan Data</h2>
            <p>
              Penggunaan layanan ini juga tunduk pada Kebijakan Privasi kami. Harap membaca halaman Kebijakan Privasi untuk memahami cara data Anda dikumpulkan, digunakan, dan disimpan.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
