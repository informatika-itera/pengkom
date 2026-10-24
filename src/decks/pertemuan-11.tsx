import { M, snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, Take,
} from '../layouts';

const s = {
  review: snip('p11/review'), imp: snip('p11/import'), math: snip('p11/matematika'), trig: snip('p11/trigonometri'),
  acak: snip('p11/acak'), dadu: snip('p11/dadu'), pandas: snip('p11/pandas-dasar'), kolom: snip('p11/kolom'), bug: snip('p11/bug-import'),
  tebak: snip('p11/tebak'), abc: snip('p11/abc'), lingkaran: snip('p11/lingkaran'), undian: snip('p11/undian'),
  tImport: snip('p11/tiket-import'), tMath: snip('p11/tiket-math'), tPandas: snip('p11/tiket-pandas'),
  next: snip('p11/next-plot'),
};

export default function Pertemuan11() {
  return (
    <DeckMeta meeting={11} topic="Library">
      <TitleSlide meeting={11} course="Pengenalan Komputasi" title="Library"
        lede={<>Memakai kode yang sudah ditulis orang lain: <code>math</code>, <code>random</code>, dan <code>pandas</code></>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan bagaimana kalian menghitung akar kuadrat tanpa tanda ** 0.5? Atau mengocok angka? Jawabannya: jangan menulis ulang, pakai library. Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>library sebagai kumpulan fungsi siap pakai</> },
        { verb: 'Memakai', text: <><code>import</code> dalam tiga bentuk</> },
        { verb: 'Memanggil', text: <>fungsi dari <code>math</code> dan <code>random</code></> },
        { verb: 'Membaca', text: <>tabel sederhana dengan <code>pandas</code> (<i>DataFrame</i>)</> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di slide pembuka." />

      <CodeSlide title="Ingat kembali: string" snippet={s.review}
        predict={<>Dari Pertemuan 10: apa dua baris yang tercetak?</>}
        take={<>Method string dipanggil dengan titik. Library bekerja dengan pola yang sama: <code>nama.fungsi()</code>.</>}
        notes="Retrieval practice. Jawaban: [halo dunia] lalu Halo Dunia. Beri 2 menit." />

      <ContentSlide title="Apa itu library?"
        notes="Analogi perkakas: tidak membuat palu sendiri setiap kali ingin memaku. Python punya 'standard library' bawaan (math, random) dan library eksternal (pandas, matplotlib) yang dipasang terpisah, namun di Colab sudah tersedia.">
        <p className="lede">Library adalah kumpulan fungsi yang sudah ditulis dan diuji orang lain, siap kita pakai.</p>
        <div className="chips-row">
          {['math: hitungan matematika', 'random: bilangan acak', 'pandas: tabel data', 'matplotlib: grafik'].map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
        <Take>“Jangan menemukan kembali roda.” Cukup <code>import</code>, lalu panggil fungsinya.</Take>
      </ContentSlide>

      <CodeSlide title="Tiga cara import" snippet={s.imp}
        predict={<>Ketiga cara memanggil <code>sqrt</code> memberi hasil yang sama. Apa bedanya cara menulisnya?</>}
        steps={[
          { lines: [1], note: <>nama library harus ditulis penuh: <code>math.sqrt</code></> },
          { lines: [2], note: <><code>as</code> memberi nama pendek (alias): <code>m.sqrt</code></> },
          { lines: [3], note: <><code>from … import</code> mengambil satu fungsi, dipanggil tanpa awalan</> },
        ]}
        take={<>Bentuk pertama paling jelas asal fungsinya; alias lazim dipakai untuk <code>pandas</code> (<code>pd</code>).</>}
        notes="Tekankan bahwa import hanya perlu satu kali per sesi di bagian atas." />

      <CodeSlide title="Library math" snippet={s.math}
        predict={<>Perhatikan <code>ceil</code> dan <code>floor</code>. Mana yang membulatkan ke atas?</>}
        steps={[
          { lines: [3, 4], note: <><code>sqrt</code> (akar) dan <code>pow</code> (pangkat) selalu menghasilkan <code>float</code></> },
          { lines: [5], note: <><code>math.pi</code> adalah nilai, bukan fungsi: tanpa kurung</> },
          { lines: [6, 7], note: <><code>ceil</code> ke atas, <code>floor</code> ke bawah</> },
        ]}
        notes="Beda fungsi dan konstanta: math.pi tidak memakai tanda kurung." />

      <CodeSlide title="math: trigonometri" snippet={s.trig}
        predict={<>Fungsi trigonometri memakai <b>radian</b>. Mengapa <code>sin(radians(90))</code> bernilai 1?</>}
        steps={[
          { lines: [3, 4], note: <>sudut diberikan dalam <b>radian</b>: <M tex="\sin\tfrac{\pi}{2}=1" /></> },
          { lines: [5, 6], note: <><code>radians</code> mengubah derajat menjadi radian</> },
          { lines: [7], note: <><code>degrees</code> melakukan sebaliknya</> },
        ]}
        notes="Kesalahan umum: memasukkan derajat langsung ke sin. Gunakan radians() terlebih dahulu." />

      <CodeSlide title="Library random" snippet={s.acak}
        predict={<>Jika sel ini dijalankan lagi, apakah hasilnya sama? Mengapa?</>}
        steps={[
          { lines: [3], note: <><code>seed</code> mengunci urutan acak: hasil <b>sama</b> setiap dijalankan</> },
          { lines: [5], note: <><code>randint(1, 6)</code>: bilangan bulat, <b>kedua ujung</b> ikut</> },
          { lines: [6], note: <><code>choice</code> memilih satu elemen list</> },
          { lines: [7], note: <><code>random()</code>: pecahan 0 sampai 1</> },
        ]}
        take={<>Tanpa <code>seed</code>, hasil berbeda setiap kali; dengan <code>seed</code>, hasil dapat diulang (<i>reproducible</i>).</>}
        notes="Berbeda dengan range: randint(1, 6) mencakup 6. Demonstrasikan di Colab dengan menghapus seed dan menjalankan beberapa kali." />

      <CodeSlide title="Simulasi dadu" snippet={s.dadu}
        predict={<>Dadu dilempar 100 kali. Kira-kira berapa kali angka 6 muncul?</>}
        steps={[
          { lines: [5, 6], note: <>setiap putaran melempar dadu dan memeriksa apakah 6</> },
          { lines: [7], note: <>penghitung bertambah hanya bila 6</> },
        ]}
        take={<>Secara teori sekitar 16–17 kali, tetapi hasil tiap simulasi berbeda sedikit.</>}
        notes="Teori: 100/6 ≈ 16,7. Hasil 20 wajar karena acak. Jika dijalankan 1000 kali hasilnya mendekati teori (hukum bilangan besar). Ini sekaligus kerangka tugas." />

      <CodeSlide title="Pengantar pandas" snippet={s.pandas}
        predict={<>Dari dictionary dengan dua kunci, tabel apa yang terbentuk?</>}
        steps={[
          { lines: [1], note: <><code>pd</code> adalah alias umum untuk <code>pandas</code></> },
          { lines: [3, 4, 5, 6], note: <>tiap kunci menjadi <b>kolom</b>, tiap list berisi isi kolom itu</> },
          { lines: [7], note: <><code>DataFrame</code> mengubah dictionary menjadi tabel</> },
        ]}
        take={<>DataFrame = tabel seperti Excel: kolom bernama, baris bernomor mulai dari <code>0</code>.</>}
        notes="DataFrame diperkenalkan sebagai tabel. Operasi lanjutan (filter, sort, cleaning) dibahas di Pertemuan 13." />

      <CodeSlide title="Membaca kolom DataFrame" snippet={s.kolom}
        predict={<>Mengambil satu kolom memakai nama kolom dalam kurung siku. Berapa rata-rata usia?</>}
        steps={[
          { lines: [5], note: <><code>df['Usia']</code> mengambil satu kolom, lengkap dengan nomor barisnya</> },
          { lines: [6], note: <>kolom memiliki method seperti <code>mean()</code></> },
        ]}
        notes="Output pertama adalah Series: kolom beserta index dan tipe datanya (dtype)." />

      <CodeSlide title="Cari bug: lupa awalan" snippet={s.bug}
        out="NameError: name 'sqrt' is not defined"
        predict={<>Library <code>math</code> sudah diimpor. Mengapa <code>sqrt(16)</code> gagal?</>}
        steps={[{ lines: [2], note: <>setelah <code>import math</code>, nama fungsi harus diawali <code>math.</code></> }]}
        take={<>Perbaikan: <code>math.sqrt(16)</code>, atau gunakan <code>from math import sqrt</code>.</>}
        notes="Kesalahan paling umum pada import. Minta mahasiswa membaca pesan NameError." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Tebak angka pro', spec: <>Komputer memilih angka 1–100; beri petunjuk “Lebih besar” atau “Lebih kecil”.</>, example: s.tebak },
          { n: 2, title: 'Rumus ABC', spec: <>Hitung akar <M tex="ax^2+bx+c=0" /> dengan <code>math.sqrt</code>.</>, example: s.abc },
        ]}
        notes="Contoh hasil memakai seed agar angka rahasia tetap 42; di kelas, mahasiswa tidak memakai seed. Rumus: x = (-b ± √(b²-4ac)) / 2a." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Luas lingkaran', spec: <>Masukkan jari-jari; cetak luas dengan <code>math.pi</code>, dibulatkan dua desimal.</>, example: s.lingkaran },
          { n: 4, title: 'Undian', spec: <>Pilih satu pemenang acak dari list peserta dengan <code>random.choice</code>.</>, example: s.undian },
        ]}
        notes="Latihan 3 memakai round(); latihan 4 hanya choice. Contoh hasil memakai seed." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa output-nya?</>, snippet: s.tImport, why: <><code>m</code> hanyalah nama lain untuk <code>math</code>; akar 81 adalah 9.0</> }}
        notes="Polling singkat. Periksa apakah mahasiswa ingat bahwa sqrt menghasilkan float." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tMath, why: <><code>floor(4.8)</code> = 4 dan <code>ceil(4.2)</code> = 5, jumlahnya 9</> }}
        notes="Jika banyak salah, ulangi arah ceil dan floor." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa output-nya?</>, snippet: s.tPandas, why: <><code>sum()</code> menjumlah satu kolom: 1 + 2 + 3</> }}
        notes="Kolom DataFrame punya method seperti list dan string: sum, mean, max." />

      <SummarySlide title="Ringkasan" points={[
        { head: <code>import</code>, body: 'memanggil library; boleh dengan alias (as) atau from … import' },
        { head: <code>math</code>, body: <><code>sqrt</code>, <code>pow</code>, <code>pi</code>, <code>ceil</code>, <code>floor</code>, <code>sin</code> (dalam radian)</> },
        { head: <code>random</code>, body: <><code>randint</code>, <code>choice</code>, <code>seed</code> agar hasil bisa diulang</> },
        { head: <code>pandas</code>, body: 'DataFrame = tabel; kolom diambil dengan df["nama"]' },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 11"
        tasks={[
          { head: 'Simulasi dadu', body: <>Lempar dadu 100 kali dan hitung berapa kali angka 6 muncul.</> },
          { head: 'Data mahasiswa', body: <>Buat DataFrame (nama, NIM, nilai); hitung rata-rata nilai dan tampilkan mahasiswa dengan nilai tertinggi.</> },
        ]}
        steps={[
          <>Import library yang diperlukan di bagian atas</>,
          <>Tulis kode dengan komentar yang jelas</>,
          <>Pahami struktur DataFrame untuk tugas kedua</>,
          <>Jalankan berulang kali dan periksa hasil</>,
          <>Tambahkan sel teks berisi refleksi singkat</>,
        ]}
        submit={{ file: 'Tugas11_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Untuk nilai tertinggi: df['Nilai'].max() atau df.sort_values. Petunjuk akan lebih lengkap di Pertemuan 13." />

      <NextSlide title="Berikutnya: Visualisasi data" lede="Mengubah angka menjadi gambar dengan matplotlib." snippet={s.next}
        notes="Jembatan: pyplot adalah library, dipakai persis seperti math, dan hasilnya berupa gambar di bawah sel." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 12: Visualisasi Data" />
    </DeckMeta>
  );
}
