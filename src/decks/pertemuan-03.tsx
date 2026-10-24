import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, CompareCodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, CardGrid, Take,
} from '../layouts';

const s = {
  review: snip('p03/review'), banding: snip('p03/banding'), ifDasar: snip('p03/if-dasar'),
  indBenar: snip('p03/indentasi-benar'), indSalah: snip('p03/indentasi-salah'), genap: snip('p03/genap-ganjil'),
  grade: snip('p03/grade'), urutBenar: snip('p03/urutan-benar'), urutSalah: snip('p03/urutan-salah'),
  kalkulator: snip('p03/kalkulator'), bug: snip('p03/bug-sama'),
  posneg: snip('p03/posneg'), diskon: snip('p03/diskon'), login: snip('p03/login'), usia: snip('p03/usia'),
  tBanding: snip('p03/tiket-banding'), tIfelse: snip('p03/tiket-ifelse'), tElif: snip('p03/tiket-elif'),
  next: snip('p03/next-majemuk'),
};

export default function Pertemuan03() {
  return (
    <DeckMeta meeting={3} topic="Percabangan">
      <TitleSlide meeting={3} course="Pengenalan Komputasi" title="Percabangan"
        lede={<>Membuat program mengambil keputusan: kode berbeda berjalan untuk kondisi yang berbeda</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan apa yang kita lakukan saat lampu lalu lintas merah, kuning, atau hijau. Itu percabangan dalam kehidupan sehari-hari. Durasi ±100 menit: teori 45, praktik 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>percabangan sebagai pemilihan jalur berdasarkan kondisi</> },
        { verb: 'Memakai', text: <>operator perbandingan dan memahami hasilnya (<code>True</code> atau <code>False</code>)</> },
        { verb: 'Menulis', text: <><code>if</code> dan <code>if-else</code> dengan indentasi yang benar</> },
        { verb: 'Menyusun', text: <><code>if-elif-else</code> untuk lebih dari dua kemungkinan</> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di slide pembuka." />

      <CodeSlide title="Ingat kembali: input" snippet={s.review}
        predict={<>Dari Pertemuan 2: pengguna mengetik 9. Apa yang tercetak, dan mengapa perlu <code>int</code>?</>}
        take={<>Masukan selalu teks. Hari ini kita membandingkannya, dan hasilnya menentukan jalur program.</>}
        notes="Retrieval practice. Jawaban: 10. Tanpa int, penjumlahan teks dan angka akan error. Beri 2 menit." />

      <ContentSlide title="Apa itu percabangan?"
        notes="Program biasanya berjalan lurus dari atas ke bawah. Percabangan memberi persimpangan: kondisi benar atau salah menentukan jalur. Minta contoh keputusan sehari-hari lain.">
        <p className="lede">Percabangan membuat program memilih jalur berdasarkan <b>kondisi</b>, seperti lampu lalu lintas.</p>
        <CardGrid cols={3} items={[
          { icon: 'stop_circle', head: 'Merah', body: 'berhenti', tone: 'error' },
          { icon: 'pause_circle', head: 'Kuning', body: 'bersiap', tone: 'tertiary' },
          { icon: 'play_circle', head: 'Hijau', body: 'jalan', tone: 'success' },
        ]} />
        <Take>Jika kondisi A benar, lakukan ini; jika tidak, lakukan yang lain.</Take>
      </ContentSlide>

      <CodeSlide title="Operator perbandingan" snippet={s.banding}
        predict={<>Dengan <code>a = 10</code> dan <code>b = 5</code>, tebak keenam hasilnya: <code>True</code> atau <code>False</code>?</>}
        steps={[
          { lines: [3, 4], note: <><code>==</code> sama dengan, <code>!=</code> tidak sama dengan</> },
          { lines: [5, 6], note: <><code>&gt;</code> lebih besar, <code>&lt;</code> lebih kecil</> },
          { lines: [7, 8], note: <><code>&gt;=</code> dan <code>&lt;=</code> termasuk sama dengan</> },
        ]}
        take={<>Hasil perbandingan selalu <code>True</code> atau <code>False</code>. Jangan tertukar: <code>=</code> menyimpan, <code>==</code> membandingkan.</>}
        notes="Tekankan beda = dan ==. Hasil bertipe bool." />

      <CodeSlide title="Perintah if" snippet={s.ifDasar}
        predict={<>Baris 4 tidak menjorok. Jika nilai diubah menjadi 50, baris mana yang tetap tercetak?</>}
        steps={[
          { lines: [2], note: <><code>if</code> memeriksa kondisi; diakhiri titik dua <code>:</code></> },
          { lines: [3], note: <>baris yang <b>menjorok</b> hanya berjalan jika kondisi benar</> },
          { lines: [4], note: <>baris tanpa jorokan selalu berjalan</> },
        ]}
        notes="Jawaban: dengan nilai 50, hanya 'Selesai' yang tercetak. Mintalah mahasiswa mengubah nilai dan menjalankan lagi di Colab." />

      <CompareCodeSlide title="Indentasi menentukan blok"
        left={{ label: 'Menjorok: benar', tone: 'pos', icon: 'check_circle', snippet: s.indBenar, hl: [3] }}
        right={{ label: 'Tidak menjorok: error', tone: 'neg', icon: 'error', snippet: s.indSalah, hl: [3], out: "IndentationError: expected an indented block after 'if' statement on line 2" }}
        take={<>Python mengenali blok dari indentasi (4 spasi). Baris setelah <code>:</code> harus menjorok.</>}
        notes="Berbeda dari bahasa lain yang memakai kurung kurawal. Tekan Tab atau 4 spasi." />

      <CodeSlide title="if-else" snippet={s.genap}
        predict={<>Angka 7 dibagi 2 bersisa berapa? Cabang mana yang berjalan?</>}
        steps={[
          { lines: [2], note: <><code>angka % 2 == 0</code> memeriksa apakah sisa bagi 0</> },
          { lines: [3], note: <>jalur bila kondisi <b>benar</b></> },
          { lines: [5], note: <>jalur <code>else</code> bila kondisi <b>salah</b></> },
        ]}
        take={<><code>if-else</code> memilih tepat satu dari dua jalur.</>}
        notes="Ini pemakaian % dari Pertemuan 2. Hanya satu cabang yang berjalan, tidak pernah keduanya." />

      <CodeSlide title="if-elif-else" snippet={s.grade}
        predict={<>Nilai 85. Kondisi diperiksa dari atas. Grade apa yang tercetak?</>}
        steps={[
          { lines: [2], note: <>85 &gt;= 90? <b>Salah</b>, lanjut ke kondisi berikutnya</> },
          { lines: [4], note: <>85 &gt;= 80? <b>Benar</b>: blok ini dijalankan, sisanya dilewati</> },
          { lines: [5], note: <>grade menjadi <code>"B"</code></> },
          { lines: [10], note: <>setelah salah satu blok selesai, program lanjut ke baris ini</> },
        ]}
        take={<>Kondisi diperiksa dari atas; yang pertama benar dijalankan, lalu sisanya diabaikan.</>}
        notes="Ini slide alur: sorotan mengikuti urutan pemeriksaan sebenarnya. Tanyakan apa yang terjadi jika nilai 59 (D, lewat else)." />

      <CompareCodeSlide title="Urutan kondisi penting"
        left={{ label: 'Terbesar dulu', tone: 'pos', icon: 'check_circle', snippet: s.urutBenar, hl: [2] }}
        right={{ label: 'Terkecil dulu', tone: 'neg', icon: 'error', snippet: s.urutSalah, hl: [2] }}
        take={<>Dengan nilai 85, <code>&gt;= 60</code> benar duluan sehingga hasilnya salah (D). Susun dari syarat yang paling ketat.</>}
        notes="Inilah pertanyaan 'pikirkan' di slide lama. Urutan elif bukan sekadar gaya: ia mengubah hasil." />

      <CodeSlide title="Kalkulator dengan pilihan" snippet={s.kalkulator}
        predict={<>Operasinya <code>"+"</code>. Cabang mana yang berjalan? Apa jika operasinya <code>"/"</code>?</>}
        steps={[
          { lines: [3, 4], note: <>cocok dengan <code>"+"</code>: hasil dijumlahkan</> },
          { lines: [5, 6, 7, 8], note: <>jika bukan, periksa operasi lain satu per satu</> },
          { lines: [9, 10], note: <><code>else</code> menangkap semua yang tidak dikenali</> },
        ]}
        notes="Dengan '/' semua kondisi salah sehingga else berjalan: 'Tidak valid'. Bahas pentingnya else sebagai jaring pengaman." />

      <CodeSlide title="Cari bug: = bukan ==" snippet={s.bug}
        out="SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?"
        predict={<>Kondisi ditulis <code>nilai = 60</code>. Mengapa Python menolaknya?</>}
        steps={[{ lines: [2], note: <><code>=</code> menyimpan nilai; untuk <b>membandingkan</b> gunakan <code>==</code></> }]}
        take={<>Perbaikan: <code>if nilai == 60:</code>. Pesan error Python sering sudah memberi petunjuknya.</>}
        notes="Kesalahan paling umum pada percabangan. Biasakan mahasiswa membaca saran pada pesan error." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Positif atau negatif', spec: <>Baca sebuah angka, cetak <code>Positif</code>, <code>Negatif</code>, atau <code>Nol</code>.</>, example: s.posneg },
          { n: 2, title: 'Diskon member', spec: <>Baca harga dan status member (y/n); member mendapat diskon 20%.</>, example: s.diskon },
        ]}
        notes="Latihan 1–2 wajib. Latihan 2: harga * 0.8 untuk member. Uji juga dengan 'n'." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Login sederhana', spec: <>Pengguna <code>admin</code> dengan kata sandi <code>12345</code>; periksa keduanya.</>, example: s.login },
          { n: 4, title: 'Kategori usia', spec: <>Di bawah 12 anak-anak, 12–17 remaja, 18–59 dewasa, 60 ke atas lansia.</>, example: s.usia },
        ]}
        notes="Latihan 3 butuh and (dibahas di Pertemuan 4): boleh diberi sebagai pengantar atau diganti dengan dua if bersarang." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa dua baris output-nya?</>, snippet: s.tBanding, why: <><code>10 &gt;= 10</code> benar karena termasuk sama dengan; <code>3 == 4</code> salah</> }}
        notes="Polling singkat." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tIfelse, why: <><code>5 &gt; 5</code> salah (5 tidak lebih besar dari 5), jadi cabang <code>else</code> berjalan</> }}
        notes="Jika banyak menjawab A, ulangi perbedaan > dan >=." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa output-nya? Hanya satu cabang yang berjalan.</>, snippet: s.tElif, why: <><code>15 &gt;= 20</code> salah, <code>15 &gt;= 10</code> benar: cetak <code>M</code>, sisanya dilewati</> }}
        notes="Walau 15 >= 5 juga benar, elif ketiga tidak diperiksa lagi." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'Percabangan', body: <><code>if</code>, <code>if-else</code>, <code>if-elif-else</code> memilih jalur program</> },
        { head: 'Perbandingan', body: <><code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code> menghasilkan <code>True</code> atau <code>False</code></> },
        { head: 'Indentasi', body: 'baris setelah titik dua harus menjorok; itulah yang membentuk blok' },
        { head: 'Urutan', body: <>kondisi diperiksa dari atas, yang pertama benar menang</> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 3"
        tasks={[
          { head: 'Kalkulator suhu', body: <>Baca suhu dan jenis konversi (C atau F); hitung dengan rumus dan tampilkan hasil dengan format yang jelas.</> },
          { head: 'Grade dengan absensi', body: <>Baca nilai dan persen absensi. Jika absensi di bawah 80%, tidak lulus; jika 80% atau lebih, hitung grade dari nilai.</> },
        ]}
        steps={[
          <>Tentukan kondisi dan buat bagan alur atau pseudocode</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji dengan beberapa kasus, termasuk nilai batas</>,
          <>Catat hasil dan jelaskan logika di komentar</>,
        ]}
        submit={{ file: 'Tugas3_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Rumus: C ke F = C*9/5+32; F ke C = (F-32)*5/9. Nilai batas: absensi tepat 80 dan nilai tepat di batas grade." />

      <NextSlide title="Berikutnya: Kondisi majemuk" lede="Menggabungkan beberapa kondisi dengan and, or, dan not." snippet={s.next}
        notes="Jembatan: kondisi bisa digabung. Baca lebih dulu tentang operator logika Python." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 4: Kondisi Majemuk" />
    </DeckMeta>
  );
}
