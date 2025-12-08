import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CONFIG } from '../constants';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Kebijakan Privasi</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <p className="lead text-lg text-gray-700">
              Di <strong>{CONFIG.APP_NAME}</strong>, kami sangat menghargai privasi Anda. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan convert PayPal kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p>Untuk memproses transaksi convert saldo PayPal ke Rupiah, kami mungkin meminta informasi berikut:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Nama lengkap sesuai rekening bank/e-wallet.</li>
              <li>Alamat email PayPal (untuk verifikasi sumber dana).</li>
              <li>Nomor rekening bank atau nomor e-wallet tujuan pencairan.</li>
              <li>Bukti transfer (screenshot) transaksi PayPal.</li>
              <li>Riwayat percakapan chat untuk keperluan audit transaksi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Penggunaan Informasi</h2>
            <p>Informasi yang Anda berikan hanya digunakan untuk:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Memverifikasi legalitas sumber dana (Anti-Fraud).</li>
              <li>Memproses transfer Rupiah ke rekening tujuan.</li>
              <li>Menghubungi Anda jika terjadi kendala pada transaksi.</li>
              <li>Meningkatkan kualitas layanan pelanggan kami.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Perlindungan Data</h2>
            <p>
              Kami menerapkan langkah-langkah keamanan manual dan sistematis untuk menjaga kerahasiaan data Anda. Kami tidak akan pernah menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga manapun, kecuali jika diwajibkan oleh hukum yang berlaku di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Transaksi Pihak Ketiga</h2>
            <p>
              Layanan kami menggunakan platform pihak ketiga seperti PayPal, Facebook Messenger, dan layanan perbankan/e-wallet. Kami menyarankan Anda untuk membaca kebijakan privasi masing-masing platform tersebut, karena kami tidak bertanggung jawab atas kebijakan privasi mereka.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami melalui tombol Messenger yang tersedia di website ini.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};