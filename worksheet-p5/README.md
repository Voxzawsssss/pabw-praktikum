Worksheet P5 — Layout Modern: Flexbox dan Grid

m vyo fachmil fachry setiawan nim:25523238 `worksheet-p5`:

- Kerangka 3 baris: gunakan grid pada `body.page` (header / main / footer).
- Isi 2 kolom: `.site-main` menggunakan grid dua kolom `16rem 1fr` dengan `gap: var(--space-6)`.
- Bagian yang memakai Flexbox:
  - `.header-inner` / `.main-nav ul` (navbar): `display: flex; gap: var(--space-4); align-items: center;`
  - `.feature-cover` dan tombol/form menggunakan flex / grid sesuai kebutuhan.
- Bagian yang memakai Grid:
  - `body.page` (page layout), `.site-main` (isi dua kolom), `.catalog-layout` (konten tabel + cover), `.galeri` (grid adaptif kartu).
- Gallery/cards:
  - `.galeri { grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }` (tanpa media query)
  - `.galeri .kartu { display: grid; align-content: start; min-height: 14rem; }`
- Grid-area / span:
  - `body.page` mendefinisikan grid-area untuk header/main/footer.
  - `#tambah-buku` dan `#koleksi-buku` diberi `grid-column` untuk menempatkan mereka dalam dua kolom.

Catatan verifikasi yang perlu dilakukan:
- Pastikan `worksheet-p4` tidak berubah.
- Periksa bahwa tidak ada penggunaan `float` atau `!important`.
- Periksa `.galeri` menggunakan `auto-fit + minmax` tanpa media query.
- Cek tampilan pada lebar 360px dan 1280px.

File yang dibuat di `worksheet-p5`:
- profil.html
- tokens.css
- base.css
- layout.css
- komponen.css
- tema.css
- README.md

Jika Anda ingin, saya bisa:
- Menjalankan pemeriksaan cepat (grep) untuk `float` dan `!important` di `worksheet-p5`.
- Membuka `profil.html` di browser (instruksi) atau membuat screenshot-lokasi untuk 360px/1280px.

