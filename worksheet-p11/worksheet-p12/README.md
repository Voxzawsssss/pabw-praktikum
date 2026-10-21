# Worksheet P12 - Build Tooling, npm, dan Framework SPA (Vue 3 + Vite)

## Identitas Mahasiswa
- **Nama**: M Vyo Fachmil Fachry Setiawan
- **NIM**: 25523238
- **Kelas**: SIF302 - Pengembangan Aplikasi Berbasis Web (PABW)
- **Topik**: Dari Berkas Lepas ke Proyek Komponen yang Dibangun

---

## 1. Ringkasan Proyek
Proyek ini memindahkan halaman profil dari **Pertemuan 11** ke arsitektur Single Page Application (SPA) berbasis komponen **Vue 3** menggunakan build tooling **Vite**, tanpa mengubah tampilan desain maupun perilaku asli halaman:
1. Enam berkas CSS asli (`tokens.css`, `base.css`, `layout.css`, `komponen.css`, `tema.css`, `responsif.css`) dipertahankan 100% tanpa mengubah isi aslinya dan diimpor langsung melalui `src/main.js`.
2. Halaman dipecah menjadi **4 komponen Vue** modular di folder `src/components/`.
3. Komponen `KepalaProfil.vue` menerima data profil secara *read-only* melalui `props`.
4. Manajemen keadaan (*state*) dikelola menggunakan fungsi `reactive()` di `src/state.js`, menggantikan mekanisme pemanggilan `render()` manual di P11.
5. Penyimpanan pilihan filter kategori dikelola di `src/simpanan.js` menggunakan `localStorage` dengan penanganan skema versi (`SKEMA_VERSI = 2`) dan pemulihan data rusak secara aman.
6. Berkas `src/api.js` dari Pertemuan 10 diikutsertakan apa adanya.
7. Tersedia skrip untuk pengembangan (`npm run dev`), build produksi (`npm run build`), dan pratinjau hasil build (`npm run preview`).

---

## 2. Versi Perkakas (Lembar A)
- **Node.js**: `v22.23.2` (LTS)
- **npm**: `10.9.8`
- **Vite**: `v8.3.4`
- **Vue**: `^3.5.44`

---

## 3. Struktur Berkas Proyek

```text
worksheet-p12/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── public/
│   └── assets/
│       └── covers/
│           ├── bumi-manusia.svg
│           ├── laskar-pelangi.svg
│           └── placeholder.svg
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── state.js
│   ├── simpanan.js
│   ├── data.js
│   ├── api.js
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── komponen.css
│   ├── tema.css
│   ├── responsif.css
│   └── components/
│       ├── KepalaProfil.vue
│       ├── TombolFilter.vue
│       ├── DaftarProyek.vue
│       └── FormKontak.vue
└── dist/ (dihasilkan oleh npm run build)
```

---

## 4. Pembagian Tanggung Jawab Komponen (Lembar D)

| Komponen | Bagian Halaman | Sumber Data | Peran & Tanggung Jawab |
| :--- | :--- | :--- | :--- |
| **`KepalaProfil.vue`** | `<header class="site-header">` | `props.profil` dari `App.vue` | Menampilkan judul situs, navigasi menu, dan metadata profil mahasiswa secara *read-only*. |
| **`TombolFilter.vue`** | Toolbar filter kategori | `state.kategoriAktif` & `daftarKategori` | Menampilkan tombol filter kategori aktif dan tombol atur ulang pilihan (`@atur-ulang`). |
| **`DaftarProyek.vue`** | Kartu proyek & pesan kosong | `state.daftarProyek` (terhitung) | Menyaring dan menampilkan daftar buku/proyek berdasarkan `kategoriAktif` menggunakan `v-for` dengan `:key="proyek.id"`. |
| **`FormKontak.vue`** | Formulir kontak/status di sidebar | `ref` lokal (`nama`, `nim`, `tahun`) | Menangani input pengguna secara lokal, validasi sederhana, dan pengosongan form setelah dikirim tanpa reload halaman. |

---

## 5. Cara Menjalankan Proyek

### A. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka peramban pada alamat lokal yang muncul di terminal (misalnya `http://localhost:5173/`).

### B. Membangun untuk Produksi (Build)
```bash
npm run build
```
Perintah ini mengompilasi dan mengoptimasi berkas ke dalam direktori `dist/`.

### C. Menjalankan Hasil Build (Preview)
```bash
npm run preview
```
Membuka server lokal untuk menguji hasil build produksi dari folder `dist/` (biasanya di `http://localhost:4173/`).

---

## 6. Pengukuran Ukuran Berkas (Lembar F.3)

| Parameter Pengukuran | Sebelum Build (`src/`) | Sesudah Build (`dist/`) |
| :--- | :--- | :--- |
| **Jumlah berkas** | 22 berkas | 8 berkas |
| **Total ukuran berkas** | 44.980 bytes (~44,9 kB) | 96.172 bytes (~96,1 kB) |
| **Ukuran bundle utama** | Tersebar di banyak file JS & CSS modular | `index.html`: 0,46 kB<br>`index-Bw46RdtC.css`: 6,94 kB (gzip 2,06 kB)<br>`index-Daitf8Sf.js`: 72,51 kB (gzip 28,42 kB) |

