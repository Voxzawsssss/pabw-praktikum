# Worksheet P11 - Modularisasi JavaScript dan Penyimpanan Pilihan

## Identitas mahasiswa
- Nama: M Vyo Fachmil Fachry Setiawan
- NIM: 25523238

## Ringkasan project P11
Project ini merupakan pengembangan lanjutan dari hasil Pertemuan 9 yang dibuat menjadi struktur modular di folder `worksheet-p11/`. Data profil, daftar proyek, dan logika tampilan dipisah ke modul JavaScript yang berbeda, lalu keadaan aplikasi dikendalikan melalui satu objek `state` agar filter dan pilihan pengguna lebih mudah dipelihara.

Project ini tetap menggunakan data asli dari project P9, tidak mengganti data profil atau daftar proyek dengan contoh baru. Halaman tetap dalam bahasa Indonesia dan mempertahankan seluruh fitur yang sudah ada, termasuk validasi form dan filter proyek.

## Cara menjalankan melalui Live Server
1. Buka folder project di VS Code.
2. Klik kanan file `profil.html` di `worksheet-p11/`.
3. Pilih opsi "Open with Live Server" atau "Open in browser" dari Live Server.
4. Buka URL yang ditampilkan, misalnya:

```text
http://localhost:5500/worksheet-p11/profil.html
```

Jika Live Server belum terpasang, install ekstensi Live Server terlebih dahulu di VS Code lalu ulangi langkah di atas.

## Tanggung jawab masing-masing modul
- `data.js`: menyimpan data profil, keahlian, proyek, serta fungsi murni untuk format teks seperti `buatPerkenalan()` dan `formatKeahlian()`.
- `state.js`: menyimpan keadaan aplikasi dalam satu objek `state`, mengelola `localStorage`, validasi skema, serta fungsi pengubah seperti `pilihKategori()` dan `aturUlang()`.
- `dom.js`: bertanggung jawab pada tampilan DOM, pembuatan kartu proyek, pesan kosong, serta fungsi `render(state)` dan `saring(state)`.
- `events.js`: mengelola event listener untuk filter, form, dan tombol atur ulang tanpa mengubah state secara langsung.
- `app.js`: hanya menghubungkan modul-modul dan menjalankan inisialisasi aplikasi serta render awal.

## Penjelasan singkat tentang state, render, localStorage, dan simpanan rusak
- `state` adalah satu objek pusat yang menyimpan status aplikasi yang berubah, seperti `kategoriAktif` untuk filter yang sedang dipilih.
- `render(state)` menggambar ulang daftar proyek berdasarkan isi `state`, lalu menyesuaikan tombol filter yang aktif.
- `localStorage` dipakai untuk menyimpan pilihan tampilan yang relevan saja, seperti kategori filter aktif. Nilai yang disimpan selalu berupa JSON valid melalui `JSON.stringify()` dan dibaca kembali dengan `JSON.parse()`.
- Nilai bawaan yang valid adalah `kategoriAktif: "Semua"` untuk project ini.
- Simpanan rusak atau versi lama ditangani dengan aman. Jika string tidak valid JSON, hasil parse gagal dan data dibuang. Jika `versi` tidak sesuai dengan skema nomor 2, simpanan lama juga dibuang. Tidak ada token, kata sandi, atau data pribadi yang disimpan.

## Cara menguji fitur
1. Filter proyek
   - Buka halaman.
   - Klik tombol kategori seperti "Buku favorit" atau "Belum dibaca".
   - Pastikan hanya proyek pada kategori itu yang tampil dan tombol aktif berpindah sesuai pilihan.

2. Penyimpanan pilihan
   - Pilih kategori tertentu.
   - Refresh halaman.
   - Pastikan kategori yang dipilih tetap terbawa.

3. Tombol atur ulang
   - Klik tombol "Atur ulang pilihan".
   - Pastikan semua tombol filter kembali ke status awal dan daftar menampilkan data sesuai kategori "Semua".
   - Refresh halaman dan pastikan pilihan awal tetap muncul.

4. Simpanan rusak
   - Buka Console browser.
   - Ketik:

```js
localStorage.setItem("pabw-p11", "bukan-json");
```

   - Refresh halaman.
   - Pastikan halaman tetap terbuka dan kembali menggunakan nilai bawaan.

5. Skema lama
   - Di Console browser, ketik:

```js
localStorage.setItem("pabw-p11", "{}");
```

   - Refresh halaman.
   - Pastikan simpanan lama dibuang dan halaman kembali ke nilai bawaan.

## Deklarasi penggunaan AI
Nama: M Vyo Fachmil Fachry Setiawan  
NIM: 25523238

Bagian yang dibantu GitHub Copilot/AI: membantu menyusun struktur modular, memahami alur state/render, menyiapkan pola penanganan `localStorage`, dan menulis dokumentasi awal.  
Bagian yang saya kerjakan sendiri: menyesuaikan data asli project P9, memeriksa hasil pemindahan fitur, menguji perilaku halaman, dan memastikan isi halaman tetap sesuai kebutuhan tugas.  
Pemeriksaan dan pengujian yang benar-benar saya lakukan: [isi di sini].

## Persiapan Pertemuan 12
Catat hasil perintah berikut di terminal:

```bash
node -v
npm -v
```

Hasil yang saya catat:
- Node.js: [isi hasil node -v]
- npm: [isi hasil npm -v]

## Catatan tambahan
- Folder `worksheet-p11/` dipersiapkan sebagai project terpisah dari source asli P9.
- File tambahan dari P10 seperti `js/api.js` tetap dipertahankan jika ada di workspace, tanpa membuat duplikasi atau data palsu.
- Tidak ada dependency baru, package.json, atau konfigurasi Vite yang ditambahkan.
