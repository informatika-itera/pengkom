export type MeetingKind = 'teori' | 'review' | 'kuis' | 'praktikum' | 'ujian';

export interface Meeting {
  number: number;
  title: string;
  desc: string;
  kind: MeetingKind;
  /** has a slide deck (the exam meeting does not) */
  deck: boolean;
  /** the React deck exists (src/decks/pertemuan-NN.tsx + slides/pertemuan-N.html) */
  published: boolean;
}

export interface MeetingSection {
  title: string;
  desc: string;
  meetings: Meeting[];
}

const m = (number: number, title: string, desc: string, kind: MeetingKind = 'teori', published = false): Meeting =>
  ({ number, title, desc, kind, deck: kind !== 'ujian', published });

/** Dashboard metadata. Flip `published` to true once the deck is migrated to the new design. */
export const SECTIONS: MeetingSection[] = [
  {
    title: 'Sebelum UTS: dasar pemrograman',
    desc: 'Dari cara berpikir komputasional sampai mengolah banyak data dengan list.',
    meetings: [
      m(1, 'Pengenalan Komputasi', 'Apa itu komputasi, berpikir komputasional, algoritma, dan menjalankan program Python pertama di Colab.', 'teori', true),
      m(2, 'Variabel dan Tipe Data', 'Menyimpan nilai dalam variabel, tipe data dasar, operator, input dari pengguna, dan konversi tipe.', 'teori', true),
      m(3, 'Percabangan', 'Mengambil keputusan dengan if, elif, dan else berdasarkan kondisi.', 'teori', true),
      m(4, 'Kondisi Majemuk', 'Menggabungkan kondisi dengan and, or, dan not, serta percabangan bersarang.', 'teori', true),
      m(5, 'Perulangan', 'Mengulang pekerjaan dengan for, while, break, dan continue; melacak jalannya loop.', 'teori', true),
      m(6, 'List', 'Menyimpan banyak data dalam satu variabel, mengakses elemen, dan mengolahnya dengan loop.', 'teori', true),
      m(7, 'Kuis Pra-UTS', 'Kuis materi pertemuan 1 sampai 6 sebagai persiapan UTS.', 'kuis', true),
      m(8, 'UTS', 'Ujian Tengah Semester.', 'ujian'),
    ],
  },
  {
    title: 'Setelah UTS: dari fungsi ke data',
    desc: 'Membungkus kode menjadi fungsi, memakai library, dan mengolah serta memvisualisasikan data.',
    meetings: [
      m(9, 'Fungsi', 'Membuat fungsi dengan parameter dan nilai kembali agar kode dapat dipakai ulang.', 'teori', true),
      m(10, 'String', 'Mengolah teks: indexing, slicing, metode string, dan pemformatan.', 'teori', true),
      m(11, 'Menggunakan Library', 'Mengimpor dan memakai library seperti math dan random, serta membaca dokumentasi.', 'teori', true),
      m(12, 'Visualisasi Data', 'Membuat grafik garis, batang, dan sebar dengan matplotlib.', 'teori', true),
      m(13, 'File CSV', 'Membaca dan menulis file CSV lalu mengolah datanya.', 'teori', true),
      m(14, 'Dictionary dan Error', 'Menyimpan data berpasangan kunci dan nilai, menghitung frekuensi, serta menangani error dengan try dan except.', 'teori', true),
      m(15, 'Kuis Pra-UAS', 'Kuis materi pertemuan 9 sampai 14 sebagai persiapan UAS.', 'kuis', true),
      m(16, 'UAS', 'Ujian Akhir Semester.', 'ujian'),
    ],
  },
];

export const MEETINGS: Meeting[] = SECTIONS.flatMap((s) => s.meetings);
