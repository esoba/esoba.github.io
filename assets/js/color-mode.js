// Shared adapter for al-folio's theme runtime; execute in the head before paint.
(() => {
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = "system";
  let storageAvailable = true;
  try {
    preference = determineThemeSetting();
  } catch {
    storageAvailable = false;
  }
  function apply() {
    if (storageAvailable) {
      // Reuse the pinned core runtime for theme, highlighting, and embedded content.
      applyTheme();
    } else {
      root.dataset.theme = preference === "system" ? (system.matches ? "dark" : "light") : preference;
      for (const mode of ["light", "dark"]) {
        document.getElementById(`highlight_theme_${mode}`).media = mode === root.dataset.theme ? "all" : "none";
      }
    }
    const toggle = document.getElementById("light-toggle");
    if (toggle) {
      const label = `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} mode`;
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
      toggle.hidden = false;
    }
  }
  apply();
  system.addEventListener("change", apply);
  window.addEventListener("storage", (event) => {
    if (event.key === "theme" && storageAvailable) apply();
  });
  function initialize() {
    const toggle = document.getElementById("light-toggle");
    if (!toggle) return;
    apply();
    toggle.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        setThemeSetting(preference);
      } catch {
        storageAvailable = false;
      }
      apply();
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
