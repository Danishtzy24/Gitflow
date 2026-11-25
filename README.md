# Gitflow — Vite + TypeScript

Generator perintah Git untuk repository GitHub, dengan halaman dokumentasi terpisah. Semua perintah hanya dibuat di browser; aplikasi tidak menjalankannya secara otomatis.

## Persyaratan

- Node.js 20.19+ atau 22.12+
- npm
- Git, jika ingin menjalankan perintah yang dihasilkan

## Jalankan untuk pengembangan

```bash
npm ci
npm run dev
```

Buka alamat yang ditampilkan Vite. Server menerima koneksi di `0.0.0.0`, sehingga dapat digunakan dalam lingkungan preview.

## Build untuk produksi

```bash
npm run build
npm run preview
```

Build terlebih dahulu memeriksa tipe TypeScript, lalu menghasilkan aplikasi statis di `dist/`. Folder `dist/` yang disertakan dalam ZIP juga dapat langsung diunggah ke hosting statis. Sajikan melalui server web; jangan membuka HTML build dengan `file://` karena browser dapat memblokir modul JavaScript.

PowerShell menggunakan pemeriksaan `$LASTEXITCODE`, kompatibel dengan Windows PowerShell 5.1 dan PowerShell 7. Format Bash dan CMD menggunakan `&&`; salin seluruh blok sekaligus dan jangan mencampur format terminal.

Kedua halaman, `index.html` dan `docs.html`, ikut dibangun. `base: './'` di `vite.config.ts` mendukung hosting dalam subdirektori.

## Struktur

- `index.html` — halaman generator
- `docs.html` — halaman dokumentasi
- `src/main.ts`, `src/main.css` — logika dan tampilan generator
- `src/docs.ts`, `src/docs.css` — logika dan tampilan dokumentasi
- `vite.config.ts`, `tsconfig.json` — konfigurasi proyek
- `dist/` — hasil build produksi siap disajikan

## Repository private dan keamanan

Pemeriksaan repository membutuhkan internet. Tanpa autentikasi, GitHub tidak membedakan repository private dari repository yang tidak ditemukan. Token opsional hanya dikirim ke GitHub API saat tombol **Periksa akses** ditekan; aplikasi tidak menyimpannya atau memasukkannya ke perintah. Autentikasi Git di terminal tetap diperlukan.

Force push, reset hard, dan penghapusan branch dapat menyebabkan kehilangan data. Cadangkan pekerjaan serta periksa URL, branch, isi folder, dan perintah sebelum menjalankannya.
