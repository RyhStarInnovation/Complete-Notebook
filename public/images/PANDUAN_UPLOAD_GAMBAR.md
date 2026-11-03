# Panduan Folder Gambar (.JPG / .PNG) – Complete Notebook Website

Folder `/public/images/` dan `/src/assets/images/` telah disiapkan secara rapi untuk memudahkan Anda memasukkan atau mengganti gambar aplikasi **Complete Notebook** kapan saja:

## Struktur Folder Gambar
- `/public/images/icons/` — Tempat menaruh ikon aplikasi berformat `.png` atau `.jpg` (contoh: `app-icon.png`).
- `/public/images/screenshots/` — Tempat menaruh tangkapan layar (*screenshot*) aplikasi dari Google Play Store berformat `.png` atau `.jpg` (contoh: `notes-screen.png`, `finance-chart.jpg`).
- `/public/images/banners/` — Tempat menaruh gambar sampul (*feature graphic* / *hero banner*) berformat `.jpg` atau `.png`.
- `/src/assets/images/` — Berisi gambar studio resolusi tinggi bawaan website.

## Cara Mengganti Gambar di Website
1. Unggah file `.jpg` atau `.png` Anda ke salah satu subfolder di dalam `/public/images/` (misalnya `/public/images/screenshots/tampilan-utama.png`).
2. Buka file `/src/assets/mediaRegistry.ts`.
3. Ubah nilai URL pada slot gambar yang diinginkan menjadi `'/images/screenshots/tampilan-utama.png'`. Perubahan akan langsung tampil otomatis di seluruh halaman website!
