import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CONFIG } from '../constants';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Kebijakan Privasi</h1>
        <p className="text-sm text-gray-600 mb-8">Terakhir diperbarui: 8 Desember 2025</p>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <p className="lead text-lg text-gray-700">
              Kebijakan Privasi ini menjelaskan bagaimana <strong>{CONFIG.APP_NAME}</strong> mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda ketika menggunakan layanan convert dan top-up PayPal kami. Dengan menggunakan layanan, Anda menyetujui praktik yang dijelaskan di bawah ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Ruang Lingkup & Definisi</h2>
            <p>
              Kebijakan ini berlaku untuk seluruh pengguna layanan konversi (USD ke IDR) dan top-up (IDR ke USD) yang berinteraksi melalui situs, chatbot, atau kanal komunikasi terkait. Informasi pribadi mencakup data yang dapat mengidentifikasi Anda secara langsung atau tidak langsung, seperti nama, kontak, dan detail transaksi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Informasi yang Dikumpulkan</h2>
            <p>Kami dapat mengumpulkan jenis data berikut:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Identitas dan kontak: nama, user ID/handle, email PayPal, nomor WhatsApp/telepon.</li>
              <li>Data pembayaran: rekening bank atau e-wallet tujuan, bukti transfer, screenshot transaksi.</li>
              <li>Data transaksi: nominal USD/IDR, jenis layanan (convert/top-up), status, waktu transaksi.</li>
              <li>Data teknis: log aktivitas, device/browser metadata, dan catatan error untuk debugging.</li>
              <li>Riwayat percakapan: chat dengan admin/bot untuk keperluan audit dan dukungan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Tujuan Penggunaan Data</h2>
            <p>Data digunakan untuk:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Memproses transaksi convert/top-up dan mengirim konfirmasi status.</li>
              <li>Verifikasi identitas, sumber dana, dan pencegahan penipuan.</li>
              <li>Dukungan pelanggan dan penyelesaian kendala transaksi.</li>
              <li>Analitik layanan (mis. performa rate, beban transaksi) dan peningkatan kualitas.</li>
              <li>Kepatuhan hukum dan pemenuhan kewajiban pelaporan jika diminta otoritas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Dasar Hukum Pemrosesan</h2>
            <p>
              Kami memproses data berdasarkan: (a) persetujuan Anda, (b) pelaksanaan perjanjian layanan, (c) kewajiban hukum, dan (d) kepentingan sah untuk menjaga keamanan dan mencegah fraud. Jika Anda menarik persetujuan, beberapa layanan mungkin tidak dapat diberikan sepenuhnya.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Penyimpanan & Keamanan</h2>
            <p>Kami menerapkan langkah-langkah berikut untuk menjaga kerahasiaan data:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Penyimpanan terenkripsi dan akses terbatas hanya untuk admin terverifikasi.</li>
              <li>Audit trail dan pemantauan aktivitas mencurigakan secara berkala.</li>
              <li>Backup berkala dan proteksi terhadap serangan DDoS/brute force.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Retensi Data</h2>
            <p>Data disimpan sesuai kebutuhan operasional dan hukum, antara lain:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Data transaksi: hingga 5 tahun (atau sesuai kewajiban audit/pajak).</li>
              <li>Riwayat chat: hingga 1 tahun untuk referensi layanan.</li>
              <li>Log teknis/error: hingga 90 hari untuk pemeliharaan sistem.</li>
              <li>Data kadaluarsa atau atas permintaan sah akan dihapus atau dianonimkan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Berbagi Data</h2>
            <p>Data dapat dibagikan secara terbatas dengan:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Penyedia layanan pembayaran/hosting/analitik yang mendukung operasional.</li>
              <li>Otoritas hukum apabila diwajibkan peraturan yang berlaku.</li>
              <li>Pihak ketiga lain hanya dengan persetujuan eksplisit Anda.</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">Kami tidak menjual data pribadi Anda.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Hak Anda</h2>
            <p>Anda dapat mengajukan: akses, koreksi, penghapusan, keberatan/pembatasan pemrosesan, dan penarikan persetujuan. Permintaan akan diverifikasi untuk memastikan keamanan data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Cookie & Analitik</h2>
            <p>
              Kami dapat menggunakan cookie atau pelacakan serupa untuk analitik dan pengukuran kampanye (misal Google Analytics). Anda dapat menonaktifkan cookie melalui pengaturan browser, namun beberapa fitur mungkin terpengaruh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Transfer Internasional</h2>
            <p>
              Jika data diproses di luar Indonesia oleh penyedia layanan pihak ketiga, kami akan memastikan perlindungan yang sebanding sesuai praktik industri dan ketentuan yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Anak di Bawah Umur</h2>
            <p>
              Layanan ini tidak ditujukan bagi individu di bawah usia yang diizinkan untuk membuat akun pembayaran secara mandiri. Jika kami mengetahui ada data anak di bawah umur, kami akan menghapusnya setelah verifikasi yang wajar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Perubahan Kebijakan</h2>
            <p>
              Pembaruan Kebijakan Privasi akan dipublikasikan di halaman ini dan berlaku sejak tanggal penerbitan. Penggunaan layanan setelah pembaruan menandakan persetujuan Anda atas versi terbaru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Kontak</h2>
            <p>Jika ada pertanyaan atau permintaan terkait privasi:</p>
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
