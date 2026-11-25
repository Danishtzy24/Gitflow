type Repository = { owner: string; name: string; url: string };
type GitAction = {
  cat: string;
  title: string;
  sub: string;
  icon: string;
  repo?: boolean;
  fields: string[];
  desc: string;
  steps: [string, string][];
  tip: string;
  note: string;
  danger?: boolean;
  warning?: string;
};
type RepositoryStatus =
  | "empty"
  | "invalid"
  | "checking"
  | "public"
  | "private"
  | "notfound"
  | "unauthorized"
  | "restricted"
  | "unavailable";
type Shell = "bash" | "cmd";
const paths: Record<string, string> = {
  github:
    '<path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-1.89c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.04-1.15 3.04-1.15.62 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.61 5.23-5.1 5.5.4.35.76 1.02.76 2.06v2.87c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>',
  shield:
    '<path d="M12 21s7-4 7-10V5l-7-3-7 3v6c0 6 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>',
  external: '<path d="M7 17 17 7M8 7h9v9"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  repo: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 18a2.5 2.5 0 0 1 2.5-2.5H20M9 7h6"/>',
  link: '<path d="M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.7 1.7M14 11a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.7-1.7"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l2 2M18 5l2 2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>',
  terminal:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M12 15h5"/>',
  alert: '<path d="M12 3 2.5 20h19L12 3ZM12 9v5M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  copy: '<rect x="8" y="8" width="11" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 18a2.5 2.5 0 0 1 2.5-2.5H20"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  branch:
    '<circle cx="6" cy="4" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="20" r="2"/><path d="M6 6v12M18 8c0 5-6 5-12 5"/>',
  recovery: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/>',
  advanced:
    '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="4"/>',
  up: '<path d="M12 21V4m-5 5 5-5 5 5"/>',
  down: '<path d="M12 3v17m-5-5 5 5 5-5"/>',
  refresh:
    '<path d="M20 7v5h-5M4 17v-5h5M5.5 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.5-2"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  merge:
    '<circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="12" cy="20" r="2"/><path d="M6 6v2c0 5 6 4 6 10M18 6v2c0 5-6 4-6 10"/>',
  save: '<path d="M4 4h14l2 2v14H4V4ZM8 4v6h8V4M8 20v-6h8v6"/>',
  tag: '<path d="M3 12V4h8l9 9-7 7-10-8ZM7.5 7.5h.01"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1L14.5 3h-4l-.4 3a7 7 0 0 0-1.7 1L6 6 4 9.5 6 11a7 7 0 0 0 0 2l-2 1.5L6 18l2.4-1a7 7 0 0 0 1.7 1l.4 3h4l.4-3a7 7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5a7 7 0 0 0 0-1Z"/>',
};
const icon = (n: string, size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[n] || paths.code}</svg>`;
document
  .querySelectorAll<HTMLElement>("[data-icon]")
  .forEach(
    (el) =>
      (el.innerHTML = icon(
        el.dataset.icon ?? "code",
        el.dataset.icon === "github" ? 29 : 15,
      )),
  );
const categories: Record<string, { label: string; icon: string }> = {
  repository: { label: "Repository", icon: "repo" },
  branch: { label: "Branch", icon: "branch" },
  recovery: { label: "Pemulihan", icon: "recovery" },
  advanced: { label: "Git lanjutan", icon: "advanced" },
};
const actions: Record<string, GitAction> = {
  launch: {
    cat: "repository",
    title: "Upload pertama",
    sub: "Kirim project baru",
    icon: "up",
    repo: true,
    fields: ["branch", "message"],
    desc: "Upload folder project ke repository kosong.",
    steps: [
      ["Siapkan repository", "Buat repository kosong tanpa README."],
      ["Buka terminal", "Masuk ke folder project."],
      ["Jalankan perintah", "Salin semua baris sekaligus."],
    ],
    tip: "Perintah menggunakan URL secara langsung dan tidak mengatur remote origin.",
    note: "Jalankan di folder project. Git perlu identitas pengguna untuk commit.",
  },
  update: {
    cat: "repository",
    title: "Update project",
    sub: "Commit dan push",
    icon: "refresh",
    repo: true,
    fields: ["branch", "message"],
    desc: "Simpan dan kirim perubahan lokal.",
    steps: [
      ["Periksa file", "Gunakan cek status untuk melihat perubahan."],
      ["Atur branch", "Pastikan branch tujuan benar."],
      ["Jalankan perintah", "Commit dikirim langsung ke URL repository."],
    ],
    tip: "Jika push ditolak, ambil perubahan terbaru terlebih dahulu. Jangan langsung gunakan force push.",
    note: "Jalankan di folder repository yang sesuai.",
  },
  clone: {
    cat: "repository",
    title: "Clone repository",
    sub: "Unduh project",
    icon: "down",
    repo: true,
    fields: [],
    desc: "Unduh repository ke folder baru.",
    steps: [
      ["Buka terminal", "Pilih folder tempat project disimpan."],
      ["Jalankan perintah", "Git membuat folder repository."],
      ["Mulai bekerja", "Perintah kedua masuk ke folder tersebut."],
    ],
    tip: "Repository private memerlukan autentikasi Git di terminal.",
    note: "Jalankan di folder tempat project akan disimpan.",
  },
  pull: {
    cat: "repository",
    title: "Pull perubahan",
    sub: "Ambil versi terbaru",
    icon: "down",
    repo: true,
    fields: ["branch"],
    desc: "Ambil dan gabungkan perubahan dari GitHub.",
    steps: [
      ["Buka repository", "Masuk ke folder project lokal."],
      ["Simpan pekerjaan", "Commit atau simpan perubahan lokal."],
      ["Jalankan perintah", "Selesaikan konflik bila ada."],
    ],
    tip: "Perintah pull menggabungkan branch tujuan ke branch lokal yang sedang aktif.",
    note: "Periksa branch lokal sebelum menjalankan.",
  },
  status: {
    cat: "repository",
    title: "Cek status",
    sub: "Lihat kondisi lokal",
    icon: "list",
    fields: [],
    desc: "Lihat branch dan perubahan pada file lokal.",
    steps: [
      ["Buka terminal", "Masuk ke folder repository."],
      ["Jalankan perintah", "Git akan menampilkan status file."],
    ],
    tip: "Working tree clean berarti tidak ada perubahan yang perlu di-commit.",
    note: "Perintah ini tidak mengubah file.",
  },
  replace: {
    cat: "repository",
    title: "Ganti isi branch",
    sub: "Force push project baru",
    icon: "trash",
    repo: true,
    fields: ["branch", "message"],
    danger: true,
    desc: "Timpa branch GitHub dengan project lokal.",
    steps: [
      ["Cadangkan isi lama", "Isi dan riwayat branch dapat tertimpa."],
      [
        "Siapkan folder baru",
        "Pastikan isinya hanya file yang ingin diunggah.",
      ],
      ["Periksa tujuan", "Pastikan URL dan branch sudah benar."],
    ],
    tip: "Branch lain tidak berubah. Branch yang dilindungi dapat menolak force push.",
    note: "Jalankan dari folder project baru.",
    warning:
      "Force push menimpa isi dan riwayat branch tujuan. File lama yang tidak ada dalam project baru tidak akan muncul. Cadangkan dulu. File lokal dan branch lain tidak dihapus.",
  },
  branchList: {
    cat: "branch",
    title: "Daftar branch",
    sub: "Lihat branch lokal",
    icon: "list",
    fields: [],
    desc: "Tampilkan branch yang tersedia secara lokal.",
    steps: [
      ["Buka repository", "Masuk ke folder project."],
      ["Lihat daftar", "Tanda bintang menunjukkan branch aktif."],
    ],
    tip: "Untuk branch remote, jalankan git branch -a.",
    note: "Perintah ini tidak mengubah file.",
  },
  branchCreate: {
    cat: "branch",
    title: "Buat branch",
    sub: "Buat dan pindah",
    icon: "plus",
    fields: ["newBranch"],
    desc: "Buat branch baru dari branch aktif.",
    steps: [
      ["Periksa branch aktif", "Branch baru dibuat dari posisi saat ini."],
      ["Isi nama branch", "Gunakan nama singkat tanpa spasi."],
      ["Jalankan perintah", "Git akan langsung pindah ke branch baru."],
    ],
    tip: "Pastikan pekerjaan pada branch aktif sudah aman sebelum berpindah.",
    note: "Jalankan di dalam repository lokal.",
  },
  branchSwitch: {
    cat: "branch",
    title: "Pindah branch",
    sub: "Ganti branch aktif",
    icon: "branch",
    fields: ["newBranch"],
    desc: "Pindah ke branch lokal yang sudah ada.",
    steps: [
      ["Isi nama branch", "Gunakan nama branch lokal yang dituju."],
      [
        "Jalankan perintah",
        "Git akan menolak bila perubahan lokal menghalangi.",
      ],
    ],
    tip: "Simpan atau stash perubahan sebelum berpindah jika Git menolaknya.",
    note: "Perintah ini mengubah branch aktif.",
  },
  branchMerge: {
    cat: "branch",
    title: "Gabungkan branch",
    sub: "Merge ke branch tujuan",
    icon: "merge",
    fields: ["targetBranch", "sourceBranch"],
    desc: "Gabungkan branch sumber ke branch tujuan.",
    steps: [
      ["Isi kedua branch", "Tentukan branch sumber dan tujuan."],
      ["Jalankan perintah", "Git pindah ke tujuan lalu melakukan merge."],
      ["Periksa hasil", "Selesaikan konflik jika muncul."],
    ],
    tip: "Merge dapat membuat konflik. Tidak ada file yang dipilih secara otomatis untuk menyelesaikannya.",
    note: "Jalankan di repository dengan working tree yang aman.",
    warning:
      "Merge dapat mengubah file dan menimbulkan konflik. Pastikan branch sumber dan tujuan benar.",
  },
  branchDelete: {
    cat: "branch",
    title: "Hapus branch lokal",
    sub: "Hapus yang sudah digabung",
    icon: "trash",
    fields: ["newBranch"],
    danger: true,
    desc: "Hapus branch lokal yang sudah digabung.",
    steps: [
      ["Pindah branch", "Jangan berada di branch yang akan dihapus."],
      ["Isi nama branch", "Pastikan nama branch sudah benar."],
      ["Jalankan perintah", "Git menolak jika branch belum digabung."],
    ],
    tip: "Menggunakan -d, bukan -D, sehingga Git melindungi branch yang belum digabung.",
    note: "Hanya menghapus branch lokal, bukan branch GitHub.",
    warning:
      "Branch lokal yang dipilih akan dihapus. Pastikan branch tersebut sudah tidak dibutuhkan.",
  },
  branchDeleteRemote: {
    cat: "branch",
    title: "Hapus branch GitHub",
    sub: "Hapus branch remote",
    icon: "trash",
    repo: true,
    fields: ["newBranch"],
    danger: true,
    desc: "Hapus branch pada repository GitHub.",
    steps: [
      ["Cadangkan jika perlu", "Pastikan branch tidak lagi dibutuhkan."],
      ["Periksa tujuan", "Periksa URL dan nama branch."],
      ["Jalankan perintah", "Git menghapus branch remote jika diizinkan."],
    ],
    tip: "Branch default atau branch yang dilindungi dapat menolak penghapusan.",
    note: "Menghapus branch di GitHub, bukan branch lokal.",
    warning:
      "Branch tujuan di GitHub akan dihapus. Pastikan nama branch dan repository benar; cadangkan jika perlu.",
  },
  stashSave: {
    cat: "recovery",
    title: "Simpan sementara",
    sub: "Stash perubahan lokal",
    icon: "save",
    fields: ["stashMessage"],
    desc: "Simpan sementara perubahan yang belum di-commit.",
    steps: [
      ["Periksa perubahan", "Lihat file dengan cek status."],
      [
        "Jalankan perintah",
        "Perubahan tracked dan untracked disimpan dalam stash.",
      ],
    ],
    tip: "File yang diabaikan oleh .gitignore tidak ikut disimpan.",
    note: "Perubahan yang di-stash akan hilang sementara dari working tree.",
  },
  stashApply: {
    cat: "recovery",
    title: "Pulihkan stash",
    sub: "Terapkan stash terbaru",
    icon: "down",
    fields: [],
    desc: "Terapkan stash terbaru tanpa menghapus salinannya.",
    steps: [
      ["Periksa working tree", "Simpan perubahan yang sedang dikerjakan."],
      ["Jalankan perintah", "Git menerapkan stash terbaru."],
    ],
    tip: "Stash tetap tersimpan karena perintah ini memakai apply, bukan pop. Konflik bisa terjadi.",
    note: "Jalankan di repository tempat stash disimpan.",
  },
  stashList: {
    cat: "recovery",
    title: "Daftar stash",
    sub: "Lihat simpanan sementara",
    icon: "list",
    fields: [],
    desc: "Lihat daftar perubahan yang disimpan sementara.",
    steps: [
      ["Buka repository", "Masuk ke folder project."],
      ["Lihat daftar", "Stash terbaru biasanya berada di urutan pertama."],
    ],
    tip: "Perintah ini hanya menampilkan daftar, tidak mengubah file.",
    note: "Perintah ini tidak mengubah file.",
  },
  undoCommit: {
    cat: "recovery",
    title: "Batalkan commit",
    sub: "Pertahankan perubahan",
    icon: "recovery",
    fields: [],
    danger: true,
    desc: "Batalkan commit terakhir secara lokal.",
    steps: [
      ["Periksa riwayat", "Pastikan commit terakhir benar."],
      ["Jalankan perintah", "Commit dibatalkan, perubahan tetap staged."],
    ],
    tip: "Jangan gunakan pada commit yang sudah dibagikan tanpa memahami dampaknya.",
    note: "Hanya untuk commit terakhir di branch lokal.",
    warning:
      "Perintah mengubah riwayat lokal. Hindari jika commit sudah di-push atau dipakai orang lain.",
  },
  reset: {
    cat: "recovery",
    title: "Reset ke GitHub",
    sub: "Samakan file lokal",
    icon: "recovery",
    repo: true,
    fields: ["branch"],
    danger: true,
    desc: "Kembalikan file lokal yang dilacak ke versi GitHub.",
    steps: [
      [
        "Cadangkan pekerjaan",
        "Perubahan lokal yang belum disimpan akan hilang.",
      ],
      ["Periksa branch", "Pastikan URL dan branch tujuan benar."],
      ["Jalankan perintah", "Git mengambil lalu me-reset ke branch tersebut."],
    ],
    tip: "File untracked biasanya tidak dihapus, tetapi dapat tertimpa atau terhapus jika menghalangi file yang harus ditulis. Cadangkan seluruh folder.",
    note: "Jalankan di repository lokal yang ingin di-reset.",
    warning:
      "Reset --hard menghapus perubahan lokal pada file yang dilacak, memindahkan branch aktif, dan dapat menghapus file untracked yang menghalangi penulisan. Cadangkan seluruh folder lebih dulu.",
  },
  conflicts: {
    cat: "recovery",
    title: "Periksa konflik",
    sub: "Daftar file berkonflik",
    icon: "alert",
    fields: [],
    desc: "Tampilkan nama file dengan konflik yang belum diselesaikan.",
    steps: [
      ["Jalankan perintah", "Git menampilkan file yang masih berkonflik."],
      [
        "Selesaikan manual",
        "Buka file tersebut, perbaiki konflik, lalu gunakan git add.",
      ],
    ],
    tip: "Perintah ini tidak menyelesaikan konflik secara otomatis.",
    note: "Perintah ini tidak mengubah file.",
  },
  remote: {
    cat: "recovery",
    title: "Ubah remote origin",
    sub: "Perbaiki alamat remote",
    icon: "link",
    repo: true,
    fields: [],
    desc: "Ganti URL untuk remote bernama origin.",
    steps: [
      ["Periksa alamat", "Pastikan link repository benar."],
      ["Jalankan perintah", "URL origin diganti ke link tersebut."],
    ],
    tip: "Perintah akan gagal jika origin belum ada. Gunakan git remote add origin untuk membuatnya.",
    note: "Perintah ini mengubah konfigurasi origin di repository lokal.",
    warning:
      "Alamat remote origin akan diganti. Pastikan tujuan benar sebelum push berikutnya.",
  },
  log: {
    cat: "advanced",
    title: "Riwayat commit",
    sub: "20 commit terakhir",
    icon: "list",
    fields: [],
    desc: "Lihat riwayat commit secara ringkas.",
    steps: [
      ["Buka repository", "Masuk ke folder project."],
      ["Lihat riwayat", "Graph menampilkan hubungan antar commit."],
    ],
    tip: "Gunakan tombol q untuk keluar jika Git membuka pager.",
    note: "Perintah ini tidak mengubah file.",
  },
  diff: {
    cat: "advanced",
    title: "Lihat perubahan",
    sub: "Diff belum di-stage",
    icon: "code",
    fields: [],
    desc: "Lihat perubahan yang belum masuk staging.",
    steps: [
      ["Buka repository", "Masuk ke folder project."],
      ["Lihat perubahan", "Git menunjukkan baris yang ditambah dan dihapus."],
    ],
    tip: "Gunakan git diff --cached untuk melihat perubahan yang sudah di-stage.",
    note: "Perintah ini tidak mengubah file.",
  },
  diffStaged: {
    cat: "advanced",
    title: "Lihat staged",
    sub: "Diff yang siap di-commit",
    icon: "code",
    fields: [],
    desc: "Lihat perubahan yang sudah masuk staging.",
    steps: [
      ["Stage file", "Gunakan git add untuk memilih perubahan."],
      ["Lihat perubahan", "Git menunjukkan isi perubahan yang siap di-commit."],
    ],
    tip: "Perintah ini hanya menampilkan perbedaan, tidak membuat commit.",
    note: "Perintah ini tidak mengubah file.",
  },
  tag: {
    cat: "advanced",
    title: "Buat dan kirim tag",
    sub: "Tandai versi project",
    icon: "tag",
    repo: true,
    fields: ["tagName", "tagMessage"],
    desc: "Buat annotated tag lalu kirim ke GitHub.",
    steps: [
      ["Periksa commit aktif", "Tag akan menunjuk ke commit saat ini."],
      ["Isi nama dan pesan", "Gunakan nama versi yang belum dipakai."],
      ["Jalankan perintah", "Tag dibuat lokal lalu dikirim."],
    ],
    tip: "Jika push gagal, tag lokal tetap ada. Periksa dengan git tag sebelum mencoba lagi.",
    note: "Jalankan pada commit yang ingin ditandai.",
  },
  ignoreCheck: {
    cat: "advanced",
    title: "Periksa .gitignore",
    sub: "Cek apakah file diabaikan",
    icon: "search",
    fields: ["filePath"],
    desc: "Lihat aturan ignore yang berlaku untuk sebuah path.",
    steps: [
      ["Isi path", "Masukkan path relatif dari root repository."],
      ["Jalankan perintah", "Git menampilkan aturan yang cocok jika ada."],
    ],
    tip: "Jika tidak ada output, bisa jadi tidak ada aturan yang cocok atau file sudah dilacak.",
    note: "Perintah ini tidak mengubah file atau .gitignore.",
  },
  config: {
    cat: "advanced",
    title: "Identitas Git",
    sub: "Atur nama dan email",
    icon: "settings",
    fields: ["gitName", "gitEmail"],
    desc: "Atur identitas commit untuk repository ini.",
    steps: [
      ["Isi identitas", "Masukkan nama dan email untuk commit."],
      ["Jalankan perintah", "Pengaturan hanya berlaku di repository ini."],
    ],
    tip: "Untuk privasi email, kamu dapat menggunakan alamat no-reply GitHub.",
    note: "Mengubah konfigurasi lokal, bukan global.",
  },
};
const fieldsDef: Record<
  string,
  { label: string; placeholder: string; value: string }
> = {
  filePath: {
    label: "Path file atau folder",
    placeholder: "contoh: node_modules/paket",
    value: "",
  },
  branch: { label: "Branch tujuan", placeholder: "main", value: "" },
  message: {
    label: "Pesan commit",
    placeholder: "Otomatis jika kosong",
    value: "",
  },
  newBranch: {
    label: "Nama branch",
    placeholder: "contoh: fitur/login",
    value: "",
  },
  sourceBranch: {
    label: "Branch sumber",
    placeholder: "contoh: fitur/login",
    value: "",
  },
  targetBranch: {
    label: "Branch tujuan",
    placeholder: "contoh: main",
    value: "",
  },
  stashMessage: {
    label: "Pesan stash",
    placeholder: "Pekerjaan sementara",
    value: "",
  },
  tagName: { label: "Nama tag", placeholder: "contoh: v1.0.0", value: "" },
  tagMessage: {
    label: "Pesan tag",
    placeholder: "contoh: Rilis versi 1",
    value: "",
  },
  gitName: { label: "Nama Git", placeholder: "Nama kamu", value: "" },
  gitEmail: { label: "Email Git", placeholder: "email@example.com", value: "" },
};
function $(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing element: ${id}`);
  return element;
}
function input(id: string): HTMLInputElement {
  return $(id) as HTMLInputElement;
}
let current = "launch";
let category = "repository";
let shell: Shell = "bash";
let repo: Repository | null = null;
let repoCheck: RepositoryStatus = "empty";
let defaultBranch = "main";
let commands = "";
let checkTimer: ReturnType<typeof setTimeout> | undefined;
let controller: AbortController | null = null;
let requestId = 0;
const values: Record<string, string> = {};
Object.keys(fieldsDef).forEach((k) => (values[k] = ""));
function parseRepo(raw: string): Repository | null {
  let input = raw.trim();
  if (!input) return null;
  let path,
    isSSH = false;
  if (/^git@github\.com:/i.test(input)) {
    isSSH = true;
    path = input.slice(input.indexOf(":") + 1);
  } else {
    if (/^github\.com\//i.test(input)) input = "https://" + input;
    let u;
    try {
      u = new URL(input);
    } catch (e) {
      return null;
    }
    if (
      u.hostname.toLowerCase() !== "github.com" ||
      !["https:", "http:", "ssh:"].includes(u.protocol) ||
      u.port ||
      u.search ||
      u.hash ||
      (u.username && !(u.protocol === "ssh:" && u.username === "git")) ||
      u.password
    )
      return null;
    isSSH = u.protocol === "ssh:";
    path = u.pathname.replace(/^\/+|\/+$/g, "");
  }
  const parts = path.split("/");
  if (parts.length !== 2) return null;
  const owner = parts[0],
    name = parts[1].replace(/\.git$/i, "");
  if (
    !/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/i.test(owner) ||
    owner.includes("--") ||
    !/^[a-z0-9_.-]+$/i.test(name) ||
    name === "." ||
    name === ".." ||
    name.startsWith("-") ||
    name.toLowerCase().endsWith(".git")
  )
    return null;
  return {
    owner,
    name,
    url: isSSH
      ? `git@github.com:${owner}/${name}.git`
      : `https://github.com/${owner}/${name}.git`,
  };
}
function validRef(b: string): boolean {
  return (
    /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(b) &&
    !b.includes("..") &&
    !b.includes("//") &&
    !b.endsWith("/") &&
    !b.endsWith(".") &&
    !b.split("/").some((x) => x.startsWith(".") || x.endsWith(".lock"))
  );
}
function validText(t: string): boolean {
  return !!t && !/["`$\\!%\r\n\x00-\x1f\x7f]/.test(t);
}
function drawCategories() {
  for (const target of ["categories", "mobile-categories"]) {
    $(target).innerHTML = Object.entries(categories)
      .map(
        ([key, c]) =>
          `<button class="category ${category === key ? "active" : ""}" data-category="${key}" aria-pressed="${category === key}">${icon(c.icon, 15)}<span>${c.label}</span><span class="count">${Object.values(actions).filter((a) => a.cat === key).length}</span></button>`,
      )
      .join("");
    $(target)
      .querySelectorAll("button")
      .forEach(
        (b) =>
          (b.onclick = (event) => {
            category = b.dataset.category ?? "repository";
            input("search").value = "";
            const first =
              Object.entries(actions).find(
                ([k, v]) => v.cat === category,
              )?.[0] ?? "launch";
            current = first;
            drawCategories();
            drawActions();
            drawFields();
            render(true);
            if (event.detail === 0)
              $(target)
                .querySelector<HTMLButtonElement>(
                  `.category[data-category="${category}"]`,
                )
                ?.focus();
          }),
      );
  }
}
function drawActions() {
  const q = input("search").value.trim().toLowerCase();
  const list = Object.entries(actions).filter(([k, v]) =>
    q
      ? (v.title + " " + v.sub + " " + categories[v.cat].label)
          .toLowerCase()
          .includes(q)
      : v.cat === category,
  );
  $("action-heading").textContent = q
    ? "Hasil pencarian"
    : categories[category].label;
  $("actions").innerHTML = list.length
    ? list
        .map(
          ([k, v]) =>
            `<button class="action ${v.danger ? "danger" : ""} ${current === k ? "selected" : ""}" data-action="${k}" aria-pressed="${current === k}"><span class="action-icon">${icon(v.icon, 16)}</span><span class="action-text"><b>${v.title}</b><small>${v.sub}</small></span></button>`,
        )
        .join("")
    : '<div class="no-results">Tidak ada perintah yang cocok.</div>';
  $("actions")
    .querySelectorAll("button")
    .forEach(
      (b) =>
        (b.onclick = (event) => {
          current = b.dataset.action ?? "launch";
          category = actions[current].cat;
          drawCategories();
          drawActions();
          drawFields();
          render(true);
          if (event.detail === 0)
            $("actions")
              .querySelector<HTMLButtonElement>(
                `.action[data-action="${current}"]`,
              )
              ?.focus();
        }),
    );
}
function drawFields() {
  const fs = actions[current].fields;
  $("form-area").style.display = fs.length ? "" : "none";
  $("fields").innerHTML = "";
  for (const k of fs) {
    const def = fieldsDef[k],
      div = document.createElement("div");
    div.className = "field";
    const label = document.createElement("label");
    label.className = "field-label";
    label.htmlFor = "field-" + k;
    label.textContent =
      def.label + (k === "branch" ? " (otomatis jika kosong)" : "");
    const input = document.createElement("input");
    input.className = "input";
    input.id = "field-" + k;
    input.placeholder = k === "branch" ? defaultBranch : def.placeholder;
    input.value = values[k];
    input.autocomplete = "off";
    input.spellcheck = false;
    input.addEventListener("input", () => {
      values[k] = input.value;
      render();
    });
    div.append(label, input);
    $("fields").appendChild(div);
  }
}
function statusView() {
  let msg = "",
    ic = "info",
    cls = "";
  switch (repoCheck) {
    case "empty":
      msg =
        "Tempel link repository GitHub, atau gunakan perintah lokal tanpa link.";
      break;
    case "invalid":
      msg =
        "Link tidak valid. Gunakan link repository GitHub, bukan link file.";
      ic = "alert";
      cls = "error";
      break;
    case "checking":
      msg = "Memeriksa repository di GitHub...";
      cls = "pending";
      break;
    case "public":
      msg = "Repository publik ditemukan.";
      ic = "shield";
      cls = "ok";
      break;
    case "private":
      msg = "Repository private ditemukan. Token memiliki akses baca.";
      ic = "shield";
      cls = "ok";
      break;
    case "notfound":
      msg =
        "Tidak ditemukan atau private. Periksa link atau akses dengan token.";
      ic = "alert";
      cls = "error";
      break;
    case "unauthorized":
      msg = "Token ditolak atau tidak valid. Periksa token dan aksesnya.";
      ic = "alert";
      cls = "error";
      break;
    case "restricted":
      msg =
        "Akses ditolak atau dibatasi. Periksa izin token dan batas GitHub API.";
      ic = "alert";
      cls = "error";
      break;
    case "unavailable":
      msg = "Status tidak dapat diperiksa. Cek koneksi atau batas GitHub API.";
      ic = "alert";
      cls = "pending";
      break;
  }
  $("repo-status").className = "status " + cls;
  $("repo-status").innerHTML = icon(ic, 14) + "<span></span>";
  $("repo-status").querySelector("span")!.textContent = msg;
  const show =
    !!actions[current].repo &&
    [
      "invalid",
      "notfound",
      "unauthorized",
      "restricted",
      "unavailable",
    ].includes(repoCheck);
  $("terminal-alert").classList.toggle("show", show);
  $("terminal-alert-text").textContent =
    msg +
    (repoCheck === "notfound"
      ? " GitHub tidak membedakan keduanya tanpa akses."
      : "");
}
function cancelCheck() {
  clearTimeout(checkTimer);
  requestId++;
  if (controller) controller.abort();
  controller = null;
}
function onRepo() {
  cancelCheck();
  defaultBranch = "main";
  const raw = input("repo-url").value;
  repo = parseRepo(raw);
  repoCheck = !raw.trim() ? "empty" : repo ? "checking" : "invalid";
  statusView();
  render();
  if (repo) {
    const id = requestId;
    checkTimer = setTimeout(() => checkRepo("", id), 650);
  }
}
async function checkRepo(token: string, id: number) {
  if (!repo) return;
  const r = repo;
  repoCheck = "checking";
  statusView();
  controller = new AbortController();
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (token) headers.Authorization = "Bearer " + token;
    const res = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(r.owner)}/${encodeURIComponent(r.name)}`,
      { signal: controller.signal, headers, redirect: "error" },
    );
    if (id !== requestId) return;
    if (res.ok) {
      const json = await res.json();
      if (id !== requestId) return;
      repoCheck = json.private ? "private" : "public";
      if (
        typeof json.default_branch === "string" &&
        validRef(json.default_branch)
      )
        defaultBranch = json.default_branch;
    } else if (res.status === 401) {
      repoCheck = "unauthorized";
    } else if (res.status === 404) {
      repoCheck = "notfound";
    } else if (res.status === 403) {
      repoCheck = "restricted";
    } else {
      repoCheck = "unavailable";
    }
  } catch (e) {
    if (id !== requestId || (e instanceof Error && e.name === "AbortError"))
      return;
    repoCheck = "unavailable";
  }
  statusView();
  const branch = document.getElementById(
    "field-branch",
  ) as HTMLInputElement | null;
  if (branch) branch.placeholder = defaultBranch;
  render();
}
function getLines(): string[] {
  const url = repo?.url || "",
    branch = values.branch.trim() || defaultBranch,
    message =
      values.message.trim() ||
      (current === "launch"
        ? "Initial commit"
        : current === "replace"
          ? "Replace project"
          : "Update project"),
    newBranch = values.newBranch.trim(),
    source = values.sourceBranch.trim(),
    target = values.targetBranch.trim(),
    stash = values.stashMessage.trim() || "Pekerjaan sementara",
    tag = values.tagName.trim(),
    tagMsg = values.tagMessage.trim(),
    name = values.gitName.trim(),
    email = values.gitEmail.trim();
  switch (current) {
    case "launch":
      return [
        "git init",
        "git add -A",
        `git commit -m "${message}"`,
        `git push ${url} HEAD:refs/heads/${branch}`,
      ];
    case "update":
      return [
        "git add -A",
        `git commit -m "${message}"`,
        `git push ${url} HEAD:refs/heads/${branch}`,
      ];
    case "clone":
      return [`git clone ${url}`, `cd ${repo!.name}`];
    case "pull":
      return [`git pull ${url} ${branch}`];
    case "status":
      return ["git status"];
    case "replace":
      return [
        "git init",
        "git add -A",
        `git commit -m "${message}"`,
        `git push --force ${url} HEAD:refs/heads/${branch}`,
      ];
    case "branchList":
      return ["git branch"];
    case "branchCreate":
      return [`git switch -c ${newBranch}`];
    case "branchSwitch":
      return [`git switch ${newBranch}`];
    case "branchMerge":
      return [`git switch ${target}`, `git merge ${source}`];
    case "branchDelete":
      return [`git branch -d ${newBranch}`];
    case "branchDeleteRemote":
      return [`git push ${url} --delete ${newBranch}`];
    case "stashSave":
      return [`git stash push -u -m "${stash}"`];
    case "stashApply":
      return ["git stash apply"];
    case "stashList":
      return ["git stash list"];
    case "undoCommit":
      return ["git reset --soft HEAD~1"];
    case "reset":
      return [`git fetch ${url} ${branch}`, "git reset --hard FETCH_HEAD"];
    case "conflicts":
      return ["git diff --name-only --diff-filter=U"];
    case "remote":
      return [`git remote set-url origin ${url}`];
    case "log":
      return ["git log --oneline --graph --decorate -20"];
    case "diff":
      return ["git diff"];
    case "diffStaged":
      return ["git diff --cached"];
    case "tag":
      return [
        `git tag -a ${tag} -m "${tagMsg}"`,
        `git push ${url} refs/tags/${tag}`,
      ];
    case "ignoreCheck":
      return [`git check-ignore -v -- ${values.filePath.trim()}`];
    case "config":
      return [
        `git config --local user.name "${name}"`,
        `git config --local user.email "${email}"`,
      ];
  }
  return [];
}
function render(animate = false) {
  const a = actions[current];
  let errors = [];
  for (const f of a.fields) {
    let val = values[f].trim();
    if (f === "branch") val = val || defaultBranch;
    if (
      [
        "branch",
        "newBranch",
        "sourceBranch",
        "targetBranch",
        "tagName",
      ].includes(f) &&
      !validRef(val)
    )
      errors.push(
        fieldsDef[f].label +
          " harus berupa nama yang valid tanpa spasi atau simbol shell.",
      );
    if (["message", "stashMessage"].includes(f) && val && !validText(val))
      errors.push(
        fieldsDef[f].label +
          " tidak boleh berisi kutip ganda, $, %, !, backtick, backslash, atau baris baru.",
      );
    if (["tagMessage", "gitName", "gitEmail"].includes(f) && !validText(val))
      errors.push(
        fieldsDef[f].label +
          " wajib diisi tanpa kutip ganda atau simbol shell.",
      );
    if (
      f === "filePath" &&
      (!/^[A-Za-z0-9._/-]+$/.test(val) ||
        val.startsWith("/") ||
        val.split("/").includes(".."))
    )
      errors.push("Path harus relatif tanpa spasi atau karakter shell.");
    if (
      f === "gitEmail" &&
      val &&
      !/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+$/.test(val)
    )
      errors.push("Format email Git tidak valid.");
  }
  if (
    current === "branchMerge" &&
    values.sourceBranch.trim() &&
    values.sourceBranch.trim() === values.targetBranch.trim()
  )
    errors.push("Branch sumber dan tujuan harus berbeda.");
  $("field-help").className = "helper" + (errors.length ? " error" : "");
  $("field-help").textContent = errors.length
    ? errors.join(" ")
    : a.fields.includes("branch")
      ? "Branch otomatis: " + defaultBranch + ". Isi sendiri jika berbeda."
      : a.fields.includes("message")
        ? "Pesan commit otomatis digunakan jika dikosongkan."
        : "Periksa detail sebelum menyalin.";
  const ready = (!a.repo || !!repo) && !errors.length;
  const lines = ready ? getLines() : [];
  const cont = shell === "bash" ? " \\" : " ^";
  commands = lines
    .map((l, i) => l + (i < lines.length - 1 ? " &&" + cont : ""))
    .join("\n");
  $("terminal").classList.toggle("is-transitioning", animate);
  $("terminal").innerHTML = "";
  if (!lines.length) {
    const el = document.createElement("div");
    el.className = "empty";
    el.innerHTML = icon("terminal", 17);
    const label = document.createElement("span");
    label.textContent = errors.length
      ? "Lengkapi detail perintah untuk melanjutkan."
      : "Masukkan link repository untuk membuat perintah.";
    el.appendChild(label);
    $("terminal").appendChild(el);
  } else
    lines.forEach((line, i) => {
      const row = document.createElement("div");
      row.className = "command-line";
      row.style.animationDelay = Math.min(i * 25, 120) + "ms";
      const n = document.createElement("span");
      n.className = "line-number";
      n.textContent = String(i + 1).padStart(2, "0");
      const code = document.createElement("span");
      code.className = "code";
      code.textContent = line;
      if (i < lines.length - 1) {
        const c = document.createElement("span");
        c.className = "continuation";
        c.textContent = " &&" + cont;
        code.appendChild(c);
      }
      row.append(n, code);
      $("terminal").appendChild(row);
    });
  ($("copy") as HTMLButtonElement).disabled = !lines.length;
  $("terminal-state").textContent = lines.length
    ? "SIAP DISALIN"
    : "MENUNGGU INPUT";
  $("terminal-label").textContent =
    shell === "bash" ? "BASH / GIT BASH" : "WINDOWS CMD";
  $("warning").classList.toggle("show", !!a.warning);
  $("warning-title").textContent = a.title;
  $("warning-text").textContent = a.warning || "";
  $("guide-title").textContent = a.title;
  $("guide-desc").textContent = a.desc;
  $("steps").innerHTML = a.steps
    .map(
      (s, i) =>
        `<div class="step"><span class="step-no">${i + 1}</span><div><b>${s[0]}</b><p>${s[1]}</p></div></div>`,
    )
    .join("");
  $("tip-text").textContent = a.tip;
  $("result-note").textContent = lines.length
    ? a.note +
      (lines.length > 1
        ? " Salin semua baris sekaligus; && menghentikan urutan jika langkah gagal."
        : "")
    : "Lengkapi input yang diperlukan.";
  statusView();
  if (animate) {
    const el = $("guide-content");
    el.classList.remove("live");
    void el.offsetWidth;
    el.classList.add("live");
  }
}
$("repo-url").addEventListener("input", onRepo);
$("search").addEventListener("input", drawActions);
$("access-toggle").onclick = () => {
  const open = $("access-panel").classList.toggle("open");
  $("access-toggle").setAttribute("aria-expanded", String(open));
  ($("access-panel") as HTMLDivElement).inert = !open;
  if (!open) {
    input("token").value = "";
    cancelCheck();
    repoCheck = repo ? "checking" : repoCheck;
    statusView();
    if (repo) {
      const id = requestId;
      checkTimer = setTimeout(() => checkRepo("", id), 250);
    }
  }
};
$("clear-token").onclick = () => {
  input("token").value = "";
  cancelCheck();
  repoCheck = repo ? "checking" : repoCheck;
  statusView();
  if (repo) {
    const id = requestId;
    checkTimer = setTimeout(() => checkRepo("", id), 250);
  }
};
$("check-private").onclick = () => {
  if (!repo) {
    $("repo-url").focus();
    return;
  }
  const token = input("token").value.trim();
  if (!token) {
    $("token").focus();
    return;
  }
  cancelCheck();
  checkRepo(token, requestId);
};
function setShell(s: Shell) {
  shell = s;
  ["bash", "cmd"].forEach((n) => {
    $(n + "-btn").classList.toggle("active", s === n);
    $(n + "-btn").setAttribute("aria-pressed", String(s === n));
  });
  render(true);
}
$("bash-btn").onclick = () => setShell("bash");
$("cmd-btn").onclick = () => setShell("cmd");
$("copy").onclick = async () => {
  const a = actions[current];
  if (a.warning && !confirm(a.warning + "\n\nLanjutkan menyalin perintah?"))
    return;
  try {
    await navigator.clipboard.writeText(commands);
  } catch (e) {
    const t = document.createElement("textarea");
    t.value = commands;
    document.body.appendChild(t);
    t.select();
    try {
      if (!document.execCommand("copy")) throw Error();
    } catch (err) {
      alert("Penyalinan gagal. Pilih dan salin perintah secara manual.");
      t.remove();
      return;
    }
    t.remove();
  }
  $("copy-label").textContent = "Tersalin";
  $("copy").classList.add("is-copied");
  setTimeout(() => {
    $("copy-label").textContent = "Salin perintah";
    $("copy").classList.remove("is-copied");
  }, 2000);
};
drawCategories();
drawActions();
drawFields();
statusView();
render();
