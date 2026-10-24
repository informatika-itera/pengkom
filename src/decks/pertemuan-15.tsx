import {
  DeckMeta, TitleSlide, ContentSlide, ClosingSlide, CardGrid, RefTable, QuizTimer, Take,
} from '../layouts';

export default function Pertemuan15() {
  return (
    <DeckMeta meeting={15} topic="Kuis Pra-UAS">
      <TitleSlide meeting={15} course="Pengenalan Komputasi" title="Kuis Pra-UAS"
        lede={<>Simulasi untuk materi Pertemuan 9 sampai 14</>}
        tags={[{ icon: 'terminal', label: 'Python' }]}
        notes="Kuis ini adalah simulasi UAS: bentuk soalnya praktik coding. Siapkan timer 45 menit dan pastikan semua tab selain lembar jawaban sudah ditutup." />

      <ContentSlide title="Informasi kuis"
        notes="Sampaikan waktu, sifat, dan cakupan materi.">
        <CardGrid cols={3} items={[
          { icon: 'timer', head: '45 menit', body: 'waktu pengerjaan' },
          { icon: 'menu_book', head: 'Closed book', body: 'tanpa catatan atau referensi', tone: 'secondary' },
          { icon: 'code', head: 'Praktik coding', body: 'bentuk soal seperti UAS', tone: 'tertiary' },
        ]} />
        <RefTable head={['Pertemuan', 'Materi']} rows={[
          ['9', 'Fungsi (def, return, scope)'],
          ['10', 'Manipulasi string'],
          ['11', 'Library: math, random, pandas'],
          ['12–13', 'Visualisasi data dan file CSV'],
          ['14', 'Dictionary dan penanganan error'],
        ]} />
      </ContentSlide>

      <ContentSlide title="Tata tertib"
        notes="Bacakan tata tertib dan pastikan semua memahami sebelum timer dimulai.">
        <CardGrid cols={2} items={[
          { icon: 'tab_close', head: 'Tutup tab lain', body: 'selain lembar jawaban' },
          { icon: 'menu_book', head: 'Tanpa catatan', body: 'dilarang membuka buku atau kode referensi', tone: 'secondary' },
          { icon: 'volume_off', head: 'Tidak berdiskusi', body: 'selama kuis berlangsung', tone: 'tertiary' },
          { icon: 'front_hand', head: 'Angkat tangan', body: 'jika ada kendala teknis' },
        ]} />
      </ContentSlide>

      <ContentSlide title="Siap mengerjakan?"
        notes="Tekan Mulai bersamaan. Pengingat: kumpulkan jawaban sebelum waktu habis.">
        <QuizTimer minutes={45} />
      </ContentSlide>

      <ContentSlide title="Informasi UAS"
        notes="UAS CBT pada Pertemuan 16 mencakup seluruh materi. Kuis hari ini adalah simulasi.">
        <CardGrid cols={2} items={[
          { icon: 'computer', head: 'Computer Based Test', body: 'Pertemuan 16, di laboratorium komputer' },
          { icon: 'inventory_2', head: 'Seluruh materi', body: 'Pertemuan 1 sampai 14', tone: 'secondary' },
        ]} />
        <Take>Pelajari kembali semua materi dari awal. Kuis hari ini adalah simulasi soal UAS.</Take>
      </ContentSlide>

      <ClosingSlide title="Semangat!" lede="Hasil kuis ini menjadi bahan evaluasi terakhir sebelum UAS." next="Pertemuan 16: UAS" />
    </DeckMeta>
  );
}
