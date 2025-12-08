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
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Definisi Layanan</h2>
            <p>
              {CONFIG.APP_NAME} adalah jasa perseorangan yang melayani penukaran (convert) saldo PayPal (USD) menjadi mata uang Rupiah (IDR) yang dikirimkan ke rekening bank atau e-wallet lokal.
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
        </div>
      </main>
      <Footer />
    </div>
  );
};