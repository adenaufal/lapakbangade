import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CONFIG } from "../constants";

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Syarat dan Ketentuan
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Terakhir diperbarui: 3 Februari 2026
        </p>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <p className="lead text-lg text-gray-700">
              Selamat datang di <strong>{CONFIG.APP_NAME}</strong>. Dengan
              menggunakan layanan kami, Anda dianggap telah membaca, memahami,
              dan menyetujui Syarat dan Ketentuan berikut ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Definisi Layanan
            </h2>
            <p>
              {CONFIG.APP_NAME} adalah jasa perseorangan yang melayani penukaran
              saldo PayPal (USD) menjadi mata uang Rupiah (IDR) yang dikirimkan
              ke rekening bank atau e-wallet lokal. Kami juga menyediakan top-up
              saldo PayPal (IDR ke USD) dan layanan manual tertentu sesuai
              kesepakatan.
            </p>
            <p className="mt-2">
              Layanan ini ditujukan solely untuk pengguna domestik di wilayah
              Indonesia. Kami tidak melayani transaksi lintas negara atau klien
              internasional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Definisi Peran dan Kepemilikan Dana
            </h2>
            <p className="font-semibold text-gray-800 mb-2">
              Dalam setiap transaksi, terdapat tiga peran yang harus dipahami:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Pengirim (Sender):</strong> Pihak yang mengirim dana
                dari akun pembayaran pihak ketiga.
              </li>
              <li>
                <strong>Penerima (Beneficiary):</strong> Pihak yang menerima
                dana Rupiah ke rekening bank atau e-wallet lokal.
              </li>
              <li>
                <strong>Pemilik Dana (Owner of Funds):</strong> Pihak yang
                sebenarnya memiliki hak atas dana yang ditransfer.
              </li>
            </ul>
            <p className="mt-3">
              Pengguna menyatakan bahwa dana yang ditranser adalah milik pribadi
              atau dana yang memiliki otorisasi lengkap untuk digunakan.{" "}
              {CONFIG.APP_NAME} berhak menolak transaksi yang melibatkan dana
              dengan kepemilikan pihak ketiga yang tidak dapat diverifikasi atau
              dicurigai sebagai "akun penampung" (buffer account).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Sumber Dana (Source of Funds)
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Saldo yang ditukar wajib berasal dari sumber yang{" "}
                <strong>LEGAL</strong> dan <strong>SAH</strong> (misal: hasil
                pekerjaan freelance, gaji, penjualan barang atau jasa digital
                yang sah, hadiah dari pihak yang dikenal).
              </li>
              <li>
                Kami <strong>MENOLAK TEGAS</strong> dana hasil kegiatan ilegal
                termasuk namun tidak terbatas pada carding, hacking, fraud, atau
                tindak kejahatan lainnya.
              </li>
              <li>
                Jika dikemudian hari ditemukan indikasi dana ilegal yang
                menyebabkan akun pembayaran kami terkena limit, pembekuan, atau
                dispute, kami berhak melaporkan data Anda ke pihak berwajib dan
                mengumumkan data penipu di jaringan exchanger Indonesia.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Mekanisme Transaksi
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Rate kurs bersifat fluktuatif dan dapat berubah sewaktu-waktu
                mengikuti pasar. Rate yang berlaku adalah rate saat Anda
                melakukan kesepakatan transaksi.
              </li>
              <li>
                Pengiriman saldo harus menggunakan metode yang{" "}
                <strong>meminimalkan risiko penahanan dana</strong> oleh pihak
                penyedia layanan pembayaran. Transaksi yang dikirim dengan
                metode yang berpotensi menyebabkan penahanan dana jangka panjang
                dapat ditolak atau dikembalikan dengan biaya administrasi
                ditanggung pengirim.
              </li>
              <li>
                Proses pencairan Rupiah dilakukan setelah saldo diterima dan
                terverifikasi aman oleh Admin.
              </li>
              <li>
                Untuk top-up (IDR ke USD), pengguna mentransfer Rupiah sesuai
                nominal yang disepakati sebelum USD dikirim ke akun pembayaran.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Penolakan Transaksi
            </h2>
            <p>
              {CONFIG.APP_NAME} berhak mutlak untuk menolak atau membatalkan
              transaksi tanpa penjelasan lebih lanjut, termasuk namun tidak
              terbatas pada alasan berikut:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Dana yang berasal dari sumber yang mencurigakan atau tidak dapat
                diverifikasi.
              </li>
              <li>
                Transaksi yang melibatkan pihak ketiga dengan kepemilikan dana
                yang tidak jelas.
              </li>
              <li>
                Indikasi penggunaan akun sebagai "penampung" (buffer) untuk dana
                pihak lain.
              </li>
              <li>Pelanggaran terhadap Syarat dan Ketentuan ini.</li>
              <li>Alasan keamanan dan kepatuhan internal lainnya.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Pembatalan dan Refund
            </h2>
            <p>
              Transaksi yang sudah diproses (Rupiah sudah dikirim) tidak dapat
              dibatalkan. Jika saldo terkena dispute, chargeback, atau klaim
              balik oleh pengirim setelah transaksi selesai, pengguna yang
              bertanggung jawab atas dana tersebut wajib mengganti kerugian
              materiil secara penuh yang dialami {CONFIG.APP_NAME}.
            </p>
            <p className="mt-2">
              Pengguna yang dengan sengaja memicu dispute, chargeback, atau
              klaim palsu akan dikenakan tanggung jawab penuh atas semua
              kerugian yang timbul, termasuk biaya administrasi, penalti, dan
              kerusakan reputasi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Jam Operasional
            </h2>
            <p>
              Layanan diproses pada jam operasional {CONFIG.OPERATIONAL_HOURS}.
              Transaksi di luar jam tersebut akan diproses pada jam kerja
              berikutnya atau sesuai ketersediaan Admin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Batas dan Struktur Fee
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Minimal transaksi $1 dan maksimal $5,000 per hari per pengguna.
              </li>
              <li>
                Fee convert: 10% untuk nominal di bawah $50, atau flat $5 untuk
                nominal $50 ke atas.
              </li>
              <li>
                Promo Jumat: potongan 50% fee untuk transaksi di bawah $50 pada
                transaksi pertama di hari Jumat (WIB), jika tersedia.
              </li>
              <li>
                Top-up: tidak ada fee tambahan; nominal Rupiah dihitung dari
                rate yang disepakati.
              </li>
              <li>
                Express (jika ditawarkan): dikenakan surcharge transparan sesuai
                informasi saat pemesanan.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Rate dan Pembaruan
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Rate diperbarui berkala: umumnya setiap 1 jam pada 08:00-20:00
                WIB dan setiap 3 jam di luar jam tersebut.
              </li>
              <li>
                Kesepakatan rate terjadi saat pengguna menyetujui transaksi
                (deal). Perubahan setelah deal tidak berlaku surut.
              </li>
              <li>
                Penyesuaian atau promo khusus dapat diinformasikan langsung oleh
                admin pada saat transaksi.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Kewajiban dan Larangan Pengguna
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Memberikan data yang benar dan akurat (email akun pembayaran,
                nama rekening, nomor rekening/e-wallet, bukti transfer).
              </li>
              <li>
                Tidak menggunakan layanan untuk aktivitas ilegal, pencucian
                uang, pendanaan terlarang, atau pelanggaran hak cipta.
              </li>
              <li>
                Tidak mengunggah bukti palsu atau memanipulasi data transaksi.
              </li>
              <li>
                Bersedia memberikan bukti tambahan jika diminta untuk verifikasi
                keamanan.
              </li>
              <li>
                Tidak menggunakan akun pihak ketiga tanpa otorisasi yang sah
                untuk melakukan transaksi.
              </li>
              <li>
                Memastikan bahwa dana yang ditranser bukan berasal dari
                aktivitas yang melanggar ketentuan layanan penyedia pembayaran
                pihak ketiga manapun.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Sengketa dan Tanggung Jawab
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Setelah Rupiah ditransfer sesuai data yang diberikan pengguna,
                transaksi dianggap selesai.
              </li>
              <li>
                Setiap dispute, chargeback, atau klaim yang muncul kemudian hari
                menjadi tanggung jawab penuh pengguna yang terkait dengan dana
                tersebut.
              </li>
              <li>
                Pengguna bertanggung jawab atas semua konsekuensi hukum dan
                finansial akibat misrepresentasi (penyataan palsu) mengenai
                sumber atau kepemilikan dana.
              </li>
              <li>
                Dispute yang disebabkan oleh penggunaan akun pihak ketiga tanpa
                otorisasi atau dana yang tidak dimiliki secara sah adalah
                tanggung jawab pengguna yang melakukan transaksi.
              </li>
              <li>
                Jika terjadi kesalahan transfer akibat data yang diberikan
                pengguna, {CONFIG.APP_NAME} tidak menanggung kerugian tersebut.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Pembatasan Tanggung Jawab
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Layanan disediakan secara "as is" dan bergantung pada
                ketersediaan layanan pembayaran pihak ketiga, perbankan, dan
                jaringan terkait.
              </li>
              <li>
                {CONFIG.APP_NAME} tidak bertanggung jawab atas keterlambatan
                yang disebabkan gangguan bank/e-wallet, penahanan dana oleh
                pihak ketiga, atau kendala teknis lain di luar kendali kami.
              </li>
              <li>
                Tanggung jawab maksimum atas klaim apa pun dibatasi pada nilai
                transaksi terkait.
              </li>
              <li>
                {CONFIG.APP_NAME} tidak memberikan jaminan atas kelangsungan
                layanan pihak ketiga atau kepatuhan transaksi terhadap ketentuan
                layanan pihak ketiga tersebut.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Perubahan Ketentuan
            </h2>
            <p>
              {CONFIG.APP_NAME} dapat memperbarui Syarat dan Ketentuan ini
              sewaktu-waktu. Perubahan akan diumumkan di situs atau halaman
              kebijakan. Penggunaan layanan setelah perubahan dianggap sebagai
              persetujuan atas versi terbaru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              14. Privasi dan Data
            </h2>
            <p>
              Penggunaan layanan ini juga tunduk pada Kebijakan Privasi kami.
              Harap membaca halaman Kebijakan Privasi untuk memahami cara data
              Anda dikumpulkan, digunakan, dan disimpan.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
