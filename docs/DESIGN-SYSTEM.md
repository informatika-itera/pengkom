# Sistem Desain Slide Pengenalan Komputasi

Disalin dari repo `dtd` (palet Airbnb × Material Design 3 Expressive) lalu diperluas untuk mata kuliah pemrograman.
Kanvas 1280×720 (16:9) atau 1280×960 (4:3, otomatis dari rasio layar atau `?ratio=4x3`).

## Warna

Token `--md-sys-color-*` di `src/theme/color.css` **dihasilkan** oleh `bun run gen:palette` (HCT lewat
`@material/material-color-utilities`). Jangan diedit manual. Skrip gagal bila ada pasangan teks/latar < 4,5:1
di tema terang maupun gelap (104 pasangan).

| Peran | Seed | Catatan |
|---|---|---|
| primary | Rausch `#ff385c` | teks/tombol memakai tone 40; Rausch asli hanya untuk bentuk besar dan angka display |
| secondary / tertiary | Plus `#92174d` / Luxe `#460479` | |
| info / accent | Babu `#00a699` / Arches `#fc642d` | warna historis Airbnb; ditambahkan agar sintaks kode punya cukup rona |
| success, warning, error | hijau/oranye berkroma rendah, `#c13515` | |

Token kode: `code-surface`, `syntax-{keyword,function,builtin,string,number,comment,operator}`,
`terminal-{surface,text,muted,prompt}`. Setiap warna sintaks lolos 4,5:1 pada kartu kode **dan** pada pita sorotan baris.
Keyword dicetak tebal dan komentar miring, sehingga kode tetap terbaca tanpa bergantung pada warna.

## Tipografi

Google Sans Flex (teks), Google Sans Code (kode), Material Symbols Rounded (ikon), di-host sendiri lewat `@fontsource-variable/*`.
Judul memakai sumbu `ROND` 100. **Minimum teks 20px; kode 24px.** Rumus: KaTeX (`<M tex>`, `<MathBlock tex>`).

## Kode dan output

- Potongan kode ada di `src/code/pNN/<nama>.py`; **output tidak pernah diketik manual**.
  `bun run gen:outputs` menjalankan Python dan menyimpan `<nama>.out.txt` (input `input()` dari `<nama>.in`,
  `echo`-nya ikut tercetak seperti di terminal). `build` gagal bila ada output yang basi (`check:outputs`).
- `<nama>.norun` = tidak pernah dijalankan (mis. loop tak berhenti). `<nama>.trace` berisi `"<baris>: var1 var2"`
  → `<nama>.trace.json`, nilai variabel setelah baris itu dieksekusi, untuk `TraceTable`.
- `<nama>.sol.py` = solusi dosen: **hanya outputnya** yang dikirim ke slide, sumbernya tidak ikut bundle.
  Berkas `*.sol.py` dan `*.sol.in` di-gitignore: hanya ada di komputer dosen, tidak masuk repo. Yang masuk repo hanya
  `*.sol.out.txt` (dan gambar `*.sol.fig-*.svg`), yaitu contoh hasil yang memang ditampilkan ke mahasiswa. Simpan cadangan solusi di tempat privat.
- Highlight: Shiki dengan tema CSS-variable; tidak ada plugin highlight reveal.js.

## Komponen

`src/ui/Code.tsx`: `CodeBlock` (nomor baris, `marks` = sorotan yang menjadi bagian animasi, penanda ①②, tombol layar penuh dengan scroll), `Output` (sel keluaran gaya Colab, baris asli, bisa dibuka layar penuh), `Predict`, `PinNote`, `CodeRun` (varian A),
`TraceTable` (varian C). `src/layouts/index.tsx`: `TitleSlide`, `ObjectivesSlide`, `CodeSlide`, `TraceSlide`,
`CompareCodeSlide`, `PracticeSlide`, `TicketSlide`, `SummarySlide`, `AssignmentSlide`, `NextSlide`, `ClosingSlide`, `Take`.

## Aturan tampilan kode

- Sorotan baris hanya muncul sebagai bagian animasi (klik); slide tanpa animasi tidak menyorot apa pun.
- Kartu kode tidak menampilkan nama berkas (kita memakai sel Colab); penanda bahasa berupa ikon Python di kiri atas dan tombol layar penuh di kanan atas, pada satu baris.
- Satu kotak kode per layar, kecuali perbandingan berdampingan (`CompareCodeSlide`, pasangan `break`/`continue`).
- Output ditampilkan baris demi baris persis seperti hasil eksekusi; "Tebak dulu" digantikan output saat klik.
- Slide lacak (`TraceSlide`): satu klik = satu putaran (baris tabel + pita pada baris kode).
- Cover dan penutup memakai goresan kuas (`BrushBackground`), bervariasi per pertemuan; judul cover pendek, tanpa semester.

## Aturan konten

1. Judul slide (`h2`) singkat: topik atau pertanyaan, maksimal sekitar 5 kata. Kalimat klaim atau penjelasan ditaruh di isi slide (pil `Take`, `lede`, atau catatan).
2. Satu konsep per slide kode; kode ≤ 12 baris (≥ 24px). Lebih panjang → tampilkan bertahap dengan sorotan.
3. Setiap konsep baru: **Tebak → Jalankan → Telusuri** (output muncul sebagai fragment setelah tebakan).
4. Output dan grafik tidak pernah diketik manual.
5. Satu aktivitas tiap 10–15 menit (tebak, telusuri, cari bug, Parsons).
6. Satu slide miskonsepsi per topik.
7. Tujuan pembelajaran berkata kerja terukur, dan **setiap tujuan diuji di tiket keluar**.
8. Catatan pembicara wajib di setiap slide (`notes`).
9. Tanpa emoji; makna tidak boleh hanya dibawa warna (ikon + label); teks ≥ 20px; tanpa `style` inline.

## Verifikasi

`scripts/shoot.sh <no> <outDir> [indeks]` (menjalankan Vite, screenshot via Brave/Chromium, mendeteksi overflow dan
teks < 20px). Tambahkan `QUERY='?theme=dark'` atau `QUERY='?ratio=4x3' VIEWPORT=1280x960`.
