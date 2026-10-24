import { M, snip, CodeBlock, Predict, Output } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, TraceSlide, CompareCodeSlide,
  PracticeSlide, TicketSlide, SummarySlide, AssignmentSlide, NextSlide, ClosingSlide,
} from '../layouts';

const s = {
  tanpa: snip('p05/tanpa-loop'), dengan: snip('p05/dengan-loop'), forDasar: snip('p05/for-dasar'),
  range: snip('p05/range-variasi'), mundur: snip('p05/hitung-mundur'), jumlah: snip('p05/jumlah'),
  whileDasar: snip('p05/while-dasar'), whileOk: snip('p05/while-berhenti'), whileBahaya: snip('p05/while-bahaya'), brk: snip('p05/break'), cont: snip('p05/continue'),
  kalkulator: snip('p05/kalkulator'), bug: snip('p05/bug-offbyone'),
  faktorial: snip('p05/faktorial'), prima: snip('p05/prima'), bintang: snip('p05/bintang'), fibonacci: snip('p05/fibonacci'),
  tFor: snip('p05/tiket-for'), tWhile: snip('p05/tiket-while'), tCont: snip('p05/tiket-continue'), buah: snip('p05/buah'),
};

export default function Pertemuan05() {
  return (
    <DeckMeta meeting={5} topic="Perulangan">
      <TitleSlide meeting={5} course="Pengenalan Komputasi" title="Perulangan"
        lede={<>Menulis <code>for</code>, <code>while</code>, <code>break</code>, dan <code>continue</code> untuk mengotomasi pekerjaan berulang</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka. Tanyakan: siapa yang pernah menulis hal yang sama berkali-kali (misalnya menyalin rumus di Excel)? Perulangan adalah jawabannya. Durasi total pertemuan ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>mengapa perulangan menggantikan kode yang disalin berulang</> },
        { verb: 'Menulis', text: <>perulangan <code>for</code> dengan <code>range()</code></> },
        { verb: 'Menulis', text: <>perulangan <code>while</code> yang pasti berhenti</> },
        { verb: 'Mengendalikan', text: <>perulangan dengan <code>break</code> dan <code>continue</code></> },
      ]} notes="Tujuan 2–4 diuji lagi di tiket keluar di akhir pertemuan. Tujuan 1 dibahas di dua slide berikut." />

      <CompareCodeSlide title="Menyalin atau mengulang?"
        left={{ label: 'Tanpa loop', tone: 'neg', icon: 'content_copy', snippet: s.tanpa }}
        right={{ label: 'Dengan loop', tone: 'pos', icon: 'repeat', snippet: s.dengan, hl: [1] }}
        take={<>Hasilnya sama. Kalau ingin 500 kali, versi kiri harus disalin 500 baris — versi kanan cukup mengganti <code>3</code>.</>}
        notes="Biarkan mahasiswa membandingkan dulu. Klik untuk menampilkan hasil kedua versi: identik. Tekankan bahwa loop bukan tentang trik, tetapi tentang kode yang bisa diubah di satu tempat." />

      <CodeSlide title={<>Perulangan <code>for</code></>}
        snippet={s.forDasar}
        predict={<>Berapa baris yang tercetak? Angka apa saja?</>}
        take={<><code>for</code> mengulang blok kode sekali untuk setiap nilai dari <code>range()</code>.</>}
        steps={[
          { lines: [1], note: <><code>i</code> menerima nilai baru di setiap putaran</> },
          { lines: [2], note: <>badan loop: hanya baris yang <b>menjorok</b></> },
        ]}
        notes="PRIMM: minta tebakan lewat tunjuk tangan sebelum klik. Miskonsepsi umum: mahasiswa mengira output mulai dari 1 dan berakhir di 5." />

      <CodeSlide title={<>Mengenal <code>range()</code></>}
        snippet={s.range}
        predict={<>Perhatikan keempat baris. Mana yang menghasilkan angka <b>genap</b>? Mana yang menghitung <b>mundur</b>?</>}
        steps={[{ lines: [1], note: <><code>list()</code> hanya dipakai di sini agar isi <code>range</code> terlihat — dibahas di Pertemuan 6</> }]}
        take={<><code>range(awal, akhir, langkah)</code>: mulai dari <code>awal</code>, berhenti <b>sebelum</b> <code>akhir</code>.</>}
        notes="Ini miskonsepsi paling sering: range(2, 6) tidak mencakup 6. range hemat memori karena tidak menyimpan semua angka; list() dipakai hanya untuk menampilkan." />

      <CodeSlide title="Akumulasi: jumlah 1–100"
        snippet={s.jumlah}
        predict={<>Berapa nilai yang dicetak? Berapa kali baris 3 dijalankan?</>}
        steps={[
          { lines: [1], note: <>variabel penampung dimulai dari <code>0</code></> },
          { lines: [3], note: <>setiap putaran menambahkan <code>i</code> ke <code>total</code></> },
        ]}
        notes="Jawaban: 100 kali. Ada rumus Gauss n(n+1)/2 = 5050 sebagai pemeriksa, tunjukkan secara lisan." />

      <TraceSlide title={<>Melacak <code>for</code></>}
        snippet={s.jumlah} vars={['i', 'total']} show={[1, 2, 3, 100]} line={3}
        take={<>Setiap baris tabel adalah satu putaran: <code>total</code> bertambah sebesar <code>i</code>. Nilainya diambil dari eksekusi sungguhan.</>}
        notes="Minta mahasiswa menebak isi baris ke-4 sebelum menunjuk. Kaitkan kembali ke baris kode yang disorot. Ulangi pola ini setiap kali memperkenalkan loop baru." />

      <CodeSlide title={<>Perulangan <code>while</code></>}
        snippet={s.whileDasar}
        predict={<>Kalau baris 4 dihapus, apa yang terjadi?</>}
        steps={[
          { lines: [2], note: <>kondisi dicek <b>sebelum</b> setiap putaran</> },
          { lines: [4], note: <>pembaruan yang membuat kondisi akhirnya salah</> },
        ]}
        take={<>Gunakan <code>for</code> bila jumlah putaran diketahui; gunakan <code>while</code> bila bergantung pada kondisi.</>}
        notes="Jawaban pertanyaan tebak: loop tak berhenti. Itu jembatan ke slide berikutnya." />

      <TraceSlide title={<>Melacak <code>while</code></>}
        snippet={s.whileDasar} vars={['i']} show={[1, 2, 3, 4, 5]} line={4} output={false}
        take={<><code>i</code> naik sampai kondisi <code>i &lt; 5</code> gagal. Pada putaran terakhir <code>i</code> menjadi <code>5</code>, kondisi <code>5 &lt; 5</code> salah, dan loop berhenti.</>}
        notes="Nilai i di tabel adalah nilai setelah i += 1. Tekankan bahwa angka 5 tidak pernah dicetak." />

      <CompareCodeSlide title="Loop tak berhenti"
        left={{ label: 'Berhenti', tone: 'pos', icon: 'check_circle', snippet: s.whileOk, hl: [4] }}
        right={{ label: 'Tak pernah berhenti', tone: 'neg', icon: 'error', snippet: s.whileBahaya, out: '0\n0\n⋮\nKeyboardInterrupt' }}
        take={<>Tanpa pembaruan, loop tak berhenti. Tanyakan: <b>apa yang membuat kondisi ini akhirnya salah?</b></>}
        notes="Demo langsung di Colab bila sempat (tombol stop). Jelaskan bahwa kernel yang hang bukan rusak, hanya sibuk mengulang." />

      <ContentSlide title={<><code>break</code> dan <code>continue</code></>}
        notes="Minta tebakan untuk masing-masing sebelum klik. break keluar dari seluruh loop; continue hanya melewati sisa badan loop pada putaran itu.">
        <div className="pair">
          {[{ sn: s.brk, q: <>Angka apa yang tercetak?</> }, { sn: s.cont, q: <>Angka apa yang <b>tidak</b> tercetak?</> }].map(({ sn, q }) => (
            <div className="col" key={sn.file}>
              <CodeBlock code={sn.code} marks={[{ lines: [2, 3], at: 2, persist: true }]} />
              <div className="slot">
                <div className="fragment fade-out" data-fragment-index={1}><Predict>{q}</Predict></div>
                <div className="fragment fade-up" data-fragment-index={1}><Output out={sn.out} /></div>
              </div>
            </div>
          ))}
        </div>
      </ContentSlide>

      <CodeSlide title="Kalkulator berulang"
        snippet={s.kalkulator}
        steps={[
          { lines: [1], note: <><code>while True</code> berputar tanpa batas…</> },
          { lines: [5], note: <>…sampai <code>break</code> dijalankan</> },
        ]}
        notes="Ini satu-satunya while True yang aman: ada break yang bisa dicapai. Output di terminal adalah hasil menjalankan program dengan input +, 10, 5, lalu q." />

      <CodeSlide title="Cari bug: 45, bukan 55"
        snippet={s.bug}
        steps={[{ lines: [2], note: <>akhir <code>range</code> tidak ikut, jadi 10 tidak dijumlah</> }]}
        predict={<>Program ini ingin menjumlah <b>1 sampai 10</b>. Di baris mana letak salahnya, dan bagaimana memperbaikinya?</>}
        take={<>Perbaikan: <code>range(1, 11)</code>. Akhir <code>range</code> tidak ikut — ini kesalahan “off-by-one” yang sangat umum.</>}
        notes="Beri 2 menit berpasangan. Mahasiswa yang cepat boleh mengubah kodenya di Colab dan mengecek hasilnya = 55." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Faktorial', spec: <>Input <code>n</code>; cetak <M tex="n!" /> = 1 × 2 × … × n.</>, example: s.faktorial },
          { n: 2, title: 'Bilangan prima', spec: <>Input <code>n</code>; cetak “Prima” atau “Bukan Prima”.</>, example: s.prima },
        ]}
        notes="Latihan 1–2 wajib dikerjakan di kelas. Contoh hasil berasal dari solusi dosen; kodenya tidak ditampilkan." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Pola bintang', spec: <>Input <code>n</code>; cetak segitiga setinggi <code>n</code>.</>, example: s.bintang },
          { n: 4, title: 'Deret Fibonacci', spec: <>Input <code>n</code>; cetak <code>n</code> bilangan pertama.</>, example: s.fibonacci },
        ]}
        notes="Untuk mahasiswa yang cepat. Petunjuk Fibonacci: dua variabel yang diperbarui bersamaan." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Berapa baris output?</>, snippet: s.tFor, why: <>angka akhir <code>range</code> tidak ikut</> }}
        notes="Kumpulkan jawaban lewat tunjuk tangan atau polling singkat. Tujuan yang banyak salah menentukan apa yang diulang di awal pertemuan 6." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tWhile, why: <><code>n -= 1</code> membuat loop berhenti</> }}
        notes="Sama seperti tiket 1." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Angka apa yang tercetak?</>, snippet: s.tCont, why: <>yang genap dilewati <code>continue</code></> }}
        notes="Sama seperti tiket 1." />

      <SummarySlide title="Ringkasan" points={[
        { head: <code>for</code>, body: 'jumlah putaran diketahui atau mengelilingi urutan' },
        { head: <code>while</code>, body: 'berulang selama kondisi benar — pastikan kondisinya bisa menjadi salah' },
        { head: <code>range()</code>, body: 'membuat urutan angka; akhirnya tidak ikut' },
        { head: <><code>break</code> / <code>continue</code></>, body: 'berhenti total / lewati putaran ini' },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 5"
        tasks={[
          { head: 'Hitung rata-rata', body: <>Input <code>n</code> angka dengan loop, jumlahkan, lalu bagi <code>n</code>.</> },
          { head: 'Tabel perkalian', body: <>Cetak tabel perkalian 1 sampai <code>n</code> dengan loop bersarang.</> },
          { head: 'Tebak angka (terbatas)', body: <>Seperti minggu lalu, tetapi maksimal <b>5 percobaan</b>; jika habis, “Game Over”.</> },
        ]}
        steps={[
          <>Tentukan jenis loop dan kondisi berhentinya</>,
          <>Tulis pseudocode: penghitung dan syarat berhenti</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji dengan beberapa input, termasuk input tepi</>,
          <>Tambahkan sel teks berisi refleksi singkat</>,
        ]}
        submit={{ file: 'Tugas5_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Tekankan pengujian dengan input tepi (n = 0, n = 1). Notebook harus menyertakan output contoh." />

      <NextSlide title="Pertemuan berikutnya: List" snippet={s.buah}
        lede="Menyimpan banyak data dalam satu variabel — dan loop akan sangat berguna untuk mengolahnya."
        notes="Jembatan: loop + list adalah pasangan yang akan sering dipakai. Tidak perlu menjelaskan sintaks sekarang." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 6: List" />
    </DeckMeta>
  );
}
