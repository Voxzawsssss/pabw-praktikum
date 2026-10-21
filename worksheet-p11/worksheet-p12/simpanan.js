export const STORAGE_KEY = "pabw-p11"
export const SKEMA_VERSI = 2

// Alias pendukung
export const KUNCI = STORAGE_KEY
export const VERSI = SKEMA_VERSI

export const defaultProfile = {
  name: "M Vyo Fachmil Fachry Setiawan",
  nim: "25523238",
  year: 2026,
}

export function normalisasiProfil(profilData) {
  const data = profilData && typeof profilData === "object" ? profilData : {}
  const nama =
    typeof data.name === "string"
      ? data.name.trim()
      : typeof data.nama === "string"
        ? data.nama.trim()
        : defaultProfile.name
  const nim = typeof data.nim === "string" ? data.nim.trim() : defaultProfile.nim
  const tahun = Number(data.year ?? data.tahun)

  return {
    name: nama || defaultProfile.name,
    nim: /^\d{8}$/.test(nim) ? nim : defaultProfile.nim,
    year: Number.isFinite(tahun) && tahun >= 1000 && tahun <= 9999 ? tahun : defaultProfile.year,
  }
}

export function buatStateBawaan() {
  return {
    kategoriAktif: "Semua",
    profil: { ...defaultProfile },
  }
}

export function simpan(stateSaatIni) {
  try {
    const payload = {
      versi: SKEMA_VERSI,
      kategoriAktif: stateSaatIni?.kategoriAktif ?? "Semua",
      profil: normalisasiProfil(stateSaatIni?.profil ?? defaultProfile),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch (error) {
    console.warn("Gagal menyimpan pilihan pengguna.", error)
    return false
  }
}

export function muat() {
  try {
    const dataMentah = localStorage.getItem(STORAGE_KEY)

    if (dataMentah === null) {
      return buatStateBawaan()
    }

    const data = JSON.parse(dataMentah)

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Struktur simpanan tidak valid.")
    }

    if (data.versi !== SKEMA_VERSI) {
      throw new Error("Versi skema tidak sesuai.")
    }

    const kategoriAktif =
      typeof data.kategoriAktif === "string" && data.kategoriAktif.trim() !== ""
        ? data.kategoriAktif
        : "Semua"

    return {
      kategoriAktif,
      profil: normalisasiProfil(data.profil ?? defaultProfile),
    }
  } catch (error) {
    console.warn("Simpanan tidak valid. Mengembalikan pilihan bawaan.", error)

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (removeError) {
      console.warn("Gagal menghapus simpanan rusak.", removeError)
    }

    return buatStateBawaan()
  }
}

export function aturUlang() {
  try {
    const bawaan = {
      versi: SKEMA_VERSI,
      kategoriAktif: "Semua",
      profil: { ...defaultProfile },
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bawaan))
  } catch (error) {
    console.warn("Gagal mengatur ulang simpanan pada localStorage.", error)
  }
}
