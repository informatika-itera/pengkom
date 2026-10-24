import { snip, ListDiagram } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, TraceSlide, CompareCodeSlide,
  PracticeSlide, TicketSlide, SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, RefTable, Take,
} from '../layouts';

const s = {
  review: snip('p06/review-loop'), membuat: snip('p06/membuat'), akses: snip('p06/akses'), slicing: snip('p06/slicing'),
  ubah: snip('p06/ubah-tambah'), sisip: snip('p06/sisip-hapus'), builtin: snip('p06/builtin'), iterasi: snip('p06/iterasi'),
  idxRange: snip('p06/index-range'), idxEnum: snip('p06/index-enum'), kumpul: snip('p06/kumpul'), bug: snip('p06/bug-index'),
  statistik: snip('p06/statistik'), filter: snip('p06/filter'), todo: snip('p06/todo'), kata: snip('p06/kata'),
  tIndex: snip('p06/tiket-index'), tUbah: snip('p06/tiket-ubah'), tIter: snip('p06/tiket-iterasi'),
};

export default function Pertemuan06() {
  return (
    <DeckMeta meeting={6} topic="List">
      <TitleSlide meeting={6} course="Pengenalan Komputasi" title="List"
        lede={<>Menyimpan banyak nilai dalam satu variabel, lalu mengakses, mengubah, dan mengulanginya</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tunjukkan daftar nama mahasiswa di kelas. Tanyakan: bagaimana kalau kita harus membuat satu variabel untuk setiap nama? List adalah jawabannya. Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>list sebagai wadah bernomor dan arti <b>index</b></> },
        { verb: 'Mengakses', text: <>elemen list dengan index dan <i>slicing</i></> },
        { verb: 'Memodifikasi', text: <>list dengan <code>append</code>, <code>insert</code>, dan <code>remove</code></> },
        { verb: 'Mengiterasi', text: <>list dengan <code>for</code> dan memakai <code>len</code>, <code>sum</code>, <code>max</code>, <code>min</code></> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di slide diagram list." />

      <CodeSlide title="Ingat kembali: perulangan" snippet={s.review}
        predict={<>Dari Pertemuan 5: angka apa saja yang tercetak?</>}
        take={<>Hari ini loop bertemu data baru: bukan hanya angka dari <code>range</code>, tetapi isi sebuah list.</>}
        notes="Retrieval practice: 2 menit, tanpa membuka catatan. Jawaban: 0, 2, 4. Jika banyak yang salah, ulangi range sebelum lanjut." />

      <ContentSlide title="Apa itu list?"
        notes="Analogi loker bernomor. Tekankan bahwa nomor (index) dimulai dari 0, sama seperti range. Negatif menghitung dari belakang.">
        <p className="lede">List menyimpan banyak nilai dalam <b>satu</b> variabel, seperti loker yang bernomor.</p>
        <ListDiagram items={['"A"', '"B"', '"C"', '"D"', '"E"']} negative mark={[0]} />
        <Take>Nomor di bawah menghitung dari depan (mulai <code>0</code>); nomor di atas menghitung dari belakang.</Take>
      </ContentSlide>

      <CodeSlide title="Membuat list" snippet={s.membuat}
        predict={<>Baris 5–8 mencetak keempat list. Apa isi list yang dibuat dari <code>range(1, 6)</code>?</>}
        steps={[
          { lines: [1], note: <>list kosong, siap diisi nanti</> },
          { lines: [2], note: <>isi bertipe sama: tiga <code>str</code></> },
          { lines: [3], note: <>isi boleh campur tipe</> },
          { lines: [4], note: <><code>list()</code> mengubah <code>range</code> menjadi list</> },
        ]}
        notes="Tekankan kurung siku []. list(range(1, 6)) berhenti sebelum 6, ingatkan pada Pertemuan 5." />

      <CodeSlide title="Mengakses dengan index" snippet={s.akses}
        predict={<>Index dimulai dari <code>0</code>. Apa yang dicetak baris 2, 3, dan 4?</>}
        steps={[
          { lines: [2], note: <><code>[0]</code> = elemen pertama</> },
          { lines: [3], note: <><code>[2]</code> = elemen ketiga</> },
          { lines: [4], note: <><code>[-1]</code> = elemen terakhir</> },
        ]}
        take={<>List dengan 4 elemen punya index <code>0</code> sampai <code>3</code>; index terakhir selalu <code>len − 1</code>.</>}
        notes="Miskonsepsi: index mulai dari 1. Ulangi analogi loker. Index negatif sangat berguna untuk mengambil elemen terakhir tanpa tahu panjang list." />

      <CodeSlide title="Slicing: mengambil potongan" snippet={s.slicing}
        predict={<>Mirip <code>range</code>: apakah elemen di index akhir ikut terambil?</>}
        steps={[
          { lines: [2], note: <>index <code>0</code> sampai <b>sebelum</b> <code>2</code></> },
          { lines: [3], note: <>dari index <code>1</code> sampai akhir</> },
          { lines: [4], note: <>dari awal sampai <b>sebelum</b> index <code>3</code></> },
        ]}
        take={<><code>list[awal:akhir]</code>: elemen di <code>akhir</code> tidak ikut, sama seperti <code>range</code>.</>}
        notes="Kaitkan dengan range: batas akhir tidak ikut. Hasil slicing selalu list baru." />

      <CodeSlide title="List bisa diubah" snippet={s.ubah}
        predict={<>Setelah baris 2 dan 3, apa isi <code>buah</code>?</>}
        steps={[
          { lines: [2], note: <>mengganti elemen di index <code>0</code></> },
          { lines: [3], note: <><code>append</code> menambah di <b>akhir</b></> },
        ]}
        take={<>List bersifat <i>mutable</i>: isinya boleh berubah tanpa membuat variabel baru.</>}
        notes="Istilah mutable diperkenalkan di sini; kontras dengan string di Pertemuan 10 yang tidak bisa diubah." />

      <CodeSlide title="Menyisipkan dan menghapus" snippet={s.sisip}
        predict={<>Di mana <code>"jeruk"</code> disisipkan, dan elemen mana yang dihapus?</>}
        steps={[
          { lines: [2], note: <><code>insert(1, x)</code>: x menempati index <code>1</code>, sisanya bergeser</> },
          { lines: [4], note: <><code>remove(x)</code> menghapus nilai x yang pertama ditemukan</> },
        ]}
        notes="Tanyakan apa yang terjadi jika remove memakai nilai yang tidak ada (ValueError). Cukup disebut, tidak perlu demo." />

      <ContentSlide title="Method list populer"
        notes="Method adalah fungsi milik objek: dipanggil dengan titik. Tidak perlu dihafal; ini tabel acuan yang akan dipakai di latihan.">
        <RefTable head={['Method', 'Fungsi']} rows={[
          ['append(x)', 'tambah x di akhir'],
          ['insert(i, x)', 'sisipkan x di index i'],
          ['pop()', 'hapus dan ambil elemen terakhir'],
          ['remove(x)', 'hapus x pertama yang ditemukan'],
          ['sort()', 'urutkan dari kecil ke besar'],
          ['reverse()', 'balik urutan'],
          ['count(x)', 'hitung kemunculan x'],
        ]} />
      </ContentSlide>

      <CodeSlide title="Fungsi bawaan untuk list" snippet={s.builtin}
        predict={<>Tebak hasil keempat baris sebelum mengklik.</>}
        steps={[
          { lines: [2], note: <><code>len</code>: banyaknya elemen</> },
          { lines: [3, 4], note: <><code>max</code> dan <code>min</code>: nilai terbesar dan terkecil</> },
          { lines: [5], note: <><code>sum</code>: jumlah semua elemen</> },
        ]}
        notes="Beda dengan method: ditulis len(angka), bukan angka.len(). Rata-rata = sum / len, dipakai di latihan." />

      <CodeSlide title="Iterasi list dengan for" snippet={s.iterasi}
        predict={<>Variabel <code>item</code> berisi apa di setiap putaran?</>}
        steps={[{ lines: [2], note: <><code>item</code> mengambil satu elemen per putaran, dari depan ke belakang</> }]}
        take={<>Tanpa <code>range</code> dan tanpa index: <code>for</code> langsung membaca isi list.</>}
        notes="Ini cara yang direkomendasikan bila index tidak dibutuhkan. Bandingkan dengan for i in range(...) minggu lalu." />

      <TraceSlide title={<>Melacak <code>for</code> pada list</>}
        snippet={s.kumpul} vars={['angka', 'total']} show={[1, 2, 3]} line={3}
        take={<>Setiap putaran <code>angka</code> menjadi elemen berikutnya, lalu <code>total</code> bertambah.</>}
        notes="Minta mahasiswa menebak isi baris kedua sebelum klik. Nilai di tabel berasal dari eksekusi nyata." />

      <CompareCodeSlide title="Perlu index? Dua cara"
        left={{ label: 'range(len())', tone: 'neutral', icon: 'pin', snippet: s.idxRange }}
        right={{ label: 'enumerate()', tone: 'pos', icon: 'check_circle', snippet: s.idxEnum, hl: [2] }}
        take={<>Hasilnya sama; <code>enumerate</code> memberi index dan elemen sekaligus, lebih ringkas dan lebih sulit salah.</>}
        notes="enumerate mengembalikan pasangan (index, elemen); i, item membongkar pasangan itu. Cukup dikenalkan, tidak perlu menjelaskan tuple." />

      <CodeSlide title="Cari bug: IndexError" snippet={s.bug}
        out="IndexError: list index out of range"
        predict={<>List ini punya 3 elemen. Apa yang terjadi saat program mencetak <code>buah[3]</code>?</>}
        steps={[{ lines: [2], note: <>index terakhir adalah <code>2</code>, bukan <code>3</code></> }]}
        take={<>Index valid: <code>0</code> sampai <code>len(buah) − 1</code>. Di luar itu terjadi <code>IndexError</code>.</>}
        notes="Kesalahan off-by-one versi list. Output kesalahan adalah inti pesan Python; di Colab muncul traceback lengkap. Minta mahasiswa membaca baris terakhir pesan error." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Statistik list', spec: <>Untuk <code>[10, 50, 30]</code> cetak total, rata-rata, nilai terbesar, dan terkecil.</>, example: s.statistik },
          { n: 2, title: 'Filter ganjil-genap', spec: <>Pisahkan <code>[1, 2, 3, 4, 5]</code> menjadi list <code>genap</code> dan <code>ganjil</code>.</>, example: s.filter },
        ]}
        notes="Latihan 1–2 wajib di kelas. Petunjuk: sum dan len untuk rata-rata; append di dalam loop untuk filter. Contoh hasil dari solusi dosen." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Daftar tugas', spec: <>Menu tambah, lihat, keluar; tugas disimpan dalam list.</>, example: s.todo },
          { n: 4, title: 'Penghitung kata', spec: <>Hitung berapa kali sebuah kata muncul dalam list.</>, example: s.kata },
        ]}
        notes="Daftar tugas menggabungkan while, if, dan list. Penghitung kata boleh memakai count() atau loop manual." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa dua baris output-nya?</>, snippet: s.tIndex, why: <><code>[-2]</code> elemen kedua dari belakang; slicing tidak mengikutkan index akhir</> }}
        notes="Polling singkat. Jika banyak salah di slicing, ulangi aturan batas akhir tidak ikut." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa isi <code>x</code> di akhir?</>, snippet: s.tUbah, why: <>ikuti satu baris demi satu baris: <code>[1,2,3]</code> → <code>[1,2,3,4]</code> → <code>[9,2,3,4]</code> → <code>[9,3,4]</code></> }}
        notes="Minta mahasiswa menulis keadaan list setelah setiap baris." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa tiga baris output-nya?</>, snippet: s.tIter, why: <>penjumlahan <code>i + x</code> di setiap putaran: 0+7, 1+8, 2+9</> }}
        notes="enumerate memberi i (0, 1, 2) dan x (7, 8, 9)." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'List', body: 'wadah bernomor yang bisa diubah; index mulai dari 0' },
        { head: 'Akses', body: <><code>list[0]</code>, <code>list[-1]</code>, <code>list[awal:akhir]</code></> },
        { head: 'Ubah', body: <><code>append</code>, <code>insert</code>, <code>remove</code>, <code>pop</code>, <code>sort</code></> },
        { head: 'Analisis', body: <><code>len</code>, <code>sum</code>, <code>max</code>, <code>min</code>, dan <code>for</code> untuk mengulang</> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 6"
        tasks={[
          { head: 'Pengolahan list', body: <>Program statistik dan penyaring data angka.</> },
          { head: 'Pengelola data', body: <>Aplikasi sederhana untuk menambah, melihat, mengubah, dan menghapus data mahasiswa (nama dan NIM).</> },
          { head: 'Penghitung kata', body: <>Hitung frekuensi tiap kata pada kalimat yang dimasukkan.</> },
        ]}
        steps={[
          <>Tentukan struktur list dan operasi yang dibutuhkan</>,
          <>Tulis pseudocode dengan method list dan alur kontrol</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji dengan beberapa input, termasuk list kosong</>,
          <>Tambahkan sel teks berisi refleksi singkat</>,
        ]}
        submit={{ file: 'Tugas6_NIM_Nama.ipynb', deadline: 'Sebelum Kuis Pra-UTS' }}
        notes="Penghitung kata memerlukan memecah kalimat menjadi kata; untuk sementara boleh meminta pengguna memasukkan kata satu per satu, atau diberi tahu split() sebagai petunjuk." />

      <NextSlide title="Berikutnya: Kuis Pra-UTS" lede="Kuis mencakup materi Pertemuan 1 sampai 6."
        notes="Ingatkan format dan cakupan topik kuis.">
        <div className="chips-row">
          {['Variabel', 'Percabangan', 'Perulangan', 'List', 'Berpikir komputasional', 'Pemecahan masalah'].map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
      </NextSlide>

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 7: Kuis Pra-UTS" />
    </DeckMeta>
  );
}
