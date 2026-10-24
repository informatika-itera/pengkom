import { snip, dataFile, Output } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, StepList, Take,
} from '../layouts';

const s = {
  review: snip('p13/review'), baca: snip('p13/baca'), struktur: snip('p13/struktur'), statistik: snip('p13/statistik'),
  kosong: snip('p13/kosong'), isi: snip('p13/isi'), filter: snip('p13/filter'), gabungan: snip('p13/gabungan'), urut: snip('p13/urut'),
  duplikat: snip('p13/duplikat'), status: snip('p13/status'), bug: snip('p13/bug-file'),
  omzet: snip('p13/omzet'), besar: snip('p13/besar'), tiga: snip('p13/tiga'), bersih: snip('p13/bersih'),
  tBaca: snip('p13/tiket-baca'), tBersih: snip('p13/tiket-bersih'), tFilter: snip('p13/tiket-filter'),
  next: snip('p13/next-ringkas'),
};

export default function Pertemuan13() {
  return (
    <DeckMeta meeting={13} topic="File CSV">
      <TitleSlide meeting={13} course="Pengenalan Komputasi" title="File CSV"
        lede={<>Membaca data dari file, membersihkannya, lalu menyaring dan mengurutkannya dengan <code>pandas</code></>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: data di dunia nyata datang dalam file, bukan ditulis di dalam kode, dan hampir selalu kotor. Hari ini kita membaca file dan membersihkannya. Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Menjelaskan', text: <>format CSV dan membacanya dengan <code>read_csv</code></> },
        { verb: 'Memeriksa', text: <>isi data dengan <code>head</code>, <code>shape</code>, dan <code>describe</code></> },
        { verb: 'Membersihkan', text: <>data kosong dan data ganda</> },
        { verb: 'Menyaring', text: <>dan mengurutkan baris berdasarkan kondisi</> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di dua slide pertama materi." />

      <CodeSlide title="Ingat kembali: grafik" snippet={s.review}
        predict={<>Dari Pertemuan 12: grafik apa yang muncul, dan berapa batang tertinggi?</>}
        take={<>Grafik butuh data. Hari ini kita mengambil data dari file.</>}
        notes="Retrieval practice. Jawaban: grafik batang dengan dua batang, tertinggi 7. Beri 2 menit." />

      <ContentSlide title="Apa itu CSV?"
        notes="CSV = Comma Separated Values: teks biasa, satu baris satu record, kolom dipisah koma. Bisa dibuka di Excel maupun editor teks. Pandas membaca dan mengubahnya menjadi DataFrame.">
        <div className="two-col">
          <Output out={dataFile('mahasiswa.csv')} label="mahasiswa.csv" />
          <div className="col">
            <p className="lede">Teks biasa untuk menyimpan tabel: kolom dipisah <b>koma</b>, satu baris satu catatan.</p>
            <p className="lede">Baris pertama adalah <b>header</b>: nama-nama kolom.</p>
          </div>
        </div>
        <Take>CSV bisa dibuka di Excel, editor teks, dan dibaca Python: format tukar data paling umum.</Take>
      </ContentSlide>

      <ContentSlide title="Menyiapkan file di Colab"
        notes="Colab berjalan di server, bukan di laptop: file harus diunggah dulu. File yang diunggah hilang saat runtime direset, jadi unggah ulang bila perlu. Demonstrasikan langsung.">
        <StepList steps={[
          { head: 'Buka panel file', body: <>klik ikon folder di sisi kiri Colab</> },
          { head: 'Unggah berkas', body: <>klik ikon unggah dan pilih <code>mahasiswa.csv</code></> },
          { head: 'Panggil dengan nama', body: <>tulis <code>pd.read_csv("mahasiswa.csv")</code> di sel kode</> },
        ]} />
      </ContentSlide>

      <CodeSlide title="Membaca CSV" snippet={s.baca}
        predict={<>Dari mana kolom dan nama kolom diambil?</>}
        steps={[
          { lines: [3], note: <><code>read_csv</code> membaca file menjadi DataFrame; baris pertama menjadi nama kolom</> },
          { lines: [4], note: <><code>head()</code> menampilkan lima baris pertama</> },
        ]}
        notes="Tipe data kolom ditebak otomatis (Umur menjadi angka, Nama menjadi teks)." />

      <CodeSlide title="Memeriksa struktur" snippet={s.struktur}
        predict={<>Berapa baris dan kolom? Kolom mana yang berisi angka?</>}
        steps={[
          { lines: [4], note: <><code>shape</code> berisi (jumlah baris, jumlah kolom)</> },
          { lines: [5], note: <><code>dtypes</code> menunjukkan tipe data tiap kolom; <code>object</code> berarti teks</> },
        ]}
        take={<><code>df.info()</code> merangkum semuanya sekaligus, termasuk berapa sel yang terisi di tiap kolom.</>}
        notes="Demonstrasikan df.info() langsung di Colab: Non-Null Count yang kurang dari jumlah baris menandakan data kosong." />

      <CodeSlide title="Statistik ringkas" snippet={s.statistik}
        predict={<>Berapa umur rata-rata mahasiswa?</>}
        steps={[
          { lines: [4], note: <><code>describe()</code>: jumlah, rata-rata, sebaran, nilai terkecil dan terbesar kolom angka</> },
        ]}
        notes="Hanya kolom numerik yang diringkas. Rata-rata umur = 25,6; kuartil membagi data menjadi empat bagian." />

      <CodeSlide title="Data kosong" snippet={s.kosong}
        predict={<>Ada 20 baris. Berapa baris yang tersisa jika semua yang kosong dibuang?</>}
        steps={[
          { lines: [4], note: <><code>isnull().sum()</code> menghitung sel kosong pada kolom</> },
          { lines: [5, 6], note: <><code>dropna()</code> membuang baris yang memuat sel kosong: 20 menjadi 15</> },
        ]}
        take={<>Membuang baris menghilangkan data; pertimbangkan dulu apakah sebaiknya diisi.</>}
        notes="Lima mahasiswa belum punya nilai. Dalam konteks nyata, membuang mereka mengubah hasil analisis." />

      <CodeSlide title="Mengisi data kosong" snippet={s.isi}
        predict={<>Setelah diisi dengan rata-rata, berapa sel kosong yang tersisa?</>}
        steps={[
          { lines: [5], note: <>hitung rata-rata nilai yang ada</> },
          { lines: [6], note: <><code>fillna(rata)</code> mengisi setiap sel kosong dengan nilai itu</> },
        ]}
        notes="Alternatif: fillna(0) bila kosong berarti belum mengumpulkan. Pilihan isian harus sesuai makna data." />

      <CodeSlide title="Menyaring baris" snippet={s.filter}
        predict={<>Berapa mahasiswa yang nilainya minimal 60? Nilai kosong ikut atau tidak?</>}
        steps={[
          { lines: [4], note: <>kondisi pada kolom menghasilkan penyaring; hanya baris <code>True</code> yang dipakai</> },
          { lines: [5], note: <>dua kurung siku: pilih beberapa kolom saja</> },
          { lines: [7], note: <><code>len</code> menghitung baris yang lolos: nilai kosong tidak ikut</> },
        ]}
        notes="Baris dengan nilai kosong tidak lolos karena perbandingan dengan NaN menghasilkan False." />

      <CodeSlide title="Banyak kondisi" snippet={s.gabungan}
        predict={<>Mengapa setiap kondisi diberi kurung sendiri?</>}
        steps={[
          { lines: [5, 6], note: <><code>&amp;</code> berarti dan; <code>|</code> berarti atau; tiap kondisi wajib dalam kurung</> },
        ]}
        take={<>Di pandas pakai <code>&amp;</code>, <code>|</code>, dan <code>~</code>, bukan <code>and</code>, <code>or</code>, <code>not</code>.</>}
        notes="Kesalahan umum: memakai and/or akan menghasilkan ValueError. Hitung hasil: nilai 60–79." />

      <CodeSlide title="Mengurutkan" snippet={s.urut}
        predict={<>Siapa yang berada di urutan teratas, dan dengan nilai berapa?</>}
        steps={[
          { lines: [4, 5, 6], note: <><code>sort_values</code> mengurutkan menurut kolom; <code>ascending=False</code> berarti besar ke kecil</> },
          { lines: [7, 8], note: <>tiga baris teratas, hanya dua kolom</> },
        ]}
        notes="Nomor di kiri adalah index asli: baris tetap membawa nomor aslinya setelah diurutkan." />

      <CodeSlide title="Data ganda" snippet={s.duplikat}
        predict={<>Ada berapa transaksi yang tercatat dua kali?</>}
        steps={[
          { lines: [4], note: <><code>duplicated().sum()</code> menghitung baris yang sama persis dengan baris sebelumnya</> },
          { lines: [5, 6], note: <><code>drop_duplicates()</code> membuang pengulangan: 10 menjadi 7</> },
        ]}
        take={<>Data ganda membuat total dan rata-rata menjadi salah: bersihkan sebelum menganalisis.</>}
        notes="Tiga baris ganda: Apel, Jeruk, Mangga." />

      <CodeSlide title="Kolom baru dan menyimpan" snippet={s.status}
        predict={<>Nilai kosong sudah diisi 0 di baris 4. Apa status mahasiswa tanpa nilai?</>}
        steps={[
          { lines: [5], note: <>mula-mula semua baris “Tidak lulus”</> },
          { lines: [6, 7], note: <>baris yang memenuhi kondisi <code>lulus</code> diganti menjadi “Lulus”</> },
          { lines: [10], note: <><code>to_csv(index=False)</code> menghasilkan teks CSV; <code>to_csv("nama.csv")</code> menyimpannya ke file</> },
        ]}
        notes="Output adalah isi CSV yang akan tersimpan. Untuk menyimpan ke berkas, beri nama file pada to_csv. File ada di panel kiri Colab dan hilang bila runtime direset; unduh bila perlu." />

      <CodeSlide title="Cari bug: file tidak ada" snippet={s.bug}
        out="FileNotFoundError: [Errno 2] No such file or directory: 'data_mhs.csv'"
        predict={<>File sudah dipilih dari laptop, tetapi kode ini gagal. Apa kemungkinan penyebabnya?</>}
        steps={[{ lines: [3], note: <>nama berkas harus <b>persis sama</b> dan berkasnya harus sudah diunggah ke Colab</> }]}
        take={<>Periksa panel file Colab: nama, huruf besar-kecil, dan ekstensi <code>.csv</code> harus cocok.</>}
        notes="Penyebab paling umum: lupa mengunggah atau runtime ter-reset. Pesan error menyebut nama berkas yang dicari." />

      <PracticeSlide title="Latihan wajib" lede="Berkas transaksi.csv berisi Produk, Jumlah, dan Harga."
        items={[
          { n: 1, title: 'Omzet', spec: <>Tambahkan kolom <code>Total</code> = Jumlah × Harga, lalu hitung total omzet.</>, example: s.omzet },
          { n: 2, title: 'Transaksi besar', spec: <>Tampilkan transaksi dengan jumlah minimal 5.</>, example: s.besar },
        ]}
        notes="Latihan 1–2 wajib. Mahasiswa mengunggah transaksi.csv dari LMS. Catatan: soal lama memakai Jumlah > 10, tetapi tidak ada data yang memenuhi; digunakan minimal 5." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Tiga teratas', spec: <>Urutkan menurut <code>Total</code> dari terbesar dan tampilkan tiga transaksi teratas.</>, example: s.tiga },
          { n: 4, title: 'Bersihkan ganda', spec: <>Hitung transaksi sebelum dan sesudah data ganda dibuang.</>, example: s.bersih },
        ]}
        notes="Latihan 3 menggabungkan kolom baru dan sort_values; latihan 4 menggunakan drop_duplicates." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Apa output-nya? <code>shape</code> berisi (baris, kolom).</>, snippet: s.tBaca, why: <>5 baris data dan 3 kolom (header tidak dihitung sebagai baris)</> }}
        notes="Polling singkat. Periksa bahwa header bukan baris data." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa output-nya?</>, snippet: s.tBersih, why: <>20 baris dikurangi 5 baris yang punya nilai kosong</> }}
        notes="Tiket ini mengaitkan isnull dan dropna." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Berapa mahasiswa yang umurnya di atas 20?</>, snippet: s.tFilter, why: <>Siti (21), Eko (35), dan Reza (33): tiga orang</> }}
        notes="Periksa bahwa mahasiswa memahami > 20 tidak mencakup 20." />

      <SummarySlide title="Ringkasan" points={[
        { head: <code>read_csv</code>, body: 'membaca file CSV menjadi DataFrame; unggah dulu ke Colab' },
        { head: 'Periksa', body: <><code>head</code>, <code>shape</code>, <code>describe</code>, <code>isnull().sum()</code></> },
        { head: 'Bersihkan', body: <><code>dropna</code>, <code>fillna</code>, <code>drop_duplicates</code></> },
        { head: 'Olah', body: <>saring dengan kondisi (<code>&amp;</code>, <code>|</code>), urutkan dengan <code>sort_values</code></> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 13"
        tasks={[
          { head: 'Analisis data nilai', body: <>Baca <code>nilai_mhs.csv</code>, isi nilai kosong dengan 0, tambah kolom Status (Lulus bila nilai ≥ 60), simpan ke <code>nilai_bersih.csv</code>.</> },
          { head: 'Visualisasi', body: <>Histogram distribusi nilai dan grafik batang jumlah lulus dan tidak lulus; simpan sebagai <code>distribusi_nilai.png</code>.</> },
        ]}
        steps={[
          <>Baca CSV, lalu periksa dengan <code>head</code> dan <code>info</code></>,
          <>Bersihkan data kosong sebelum menghitung status</>,
          <>Simpan hasil ke CSV dan gambar ke PNG</>,
          <>Pastikan berkas hasil ikut dikumpulkan</>,
          <>Tambahkan sel teks berisi kesimpulan dari grafik</>,
        ]}
        submit={{ file: 'Tugas13_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Simpan gambar dengan plt.savefig('distribusi_nilai.png') sebelum plt.show(); sampaikan sebagai petunjuk. Kumpulkan juga nilai_bersih.csv dan PNG." />

      <NextSlide title="Berikutnya: Dictionary dan error" lede="Memahami kurung kurawal yang sudah kita pakai, dan membuat program tahan terhadap masukan yang salah."
        notes="Jembatan: pd.DataFrame dibuat dari dictionary sejak Pertemuan 11; Pertemuan 14 menjelaskannya. Tidak ada proyek akhir semester ini.">
        <div className="chips-row">
          {['Dictionary', 'Frekuensi kata', 'try dan except'].map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
      </NextSlide>

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 14: Dictionary dan Error" />
    </DeckMeta>
  );
}
