import { M, snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, CompareCodeSlide,
  PracticeSlide, TicketSlide, SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, IOFlow, Take,
} from '../layouts';

const s = {
  review: snip('p09/review'), tanpa: snip('p09/tanpa-fungsi'), dengan: snip('p09/dengan-fungsi'), halo: snip('p09/halo'),
  parameter: snip('p09/parameter'), kuadrat: snip('p09/kuadrat'), cetak: snip('p09/cetak'), kembali: snip('p09/kembali'),
  global: snip('p09/scope-global'), lokal: snip('p09/scope-lokal'), kataGlobal: snip('p09/global'), luas: snip('p09/luas'),
  bug: snip('p09/bug-return'),
  kalkulator: snip('p09/kalkulator'), counter: snip('p09/counter'), suhu: snip('p09/suhu'), rata: snip('p09/rata'),
  tParam: snip('p09/tiket-parameter'), tReturn: snip('p09/tiket-return'), tScope: snip('p09/tiket-scope'),
  next: snip('p09/next-string'),
};

export default function Pertemuan09() {
  return (
    <DeckMeta meeting={9} topic="Fungsi">
      <TitleSlide meeting={9} course="Pengenalan Komputasi" title="Fungsi"
        lede={<>Membungkus kode yang sama menjadi blok bernama, lalu memanggilnya berulang kali</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan siapa yang pernah menyalin potongan kode yang sama berkali-kali. Fungsi adalah cara berhenti menyalin. Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>fungsi sebagai blok kode bernama yang dapat dipanggil ulang</> },
        { verb: 'Menulis', text: <>fungsi dengan <code>def</code>, parameter, dan argumen</> },
        { verb: 'Mengembalikan', text: <>nilai dengan <code>return</code> dan membedakannya dari <code>print</code></> },
        { verb: 'Membedakan', text: <>variabel lokal dan global (<i>scope</i>)</> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Memecah masalah menjadi sub-masalah dilatih di slide studi kasus dan latihan." />

      <CodeSlide title="Ingat kembali: percabangan dan loop" snippet={s.review}
        predict={<>Dari Pertemuan 3 dan 5: apa lima baris yang tercetak?</>}
        take={<>Hari ini kita membungkus potongan kode seperti ini agar bisa dipakai lagi tanpa disalin.</>}
        notes="Retrieval practice dari materi sebelumnya. Jawaban: 3 kecil, 8 besar, 5 besar. Beri 2 menit." />

      <CompareCodeSlide title="Menyalin atau memanggil?"
        left={{ label: 'Tanpa fungsi', tone: 'neg', icon: 'content_copy', snippet: s.tanpa }}
        right={{ label: 'Dengan fungsi', tone: 'pos', icon: 'functions', snippet: s.dengan, hl: [1, 2] }}
        take={<>Hasil sama, tetapi mengubah sapaan cukup di <b>satu</b> tempat.</>}
        notes="Minta mahasiswa menyebut apa yang harus diubah jika sapaan menjadi 'Selamat pagi': tiga baris (kiri) versus satu baris (kanan). Ini prinsip DRY: Don't Repeat Yourself." />

      <ContentSlide title="Fungsi sebagai mesin"
        notes="Analogi mesin penjual otomatis: uang dan kode produk masuk, minuman keluar. Tekankan bahwa pengguna tidak perlu tahu isi mesin: cukup tahu masukan dan hasilnya.">
        <p className="lede">Fungsi menerima masukan, memprosesnya, dan memberikan hasil, seperti mesin penjual otomatis.</p>
        <IOFlow input={<>uang + kode produk</>} process={<>mesin bekerja di dalam</>} output={<>minuman</>} />
        <Take>Dalam kode: <code>kuadrat(5)</code> menerima <code>5</code>, memprosesnya, dan menghasilkan <code>25</code>.</Take>
      </ContentSlide>

      <CodeSlide title="Fungsi pertama" snippet={s.halo}
        predict={<>Berapa kali <code>Halo Dunia!</code> tercetak?</>}
        steps={[
          { lines: [1, 2], note: <><code>def</code> hanya <b>mendefinisikan</b>: belum ada yang tercetak</> },
          { lines: [4], note: <>pemanggilan pertama menjalankan badan fungsi</> },
          { lines: [5], note: <>pemanggilan kedua: kode yang sama, tanpa disalin</> },
        ]}
        take={<><code>def nama():</code> membuat fungsi; <code>nama()</code> menjalankannya. Badan fungsi harus menjorok.</>}
        notes="Miskonsepsi paling umum: mengira def langsung menjalankan fungsi. Jawaban tebakan: dua kali." />

      <CodeSlide title="Parameter dan argumen" snippet={s.parameter}
        predict={<>Apa yang tercetak oleh dua pemanggilan di baris 4 dan 5?</>}
        steps={[
          { lines: [1], note: <><b>parameter</b>: nama variabel masukan di definisi</> },
          { lines: [4], note: <><b>argumen</b>: nilai nyata saat memanggil; <code>5</code> masuk ke <code>a</code>, <code>3</code> ke <code>b</code></> },
          { lines: [5], note: <>argumen boleh berbeda di setiap pemanggilan</> },
        ]}
        take={<>Parameter = wadah di definisi. Argumen = nilai yang dikirim saat memanggil.</>}
        notes="Urutan argumen cocok dengan urutan parameter. Jelaskan bahwa f-string ({a + b}) dibahas lebih dalam di Pertemuan 10." />

      <CodeSlide title="Alur pemanggilan dengan return" snippet={s.kuadrat}
        predict={<>Mengapa <code>hasil + 10</code> bisa dihitung? Berapa nilainya?</>}
        steps={[
          { lines: [4], note: <>program memanggil <code>kuadrat(5)</code></> },
          { lines: [1], note: <><code>5</code> masuk ke parameter <code>x</code></> },
          { lines: [2], note: <><code>return</code> mengirim <code>25</code> kembali ke pemanggil</> },
          { lines: [4], note: <><code>25</code> disimpan di <code>hasil</code></> },
          { lines: [5], note: <><code>hasil + 10</code> = <code>35</code>, karena nilainya bisa diolah lagi</> },
        ]}
        notes="Ini slide alur: sorotan berpindah mengikuti urutan eksekusi sebenarnya, bukan urutan baris. Minta mahasiswa menunjuk baris berikutnya sebelum klik." />

      <CompareCodeSlide title="print atau return?"
        left={{ label: 'print di dalam', tone: 'neg', icon: 'error', snippet: s.cetak, hl: [2] }}
        right={{ label: 'return', tone: 'pos', icon: 'check_circle', snippet: s.kembali, hl: [2] }}
        take={<><code>print</code> hanya menampilkan ke layar. <code>return</code> mengirim nilai kembali sehingga bisa disimpan dan diolah.</>}
        notes="Versi kiri menghasilkan None karena fungsi tanpa return mengembalikan None. Ini sumber bug yang sering muncul di tugas." />

      <CompareCodeSlide title="Scope: lokal dan global"
        left={{ label: 'Global: terbaca', tone: 'pos', icon: 'public', snippet: s.global, hl: [1, 3] }}
        right={{ label: 'Lokal: tidak terlihat', tone: 'neg', icon: 'lock', snippet: s.lokal, hl: [2, 5], out: "5\nNameError: name 'y' is not defined" }}
        take={<>Variabel di dalam fungsi hanya hidup di dalam fungsi. Variabel global dapat dibaca dari mana saja.</>}
        notes="Output kanan: baris print(y) di luar fungsi menghasilkan NameError. Baca pesan error bersama-sama: y tidak dikenal di luar fungsi." />

      <CodeSlide title="Mengubah variabel global" snippet={s.kataGlobal}
        predict={<>Dua pemanggilan <code>tambah_skor()</code>. Berapa nilai akhir <code>skor</code>?</>}
        steps={[
          { lines: [4], note: <><code>global skor</code> memberi izin mengubah variabel di luar fungsi</> },
          { lines: [5], note: <>tanpa baris 4, <code>skor</code> di sini dianggap variabel lokal baru</> },
        ]}
        take={<>Gunakan <code>global</code> hanya bila perlu; biasanya lebih baik mengirim nilai lewat parameter dan <code>return</code>.</>}
        notes="Dibutuhkan untuk latihan counter. Sebutkan bahwa pemakaian global berlebihan membuat program sulit dilacak." />

      <CodeSlide title="Memecah masalah" snippet={s.luas}
        predict={<>Dua fungsi, dua masalah kecil. Berapa luas lingkaran berjari-jari 2?</>}
        steps={[
          { lines: [1, 2], note: <>sub-masalah 1: luas persegi</> },
          { lines: [4, 5], note: <>sub-masalah 2: luas lingkaran</> },
          { lines: [7, 8], note: <>program utama tinggal memanggil fungsi yang tepat</> },
        ]}
        take={<>Masalah besar dipecah menjadi fungsi kecil, masing-masing mudah dibaca dan diuji.</>}
        notes="Studi kasus geometri: setiap fungsi punya satu tugas. Kaitkan dengan modularitas dan kemudahan menguji." />

      <CodeSlide title="Cari bug: lupa return" snippet={s.bug}
        predict={<>Diharapkan hasilnya <code>5</code>. Apa yang sebenarnya tercetak, dan mengapa?</>}
        steps={[{ lines: [2], note: <>nilai dihitung, tetapi tidak dikembalikan</> }]}
        take={<>Perbaikan: <code>return a + b</code>. Fungsi tanpa <code>return</code> menghasilkan <code>None</code>.</>}
        notes="Beri 2 menit berpasangan. Minta mahasiswa memperbaiki di Colab dan memeriksa hasil 5." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Kalkulator', spec: <>Fungsi <code>kalkulator(a, b, operasi)</code> yang me-<code>return</code> hasil sesuai <code>+ - * /</code>.</>, example: s.kalkulator },
          { n: 2, title: 'Counter', spec: <>Fungsi <code>counter()</code> memakai variabel global; tiap dipanggil nilainya naik 1.</>, example: s.counter },
        ]}
        notes="Latihan 1–2 wajib di kelas. Contoh hasil dari solusi dosen. Latihan 2 memerlukan global." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Konversi suhu', spec: <>Fungsi <code>celsius_to_fahrenheit(celsius)</code> dengan <M tex="F = \tfrac{9}{5}C + 32" />.</>, example: s.suhu },
          { n: 4, title: 'Rata-rata', spec: <>Fungsi <code>hitung_rata_rata(angka_list)</code> yang menjumlah dengan loop.</>, example: s.rata },
        ]}
        notes="Latihan 4 memakai loop dan list dari Pertemuan 5 dan 6, sekaligus return." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa output-nya?</>, snippet: s.tParam, why: <><code>a * b + 1</code> dengan <code>a=2</code>, <code>b=3</code> menghasilkan 7</> }}
        notes="Polling singkat. Periksa apakah mahasiswa memetakan argumen ke parameter dengan benar." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tReturn, why: <>dua nilai kembalian dijumlahkan: 6 + 8</> }}
        notes="Tekankan bahwa nilai return bisa langsung dipakai dalam ekspresi." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa output-nya: 5 atau 9?</>, snippet: s.tScope, why: <><code>n = 9</code> di dalam fungsi membuat variabel <b>lokal</b> baru; <code>n</code> global tetap 5</> }}
        notes="Miskonsepsi penting: menugaskan nilai di dalam fungsi tidak mengubah variabel global tanpa kata kunci global." />

      <SummarySlide title="Ringkasan" points={[
        { head: <code>def</code>, body: 'membuat fungsi; badan fungsi menjorok' },
        { head: 'Parameter', body: 'wadah masukan di definisi; argumen = nilai saat memanggil' },
        { head: <code>return</code>, body: 'mengembalikan hasil; berbeda dari print yang hanya menampilkan' },
        { head: 'Scope', body: 'variabel lokal hidup di dalam fungsi; global di luar' },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 9"
        tasks={[
          { head: 'Konversi suhu', body: <>Fungsi <code>c_to_f(c)</code>, <code>f_to_c(f)</code>, dan lainnya; pengguna memilih menu konversi.</> },
          { head: 'Kalkulator BMI modular', body: <>Pecah tugas BMI menjadi <code>hitung_bmi(b, t)</code> dan <code>get_kategori(bmi)</code>.</> },
        ]}
        steps={[
          <>Tentukan parameter, nilai kembalian, dan scope tiap fungsi</>,
          <>Tulis pseudocode dengan fungsi terpisah untuk tiap tugas</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji tiap fungsi dengan beberapa nilai, termasuk nilai tepi</>,
          <>Tambahkan sel teks berisi refleksi singkat</>,
        ]}
        submit={{ file: 'Tugas9_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Tekankan bahwa setiap fungsi hanya memiliki satu tugas, dan hasil dikembalikan dengan return, bukan dicetak di dalam fungsi." />

      <NextSlide title="Berikutnya: String" lede="Mengolah teks lebih dalam: mengubah huruf, mencari, dan memotong." snippet={s.next}
        notes="Jembatan: method string dipanggil dengan titik, mirip method list." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 10: String" />
    </DeckMeta>
  );
}
