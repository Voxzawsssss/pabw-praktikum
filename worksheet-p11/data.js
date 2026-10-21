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

export function buatPerkenalan(profileData) {
  const safeProfile = profileData ?? {};
  const name = safeProfile.name ?? "Mahasiswa";
  const title = safeProfile.title ?? "peserta didik";
  const focus = safeProfile.focus ?? "pengembangan web";

  return `${name} adalah ${title} yang fokus pada ${focus}.`;
}

export function formatKeahlian(skillItems) {
  const validSkills = (Array.isArray(skillItems) ? skillItems : [])
    .map((skill) => String(skill).trim())
    .filter((skill) => skill !== "");

  return validSkills.join(" • ");
}

export const introText = buatPerkenalan(profile);
export const skillsText = formatKeahlian(skills);
export const daftarKategori = ["Semua", ...new Set(projects.map((project) => project.category))];
