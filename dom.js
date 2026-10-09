import { projects } from "./app.js";

const daftar = document.querySelector("#daftar");
const filter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("#profil-form");

function buatKartu(proyek) {
  const item = document.createElement("li");
  item.className = "project-item";

  const judul = document.createElement("h3");
  judul.textContent = proyek.title;

  const meta = document.createElement("p");
  meta.textContent = `${proyek.category} • ${proyek.year}`;

  const status = document.createElement("p");
  status.textContent = `Status: ${proyek.completed ? "Selesai" : "Belum selesai"}`;

  item.append(judul, meta, status);
  return item;
}

function render(daftarProyek) {
  if (!daftar) {
    return;
  }

  daftar.textContent = "";

  if (!Array.isArray(daftarProyek) || daftarProyek.length === 0) {
    if (pesanKosong) {
      pesanKosong.hidden = false;
    }
    return;
  }

  if (pesanKosong) {
    pesanKosong.hidden = true;
  }

  daftarProyek
    .map((proyek) => buatKartu(proyek))
    .forEach((item) => daftar.append(item));
}

if (filter) {
  const tombolFilter = filter.querySelectorAll("button");

  filter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");

    if (!tombol) {
      return;
    }

    const kategori = tombol.dataset.kategori ?? "Semua";

    tombolFilter.forEach((btn) => {
      btn.classList.toggle("aktif", btn === tombol);
    });

    const proyekYangTampil =
      kategori === "Semua"
        ? projects
        : projects.filter((proyek) => proyek.category === kategori);

    render(proyekYangTampil);
  });
}

render(projects);

if (form) {
  const tombolSubmit = form.querySelector('button[type="submit"]');
  const inputField = form.querySelectorAll("input");
  const fieldList = Array.from(inputField);

  const tampilkanError = (field, message) => {
    const errorText = field.parentElement?.querySelector(".error-message");

    if (errorText) {
      errorText.textContent = message;
    }

    field.setAttribute("aria-invalid", "true");
  };

  const hapusError = (field) => {
    const errorText = field.parentElement?.querySelector(".error-message");

    if (errorText) {
      errorText.textContent = "";
    }

    field.removeAttribute("aria-invalid");
  };

  const validasiKolom = (field, tampilPesan = false) => {
    const value = field.value.trim();

    if (value === "") {
      if (tampilPesan) {
        tampilkanError(field, "Kolom ini wajib diisi. Masukkan nilai yang valid.");
      }
      return false;
    }

    const yearValue = Number(field.value);
    if (field.type === "number" && (Number.isNaN(yearValue) || yearValue < 1000 || yearValue > 9999)) {
      if (tampilPesan) {
        tampilkanError(field, "Tahun harus berupa angka antara 1000 dan 9999.");
      }
      return false;
    }

    hapusError(field);
    return true;
  };

  const updateSubmitState = (tampilPesan = false) => {
    const semuaValid = fieldList.every((field) => validasiKolom(field, tampilPesan));

    if (tombolSubmit) {
      tombolSubmit.disabled = !semuaValid;
    }

    return semuaValid;
  };

  fieldList.forEach((field) => {
    field.addEventListener("input", () => {
      validasiKolom(field, true);
      updateSubmitState(false);
    });

    field.addEventListener("blur", () => {
      validasiKolom(field, true);
      updateSubmitState(false);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const semuaValid = updateSubmitState(true);

    if (!semuaValid) {
      const kolomPertamaSalah = fieldList.find((field) => !validasiKolom(field, true));

      if (kolomPertamaSalah) {
        kolomPertamaSalah.focus();
      }
      return;
    }

    window.alert("Data berhasil disimpan.");
  });

  updateSubmitState(false);
}
