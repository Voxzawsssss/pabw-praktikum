# Worksheet P10 - JavaScript Asinkron dan Fetch

Dokumen ini berisi ringkasan tugas Pertemuan 10 dan cara menjalankan halaman proyek.

## Tujuan
- Mengambil data dari API publik HTTPS menggunakan JavaScript asinkron.
- Menggunakan `fetch`, `Promise`, `async/await`, `response.ok`, `response.status`, `response.json()`, `JSON.parse()`, `JSON.stringify()`, dan `try/catch`.
- Memisahkan logika data ke `js/api.js` dan tampilan ke `js/app.js`.
- Menampilkan empat keadaan antarmuka: memuat, berhasil, gagal, dan kosong.
- Menjaga fitur P9 yang masih relevan agar tetap berfungsi.

## Struktur folder

```text
worksheet-p10/
├── profil.html
├── README.md
├── base.css
├── layout.css
├── komponen.css
├── tema.css
├── tokens.css
├── responsif.css
└── js/
    ├── api.js
    ├── app.js
    └── dom.js
```

## API yang digunakan
- API: JSONPlaceholder
- Alamat: `https://jsonplaceholder.typicode.com/posts`
- Tidak memerlukan API key atau token.
- Data diambil melalui fungsi `ambilNotisia()` di `js/api.js`.
- Data hasil API dirender ke wadah `#daftar` yang sudah ada di halaman P9.

## Fungsi export dari `js/api.js`

```js
export async function ambilNotisia() {
  try {
    const respons = await fetch(ALAMAT);

    if (!respons.ok) {
      throw new Error("status " + respons.status);
    }

    const data = await respons.json();
    return data;
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat;
  }
}
```

## Fetch, Promise, async/await, dan respon API
- `fetch()` hanya dipakai di `js/api.js`.
- `async/await` dipakai untuk menunggu hasil request API.
- `response.ok` dipakai untuk mengecek apakah request berhasil.
- `response.status` digunakan untuk melihat status HTTP seperti 404 atau 500.
- `response.json()` dipakai untuk membaca JSON dari response API.
- `JSON.parse()` dipakai hanya untuk teks JSON yang memang string.
- `JSON.stringify()` dipakai untuk mengubah object JavaScript menjadi teks JSON jika diperlukan.
- `try/catch` digunakan untuk menangani error jaringan dan error HTTP.

## Pemisahan `api.js` dan `app.js`
- `js/api.js` bertanggung jawab atas fetch, `response.ok`, `response.json()`, dan error handling.
- `js/app.js` hanya mengimpor fungsi dari `api.js`, lalu menampilkan hasil ke wadah `#daftar`.
- `app.js` tidak memanggil `fetch()` langsung.

## Empat keadaan antarmuka
1. Memuat: menampilkan `Sedang memuat data...` sebelum response selesai.
2. Berhasil: menampilkan data API ke `#daftar`.
3. Gagal: menampilkan `Gagal memuat data: ...` di halaman.
4. Kosong: menampilkan `Belum ada notisia.` saat data array kosong.

## Cara menjalankan
1. Buka terminal di folder workspace.
2. Jalankan:

```bash
python -m http.server 8000
```

3. Buka halaman berikut di browser:

```text
http://localhost:8000/worksheet-p10/profil.html
```

## Cara uji
- Berhasil: data API tampil di `#daftar`.
- Gagal: ubah alamat API sementara menjadi salah, lalu lihat pesan error di halaman.
- Kosong: render data `[]` dan pastikan muncul pesan kosong.
- Memuat: gunakan throttling jaringan, lalu lihat `Sedang memuat data...` sebelum response selesai.

## Deklarasi AI

Nama: M Vyo Fachmil Fachry Setiawan  
NIM: 25523238

GitHub Copilot/AI digunakan sebagai bantuan pengembangan dan review kode. Saya tetap memeriksa, menjalankan, memahami, dan menyesuaikan kode secara mandiri sebelum menggunakannya dalam proyek ini.

## Catatan pengembangan
- Menggunakan `type="module"` untuk `app.js` dan `dom.js`.
- Layout dan struktur P9 tetap dipertahankan.
- Data API dirender ke `#daftar` yang sudah ada.
- Tidak menggunakan `innerHTML` untuk data yang berasal dari jaringan.
- `fetch()` hanya ada di `js/api.js`.
