import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, PracticeSlide, TicketSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, RefTable, Take,
} from '../layouts';

const s = {
  review: snip('p12/review'), garis: snip('p12/garis'), batang: snip('p12/batang'), sebar: snip('p12/sebar'), pai: snip('p12/pai'),
  seaborn: snip('p12/seaborn'), legenda: snip('p12/legenda'), subplot: snip('p12/subplot'), bug: snip('p12/bug-panjang'),
  suhu: snip('p12/suhu'), nilai: snip('p12/nilai'), anggaran: snip('p12/anggaran'), tren: snip('p12/tren'),
  tBatang: snip('p12/tiket-batang'), tLegenda: snip('p12/tiket-legenda'), tSubplot: snip('p12/tiket-subplot'),
  next: snip('p12/next-csv'),
};

export default function Pertemuan12() {
  return (
    <DeckMeta meeting={12} topic="Visualisasi Data">
      <TitleSlide meeting={12} course="Pengenalan Komputasi" title="Visualisasi"
        lede={<>Mengubah deretan angka menjadi grafik yang mudah dibaca dengan <code>matplotlib</code></>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tampilkan dua tampilan data yang sama, satu deretan angka dan satu grafik garis. Tanyakan mana yang lebih cepat menunjukkan tren. Durasi ±100 menit: teori 45, latihan 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Memilih', text: <>jenis grafik sesuai pertanyaan yang ingin dijawab</> },
        { verb: 'Membuat', text: <>grafik garis, batang, sebar, dan lingkaran</> },
        { verb: 'Menambahkan', text: <>judul, label sumbu, legenda, dan grid</> },
        { verb: 'Menyusun', text: <>beberapa grafik dalam satu gambar dengan <code>subplot</code></> },
      ]} notes="Tujuan 2–4 diuji lagi di tiga tiket keluar. Tujuan 1 dibahas di slide pemilihan grafik." />

      <CodeSlide title="Ingat kembali: pandas" snippet={s.review}
        predict={<>Dari Pertemuan 11: apa yang dicetak?</>}
        take={<>Data dalam list atau DataFrame hari ini kita ubah menjadi gambar.</>}
        notes="Retrieval practice. Jawaban: 80.0. Beri 2 menit." />

      <ContentSlide title="Memilih jenis grafik"
        notes="Mulai dari pertanyaan, bukan dari grafik. Contoh: bagaimana penjualan berubah tiap bulan? → garis. Siapa yang paling banyak? → batang. Berapa bagian dari total? → lingkaran. Apakah dua hal berhubungan? → sebar.">
        <RefTable head={['Grafik', 'Menjawab pertanyaan']} rows={[
          ['plt.plot', 'bagaimana nilai berubah seiring waktu? (tren)'],
          ['plt.bar', 'kategori mana yang lebih besar? (perbandingan)'],
          ['plt.pie', 'berapa bagian tiap kategori dari total? (proporsi)'],
          ['plt.scatter', 'apakah dua variabel berhubungan? (korelasi)'],
        ]} />
        <Take>Pilih grafik dari <b>pertanyaan</b> yang ingin dijawab, bukan dari yang terlihat menarik.</Take>
      </ContentSlide>

      <CodeSlide title="Grafik garis" snippet={s.garis}
        predict={<>Titik-titik data dihubungkan. Bulan berapa penjualan tertinggi?</>}
        steps={[
          { lines: [3, 4], note: <>dua list: nilai sumbu x dan sumbu y, <b>sama panjang</b></> },
          { lines: [5], note: <><code>plot</code> menggambar garis; <code>marker</code> menandai tiap titik</> },
          { lines: [6, 7, 8], note: <>judul dan label sumbu agar grafik bisa dibaca orang lain</> },
          { lines: [9], note: <><code>show</code> menampilkan grafik</> },
        ]}
        take={<>Pola dasar: siapkan data → pilih jenis grafik → beri judul dan label → <code>show()</code>.</>}
        notes="Di Colab, grafik muncul di bawah sel. Tekankan bahwa label dan judul bukan hiasan: tanpa label, grafik tidak bermakna." />

      <CodeSlide title="Grafik batang" snippet={s.batang}
        predict={<>Kategori mana yang paling banyak?</>}
        steps={[
          { lines: [3, 4], note: <>list kategori dan list jumlah, urutannya berpasangan</> },
          { lines: [5], note: <><code>bar</code> menggambar batang; tambahkan <code>color="skyblue"</code> untuk warna, atau <code>barh</code> untuk batang mendatar</> },
        ]}
        notes="Batang membandingkan kategori. Sumbu y sebaiknya dimulai dari nol agar perbandingan jujur." />

      <CodeSlide title="Grafik sebar" snippet={s.sebar}
        predict={<>Titik-titik naik ke kanan atas. Apa artinya untuk tinggi dan berat?</>}
        steps={[
          { lines: [5], note: <>tiap titik = satu pasangan (tinggi, berat); tidak ada garis</> },
          { lines: [6, 7], note: <>label sumbu menyebut satuannya</> },
        ]}
        take={<>Titik yang naik bersama menandakan hubungan positif, tetapi korelasi belum tentu sebab-akibat.</>}
        notes="Scatter untuk melihat hubungan dua variabel numerik. Sebutkan parameter alpha untuk titik yang bertumpuk." />

      <CodeSlide title="Grafik lingkaran" snippet={s.pai}
        predict={<>Berapa persen mahasiswa dengan nilai B?</>}
        steps={[
          { lines: [5, 6], note: <><code>autopct</code> menghitung dan menampilkan persentase tiap irisan</> },
        ]}
        take={<>Lingkaran cocok hanya untuk sedikit kategori yang membentuk <b>satu keseluruhan</b>.</>}
        notes="Jumlah: 8+25+10+2 = 45, jadi B = 55,6%. Hindari pie untuk tren atau banyak kategori." />

      <CodeSlide title="Seaborn: histogram" snippet={s.seaborn}
        predict={<>Histogram menghitung banyaknya data di tiap rentang nilai. Rentang mana yang paling ramai?</>}
        steps={[
          { lines: [5], note: <><code>histplot</code> mengelompokkan nilai ke dalam rentang; <code>kde</code> menambah kurva halus</> },
        ]}
        take={<><code>seaborn</code> dibangun di atas <code>matplotlib</code>: gaya lebih rapi, kode lebih singkat.</>}
        notes="Seaborn hanya diperkenalkan; tidak ada di tiket keluar." />

      <CodeSlide title="Dua garis dan legenda" snippet={s.legenda}
        predict={<>Dua garis berbeda dalam satu grafik. Dari mana tulisan “Kelas A” dan “Kelas B” berasal?</>}
        steps={[
          { lines: [6, 7], note: <><code>label</code> memberi nama tiap garis</> },
          { lines: [8], note: <><code>legend</code> menampilkan kotak keterangan</> },
          { lines: [9], note: <><code>grid</code> menambah garis bantu</> },
        ]}
        notes="Tanpa label di plot(), legend() tidak punya isi." />

      <CodeSlide title="Beberapa grafik sekaligus" snippet={s.subplot}
        predict={<>Angka di <code>subplot(1, 2, 1)</code> berarti: 1 baris, 2 kolom, grafik nomor 1. Di mana grafik batang?</>}
        steps={[
          { lines: [3], note: <><code>figsize</code> mengatur lebar dan tinggi gambar</> },
          { lines: [4, 5, 6], note: <>kotak pertama (kiri): grafik batang</> },
          { lines: [7, 8, 9], note: <>kotak kedua (kanan): grafik garis</> },
        ]}
        take={<><code>subplot(baris, kolom, nomor)</code>: pilih kotak, lalu gambar di kotak itu.</>}
        notes="Dipakai langsung di tugas dashboard akademik. Nomor kotak dihitung dari kiri atas ke kanan bawah." />

      <CodeSlide title="Cari bug: panjang data" snippet={s.bug}
        out="ValueError: x and y must have same first dimension, but have shapes (3,) and (4,)"
        predict={<>Mengapa grafik ini gagal dibuat?</>}
        steps={[{ lines: [3, 4], note: <><code>x</code> berisi 3 nilai, <code>y</code> berisi 4: tidak berpasangan</> }]}
        take={<>Tiap titik butuh pasangan: list <code>x</code> dan <code>y</code> harus <b>sama panjang</b>.</>}
        notes="Gunakan len(x) dan len(y) untuk memeriksa. Pesan error menyebut bentuk (shapes) kedua data." />

      <PracticeSlide title="Latihan wajib" lede="Kerjakan di Colab, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Suhu mingguan', spec: <>Grafik garis merah untuk suhu tujuh hari, judul “Ramalan Cuaca”.</>, example: s.suhu },
          { n: 2, title: 'Performa akademik', spec: <>Grafik batang rata-rata empat mata kuliah, tiap batang berbeda warna.</>, example: s.nilai },
        ]}
        notes="Latihan 1–2 wajib. Data suhu: [30, 31, 29, 32, 33, 31, 30]; nilai: [85, 78, 92, 88]. Warna batang lewat list color." />

      <PracticeSlide title="Latihan tambahan" lede="Untuk yang sudah selesai lebih awal."
        items={[
          { n: 3, title: 'Anggaran bulanan', spec: <>Grafik lingkaran empat pos pengeluaran dengan persentase.</>, example: s.anggaran },
          { n: 4, title: 'Harga dan penjualan', spec: <>Grafik sebar hubungan harga produk dan jumlah terjual.</>, example: s.tren },
        ]}
        notes="Latihan 4 menghasilkan pola turun: harga naik, penjualan turun." />

      <TicketSlide title="Tiket keluar 1 dari 3"
        item={{ objective: 2, q: <>Grafik apa yang muncul, dan batang mana yang tertinggi?</>, snippet: s.tBatang, why: <><code>plt.bar</code> membuat grafik batang; batang <code>B</code> bernilai 7</> }}
        notes="Polling singkat sebelum klik." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Teks apa saja yang tampil di grafik ini?</>, snippet: s.tLegenda, why: <>label sumbu x “Langkah” dan legenda “kuadrat”; tanpa <code>legend()</code> label garis tidak tampil</> }}
        notes="Minta mahasiswa menyebut baris yang menghasilkan tiap teks." />

      <TicketSlide title="Tiket keluar 3 dari 3"
        item={{ objective: 4, q: <>Grafik apa di kiri dan di kanan?</>, snippet: s.tSubplot, why: <>kotak 1 (kiri) batang, kotak 2 (kanan) lingkaran</> }}
        notes="Periksa pemahaman nomor kotak pada subplot." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'Pilih grafik', body: 'dari pertanyaan: tren, perbandingan, proporsi, atau hubungan' },
        { head: 'Jenis', body: <><code>plot</code>, <code>bar</code>, <code>scatter</code>, <code>pie</code>; <code>seaborn</code> untuk histogram</> },
        { head: 'Keterangan', body: <><code>title</code>, <code>xlabel</code>, <code>ylabel</code>, <code>legend</code>, <code>grid</code></> },
        { head: 'Subplot', body: <><code>subplot(baris, kolom, nomor)</code> untuk banyak grafik</> },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 12"
        tasks={[
          { head: 'Dashboard akademik', body: <>Satu gambar dengan dua grafik: batang (rata-rata nilai, minimal 4 mata kuliah) dan lingkaran (distribusi indeks A–E).</> },
          { head: 'Analisis tren penjualan', body: <>Garis tren penjualan per bulan (minimal 6 bulan) dan sebar hubungan harga dengan jumlah terjual.</> },
        ]}
        steps={[
          <>Siapkan data sendiri atau contoh yang realistis</>,
          <>Atur tata letak dengan <code>subplot</code></>,
          <>Beri judul, label, dan legenda di setiap grafik</>,
          <>Atur ukuran gambar agar semuanya terbaca</>,
          <>Tambahkan sel teks berisi kesimpulan dari grafik</>,
        ]}
        submit={{ file: 'Tugas12_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Minta kesimpulan satu kalimat dari setiap grafik: itu inti visualisasi." />

      <NextSlide title="Berikutnya: File CSV" lede="Membaca data dari file sungguhan, bukan lagi ditulis di dalam kode." snippet={s.next}
        notes="Jembatan: pd.read_csv membaca tabel dari file; hasilnya DataFrame yang sudah dikenal." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 13: File CSV" />
    </DeckMeta>
  );
}