---

## 7. Tiket Keluar (Lembar G)

### 1. Apa bedanya dependencies dan devDependencies? Sebutkan satu contoh untuk masing-masing dari proyek Anda.
- **Dependencies**: Paket pustaka yang dibutuhkan langsung oleh aplikasi saat dijalankan di lingkungan produksi. Contoh pada proyek ini: `"vue": "^3.5.44"`.
- **DevDependencies**: Perkakas yang hanya diperlukan selama tahap pengembangan, pengujian, atau proses build, dan tidak dikirim ke produksi. Contoh pada proyek ini: `"vite": "^8.3.4"` dan `"@vitejs/plugin-vue": "^6.0.10"`.

### 2. Mengapa package-lock.json wajib disimpan di repositori, sedangkan node_modules/ tidak?
- `package-lock.json` wajib disimpan karena mengunci versi persis (*exact version*) dari seluruh paket dan dependensi transitif sehingga seluruh anggota tim atau server CI/CD memasang pohon dependensi yang identik secara deterministik.
- `node_modules/` tidak disimpan karena ukurannya sangat besar, memuat ribuan berkas yang boros ruang penyimpanan di Git, dan dapat dibuat ulang kapan saja secara otomatis menggunakan perintah `npm install`.

### 3. Apa yang dilakukan perintah `npm create vite@latest . -- --template vue`? Apa arti titik pada perintah itu?
- Perintah tersebut mengunduh dan menjalankan generator resmi Vite versi terbaru untuk membuat kerangka kerja proyek berbasis Vue.
- Tanda titik (`.`) berarti kerangka proyek diinisialisasi langsung di dalam **direktori kerja saat ini** (`worksheet-p12/`), bukan membuat subfolder baru di dalamnya. Argumen `--template vue` memilih cetak biru awal Vue 3.

### 4. Di Pertemuan 11 Anda memanggil `render(state)` sendiri. Apa yang menggantikannya di Vue, dan siapa yang memanggilnya sekarang?
- Di Vue, pemanggilan manual digantikan oleh sistem **reaktivitas (*reactivity system*)** berbasis *Proxy* dan *declarative rendering* pada bagian `<template>`.
- Sekarang yang memanggil dan memicu pembaruan DOM adalah **runtime internal Vue** secara otomatis setiap kali properti reaktif pada `state` berubah nilainya.

### 5. Mengapa props tidak boleh diubah dari dalam komponen anak?
- Props menerapkan prinsip **aliran data satu arah (*one-way data flow*)**. Data mengalir dari komponen induk (*parent*) ke komponen anak (*child*). Jika anak dapat mengubah props secara langsung, sumber kebenaran (*single source of truth*) data menjadi rancu, menyebabkan efek samping yang sulit dilacak, dan Vue akan memicu peringatan (*warning*) di konsol.

### 6. Apa bedanya `npm run dev` dan `npm run preview`? Kapan Anda memakai masing-masing?
- `npm run dev` menjalankan server lokal pengembangan berbasis native ES modules (*Hot Module Replacement* / HMR). Digunakan **selama proses pengkodean** untuk melihat perubahan kode secara instan tanpa build ulang.
- `npm run preview` menjalankan server web statis lokal untuk melayani berkas hasil build di folder `dist/`. Digunakan **setelah proses pengerjaan selesai** (`npm run build`) untuk memverifikasi bahwa hasil kompilasi produksi berjalan normal sebelum disebarkan (*deploy*).

### 7. Mengapa `dist/` diabaikan sedangkan hasilnya justru yang dijalankan peramban di produksi?
- `dist/` adalah berkas artefak turunan (*generated build output*) yang dapat dihasilkan kapan saja dari kode sumber asli menggunakan `npm run build`. Memasukkan berkas hasil build ke riwayat Git mengotori commit, menyebabkan konflik *merge* yang sering terjadi karena hash nama berkas berubah-ubah, dan memperberat ukuran repositori.

---

## 8. Deklarasi Penggunaan AI (Lembar G)
- **Nama**: M Vyo Fachmil Fachry Setiawan  
- **NIM**: 25523238  

- **Bagian yang dibantu AI**: Membantu perancangan struktur komponen Vue 3, pengintegrasian sistem reaktivitas `reactive()`, penyusunan `src/simpanan.js` dengan fallback skema simpanan rusak, konfigurasi build tooling Vite, serta panduan pengerjaan Lembar A sampai G.
- **Bagian yang saya kerjakan sendiri**: Menyediakan data asli profil mahasiswa dan daftar proyek dari tugas sebelumnya, memeriksa kesesuaian integrasi CSS P04–P06 tanpa pergeseran tampilan, menjalankan pengujian dev server dan build secara langsung di terminal lokal, serta memastikan seluruh kriteria penilaian terpenuhi.
- **Pemeriksaan dan pengujian yang benar-benar dilakukan**:
  1. Pengujian `npm run build` menghasilkan `dist/` dengan ukuran bundle terverifikasi.
  2. Pengujian `npm run dev` dan `npm run preview` dengan status respon HTTP 200.
  3. Pengujian logika `localStorage` dan pemulihan data rusak (*fallback*) pada `simpanan.js`.
  4. Pengujian keunikan `id` pada daftar proyek di `data.js`.
