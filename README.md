# Pengenalan Komputasi

Slide kuliah **Pengenalan Komputasi** (Python) — Institut Teknologi Sumatera (ITERA), Semester Gasal 2026/2027.
Dibangun dengan **Reveal.js 6 + React 19** (`@revealjs/react`), palet **Airbnb** dengan bahasa visual
**Material Design 3 Expressive**, font **Google Sans Flex** / **Google Sans Code**, rumus **KaTeX**,
dan sorotan sintaks **Shiki**. Lihat [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).

## Menjalankan

```bash
bun install
bun run dev            # http://127.0.0.1:8932/ (dashboard) — /pertemuan-N.html (deck)
bun run build          # cek output kode + tsc + vite build → dist/
bun run gen:outputs    # jalankan ulang semua potongan kode Python (butuh python3)
bun run gen:palette    # hasilkan ulang src/theme/color.css
```

Kontrol tampilan (kiri bawah): rasio Otomatis / 16:9 / 4:3 dan tema Otomatis / Terang / Gelap
(`?ratio=4x3&theme=dark`). Navigasi: `←` `→`, `S` tampilan pembicara, `O` ikhtisar, `F` layar penuh.
Ekspor PDF: tambahkan `?print-pdf` lalu cetak.

## Struktur

```
slides/        halaman (root Vite): index.html = dashboard, pertemuan-N.html = deck
src/theme/     token warna (generated), tipografi, bentuk, gerak, tema reveal
src/ui/        Icon, KaTeX, komponen kode (CodeBlock, Output, TraceTable, …), highlight Shiki
src/layouts/   layout slide
src/deck-shell DeckShell, kanvas 16:9/4:3, kontrol tampilan
src/decks/     pertemuan-NN.tsx + registry.ts (dashboard)
src/code/      potongan kode Python + output asli (generated)
scripts/       gen-palette, run-snippets, shoot/shot
legacy/        deck HTML reveal.js lama — acuan isi untuk migrasi (tidak bisa dibuka sebagai slide)
public/data/   berkas CSV untuk praktikum
```

## Status migrasi

Sudah memakai desain baru: **Pertemuan 1–6 dan 9–14**.
Python untuk menghasilkan keluaran kode: `python -m venv .venv && .venv/bin/pip install -r scripts/requirements.txt` (pandas, matplotlib, seaborn).
Cara menambah deck: tulis `src/decks/pertemuan-NN.tsx`, salin `slides/pertemuan-5.html` (ubah `data-deck` dan judul),
tambahkan cuplikan kode di `src/code/pNN/`, jalankan `bun run gen:outputs`, lalu set `published` ke `true` di `src/decks/registry.ts`.
