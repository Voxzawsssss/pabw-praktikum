import { pilihKategori, aturUlang, simpanProfil } from "./state.js";

function tampilkanError(field, message) {
  const errorText = field.parentElement?.querySelector(".error-message");

  if (errorText) {
    errorText.textContent = message;
  }

  field.setAttribute("aria-invalid", "true");
}

function hapusError(field) {
  const errorText = field.parentElement?.querySelector(".error-message");

  if (errorText) {
    errorText.textContent = "";
  }

  field.removeAttribute("aria-invalid");
}

function validasiKolom(field, tampilPesan = false) {
  const value = field.value.trim();

  if (value === "") {
    if (tampilPesan) {
      tampilkanError(field, "Kolom ini wajib diisi. Masukkan nilai yang valid.");
    }
    return false;
  }

  if (field.name === "nim" && !/^\d{8}$/.test(value)) {
    if (tampilPesan) {
      tampilkanError(field, "NIM harus terdiri dari tepat 8 digit angka.");
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
}

export function pasangPendengar() {
  const filter = document.querySelector("#filter");

  if (filter && filter.dataset.listener !== "true") {
    filter.dataset.listener = "true";

    filter.addEventListener("click", (event) => {
      const tombol = event.target.closest("button");

      if (!tombol) {
        return;
      }

      if (tombol.id === "reset-pilihan") {
        aturUlang();
        return;
      }

      const kategori = tombol.dataset.kategori ?? "Semua";
      pilihKategori(kategori);
    });
  }

  const form = document.querySelector("#profil-form");

  if (form && form.dataset.listener !== "true") {
    form.dataset.listener = "true";

    const tombolSubmit = form.querySelector('button[type="submit"]');
    const fieldList = Array.from(form.querySelectorAll("input"));

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

      const formData = {
        name: form.querySelector("#nama")?.value.trim() ?? "",
        nim: form.querySelector("#nim")?.value.trim() ?? "",
        year: Number(form.querySelector("#tahun")?.value ?? 0),
      };

      const tersimpan = simpanProfil(formData);

      if (!tersimpan) {
        const field = form.querySelector("#nim");
        if (field) {
          tampilkanError(field, "Penyimpanan data gagal. Silakan coba lagi.");
        }
        return;
      }

      window.alert("Data berhasil disimpan.");
    });

    updateSubmitState(false);
  }
}
