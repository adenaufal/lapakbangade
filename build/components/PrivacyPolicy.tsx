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
            <p className="text-sm text-gray-500">Terakhir diperbarui: 11 November 2024</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p>Untuk memproses transaksi convert saldo PayPal ke Rupiah, kami mungkin meminta informasi berikut:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Data identitas Facebook Messenger (user ID dan nama).</li>
              <li>Nama lengkap sesuai rekening bank/e-wallet.</li>
              <li>Alamat email PayPal (untuk verifikasi sumber dana).</li>
              <li>Nomor rekening bank atau nomor e-wallet tujuan pencairan.</li>
              <li>Bukti transfer dan screenshot transaksi PayPal.</li>
              <li>Riwayat percakapan chat untuk keperluan audit transaksi.</li>
              <li>Rating dan feedback dari pengguna.</li>
              <li>Log aktivitas dan error untuk keperluan debugging.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Penggunaan Informasi</h2>
            <p>Informasi yang Anda berikan hanya digunakan untuk:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Memproses transaksi konversi PayPal ke IDR.</li>
              <li>Verifikasi identitas dan keabsahan transaksi.</li>
              <li>Mengirim notifikasi status transaksi.</li>
              <li>Menyimpan riwayat transaksi untuk referensi.</li>
              <li>Menganalisis dan meningkatkan layanan bot serta layanan pelanggan.</li>
              <li>Menangani masalah teknis dan customer service.</li>
              <li>Mencegah kecurangan dan aktivitas mencurigakan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Penyimpanan dan Keamanan</h2>
            <p>Kami menerapkan langkah-langkah keamanan berikut untuk menjaga kerahasiaan data Anda:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Data disimpan dengan enkripsi standar industri.</li>
              <li>Akses database dibatasi hanya untuk admin terverifikasi.</li>
              <li>Monitoring transaksi real-time dan pencatatan audit trail.</li>
              <li>Backup data berkala dengan enkripsi tambahan.</li>
              <li>Rate limiting dan proteksi DDoS untuk menjaga kestabilan layanan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Pembagian Data</h2>
            <p>Kami tidak akan membagikan data pribadi Anda kepada pihak ketiga kecuali:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Atas persetujuan eksplisit dari Anda.</li>
              <li>Diperlukan untuk proses transaksi (bank atau e-wallet tujuan).</li>
              <li>Diwajibkan oleh hukum atau otoritas yang berwenang.</li>
              <li>Diperlukan untuk melindungi hak dan keamanan pengguna lain.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Hak Pengguna</h2>
            <p>Sebagai pengguna, Anda berhak untuk:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Mengakses data pribadi yang kami simpan.</li>
              <li>Meminta koreksi atas data yang tidak akurat.</li>
              <li>Meminta penghapusan data (right to be forgotten).</li>
              <li>Membatasi penggunaan data tertentu.</li>
              <li>Mendapatkan penjelasan tentang penggunaan data Anda.</li>
              <li>Menarik persetujuan penggunaan data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Periode Penyimpanan</h2>
            <p>Kebijakan retensi data kami:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Data transaksi: 5 tahun.</li>
              <li>Riwayat chat: 1 tahun.</li>
              <li>Log error: 90 hari.</li>
              <li>Bukti transfer: 2 tahun.</li>
              <li>Data tidak aktif: dihapus setelah 2 tahun.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Hubungi Kami</h2>
            <p>Untuk pertanyaan mengenai privasi atau permintaan terkait data Anda, hubungi kami melalui:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Facebook: <a href="https://facebook.com/aadenaufall" className="text-brand-600 hover:underline">@aadenaufall</a></li>
              <li>WhatsApp: <a href="https://wa.me/6282113304116" className="text-brand-600 hover:underline">0821-1330-4116</a></li>
              <li>Email: <a href="mailto:ade.naufal@gmail.com" className="text-brand-600 hover:underline">ade.naufal@gmail.com</a></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
