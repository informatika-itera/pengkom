import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, CardGrid, DoDont, VarBoxes, Take,
} from '../layouts';

const s = {
  review: snip('p02/review'), variabel: snip('p02/variabel'), tipe: snip('p02/tipe'), operator: snip('p02/operator'),
  penugasan: snip('p02/penugasan'), casting: snip('p02/casting'), input: snip('p02/input'), kalkulator: snip('p02/kalkulator'),
  bug: snip('p02/bug-input'),
  biodata: snip('p02/biodata'), suhu: snip('p02/suhu'), luas: snip('p02/luas'), bagi: snip('p02/bagi'),
  tTipe: snip('p02/tiket-tipe'), tOperator: snip('p02/tiket-operator'), tCasting: snip('p02/tiket-casting'),
  next: snip('p02/next-cabang'),
};

export default function Pertemuan02() {
  return (
    <DeckMeta meeting={2} topic="Variabel">
      <TitleSlide meeting={2} course="Pengenalan Komputasi" title="Variabel"
        lede={<>Menyimpan data dengan nama, mengenali tipenya, lalu menghitung dan membaca masukan dari pengguna</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan bagaimana kita mengingat nomor telepon: kita memberi nama kontaknya. Variabel bekerja sama: nama yang menunjuk ke sebuah nilai. Durasi ±100 menit: teori 45, praktik 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>variabel sebagai nama yang menyimpan nilai</> },
        { verb: 'Mengenali', text: <>tipe data <code>int</code>, <code>float</code>, <code>str</code>, dan <code>bool</code></> },
        { verb: 'Menghitung', text: <>dengan operator aritmatika dan penugasan</> },
        { verb: 'Mengonversi', text: <>tipe data dan membaca masukan dengan <code>input()</code></> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di slide pembuka variabel." />

      <CodeSlide title="Ingat kembali: print" snippet={s.review}
        predict={<>Dari Pertemuan 1: apa yang tercetak? Apa yang terjadi pada baris kedua?</>}
        take={<>Hari ini kita menyimpan nilai dengan nama, lalu mencetak nama itu, bukan teksnya langsung.</>}
        notes="Retrieval practice. Jawaban: Halo dan Python; baris kedua adalah komentar. Beri 2 menit." />

      <ContentSlide title="Apa itu variabel?"
        notes="Analogi kotak berlabel: nama adalah label, nilai adalah isi. Tekankan bahwa kita dapat mengganti isi kotak sewaktu-waktu.">
        <p className="lede">Variabel adalah <b>nama</b> yang menyimpan sebuah nilai di memori, seperti kotak berlabel.</p>
        <VarBoxes vars={[{ name: 'nama', value: '"Budi"' }, { name: 'umur', value: '20' }, { name: 'tinggi', value: '165.5' }]} />
        <Take>Label di bawah adalah nama variabel; isi kotak adalah nilainya.</Take>
      </ContentSlide>

      <CodeSlide title="Membuat variabel" snippet={s.variabel}
        predict={<>Dua baris terakhir mencetak variabel. Apa yang tampil?</>}
        steps={[
          { lines: [1], note: <><code>=</code> bukan “sama dengan”: nilai di kanan <b>disimpan</b> ke nama di kiri</> },
          { lines: [2, 3], note: <>tidak perlu menyebut tipe data; Python menentukannya sendiri</> },
          { lines: [5, 6], note: <><code>print(nama)</code> mencetak <b>isi</b> variabel, bukan kata “nama”</> },
        ]}
        notes="Miskonsepsi: = dianggap sama dengan matematika. Jelaskan bahwa ini penugasan (assignment), dibaca 'simpan ke'." />

      <ContentSlide title="Aturan penamaan"
        notes="Nama harus dimulai huruf atau garis bawah, tidak boleh spasi atau tanda hubung, tidak boleh keyword. Huruf besar dan kecil dibedakan.">
        <DoDont
          good={{ title: 'Boleh', items: [<><code>nama</code>, <code>nama_lengkap</code></>, <><code>nilai1</code>, <code>_kuota</code></>, <>huruf, angka, garis bawah</>, <><code>nama</code> dan <code>Nama</code> berbeda</>] }}
          bad={{ title: 'Tidak boleh', items: [<><code>1nama</code> (diawali angka)</>, <><code>nama-lengkap</code> (tanda hubung)</>, <><code>for</code>, <code>if</code>, <code>class</code> (kata kunci)</>, <>mengandung spasi</>] }} />
      </ContentSlide>

      <ContentSlide title="Empat tipe data dasar"
        notes="Tipe data menentukan apa yang boleh dilakukan pada nilai. Angka bisa dihitung, teks bisa digabung.">
        <CardGrid cols={4} items={[
          { icon: 'looks_one', head: 'int', body: 'bilangan bulat: 10, −5, 100' },
          { icon: 'decimal_increase', head: 'float', body: 'bilangan desimal: 3.14, 2.0', tone: 'secondary' },
          { icon: 'text_fields', head: 'str', body: 'teks dalam kutip: "Halo"', tone: 'tertiary' },
          { icon: 'toggle_on', head: 'bool', body: 'benar atau salah: True, False' },
        ]} />
      </ContentSlide>

      <CodeSlide title="Memeriksa tipe" snippet={s.tipe}
        predict={<>Fungsi <code>type()</code> menyebut tipe sebuah nilai. Tebak keempat hasilnya.</>}
        steps={[
          { lines: [5], note: <><code>20</code> adalah <code>int</code></> },
          { lines: [6], note: <>adanya titik desimal membuat <code>165.5</code> bertipe <code>float</code></> },
          { lines: [7, 8], note: <>teks dalam kutip adalah <code>str</code>; <code>True</code> adalah <code>bool</code></> },
        ]}
        notes="Tekankan: 2.0 adalah float walau bernilai bulat; '20' dengan kutip adalah str." />

      <CodeSlide title="Operator aritmatika" snippet={s.operator}
        predict={<>Tebak hasil tujuh operasi dengan angka 5 dan 3. Mana yang menghasilkan desimal?</>}
        steps={[
          { lines: [1, 2, 3], note: <>tambah, kurang, kali</> },
          { lines: [4], note: <><code>/</code> selalu menghasilkan <code>float</code></> },
          { lines: [5, 6], note: <><code>//</code> hasil bagi bulat; <code>%</code> sisa bagi</> },
          { lines: [7], note: <><code>**</code> pangkat</> },
        ]}
        notes="Tanyakan kapan % berguna: memeriksa genap atau ganjil (n % 2). Perhatikan 5/3 menghasilkan 1.6666666666666667 karena representasi float." />

      <CodeSlide title="Operator penugasan" snippet={s.penugasan}
        predict={<>Nilai <code>x</code> berubah setiap baris. Berapa yang tercetak di akhir?</>}
        steps={[
          { lines: [2, 3], note: <><code>x += 3</code> sama dengan <code>x = x + 3</code></> },
          { lines: [4, 5], note: <><code>-=</code> mengurangi</> },
          { lines: [6, 7], note: <><code>*=</code> mengalikan</> },
          { lines: [8, 9], note: <><code>/=</code> membagi dan menghasilkan <code>float</code></> },
        ]}
        take={<>Operator penugasan menyingkat <code>x = x + …</code>; pola ini dipakai terus di perulangan.</>}
        notes="Ikuti nilai x satu baris demi satu: 10, 13, 11, 44, 22.0. Ini fondasi untuk menelusuri program." />

      <CodeSlide title="Konversi tipe" snippet={s.casting}
        predict={<>Apa yang terjadi pada <code>99.9</code> saat diubah ke <code>int</code>?</>}
        steps={[
          { lines: [1, 2], note: <><code>int("100")</code> mengubah teks menjadi angka sehingga dapat dijumlah</> },
          { lines: [3, 4], note: <><code>int(99.9)</code> membuang desimal, tanpa pembulatan</> },
          { lines: [5, 6], note: <><code>str(25000)</code> membuat teks agar dapat digabung dengan <code>+</code></> },
        ]}
        take={<><code>+</code> menjumlah angka tetapi <b>menggabung</b> teks: keduanya harus bertipe sama.</>}
        notes="int(99.9) menghasilkan 99 (dipotong, bukan dibulatkan). Tanyakan apa hasil 'Rp ' + 25000 tanpa str." />

      <CodeSlide title="Membaca masukan" snippet={s.input}
        predict={<>Pengguna mengetik 20 sebagai umur. Apa tipe data hasil <code>input()</code>?</>}
        steps={[
          { lines: [1], note: <><code>input()</code> menampilkan pertanyaan dan menunggu ketikan</> },
          { lines: [3, 4], note: <>hasil <code>input()</code> <b>selalu</b> bertipe <code>str</code>, walau yang diketik angka</> },
        ]}
        take={<>Untuk menghitung, ubah dulu: <code>int(input(...))</code> atau <code>float(input(...))</code>.</>}
        notes="Ini miskonsepsi terbesar pertemuan ini. Keluaran memperlihatkan teks yang diketik pengguna (Budi, 20)." />

      <CodeSlide title="Kalkulator sederhana" snippet={s.kalkulator}
        predict={<>Pengguna mengetik 10 dan 5.5. Apa hasilnya, dan mengapa memakai <code>float</code>?</>}
        steps={[
          { lines: [1, 2], note: <><code>float(input(…))</code> membaca teks lalu mengubahnya menjadi angka desimal</> },
          { lines: [3], note: <>kini dua angka bisa dijumlah</> },
          { lines: [4], note: <><code>print</code> dengan koma menampilkan beberapa nilai sekaligus</> },
        ]}
        notes="Jika diganti int dan pengguna mengetik 5.5, program error: bahas pilihan float untuk angka yang mungkin desimal." />

      <CodeSlide title="Cari bug: input bukan angka" snippet={s.bug}
        out={'TypeError: can only concatenate str (not "int") to str'}
        predict={<>Pengguna mengetik 20 sebagai umur. Mengapa <code>umur + 5</code> gagal?</>}
        steps={[{ lines: [2], note: <><code>umur</code> berisi teks <code>"20"</code>; teks dan angka tidak dapat dijumlah</> }]}
        take={<>Perbaikan: <code>umur = int(input("Umur: "))</code>.</>}
        notes="Kesalahan paling umum pada tugas BMI dan diskon. Bacakan pesan error bersama-sama." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Biodata', spec: <>Simpan nama, NIM, program studi, dan IPK dalam variabel, lalu cetak.</>, example: s.biodata },
          { n: 2, title: 'Konversi suhu', spec: <>Baca suhu Celcius dan hitung Fahrenheit: <code>F = C × 9/5 + 32</code>.</>, example: s.suhu },
        ]}
        notes="Latihan 1–2 wajib di kelas. IPK bertipe float; suhu dibaca dengan float(input(...))." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Luas persegi panjang', spec: <>Baca panjang dan lebar, lalu cetak luasnya.</>, example: s.luas },
          { n: 4, title: 'Bagi dan sisa', spec: <>Baca dua bilangan bulat; cetak hasil bagi bulat dan sisa baginya.</>, example: s.bagi },
        ]}
        notes="Latihan 4 memakai // dan %." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa tipe data nilai ini?</>, snippet: s.tTipe, why: <>ada titik desimal, jadi <code>float</code> walau nilainya bulat</> }}
        notes="Polling singkat. Banyak yang menjawab int." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tOperator, why: <><code>7 // 2</code> = 3 dan <code>7 % 2</code> = 1; jumlahnya 4</> }}
        notes="Periksa pemahaman // dan %." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Apa output-nya? Angka 7 atau teks?</>, snippet: s.tCasting, why: <><code>"3"</code> dan <code>str(4)</code> sama-sama teks, jadi digabung menjadi <code>34</code></> }}
        notes="Tekankan beda penjumlahan dan penggabungan." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'Variabel', body: <>nama yang menyimpan nilai; <code>=</code> berarti simpan</> },
        { head: 'Tipe data', body: <><code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code></> },
        { head: 'Operator', body: <><code>+ − * / // % **</code> dan <code>+= −= *= /=</code></> },
        { head: 'Konversi dan input', body: <><code>input()</code> selalu <code>str</code>; ubah dengan <code>int()</code> atau <code>float()</code></> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 2"
        tasks={[
          { head: 'Kalkulator BMI', body: <>Baca berat (kg) dan tinggi (m), hitung <code>BMI = berat / (tinggi × tinggi)</code>.</> },
          { head: 'Kalkulator diskon', body: <>Baca harga dan persen diskon; tampilkan harga asli, potongan, dan harga akhir.</> },
        ]}
        steps={[
          <>Pahami rumus dan langkah perhitungan</>,
          <>Tulis pseudocode atau kerangka sebelum menulis kode</>,
          <>Implementasi dengan komentar yang jelas</>,
          <>Uji dengan beberapa masukan dan catat hasilnya</>,
          <>Jelaskan kode dan hasil di komentar</>,
        ]}
        submit={{ file: 'Tugas2_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Ingatkan: input dibaca sebagai teks; ubah ke float sebelum menghitung." />

      <NextSlide title="Berikutnya: Percabangan" lede="Membuat program mengambil keputusan: kode berbeda berjalan untuk kondisi berbeda." snippet={s.next}
        notes="Jembatan: if dan else memilih salah satu jalur. Pertemuan 3 membahasnya." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 3: Percabangan" />
    </DeckMeta>
  );
}
