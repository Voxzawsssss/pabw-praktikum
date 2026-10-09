export const profile = {
  name: "M Vyo Fachmil Fachry Setiawan",
  nim: "25523238",
  year: 2026,
  title: "Mahasiswa",
  focus: "pengembangan web dan desain antarmuka",
  summary:
    "Saya tertarik pada pembelajaran HTML, CSS, dan JavaScript modern untuk membuat tampilan web yang rapi, responsif, dan mudah dipahami.",
};

export const skills = ["HTML", "CSS", "JavaScript ES6+", "UI/UX", "Responsive Design"];

export const projects = [
  {
    title: "Laskar Pelangi",
    year: 2005,
    completed: true,
    category: "Buku favorit",
  },
  {
    title: "Bumi Manusia",
    year: 1980,
    completed: true,
    category: "Buku yang sedang dipelajari",
  },
  {
    title: "Pulang",
    year: 2015,
    completed: false,
    category: "Belum dibaca",
  },
  {
    title: "Sapiens",
    year: 2014,
    completed: true,
    category: "Buku referensi",
  },
];

export const jumlahProyek = projects.length;

export const projectCards = [...projects].map((project, index) => ({
  ...project,
  no: index + 1,
  statusText: project.completed === true ? "Selesai" : "Belum selesai",
}));

export const completedProjects = projects.filter((project) => project.completed === true);
export const featuredProject = projects.find((project) => project.title === "Bumi Manusia") ?? projects[0];

function createIntro(profileData) {
  const safeProfile = profileData ?? {};
  const name = safeProfile.name ?? "Mahasiswa";
  const title = safeProfile.title ?? "peserta didik";
  const focus = safeProfile.focus ?? "pengembangan web";

  return `${name} adalah ${title} yang fokus pada ${focus}.`;
}

function formatSkills(skillItems) {
  const validSkills = (Array.isArray(skillItems) ? skillItems : [])
    .map((skill) => String(skill).trim())
    .filter((skill) => skill !== "");

  return validSkills.join(" • ");
}

const introText = createIntro(profile);
const skillsText = formatSkills(skills);

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
  siteTitle.textContent = profile.name;
}

if (profileMeta) {
  profileMeta.textContent = `${profile.name} - NIM ${profile.nim} • ${profile.year}`;
}

if (profileIntro) {
  const introParagraph = document.createElement("p");
  introParagraph.textContent = introText;

  const summaryParagraph = document.createElement("p");
  summaryParagraph.textContent = profile.summary;

  profileIntro.append(introParagraph, summaryParagraph);
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
  skillText.textContent = `Keahlian utama: ${skillsText}`;

  skillList.append(skillItems, skillText);
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

  profileStatus.append(jumlahP, selesaiP, featuredP);
}

if (namaInput) {
  namaInput.value = profile.name;
}

if (nimInput) {
  nimInput.value = profile.nim;
}

if (tahunInput) {
  tahunInput.value = String(profile.year);
}

if (footerText) {
  footerText.textContent = `${profile.name} - NIM ${profile.nim} • ${profile.year}`;
}

console.table(projects);
console.table(completedProjects);
console.table(featuredProject ?? {});
