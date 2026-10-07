// Run in the head so the saved theme is applied before the page is painted.
(() => {
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = "system";
  try {
    const saved = localStorage.getItem("theme");
    if (["light", "dark"].includes(saved)) preference = saved;
  } catch {
    // The toggle still works when storage is unavailable.
  }
  function apply() {
    const theme = preference === "system" ? (system.matches ? "dark" : "light") : preference;
    root.dataset.theme = theme;
    for (const mode of ["light", "dark"]) {
      const stylesheet = document.getElementById(`highlight_theme_${mode}`);
      if (stylesheet) stylesheet.media = mode === theme ? "all" : "none";
    }
    const toggle = document.getElementById("light-toggle");
    if (toggle) {
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }
  }
  apply();
  system.addEventListener("change", apply);
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("light-toggle");
    if (!toggle) return;
    toggle.hidden = false;
    apply();
    toggle.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", preference);
      } catch {
        // A blocked storage write should not prevent switching themes.
      }
      apply();
    });
  });
})();
