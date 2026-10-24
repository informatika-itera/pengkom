import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, TraceSlide, CompareCodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, RefTable, Take,
} from '../layouts';

const s = {
  review: snip('p14/review'), dasar: snip('p14/dasar'), ubah: snip('p14/ubah'), get: snip('p14/get'), bugKey: snip('p14/bug-key'),
  iterasi: snip('p14/iterasi'), frek: snip('p14/frekuensi'), records: snip('p14/records'),
  tryDasar: snip('p14/try-dasar'), ulangi: snip('p14/ulangi'), tryKey: snip('p14/try-key'),
  semua: snip('p14/except-semua'), spesifik: snip('p14/except-spesifik'),
  terbaik: snip('p14/terbaik'), huruf: snip('p14/huruf'), aman: snip('p14/aman'), kontak: snip('p14/kontak'),
  tDict: snip('p14/tiket-dict'), tFrek: snip('p14/tiket-frek'), tTry: snip('p14/tiket-try'),
  next: snip('p14/next-kuis'),
};

export default function Pertemuan14() {
  return (
    <DeckMeta meeting={14} topic="Dictionary dan Error">
      <TitleSlide meeting={14} course="Pengenalan Komputasi" title="Dictionary dan Error"
        lede={<>Menyimpan data berpasangan kunci dan nilai, lalu membuat program yang tidak runtuh saat masukan salah</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan bagaimana kita mencari nomor telepon di kontak: kita mencari nama, bukan nomor urut. Itu dictionary. Lalu: apa yang terjadi bila pengguna mengetik huruf saat diminta angka? Itu penanganan error. Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>dictionary sebagai pasangan <b>kunci</b> dan <b>nilai</b></> },
        { verb: 'Membuat', text: <>membaca, mengubah, dan menghapus isi dictionary</> },
        { verb: 'Menghitung', text: <>frekuensi dengan dictionary dan mengiterasinya</> },
        { verb: 'Menangani', text: <>error dengan <code>try</code> dan <code>except</code></> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di slide pembuka dictionary." />

      <CodeSlide title="Ingat kembali: tabel dari dictionary" snippet={s.review}
        predict={<>Pertemuan 11 membuat tabel dari kurung kurawal <code>{'{ }'}</code>. Berapa usia terbesar?</>}
        take={<>Kurung kurawal berisi pasangan <code>kunci: nilai</code> itu adalah <b>dictionary</b>. Hari ini kita membedahnya.</>}
        notes="Menutup celah dari Pertemuan 11: DataFrame dibuat dari dictionary yang belum dijelaskan. Jawaban: 20." />

      <ContentSlide title="Apa itu dictionary?"
        notes="Analogi kamus atau kontak: mencari lewat kunci, bukan lewat nomor urut seperti list. Kunci harus unik; nilai boleh apa saja.">
        <p className="lede">Dictionary menyimpan data sebagai pasangan <b>kunci → nilai</b>, diakses lewat kunci, bukan nomor urut.</p>
        <RefTable head={['Kunci', 'Nilai']} rows={[['"nama"', '"Budi"'], ['"umur"', '20'], ['"kota"', '"Lampung"']]} />
        <Take>List mencari lewat nomor (<code>x[0]</code>); dictionary mencari lewat kunci (<code>d["nama"]</code>).</Take>
      </ContentSlide>

      <CodeSlide title="Membuat dan membaca" snippet={s.dasar}
        predict={<>Apa yang dicetak baris 2, 3, dan 4?</>}
        steps={[
          { lines: [1, 2, 3, 4], note: <>kurung kurawal, tiap pasangan <code>kunci: nilai</code>, dipisah koma</> },
          { lines: [5], note: <><code>mhs["nama"]</code> mengambil nilai milik kunci <code>"nama"</code></> },
          { lines: [6], note: <>nilainya bertipe <code>int</code>, jadi bisa dijumlah</> },
          { lines: [7], note: <><code>len</code> menghitung banyaknya pasangan</> },
        ]}
        notes="Kunci umumnya string. Dictionary mempertahankan urutan penyisipan sejak Python 3.7." />

      <CodeSlide title="Mengubah, menambah, menghapus" snippet={s.ubah}
        predict={<>Setelah empat baris, isi dictionary apa saja yang tersisa?</>}
        steps={[
          { lines: [2], note: <>kunci yang sudah ada: nilainya <b>diganti</b></> },
          { lines: [3], note: <>kunci baru: pasangan <b>ditambahkan</b></> },
          { lines: [4], note: <><code>del</code> menghapus pasangan menurut kunci</> },
        ]}
        take={<>Satu bentuk <code>d[kunci] = nilai</code> untuk mengubah <i>dan</i> menambah.</>}
        notes="Jika kunci ada, diganti; jika tidak, ditambahkan. Dictionary bersifat mutable seperti list." />

      <CodeSlide title="Kunci yang tidak ada: get" snippet={s.get}
        predict={<>Kunci <code>"kota"</code> tidak ada. Apa yang dicetak baris 3 dan 4?</>}
        steps={[
          { lines: [2], note: <><code>get</code> mengambil nilai seperti <code>d[kunci]</code></> },
          { lines: [3], note: <>kunci tidak ada: hasilnya <code>None</code>, bukan error</> },
          { lines: [4], note: <>argumen kedua adalah nilai cadangan</> },
          { lines: [5], note: <><code>in</code> memeriksa apakah kunci ada</> },
        ]}
        take={<>Pakai <code>get(kunci, cadangan)</code> bila kunci mungkin tidak ada.</>}
        notes="Banyak latihan memakai get dengan nilai cadangan 0 untuk menghitung." />

      <CodeSlide title="Cari bug: KeyError" snippet={s.bugKey}
        out="KeyError: 'umur'"
        predict={<>Kunci <code>"umur"</code> tidak ada di dictionary. Apa yang terjadi?</>}
        steps={[{ lines: [2], note: <><code>d[kunci]</code> pada kunci yang tidak ada menimbulkan <code>KeyError</code></> }]}
        take={<>Perbaikan: <code>mhs.get("umur")</code>, atau periksa dulu dengan <code>"umur" in mhs</code>.</>}
        notes="Pesan KeyError menyebut kunci yang dicari. Bandingkan dengan IndexError pada list." />

      <CodeSlide title="Mengiterasi dictionary" snippet={s.iterasi}
        predict={<>Loop memberi dua variabel sekaligus. Apa isi <code>nama</code> dan <code>n</code> pada putaran pertama?</>}
        steps={[
          { lines: [2, 3], note: <><code>items()</code> memberi pasangan (kunci, nilai) di setiap putaran</> },
          { lines: [4, 5], note: <><code>values()</code> memberi semua nilai; <code>sum</code> dan <code>len</code> menghitung rata-rata</> },
        ]}
        notes="Mirip enumerate pada list: dua variabel menampung pasangan. keys() dan values() juga tersedia." />

      <TraceSlide title="Menghitung frekuensi"
        snippet={s.frek} vars={['k', 'hitung']} show={[1, 2, 3]} line={4}
        take={<><code>get(k, 0) + 1</code>: bila kata belum ada mulai dari 0, lalu tambah 1.</>}
        notes="Ini pola paling penting pertemuan ini dan jawaban untuk tugas Penghitung Kata di Pertemuan 6. Telusuri baris per baris: apel muncul dua kali." />

      <CodeSlide title="List berisi dictionary" snippet={s.records}
        predict={<>Setiap dictionary mewakili satu baris data. Seperti apa tabel yang dihasilkan baris 9?</>}
        steps={[
          { lines: [3, 4, 5, 6], note: <>list berisi dictionary: satu dictionary = satu <b>baris</b>, kunci = nama <b>kolom</b></> },
          { lines: [7, 8], note: <>loop mengambil satu dictionary demi satu</> },
          { lines: [9], note: <><code>DataFrame</code> mengubah list dictionary menjadi tabel pandas</> },
        ]}
        take={<>Begitulah baris-baris CSV direpresentasikan: list berisi dictionary.</>}
        notes="Menghubungkan dictionary dengan DataFrame (Pertemuan 11 dan 13)." />

      <CodeSlide title="try dan except" snippet={s.tryDasar}
        predict={<>Pengguna mengetik <code>dua puluh</code>. Apakah program berhenti dengan error?</>}
        steps={[
          { lines: [1, 2, 3], note: <>blok <code>try</code> dicoba; bila ada error, sisanya dilewati</> },
          { lines: [4, 5], note: <><code>except ValueError</code> berjalan hanya bila errornya <code>ValueError</code></> },
        ]}
        take={<>Program tidak runtuh: ia memberi pesan yang ramah, bukan traceback.</>}
        notes="ValueError adalah error yang muncul saat int() menerima teks yang bukan angka (Pertemuan 2)." />

      <CodeSlide title="Ulangi sampai benar" snippet={s.ulangi}
        predict={<>Pengguna mengetik <code>abc</code>, lalu <code>7</code>. Apa saja yang tercetak?</>}
        steps={[
          { lines: [1, 2, 3], note: <>loop terus mencoba membaca angka</> },
          { lines: [4], note: <>bila berhasil, <code>break</code> keluar dari loop</> },
          { lines: [5, 6], note: <>bila gagal, pesan ditampilkan dan loop mengulang</> },
        ]}
        take={<>Gabungan <code>while</code>, <code>try</code>, dan <code>break</code> untuk masukan yang pasti benar.</>}
        notes="Pola ini dipakai di hampir semua program interaktif. break dilewati bila int() gagal karena error melompat langsung ke except." />

      <CodeSlide title="Menangkap KeyError" snippet={s.tryKey}
        predict={<>Kunci tidak ada, tetapi program tidak berhenti. Mengapa?</>}
        steps={[{ lines: [4, 5], note: <><code>except KeyError</code> menangkap error spesifik milik dictionary</> }]}
        take={<>Sebutkan jenis error yang kamu harapkan; jangan menangkap semuanya.</>}
        notes="Bandingkan dengan get: get cocok bila ketiadaan kunci hal biasa; try-except cocok bila ia pengecualian." />

      <CompareCodeSlide title="Tangkap yang spesifik"
        left={{ label: 'except kosong', tone: 'neg', icon: 'visibility_off', snippet: s.semua, hl: [3] }}
        right={{ label: 'except spesifik', tone: 'pos', icon: 'check_circle', snippet: s.spesifik, hl: [3], out: "NameError: name 'nilaii' is not defined" }}
        take={<>Kiri menyembunyikan salah ketik; kanan membiarkan error asli muncul sehingga bisa diperbaiki.</>}
        notes="Nama nilaii salah ketik. except kosong menelan semua error sehingga bug tersembunyi. Aturan: tangkap hanya yang kita tahu cara menanganinya." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Nilai terbaik', spec: <>Dari dictionary nama dan nilai, cetak siswa dengan nilai tertinggi.</>, example: s.terbaik },
          { n: 2, title: 'Frekuensi huruf', spec: <>Hitung kemunculan tiap huruf pada <code>"banana"</code>.</>, example: s.huruf },
        ]}
        notes="Latihan 1–2 wajib. Latihan 1: pantau nilai tertinggi dengan loop. Latihan 2: pola get(h, 0) + 1." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Masukan aman', spec: <>Minta umur sampai pengguna mengetik angka yang benar.</>, example: s.aman },
          { n: 4, title: 'Buku kontak', spec: <>Cari nomor telepon dari dictionary; bila tidak ada, cetak “Tidak ditemukan”.</>, example: s.kontak },
        ]}
        notes="Latihan 3 memakai while, try, dan break. Latihan 4 memakai get dengan nilai cadangan." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa output-nya?</>, snippet: s.tDict, why: <>kunci <code>"c"</code> ditambahkan, jadi ada 3 pasangan; nilai <code>"b"</code> adalah 2</> }}
        notes="Polling singkat." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tFrek, why: <><code>"a"</code> muncul dua kali dan <code>"b"</code> satu kali</> }}
        notes="Minta mahasiswa menulis isi d setelah tiap putaran." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa output-nya? Apakah <code>B</code> tetap tercetak?</>, snippet: s.tTry, why: <><code>int("x")</code> menimbulkan <code>ValueError</code>, ditangkap (cetak <code>A</code>), lalu program lanjut ke <code>B</code></> }}
        notes="Inti: error yang ditangkap tidak menghentikan program." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'Dictionary', body: <>pasangan kunci dan nilai: <code>d[kunci]</code>, <code>get</code>, <code>in</code>, <code>items()</code></> },
        { head: 'Mengubah', body: <><code>d[k] = v</code> untuk mengubah dan menambah; <code>del d[k]</code> untuk menghapus</> },
        { head: 'Frekuensi', body: <><code>d[k] = d.get(k, 0) + 1</code></> },
        { head: 'Error', body: <><code>try</code> dan <code>except Jenis</code>; tangkap yang spesifik</> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 14"
        tasks={[
          { head: 'Penghitung kata', body: <>Hitung frekuensi tiap kata pada kalimat masukan (petunjuk: <code>kalimat.split()</code> memecah teks menjadi list kata).</> },
          { head: 'Buku nilai', body: <>Dictionary nama dan nilai: tambah, lihat, ubah, hapus; masukan angka divalidasi dengan <code>try</code>.</> },
        ]}
        steps={[
          <>Tentukan struktur data: kunci dan nilainya apa</>,
          <>Tulis pseudocode untuk tiap operasi</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji dengan masukan salah dan kunci yang tidak ada</>,
          <>Tambahkan sel teks berisi refleksi singkat</>,
        ]}
        submit={{ file: 'Tugas14_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Penghitung kata adalah tugas yang tertunda dari Pertemuan 6; kini ada alatnya (dictionary dan split)." />

      <NextSlide title="Berikutnya: Kuis Pra-UAS" lede="Kuis mencakup materi Pertemuan 9 sampai 14. Contoh kecil sebagai penghubung: memecah teks menjadi list kata." snippet={s.next}
        notes="Jembatan: split memecah teks menjadi list kata, yang akan dipakai pada tugas." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 15: Kuis Pra-UAS" />
    </DeckMeta>
  );
}
