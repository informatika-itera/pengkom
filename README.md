# Materi Ajar Pengenalan Komputasi (WI25-00003)

Repositori ini berisi materi ajar dan slide presentasi untuk matakuliah **Pengenalan Komputasi** di **Institut Teknologi Sumatera (ITERA)**. Mata kuliah ini merupakan matakuliah wajib institusi dengan kode **WI25-00003**, diperuntukkan bagi mahasiswa non-informatika untuk memperkenalkan konsep pemikiran komputasional, logika pemrograman, dan penggunaan Python sebagai alat untuk otomasi tugas, pengolahan data sederhana, serta pengambilan keputusan logis.

## Deskripsi Mata Kuliah

Mata kuliah ini tidak bertujuan untuk mencetak insinyur perangkat lunak, melainkan untuk membekali mahasiswa dengan keterampilan dasar dalam pemrograman Python guna mendukung bidang studi mereka masing-masing (misalnya biologi, ekonomi, sastra). Fokus utama adalah pada pengembangan logika berpikir komputasional melalui algoritma, struktur data dasar, dan aplikasi praktis.

- **Durasi**: 16 minggu (4 modul)
- **Target Mahasiswa**: Mahasiswa non-IT dari berbagai disiplin ilmu
- **Alat Utama**: Python via Google Colab (tidak memerlukan instalasi lokal)
- **Pendekatan Pembelajaran**: Kombinasi teori, aktivitas interaktif (simulasi robot, detektif logika), praktikum, dan proyek akhir
- **Penilaian**: Kuis tengah semester, kuis akhir, dan presentasi proyek akhir

## Struktur Mata Kuliah

Mata kuliah dibagi menjadi 4 modul utama, dengan slide presentasi untuk setiap pertemuan menggunakan framework [Reveal.js](https://revealjs.com/) untuk presentasi HTML interaktif.

### Modul 1: Logika dan Pengenalan Kode (Minggu 1-4)

- **Minggu 1**: Mengapa Kita Perlu Kode? (Algoritma, Otomasi, Google Colab)
- **Minggu 2**: Variabel: Menyimpan Informasi (Tipe Data Dasar)
- **Minggu 3**: Logika Percabangan (If/Else)
- **Minggu 4**: Logika Lanjutan (Elif, AND/OR/NOT)

### Modul 2: Otomasi Tugas (Minggu 5-8)

- **Minggu 5**: Perulangan Dasar (For Loops)
- **Minggu 6**: Bekerja dengan Data Majemuk (Lists)
- **Minggu 7**: Review dan Kuis Tengah Semester
- **Minggu 8**: Ujian Tengah Semester (UTS)

### Modul 3: Pengolahan Data Sederhana (Minggu 9-12)

- **Minggu 9**: Fungsi: Rumus Siap Pakai (Def Functions)
- **Minggu 10**: Manipulasi Teks (Strings)
- **Minggu 11**: Menggunakan Library (Modul Eksternal)
- **Minggu 12**: Pengenalan Visualisasi Data (Matplotlib)

### Modul 4: Proyek Aplikatif (Minggu 13-16)

- **Minggu 13**: Bekerja dengan File (Input/Output)
- **Minggu 14**: Strategi Pemecahan Masalah (Desain Algoritma)
- **Minggu 15**: Kuis Akhir dan Finalisasi Proyek
- **Minggu 16**: Presentasi Proyek Akhir (UAS)

## File dalam Repositori

- **Slide Presentasi**: File HTML untuk setiap pertemuan (e.g., `pertemuan02.html` hingga `pertemuan16.html`) menggunakan Reveal.js.
- **Template**: `template.html` sebagai basis untuk membuat slide baru.
- **Syllabus**: [Topik Materi Pengenalan Komputasi.pdf](Topik%20Materi%20Pengenalan%20Komputasi.pdf) - Dokumen lengkap outline mata kuliah.
- **Demo dan Contoh**: Folder `examples/` berisi contoh presentasi Reveal.js.
- **Tema dan Styling**: Folder `css/` dan `theme/` untuk kustomisasi tampilan.
- **Plugin**: Folder `plugin/` untuk fitur tambahan seperti highlight kode, math, dll.

## Cara Menggunakan

1. **Menjalankan Slide**: Buka file HTML pertemuan di browser web (e.g., `pertemuan02.html`).
2. **Edit Slide**: Gunakan editor teks untuk memodifikasi file HTML atau Markdown.
3. **Praktikum**: Gunakan Google Colab untuk latihan coding sesuai panduan di slide.
4. **Build dan Deploy**: Gunakan `gulpfile.js` untuk build presentasi (jalankan `npm install` dan `gulp serve`).

## Teknologi yang Digunakan

- **Reveal.js**: Framework presentasi HTML open-source.
- **Python**: Bahasa pemrograman utama untuk praktikum.
- **Google Colab**: Platform untuk coding tanpa instalasi.
- **Gulp**: Untuk build dan development.

## Lisensi

Materi ini dikembangkan untuk keperluan akademik di Institut Teknologi Sumatera. Silakan gunakan dan modifikasi sesuai kebutuhan pendidikan.

---

<div align="center">
  Institut Teknologi Sumatera (ITERA) | Kode Matakuliah: WI25-00003
</div>
