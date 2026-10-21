<script setup>
import { computed, onMounted, watch } from 'vue'
import { state } from './state.js'
import { aturUlang, defaultProfile, muat, simpan } from './simpanan.js'
import {
  buatPerkenalan,
  completedProjects,
  featuredProject,
  formatKeahlian,
  jumlahProyek,
  profile,
  skills,
} from './data.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const identitas = computed(() => ({
  nama: state.profil.name,
  name: state.profil.name,
  peran: `${profile.title} yang fokus pada ${profile.focus}`,
  title: profile.title,
  focus: profile.focus,
  nim: state.profil.nim,
  tahun: state.profil.year,
  year: state.profil.year,
}))

const introText = computed(() => buatPerkenalan(identitas.value))
const skillsText = formatKeahlian(skills)
const activeProjects = completedProjects.length
const featuredTitle = featuredProject?.title ?? 'Tidak ada data'

onMounted(() => {
  const isi = muat()
  if (isi) {
    if (isi.kategoriAktif) {
      state.kategoriAktif = isi.kategoriAktif
    }
    if (isi.profil) {
      state.profil = isi.profil
    }
  }
})

watch(
  () => [state.kategoriAktif, state.profil],
  () => {
    simpan(state)
  },
  { deep: true }
)

function aturUlangPilihan() {
  aturUlang()
  state.kategoriAktif = 'Semua'
  state.profil = { ...defaultProfile }
  simpan(state)
}
</script>

<template>
  <KepalaProfil :profil="identitas" />

  <main class="container site-main content">
    <section id="profil-saya" class="panel" aria-labelledby="judul-profil">
      <h2 id="judul-profil">Profil Saya</h2>
      <div id="profile-intro" class="profile-intro">
        <p>{{ introText }}</p>
        <p>{{ profile.summary }}</p>
      </div>
    </section>

    <section id="keahlian" class="panel" aria-labelledby="judul-keahlian">
      <h2 id="judul-keahlian">Keahlian</h2>
      <div id="skill-list" class="skill-list" aria-live="polite">
        <ul class="skill-items">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
        <p>Keahlian utama: {{ skillsText }}</p>
      </div>
    </section>

    <section id="proyek" class="panel" aria-labelledby="judul-proyek">
      <h2 id="judul-proyek">Proyek</h2>
      <TombolFilter @atur-ulang="aturUlangPilihan" />
      <DaftarProyek />
    </section>

    <aside id="tambah-buku" class="panel sidebar" aria-labelledby="judul-tambah">
      <h2 id="judul-tambah">Status Saya</h2>
      <div id="profile-status" class="status-box">
        <p>Jumlah proyek: {{ jumlahProyek }}</p>
        <p>Proyek selesai: {{ activeProjects }}</p>
        <p>Project utama: {{ featuredTitle }}</p>
      </div>

      <FormKontak />
    </aside>
  </main>

  <footer class="site-footer">
    <div class="container" id="footer-text">
      {{ identitas.nama }} - NIM {{ identitas.nim }} • {{ identitas.tahun }}
    </div>
  </footer>
</template>
