import { snip, ListDiagram } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, RefTable, Take,
} from '../layouts';

const s = {
  review: snip('p10/review'), index: snip('p10/index'), slicing: snip('p10/slicing'), method: snip('p10/method-dasar'),
  cari: snip('p10/cari'), fstring: snip('p10/fstring'), bug: snip('p10/bug-immutable'),
  email: snip('p10/email'), password: snip('p10/password'), kode: snip('p10/kode'), huruf: snip('p10/huruf'),
  tSlice: snip('p10/tiket-slicing'), tFstr: snip('p10/tiket-fstring'), tValid: snip('p10/tiket-validasi'),
  next: snip('p10/next-library'),
};

export default function Pertemuan10() {
  return (
    <DeckMeta meeting={10} topic="String">
      <TitleSlide meeting={10} course="Pengenalan Komputasi" title="String"
        lede={<>Mengolah teks: mengubah huruf, mencari, memotong, dan memformat keluaran</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tampilkan nama panjang atau alamat email yang berantakan (huruf campur, spasi berlebih). Bagaimana merapikannya otomatis? Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menggunakan', text: <>method string seperti <code>upper</code>, <code>strip</code>, <code>replace</code>, dan <code>find</code></> },
        { verb: 'Memotong', text: <>teks dengan index dan <i>slicing</i></> },
        { verb: 'Memformat', text: <>keluaran dengan <i>f-string</i></> },
        { verb: 'Membuat', text: <>validasi input sederhana</> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dilatih di semua slide method dan latihan." />

      <CodeSlide title="Ingat kembali: fungsi" snippet={s.review}
        predict={<>Dari Pertemuan 9: apa dua baris yang tercetak? Perhatikan baris terakhir.</>}
        take={<>Fungsi mengembalikan nilai yang bisa dipakai lagi. Hari ini kita memakai fungsi bawaan untuk teks.</>}
        notes="Retrieval practice. Jawaban: 8 dan 8 (ganda(2)=4, ganda(4)=8). Beri 2 menit." />

      <ContentSlide title="String adalah urutan karakter"
        notes="Analogi dengan list: setiap karakter punya nomor. Perbedaan penting: string tidak bisa diubah per karakter (immutable) — dibahas di slide cari bug.">
        <p className="lede">Seperti list, string punya index mulai dari <code>0</code>, dan index negatif menghitung dari belakang.</p>
        <ListDiagram items={['P', 'K', 'O', 'M']} negative mark={[0]} />
        <Take>Bedanya dengan list: karakter string <b>tidak bisa diubah</b> satu per satu.</Take>
      </ContentSlide>

      <CodeSlide title="Index string" snippet={s.index}
        predict={<>Apa yang dicetak baris 2, 3, dan 4?</>}
        steps={[
          { lines: [2], note: <><code>[0]</code>: karakter pertama</> },
          { lines: [3], note: <><code>[-1]</code>: karakter terakhir</> },
          { lines: [4], note: <><code>len</code> menghitung banyaknya karakter</> },
        ]}
        notes="Sama seperti list. len(kode) adalah 4 sehingga index valid 0 sampai 3." />

      <CodeSlide title="Slicing string" snippet={s.slicing}
        predict={<>Tebak isi <code>matkul</code>, <code>tahun</code>, dan <code>kelas</code>.</>}
        steps={[
          { lines: [2], note: <>index <code>0</code> sampai <b>sebelum</b> <code>4</code></> },
          { lines: [3], note: <>index <code>5</code> sampai <b>sebelum</b> <code>9</code>: tanda <code>-</code> di index 4 dilewati</> },
          { lines: [4], note: <>satu karakter terakhir</> },
        ]}
        take={<>Aturan sama dengan list dan <code>range</code>: index akhir tidak ikut.</>}
        notes="Gambarkan nomor tiap karakter di papan tulis: P0 K1 O2 M3 -4 2(5) 0(6) 2(7) 6(8) -9 A10." />

      <CodeSlide title="Method untuk mengubah teks" snippet={s.method}
        predict={<>Kurung siku <code>[ ]</code> menandai ujung teks. Spasi mana yang hilang?</>}
        steps={[
          { lines: [2], note: <><code>upper()</code>: semua huruf kapital, spasi tetap</> },
          { lines: [3], note: <><code>strip()</code>: spasi di <b>kedua ujung</b> dihapus</> },
          { lines: [4], note: <><code>replace(a, b)</code>: ganti setiap <code>a</code> dengan <code>b</code></> },
        ]}
        take={<>Method string selalu menghasilkan teks <b>baru</b>; teks asli <code>s</code> tidak berubah.</>}
        notes="Kurung siku pada f-string dipakai agar spasi terlihat. Tekankan s tidak berubah." />

      <CodeSlide title="Mencari di dalam teks" snippet={s.cari}
        predict={<>Berapa kali huruf <code>a</code> muncul? Di index berapa <code>Python</code> mulai?</>}
        steps={[
          { lines: [2], note: <><code>find</code> memberi index awal; <code>-1</code> bila tidak ada</> },
          { lines: [3], note: <><code>count</code> menghitung kemunculan: <code>Belajar</code> memuat dua <code>a</code></> },
          { lines: [4, 5], note: <><code>startswith</code> dan <code>endswith</code> menghasilkan <code>True</code> atau <code>False</code></> },
        ]}
        notes="Hasil count adalah 2 (be-l-a-j-a-r). Hitung bersama dengan menunjuk huruf satu per satu." />

      <ContentSlide title="Method string populer"
        notes="Tabel acuan untuk latihan. Mahasiswa tidak perlu menghafal; mereka perlu tahu bahwa method ini ada dan bagaimana mencarinya.">
        <RefTable head={['Method', 'Fungsi']} rows={[
          ['upper() / lower()', 'huruf kapital / huruf kecil semua'],
          ['title()', 'huruf pertama tiap kata kapital'],
          ['strip()', 'hapus spasi di kedua ujung'],
          ['replace(a, b)', 'ganti a dengan b'],
          ['find(x)', 'index kemunculan pertama x, atau -1'],
          ['count(x)', 'hitung kemunculan x'],
          ['startswith(x) / endswith(x)', 'True bila diawali / diakhiri x'],
        ]} />
      </ContentSlide>

      <CodeSlide title="Memformat dengan f-string" snippet={s.fstring}
        predict={<>Apa yang dilakukan <code>:.2f</code> dan <code>:,</code> pada angka?</>}
        steps={[
          { lines: [4], note: <><code>{'{nama}'}</code> disisipkan ke dalam teks</> },
          { lines: [5], note: <><code>:.2f</code>: dua angka di belakang koma</> },
          { lines: [6], note: <><code>:,</code>: pemisah ribuan</> },
        ]}
        notes="f-string: awalan f sebelum tanda kutip. Format dibatasi pada .2f dan koma; jangan memperluas." />

      <CodeSlide title="Cari bug: string tak bisa diubah" snippet={s.bug}
        out="TypeError: 'str' object does not support item assignment"
        predict={<>Pada list, <code>x[0] = ...</code> mengganti elemen. Apakah berlaku untuk string?</>}
        steps={[{ lines: [2], note: <>karakter string tidak boleh diganti satu per satu</> }]}
        take={<>Buat string baru: <code>s = "H" + s[1:]</code>, atau pakai <code>replace</code>.</>}
        notes="Konsep immutable. String lama tidak berubah; kita membuat string baru dan menimpa variabelnya." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Email cleaner', spec: <>Masukan <code>" User@Example.COM "</code> menjadi huruf kecil tanpa spasi di ujung.</>, example: s.email },
          { n: 2, title: 'Password generator', spec: <>Tiga huruf pertama nama (kapital) digabung dengan tahun lahir.</>, example: s.password },
        ]}
        notes="Latihan 1–2 wajib. Petunjuk: strip() dan lower() berurutan; slicing nama[0:3] dan upper()." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Validasi kode', spec: <>Kode valid bila diawali <code>PKOM</code> dan panjangnya 11.</>, example: s.kode },
          { n: 4, title: 'Hitung huruf a', spec: <>Hitung huruf <code>a</code> pada kalimat, tanpa membedakan besar-kecil.</>, example: s.huruf },
        ]}
        notes="Latihan 3 menggabungkan if, and, startswith, dan len. Latihan 4: ubah ke huruf kecil dulu agar A dan a terhitung." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa dua baris output-nya?</>, snippet: s.tSlice, why: <><code>[0:3]</code> mengambil index 0–2; <code>[-3:]</code> tiga karakter terakhir</> }}
        notes="Polling singkat. Periksa aturan index akhir tidak ikut." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tFstr, why: <><code>:.2f</code> membulatkan ke dua angka di belakang koma</> }}
        notes="Jika ada yang menjawab 3.14159, ulangi arti :.2f." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa dua baris output-nya?</>, snippet: s.tValid, why: <>panjang 6 kurang dari 8, tetapi diawali <code>abc</code>: <code>False</code> lalu <code>True</code></> }}
        notes="Validasi adalah kombinasi kondisi-kondisi seperti ini; tugas password memakai pola yang sama." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'Method', body: <><code>upper</code>, <code>lower</code>, <code>strip</code>, <code>replace</code>; hasilnya string baru</> },
        { head: 'Mencari', body: <><code>find</code>, <code>count</code>, <code>startswith</code>, <code>endswith</code></> },
        { head: 'Slicing', body: <><code>teks[awal:akhir]</code>; string tidak bisa diubah per karakter</> },
        { head: 'f-string', body: <><code>f"Teks {'{variabel}'}"</code> dan format angka</> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 10"
        tasks={[
          { head: 'Analisis teks', body: <>Masukkan sebuah paragraf; hitung jumlah huruf vokal, konsonan, dan kata.</> },
          { head: 'Validasi password kuat', body: <>Fungsi <code>is_strong(password)</code>: minimal 8 karakter, ada angka, dan ada huruf besar.</> },
        ]}
        steps={[
          <>Tentukan method string yang tepat untuk tiap bagian</>,
          <>Tulis pseudocode dengan operasi string yang dibutuhkan</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji dengan beberapa teks, termasuk teks kosong</>,
          <>Tambahkan sel teks berisi refleksi singkat</>,
        ]}
        submit={{ file: 'Tugas10_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Petunjuk: untuk memeriksa angka atau huruf besar, ulangi setiap karakter dengan for dan gunakan method isdigit() dan isupper() (boleh diberi tahu)." />

      <NextSlide title="Berikutnya: Library" lede="Memakai kode orang lain untuk mempercepat pekerjaan kita." snippet={s.next}
        notes="Jembatan: import math memberi akses ke fungsi matematika siap pakai; dengan titik, seperti method." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 11: Menggunakan Library" />
    </DeckMeta>
  );
}
