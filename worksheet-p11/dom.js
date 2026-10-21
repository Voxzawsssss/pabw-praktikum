import {
  profile,
  skills,
  projects,
  completedProjects,
  featuredProject,
  jumlahProyek,
  buatPerkenalan,
  formatKeahlian,
} from "./data.js";

export function saring(stateSaatIni) {
  const stateData = stateSaatIni ?? { kategoriAktif: "Semua" };
  const kategoriAktif = typeof stateData.kategoriAktif === "string" && stateData.kategoriAktif.trim() !== ""
    ? stateData.kategoriAktif
    : "Semua";

  if (kategoriAktif === "Semua") {
    return [...projects];
  }

  return projects.filter((proyek) => proyek.category === kategoriAktif);
}

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

export function renderProfil(stateSaatIni = null) {
  const profilSaatIni = (stateSaatIni && stateSaatIni.profil) || profile;
  const profileMeta = document.querySelector("#profile-meta");
  const profileIntro = document.querySelector("#profile-intro");
  const skillList = document.querySelector("#skill-list");
  const profileStatus = document.querySelector("#profile-status");
  const siteTitle = document.querySelector("#site-title");
  const footerText = document.querySelector("#footer-text");
  const namaInput = document.querySelector("#nama");
  const nimInput = document.querySelector("#nim");
  const tahunInput = document.querySelector("#tahun");

  if (siteTitle) {
    siteTitle.textContent = profilSaatIni.name;
  }

  if (profileMeta) {
    profileMeta.textContent = `${profilSaatIni.name} - NIM ${profilSaatIni.nim} • ${profilSaatIni.year}`;
  }

  if (profileIntro) {
    const introText = buatPerkenalan(profilSaatIni);
    const introParagraph = document.createElement("p");
    introParagraph.textContent = introText;

    const summaryParagraph = document.createElement("p");
    summaryParagraph.textContent = profile.summary;

    profileIntro.replaceChildren(introParagraph, summaryParagraph);
  }

  if (skillList) {
    const skillItems = document.createElement("ul");
    skillItems.className = "skill-items";

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = skill;
      skillItems.append(item);
    });

    const skillText = document.createElement("p");
    skillText.textContent = `Keahlian utama: ${formatKeahlian(skills)}`;

    skillList.replaceChildren(skillItems, skillText);
  }

  if (profileStatus) {
    const activeProjects = completedProjects.length;
    const featuredTitle = featuredProject?.title ?? "Tidak ada data";

    const jumlahP = document.createElement("p");
    jumlahP.textContent = `Jumlah proyek: ${jumlahProyek}`;

    const selesaiP = document.createElement("p");
    selesaiP.textContent = `Proyek selesai: ${activeProjects}`;

    const featuredP = document.createElement("p");
    featuredP.textContent = `Project utama: ${featuredTitle}`;

    profileStatus.replaceChildren(jumlahP, selesaiP, featuredP);
  }

  if (namaInput) {
    namaInput.value = profilSaatIni.name;
  }

  if (nimInput) {
    nimInput.value = profilSaatIni.nim;
  }

  if (tahunInput) {
    tahunInput.value = String(profilSaatIni.year);
  }

  if (footerText) {
    footerText.textContent = `${profilSaatIni.name} - NIM ${profilSaatIni.nim} • ${profilSaatIni.year}`;
  }
}

export function render(stateSaatIni) {
  const daftar = document.querySelector("#daftar");
  const filter = document.querySelector("#filter");
  const pesanKosong = document.querySelector("#pesan-kosong");

  if (!daftar) {
    return;
  }

  const stateData = stateSaatIni ?? { kategoriAktif: "Semua" };
  const proyekYangTampil = saring(stateData);

  daftar.textContent = "";

  if (!Array.isArray(proyekYangTampil) || proyekYangTampil.length === 0) {
    if (pesanKosong) {
      pesanKosong.hidden = false;
    }

    if (filter) {
      const tombolFilter = filter.querySelectorAll("button");
      tombolFilter.forEach((tombol) => {
        const kategori = tombol.dataset.kategori ?? "Semua";
        tombol.classList.toggle("aktif", kategori === (stateData.kategoriAktif ?? "Semua"));
      });
    }
    return;
  }

  if (pesanKosong) {
    pesanKosong.hidden = true;
  }

  proyekYangTampil
    .map((proyek) => buatKartu(proyek))
    .forEach((item) => daftar.append(item));

  if (filter) {
    const tombolFilter = filter.querySelectorAll("button");
    tombolFilter.forEach((tombol) => {
      const kategori = tombol.dataset.kategori ?? "Semua";
      tombol.classList.toggle("aktif", kategori === (stateData.kategoriAktif ?? "Semua"));
    });
  }
}
