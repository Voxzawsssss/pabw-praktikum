# Worksheet P9 - DOM, Event, dan Interaktivitas

Dokumen ini berisi ringkasan tugas Pertemuan 9 dan cara menjalankan halaman proyek.

## Tujuan
- Menampilkan daftar proyek secara dinamis menggunakan DOM.
- Menerapkan filter kategori dengan event delegation.
- Menyusun interaksi form dengan validasi kolom.
- Memastikan halaman tetap aman, rapi, dan tanpa error sintaks.

## Struktur folder

```text
worksheet-p9/
├── profil.html
├── README.md
├── base.css
├── layout.css
├── komponen.css
├── tema.css
├── tokens.css
├── responsif.css
└── js/
    ├── app.js
    └── dom.js
```

## Catatan penting
- Folder ini dibuat sebagai hasil kerja Pertemuan 9.
- Data proyek dipakai dari project Pertemuan 8 yang sudah ada.
- Tidak ada data proyek baru yang dibuat.
- Pekerjaan Pertemuan 8 tetap dipertahankan dan tidak diubah.

## Cara menjalankan
1. Buka terminal di folder workspace.
2. Jalankan perintah:

```bash
python -m http.server 8000
```

3. Buka halaman berikut di browser:

```text
http://localhost:8000/worksheet-p9/profil.html
```

## Fitur utama
- Render daftar proyek dengan JavaScript.
- Filter berdasarkan kategori.
- Tombol aktif untuk kategori yang sedang dipilih.
- Pesan kosong jika tidak ada hasil filter.
- Validasi form per kolom dan fokus ke field yang salah.
- Submit form tidak reload halaman.

## Deklarasi Penggunaan AI

Nama: M Vyo Fachmil Fachry Setiawan  
NIM: 25523238  

Dalam pengerjaan Worksheet P9 ini, saya menggunakan AI/GitHub Copilot sebagai alat bantu untuk memahami, membuat, dan memperbaiki kode. Hasil dari bantuan AI tetap saya periksa dan pahami kembali sebelum digunakan.

## Catatan pengembangan
- Menggunakan `type="module"` untuk `app.js` dan `dom.js`.
- `app.js` dimuat sebelum `dom.js`.
- Tidak menggunakan `innerHTML` untuk membuat kartu proyek.
- Event listener dipasang pada elemen induk filter agar tidak berulang.
