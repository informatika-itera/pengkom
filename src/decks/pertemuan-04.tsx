import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, CompareCodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, CardGrid, TruthTable,
} from '../layouts';

const s = {
  review: snip('p04/review'), hari: snip('p04/hari'), logika: snip('p04/logika'), nested: snip('p04/nested'),
  dan: snip('p04/dan'), atau: snip('p04/atau'), bug: snip('p04/bug-rentang'),
  pujian: snip('p04/pujian'), gaji: snip('p04/gaji'), persegi: snip('p04/persegi'), kabisat: snip('p04/kabisat'),
  tLogika: snip('p04/tiket-logika'), tBool: snip('p04/tiket-bool'), tNested: snip('p04/tiket-nested'),
  next: snip('p04/next-loop'),
};

export default function Pertemuan04() {
  return (
    <DeckMeta meeting={4} topic="Kondisi Majemuk">
      <TitleSlide meeting={4} course="Pengenalan Komputasi" title="Kondisi Majemuk"
        lede={<>Menggabungkan beberapa syarat dengan <code>and</code>, <code>or</code>, dan <code>not</code>, serta menyusun keputusan bertingkat</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan syarat naik wahana: tinggi minimal DAN ditemani orang dewasa ATAU berusia di atas 12. Satu syarat tidak cukup. Durasi ±100 menit: teori 45, praktik 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menyusun', text: <><code>if-elif-else</code> untuk banyak kemungkinan</> },
        { verb: 'Menggabungkan', text: <>syarat dengan <code>and</code>, <code>or</code>, dan <code>not</code></> },
        { verb: 'Membuat', text: <><i>nested if</i>: keputusan di dalam keputusan</> },
        { verb: 'Memilih', text: <>antara <code>elif</code>, operator logika, dan <i>nested if</i></> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dilatih di slide ulasan dan studi kasus." />

      <CodeSlide title="Ingat kembali: elif" snippet={s.review}
        predict={<>Dari Pertemuan 3: suhu 25. Cabang mana yang berjalan?</>}
        take={<>Satu kondisi sering belum cukup. Hari ini kita menggabungkan beberapa kondisi sekaligus.</>}
        notes="Retrieval practice. Jawaban: Hangat (25 > 30 salah, 25 > 20 benar). Beri 2 menit." />

      <CodeSlide title="Banyak kemungkinan" snippet={s.hari}
        predict={<>Hari bernilai 3. Berapa kondisi yang diperiksa sebelum ada yang benar?</>}
        steps={[
          { lines: [2, 4], note: <>dua kondisi pertama <b>salah</b> dan dilewati</> },
          { lines: [6], note: <>kondisi ketiga <b>benar</b>: blok dijalankan, sisanya diabaikan</> },
          { lines: [8], note: <><code>else</code> menangkap nilai yang tidak dikenali</> },
        ]}
        notes="Ini ulasan if-elif-else. Tanyakan apa yang tercetak untuk hari = 9." />

      <ContentSlide title="Operator logika"
        notes="and: semua syarat harus benar (ketat). or: cukup satu benar (longgar). not: membalik. Tabel dihitung langsung oleh komputer, bukan diketik manual.">
        <CardGrid cols={3} items={[
          { icon: 'join_inner', head: 'and', body: 'benar bila keduanya benar (ketat)' },
          { icon: 'join_full', head: 'or', body: 'benar bila salah satu benar (longgar)', tone: 'secondary' },
          { icon: 'swap_horiz', head: 'not', body: 'membalik benar menjadi salah, dan sebaliknya', tone: 'tertiary' },
        ]} />
        <TruthTable />
      </ContentSlide>

      <CodeSlide title="Operator logika dalam kode" snippet={s.logika}
        predict={<>Dengan <code>x = 10</code>, tebak keempat hasilnya.</>}
        steps={[
          { lines: [2], note: <>10 &gt; 5 benar <b>dan</b> 10 &lt; 15 benar: <code>True</code></> },
          { lines: [3], note: <>10 &gt; 15 salah: satu salah saja membuat <code>and</code> salah</> },
          { lines: [4], note: <><code>or</code>: cukup satu benar (10 &gt; 5)</> },
          { lines: [5], note: <><code>not</code> membalik <code>True</code> menjadi <code>False</code></> },
        ]}
        notes="Gunakan tabel kebenaran sebagai acuan. Hasil bertipe bool." />

      <CompareCodeSlide title="and atau or?"
        left={{ label: 'and: ketat', tone: 'neg', icon: 'lock', snippet: s.dan, hl: [3] }}
        right={{ label: 'or: longgar', tone: 'pos', icon: 'lock_open', snippet: s.atau, hl: [3] }}
        take={<>Data sama, hasil berbeda: <code>and</code> menuntut semua syarat, <code>or</code> cukup satu.</>}
        notes="Syarat memilih di Indonesia: berusia minimal 17 tahun ATAU sudah menikah. Dengan 'and', orang menikah di bawah 17 ditolak." />

      <CodeSlide title="Nested if" snippet={s.nested}
        predict={<>Nilai 85 dan absensi 90. Jalur mana yang dilalui?</>}
        steps={[
          { lines: [3], note: <>keputusan pertama: nilai cukup?</> },
          { lines: [4], note: <>hanya bila ya, baru keputusan kedua: absensi cukup? (<b>menjorok lagi</b>)</> },
          { lines: [5], note: <>keduanya terpenuhi: grade A</> },
          { lines: [8, 9], note: <>nilai kurang: absensi tidak pernah diperiksa</> },
        ]}
        take={<><i>Nested if</i> cocok bila syarat kedua <b>bergantung</b> pada syarat pertama.</>}
        notes="Bandingkan dengan and: if nilai >= 70 and absensi >= 80 memberi hasil sama untuk A, tetapi nested if bisa membedakan penyebab tidak lulus." />

      <CodeSlide title="Cari bug: rentang" snippet={s.bug}
        out="SyntaxError: invalid syntax"
        predict={<>Dalam matematika kita menulis 17 ≤ usia ≤ 60. Mengapa baris 2 ditolak?</>}
        steps={[{ lines: [2], note: <>setelah <code>and</code> harus ada kondisi <b>lengkap</b>: <code>usia &lt;= 60</code></> }]}
        take={<>Perbaikan: <code>usia &gt;= 17 and usia &lt;= 60</code>. Tiap sisi <code>and</code> harus berdiri sendiri.</>}
        notes="Python juga mengizinkan 17 <= usia <= 60 (perbandingan berantai); tidak perlu diajarkan sekarang." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Status kelulusan', spec: <>Baca nilai Matematika dan Bahasa; tentukan Lulus dengan Pujian, Lulus, Remedial, atau Tidak Lulus.</>, example: s.pujian },
          { n: 2, title: 'Kalkulator gaji', spec: <>Gaji dasar menurut golongan A/B/C ditambah tunjangan masa kerja.</>, example: s.gaji },
        ]}
        notes="Aturan: Mat dan Bahasa ≥ 80 pujian; keduanya ≥ 70 lulus; salah satu ≥ 60 remedial; selain itu tidak lulus. Gaji: A 5jt, B 4jt, C 3jt; ≥ 10 thn +1jt; 5–9 thn +500rb." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Persegi atau persegi panjang', spec: <>Baca panjang dan lebar; tentukan bangun yang terbentuk.</>, example: s.persegi },
          { n: 4, title: 'Tahun kabisat', spec: <>Kabisat bila habis dibagi 400, atau habis dibagi 4 tetapi tidak habis dibagi 100.</>, example: s.kabisat },
        ]}
        notes="Latihan 4 memakai or, and, dan perbandingan sisa bagi sekaligus." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa dua baris output-nya?</>, snippet: s.tLogika, why: <>7 &gt; 5 dan 7 &lt; 10 keduanya benar; <code>x &lt; 5</code> dan <code>x &gt; 10</code> keduanya salah</> }}
        notes="Polling singkat. Jika banyak salah, gambar garis bilangan." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 2, q: <>Apa tiga baris output-nya?</>, snippet: s.tBool, why: <><code>and</code> butuh keduanya benar; <code>or</code> cukup satu; <code>not</code> membalik</> }}
        notes="Memeriksa tabel kebenaran." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tNested, why: <>8 &gt; 5 benar, lalu 8 &gt; 10 salah: cabang <code>else</code> bagian dalam mencetak <code>B</code></> }}
        notes="Minta mahasiswa menelusuri jalurnya dengan jari." />

      <SummarySlide title="Ringkasan" points={[
        { head: <code>if-elif-else</code>, body: 'menangani banyak kemungkinan; yang pertama benar menang' },
        { head: <>Operator logika</>, body: <><code>and</code> ketat, <code>or</code> longgar, <code>not</code> membalik</> },
        { head: <>Nested if</>, body: 'keputusan di dalam keputusan untuk syarat yang bergantung' },
        { head: 'Memilih', body: <>syarat bebas: <code>and</code>/<code>or</code>; syarat bergantung: nested if; banyak pilihan: <code>elif</code></> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 4"
        tasks={[
          { head: 'Kategori BMI', body: <>Hitung BMI dari berat dan tinggi, lalu tentukan kurus, normal, gemuk, atau obesitas.</> },
          { head: 'Kasir sederhana', body: <>Baca total belanja dan status member; hitung diskon bertingkat.</> },
          { head: 'Tebak angka', body: <>Angka rahasia ditulis di kode; pengguna menebak sekali dan diberi petunjuk besar atau kecil.</> },
        ]}
        steps={[
          <>Tentukan kondisi (<code>and</code> atau <code>or</code>) dan susun pseudocode</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji beberapa kasus, termasuk nilai batas</>,
          <>Catat hasil dan kesalahan, lalu jelaskan logikanya</>,
        ]}
        submit={{ file: 'Tugas4_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Versi lama meminta komputer memilih angka acak, tetapi random baru diajarkan di Pertemuan 11; di sini angka rahasia ditulis di kode. Uji nilai batas BMI dan diskon." />

      <NextSlide title="Berikutnya: Perulangan" lede="Menyuruh komputer mengulang pekerjaan tanpa menyalin kode berkali-kali." snippet={s.next}
        notes="Jembatan: tiga baris print yang sama diganti satu loop. Pertemuan 5 membahasnya." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 5: Perulangan" />
    </DeckMeta>
  );
}
