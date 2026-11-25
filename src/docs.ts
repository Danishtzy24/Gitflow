const icons: Record<string, string> = {
  arrow: '<path d="m15 18-6-6 6-6M9 12h12"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 18a2.5 2.5 0 0 1 2.5-2.5H20"/>',
  start: '<path d="m9 18 6-6-6-6M4 4h16v16H4z"/>',
  repo: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 18a2.5 2.5 0 0 1 2.5-2.5H20"/>',
  branch:
    '<circle cx="6" cy="4" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="20" r="2"/><path d="M6 6v12M18 8c0 5-6 5-12 5"/>',
  restore: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  shield:
    '<path d="M12 21s7-4 7-10V5l-7-3-7 3v6c0 6 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1.2-1.5 2.5M12 17h.01"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  alert: '<path d="M12 3 2.5 20h19L12 3ZM12 9v5M12 17h.01"/>',
};
document.querySelectorAll<HTMLElement>("[data-icon]").forEach((el) => {
  el.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[el.dataset.icon ?? ""] || ""}</svg>`;
});
const sections = [...document.querySelectorAll<HTMLElement>(".section")],
  links = [...document.querySelectorAll("#toc a")];
document.getElementById("search")!.addEventListener("input", (e) => {
  const q = (e.target as HTMLInputElement).value.trim().toLowerCase();
  let count = 0;
  sections.forEach((section) => {
    const match = !q || (section.textContent ?? "").toLowerCase().includes(q);
    section.hidden = !match;
    if (match) count++;
  });
  document.getElementById("no-results")!.classList.toggle("show", count === 0);
});
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id,
            ),
          );
        }
      });
    },
    { rootMargin: "-90px 0px -70% 0px", threshold: 0 },
  );
  sections.forEach((s) => obs.observe(s));
}
