import { snip } from '../ui';
import {
  DeckMeta, TitleSlide, ContentSlide, CodeSlide, ClosingSlide, CardGrid, RefTable, QuizTimer,
} from '../layouts';

const s = { pg: snip('p07/pg'), coding: snip('p07/coding') };

const ans = (i: number, text: string) => <span className="fragment fade-in" data-fragment-index={i}>{text}</span>;

export default function Pertemuan07() {
  return (
    <DeckMeta meeting={7} topic="Kuis Pra-UTS">
      <TitleSlide meeting={7} course="Pengenalan Komputasi" title="Kuis Pra-UTS"
        lede={<>Pertemuan 1 sampai 6: berpikir komputasional, variabel, percabangan, perulangan, dan list</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Sesi ini: 30 menit kuis, 30 menit pembahasan, 40 menit praktikum. Pastikan timer dan lembar jawaban siap sebelum mulai." />

      <ContentSlide title="Informasi kuis"
        notes="Sampaikan format dan bobot sebelum kuis dimulai. Tanyakan apakah ada pertanyaan teknis tentang lembar jawaban.">
        <CardGrid cols={2} items={[
          { icon: 'timer', head: '30 menit', body: 'dikerjakan hari ini' },
          { icon: 'grade', head: '100 poin', body: 'dari tiga bagian soal', tone: 'secondary' },
          { icon: 'checklist', head: '20 pilihan ganda dan 10 benar/salah', body: 'menguji pemahaman konsep' },
          { icon: 'code', head: '3 soal coding', body: 'menulis program singkat di laptop', tone: 'tertiary' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Cakupan materi"
        notes="Kuis mencakup Pertemuan 1 sampai 6. Minta mahasiswa memeriksa catatan mereka terhadap daftar ini.">
        <RefTable head={['Pertemuan', 'Topik']} rows={[
          ['1–2', 'Berpikir komputasional, variabel, tipe data, operator aritmatika'],
          ['3–4', 'Percabangan, operator logika, nested if'],
          ['5', 'Perulangan: for, while, range, break, continue'],
          ['6', 'List: konsep dan method'],
        ]} />
      </ContentSlide>

      <ContentSlide title="Aturan kuis"
        notes="Tegaskan aturan dengan tenang. Bila kuis open book, sampaikan ruang lingkup sumber yang diizinkan.">
        <CardGrid cols={2} items={[
          { icon: 'verified', head: 'Jujur', body: 'tanpa membuka catatan atau peramban (kecuali diizinkan)' },
          { icon: 'person', head: 'Mandiri', body: 'tidak berkomunikasi dengan teman', tone: 'secondary' },
          { icon: 'laptop', head: 'Siapkan laptop', body: 'diperlukan untuk bagian coding', tone: 'tertiary' },
          { icon: 'gavel', head: 'Pelanggaran', body: 'nilai 0 dan sanksi akademik', tone: 'error' },
        ]} />
      </ContentSlide>

      <CodeSlide title="Contoh soal: pilihan ganda" snippet={s.pg}
        predict={<>Apa output kode ini? <b>A.</b> 2.5 <b>B.</b> 1 <b>C.</b> 10 <b>D.</b> 2</>}
        steps={[{ lines: [3], note: <><code>%</code> adalah sisa bagi: 5 dibagi 2 bersisa 1. Jawaban: <b>B</b></> }]}
        notes="Contoh gaya soal. Pembahasan: % adalah modulus, bukan pembagian." />

      <ContentSlide title="Contoh soal: benar atau salah"
        notes="Klik untuk menampilkan tiap jawaban. Catatan: range(1, 5) menghasilkan urutan angka 1, 2, 3, 4 (objek range, bukan list); untuk soal kuis, nyatakan 'urutan angka 1 sampai 4'.">
        <RefTable plain head={['Pernyataan', 'Jawaban']} rows={[
          ['List di Python bersifat immutable.', ans(1, 'SALAH: list bersifat mutable')],
          ['range(1, 5) menghasilkan angka 1, 2, 3, 4.', ans(2, 'BENAR: batas akhir tidak ikut')],
          ['break dipakai untuk melewati satu putaran.', ans(3, 'SALAH: itu continue; break menghentikan loop')],
        ]} />
      </ContentSlide>

      <CodeSlide title="Contoh soal: coding" snippet={s.coding}
        predict={<>Soal: baca sebuah angka, cetak “Genap” atau “Ganjil”. Tulis programnya dulu, lalu bandingkan.</>}
        steps={[
          { lines: [1], note: <>baca angka dan ubah ke <code>int</code></> },
          { lines: [2, 3], note: <>sisa bagi 2 sama dengan 0 berarti genap</> },
          { lines: [4, 5], note: <>selain itu, ganjil</> },
        ]}
        notes="Nilai penuh untuk program yang benar apa pun gaya penulisannya. Contoh masukan 7." />

      <ContentSlide title="Tips mengerjakan"
        notes="Strategi waktu: kerjakan yang mudah dulu, tandai yang sulit. Baca kata kunci seperti 'kecuali', 'selalu', 'tidak'.">
        <CardGrid cols={2} items={[
          { icon: 'sort', head: 'Strategi', body: 'kerjakan soal yang mudah dulu; jangan terpaku pada satu soal sulit' },
          { icon: 'visibility', head: 'Teliti', body: 'baca pelan-pelan; waspadai kata “benar”, “salah”, dan “kecuali”', tone: 'secondary' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Rencana sesi"
        notes="Rincian waktu sesi 100 menit.">
        <CardGrid cols={3} items={[
          { icon: 'quiz', head: '30 menit', body: 'Kuis' },
          { icon: 'forum', head: '30 menit', body: 'Pembahasan', tone: 'secondary' },
          { icon: 'terminal', head: '40 menit', body: 'Praktikum', tone: 'tertiary' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Siap mengerjakan?"
        notes="Tekan Mulai tepat saat semua mahasiswa siap. Timer berhenti otomatis di 00:00 dan menampilkan pesan.">
        <QuizTimer minutes={30} />
      </ContentSlide>

      <ClosingSlide title="Terima kasih" lede="Semoga sukses di kuis, dan persiapkan diri untuk UTS." next="Pertemuan 8: UTS" />
    </DeckMeta>
  );
}
