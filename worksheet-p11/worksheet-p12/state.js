import { reactive } from 'vue'
import { daftarProyek } from './data.js'
import { defaultProfile, normalisasiProfil } from './simpanan.js'

export const state = reactive({
  daftarProyek: daftarProyek,
  kategoriAktif: 'Semua',
  profil: { ...defaultProfile },
})

export function pilihKategori(nilai) {
  state.kategoriAktif = typeof nilai === 'string' && nilai.trim() !== '' ? nilai : 'Semua'
}

export function simpanProfil(profilData) {
  state.profil = normalisasiProfil(profilData ?? defaultProfile)
}
