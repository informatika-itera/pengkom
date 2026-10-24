import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ObjectivesSlide, ContentSlide, CodeSlide, PracticeSlide, TicketSlide, ChoiceSlide,
  SummarySlide, AssignmentSlide, NextSlide, ClosingSlide, CardGrid, RefTable, StepList, Take,
} from '../layouts';

const s = {
  halo: snip('p01/halo'), komentar: snip('p01/komentar'), bug: snip('p01/bug-kutip'), tPrint: snip('p01/tiket-print'),
  l1: snip('p01/latihan1'), l2: snip('p01/latihan2'), next: snip('p01/next-variabel'),
};

export default function Pertemuan01() {
  return (
    <DeckMeta meeting={1} topic="Pengenalan">
      <TitleSlide meeting={1} course="Pengenalan Komputasi" title="Berpikir Komputasional"
        lede={<>Cara memecahkan masalah secara sistematis, lalu menuliskannya sebagai program Python pertamamu</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Pembuka: tanyakan bagaimana mereka menjelaskan jalan dari rumah ke kampus kepada robot yang hanya mengerti perintah sederhana. Itu inti berpikir komputasional. Durasi ±100 menit: teori 45, praktik 45, tiket keluar 10." />

      <ObjectivesSlide title="Setelah pertemuan ini, kamu mampu…" items={[
        { verb: 'Mendefinisikan', text: <>berpikir komputasional (<i>computational thinking</i>)</> },
        { verb: 'Menjelaskan', text: <>empat pilarnya dan memberi contoh masing-masing</> },
        { verb: 'Menulis', text: <>program Python sederhana dengan <code>print</code></> },
        { verb: 'Menjalankan', text: <>program di Google Colab</> },
      ]} notes="Tujuan 1–2 diuji lagi di tiket keluar 1, tujuan 3 di tiket 2, tujuan 4 di tiket 3." />

      <ContentSlide title="Tentang mata kuliah"
        notes="Jelaskan identitas mata kuliah, bahasa, dan alat yang dipakai. Tekankan gaya belajar: setiap pertemuan ada bagian praktik langsung dan tiket keluar.">
        <CardGrid cols={2} items={[
          { icon: 'badge', head: 'Pengenalan Komputasi', body: 'Kode WI25-00003, 2 SKS (teori dan praktik)' },
          { icon: 'terminal', head: 'Bahasa Python', body: 'mudah dibaca dan dipakai di banyak bidang' },
          { icon: 'cloud', head: 'Google Colab', body: 'berjalan di peramban, tanpa instalasi' },
          { icon: 'construction', head: 'Belajar dengan mengerjakan', body: 'tebak, jalankan, lalu telusuri setiap kode' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Peta semester"
        notes="Peta enam belas pertemuan: dasar Python, kuis dan ujian tengah semester, Python lanjutan, dictionary dan error, lalu kuis dan ujian akhir. Tidak ada proyek akhir; fokus pada latihan rutin di setiap pertemuan.">
        <RefTable head={['Pertemuan', 'Topik']} rows={[
          ['1–6', 'Dasar Python: variabel, percabangan, perulangan, list'],
          ['7–8', 'Kuis Pra-UTS, lalu UTS'],
          ['9–13', 'Python lanjutan: fungsi, string, library, visualisasi, file CSV'],
          ['14', 'Dictionary dan penanganan error'],
          ['15–16', 'Kuis Pra-UAS, lalu UAS'],
        ]} />
      </ContentSlide>

      <ContentSlide title="Apa itu berpikir komputasional?"
        notes="Kutipan Wing: bukan tentang membuat manusia berpikir seperti komputer, tetapi tentang cara menyelesaikan masalah yang bisa dipakai komputer. Tekankan: ini keterampilan berpikir, bukan sekadar koding.">
        <blockquote className="quote">
          <p>“Computational thinking is a way of solving problems, designing systems, and understanding human behavior that draws on concepts fundamental to computing.”</p>
          <footer>Jeannette Wing</footer>
        </blockquote>
        <Take>Singkatnya: cara berpikir yang sistematis untuk memecahkan masalah yang rumit.</Take>
      </ContentSlide>

      <ContentSlide title="Mengapa penting?"
        notes="Minta contoh profesi mahasiswa dan bagaimana CT dipakai di sana (dokter menegakkan diagnosis bertahap, arsitek memecah gedung ke bagian-bagian).">
        <CardGrid cols={2} items={[
          { icon: 'public', head: 'Keterampilan universal', body: 'berguna untuk semua profesi, bukan hanya programmer' },
          { icon: 'extension', head: 'Memecahkan masalah', body: 'menyelesaikan masalah dengan cara terstruktur' },
          { icon: 'lightbulb', head: 'Kreativitas', body: 'mendorong cara pandang baru' },
          { icon: 'speed', head: 'Efisiensi', body: 'mencari solusi yang hemat waktu dan sumber daya' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Empat pilar"
        notes="Peta empat pilar. Setiap pilar punya satu slide contoh. Singkat saja di sini.">
        <CardGrid cols={4} items={[
          { icon: 'account_tree', head: 'Dekomposisi', body: 'memecah masalah menjadi bagian kecil' },
          { icon: 'pattern', head: 'Pengenalan pola', body: 'mengenali kemiripan dan keteraturan', tone: 'secondary' },
          { icon: 'filter_alt', head: 'Abstraksi', body: 'fokus pada yang penting, abaikan detail', tone: 'tertiary' },
          { icon: 'format_list_numbered', head: 'Algoritma', body: 'langkah demi langkah menuju solusi' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Dekomposisi"
        notes="Contoh masak rendang: satu pekerjaan besar dipecah menjadi tahap yang masing-masing bisa dikerjakan dan diperiksa sendiri.">
        <p className="lede">Memecah masalah besar menjadi sub-masalah yang lebih kecil dan mandiri.</p>
        <StepList steps={[
          { head: 'Persiapan bahan' }, { head: 'Mengolah daging' }, { head: 'Memasak dengan santan' }, { head: 'Mengeringkan bumbu' },
        ]} />
        <Take>Contoh: memasak rendang. Dipecah, setiap tahap lebih mudah dikerjakan dan diperiksa.</Take>
      </ContentSlide>

      <ContentSlide title="Pengenalan pola"
        notes="Pola membuat kita bisa memprediksi. Mintalah contoh pola lain: jam macet, musim hujan.">
        <p className="lede">Melihat kesamaan, tren, atau keteraturan pada data untuk membuat prediksi.</p>
        <CardGrid cols={2} items={[
          { icon: 'rainy', head: 'Desember', body: 'sering hujan' },
          { icon: 'wb_sunny', head: 'Juli', body: 'kemarau dan panas', tone: 'secondary' },
        ]} />
        <Take>Polanya mirip setiap tahun, jadi kita bisa menyiapkan payung sebelum hujan datang.</Take>
      </ContentSlide>

      <ContentSlide title="Abstraksi"
        notes="Peta tidak menggambar setiap pohon. Abstraksi adalah memilih detail yang relevan dengan tujuan. Dalam program: variabel dan fungsi adalah abstraksi.">
        <p className="lede">Mengambil prinsip umum dan mengabaikan detail yang tidak perlu. Contoh: Google Maps.</p>
        <CardGrid cols={2} items={[
          { icon: 'visibility', head: 'Ditampilkan', body: 'jalan, nama kota, kemacetan', tone: 'success' },
          { icon: 'visibility_off', head: 'Disembunyikan', body: 'jumlah pohon, warna atap rumah', tone: 'error' },
        ]} />
        <Take>Fokus hanya pada informasi yang dibutuhkan untuk bernavigasi.</Take>
      </ContentSlide>

      <ContentSlide title="Algoritma"
        notes="Algoritma harus jelas, berurutan, dan berhenti. Contoh memasak mi. Tanyakan apa yang terjadi bila urutan langkah ditukar.">
        <p className="lede">Instruksi langkah demi langkah yang jelas untuk menyelesaikan masalah. Contoh: memasak mi.</p>
        <StepList steps={[
          { head: 'Panaskan 500 ml air' }, { head: 'Tunggu hingga mendidih' }, { head: 'Masukkan mi dan tunggu 3 menit' }, { head: 'Tiriskan, lalu beri bumbu' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Studi kasus: mencari nama"
        notes="Terapkan keempat pilar pada pencarian nama di daftar kontak. Hasil akhirnya adalah algoritma pencarian linear, yang nanti akan ditulis sebagai program.">
        <CardGrid cols={2} items={[
          { icon: 'account_tree', head: 'Dekomposisi', body: 'siapkan daftar, periksa satu per satu, berhenti bila ketemu' },
          { icon: 'pattern', head: 'Pola', body: 'selalu mulai dari awal dan periksa sampai akhir', tone: 'secondary' },
          { icon: 'filter_alt', head: 'Abstraksi', body: 'abaikan urutan abjad; hanya periksa apakah nama sama persis', tone: 'tertiary' },
          { icon: 'format_list_numbered', head: 'Algoritma', body: 'periksa nama pertama, lanjut ke berikutnya, sampai ketemu atau habis' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Mengenal Python"
        notes="Python dibuat Guido van Rossum (1991). Sampaikan alasan memilih Python: mudah dibaca, populer, serbaguna.">
        <CardGrid cols={3} items={[
          { icon: 'menu_book', head: 'Mudah dibaca', body: 'mirip bahasa Inggris' },
          { icon: 'trending_up', head: 'Populer', body: 'dipakai Google, Netflix, dan NASA', tone: 'secondary' },
          { icon: 'hub', head: 'Serbaguna', body: 'web, ilmu data, kecerdasan buatan', tone: 'tertiary' },
        ]} />
        <Take>Python dibuat oleh Guido van Rossum pada tahun 1991.</Take>
      </ContentSlide>

      <ContentSlide title="Menjalankan di Google Colab"
        notes="Demonstrasikan langsung sambil mahasiswa mengikuti di laptop. Alternatif cepat untuk menguji potongan kecil: OnlineGDB.">
        <StepList steps={[
          { head: 'Buka Colab', body: <><code>colab.research.google.com</code></> },
          { head: 'Buat notebook baru', body: <>klik <b>New Notebook</b>, lalu beri nama</> },
          { head: 'Tulis kode di sel', body: <>ketik di kotak kode</> },
          { head: 'Jalankan', body: <>tekan tombol ▶ di kiri sel, atau <b>Shift + Enter</b></> },
        ]} />
      </ContentSlide>

      <CodeSlide title="Program pertama" snippet={s.halo}
        predict={<>Apa yang tercetak? Perhatikan tanda kutipnya.</>}
        steps={[
          { lines: [1], note: <><code>print()</code> menampilkan teks ke layar; teks diapit tanda kutip</> },
          { lines: [2], note: <>setiap <code>print</code> mencetak satu baris baru</> },
        ]}
        take={<>Program berjalan dari atas ke bawah, satu baris demi satu baris.</>}
        notes="Minta mahasiswa menjalankan di Colab sendiri, lalu mengganti teksnya dengan nama mereka." />

      <CodeSlide title="Komentar" snippet={s.komentar}
        predict={<>Baris pertama diawali <code>#</code>. Apakah baris itu tercetak?</>}
        steps={[{ lines: [1], note: <>baris berawalan <code>#</code> adalah komentar: diabaikan Python, ditulis untuk manusia</> }]}
        take={<>Komentar menjelaskan <b>mengapa</b> kode ditulis; pakai untuk membantu pembaca, termasuk dirimu sendiri nanti.</>}
        notes="Tugas mewajibkan komentar yang jelas. Tunjukkan bahwa komentar tidak muncul di keluaran." />

      <CodeSlide title="Cari bug: lupa kutip" snippet={s.bug}
        out="NameError: name 'Hello' is not defined"
        predict={<>Teks <code>Hello</code> tidak diapit tanda kutip. Apa yang terjadi?</>}
        steps={[{ lines: [1], note: <>tanpa kutip, Python mengira <code>Hello</code> adalah nama variabel</> }]}
        take={<>Perbaikan: <code>print("Hello")</code>. Teks selalu diapit tanda kutip.</>}
        notes="Ini kesalahan pertama yang hampir semua mahasiswa lakukan. Ajarkan membaca baris terakhir pesan error." />

      <PracticeSlide title="Latihan wajib" lede="Buka Colab, ketik, jalankan, lalu bandingkan dengan contoh hasil."
        items={[
          { n: 1, title: 'Perkenalan', spec: <>Cetak <code>Halo, saya [Nama]!</code> dan <code>NIM saya [NIM]</code> dengan namamu.</>, example: s.l1 },
          { n: 2, title: 'Komentar', spec: <>Cetak dua baris, dan tambahkan satu baris komentar di atasnya.</>, example: s.l2 },
        ]}
        notes="Latihan 1–2 wajib. Jika selesai cepat, ganti isi teks agar menjadi biodata lengkap." />

      <ChoiceSlide title="Tiket keluar 1 dari 3" objective={2}
        q={<>Seorang koki memecah “menyiapkan pesta” menjadi: belanja, memasak, menata meja. Pilar apa yang ia gunakan?</>}
        options={['Pengenalan pola', 'Dekomposisi', 'Abstraksi', 'Algoritma']} answer={1}
        why={<>Dekomposisi: masalah besar dipecah menjadi bagian-bagian kecil.</>}
        notes="Polling lewat tunjuk tangan. Jawaban B." />

      <TicketSlide title="Tiket keluar 2 dari 3"
        item={{ objective: 3, q: <>Apa saja yang tercetak?</>, snippet: s.tPrint, why: <>baris yang diawali <code>#</code> adalah komentar, sehingga <code>"B"</code> tidak dicetak</> }}
        notes="Periksa pemahaman komentar dan urutan eksekusi." />

      <ChoiceSlide title="Tiket keluar 3 dari 3" objective={4}
        q={<>Bagaimana menjalankan sel kode di Google Colab?</>}
        options={['Menekan Ctrl + S', 'Menekan tombol ▶ di kiri sel, atau Shift + Enter', 'Menutup tab peramban', 'Mengetik run() di akhir sel']} answer={1}
        why={<>Tombol ▶ di kiri sel atau <b>Shift + Enter</b> menjalankan sel.</>}
        notes="Jawaban B." />

      <SummarySlide title="Ringkasan" points={[
        { head: 'Berpikir komputasional', body: 'cara sistematis menyelesaikan masalah, bukan sekadar menulis kode' },
        { head: 'Empat pilar', body: 'dekomposisi, pengenalan pola, abstraksi, algoritma' },
        { head: 'Python', body: <>bahasa yang ramah pemula; <code>print()</code> menampilkan teks</> },
        { head: 'Google Colab', body: 'menjalankan Python di peramban tanpa instalasi' },
      ]} notes="Minta satu mahasiswa merangkum tanpa melihat slide." />

      <AssignmentSlide title="Tugas Pertemuan 1"
        tasks={[
          { head: 'Program biodata', body: <>Tampilkan biodata lengkap dan hobimu dengan format yang rapi dan terstruktur.</> },
          { head: 'Refleksi', body: <>Tulis refleksi singkat tentang pengalaman membuat program pertamamu.</> },
        ]}
        steps={[
          <>Buka Google Colab dan buat notebook baru</>,
          <>Tulis kode dengan komentar yang jelas</>,
          <>Jalankan dan pastikan keluarannya sesuai</>,
          <>Tambahkan sel teks untuk refleksi</>,
          <>Simpan sebagai berkas <code>.ipynb</code></>,
        ]}
        submit={{ file: 'Tugas1_NIM_Nama.ipynb', deadline: 'H-1 pertemuan berikutnya' }}
        notes="Contoh keluaran biodata: tiga baris nama, NIM, hobi. Tekankan komentar dan keluaran contoh harus ada di notebook." />

      <NextSlide title="Berikutnya: Variabel" lede="Menyimpan data di memori komputer dengan nama." snippet={s.next}
        notes="Jembatan: dua baris pertama membuat 'kotak' bernama nama dan umur. Pertemuan 2 menjelaskannya." />

      <ClosingSlide lede="Pertanyaan, kesulitan, atau ide? Sekarang waktunya." next="Pertemuan 2: Variabel dan Tipe Data" />
    </DeckMeta>
  );
}
