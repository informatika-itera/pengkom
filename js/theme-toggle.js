(() => {
  const root = document.documentElement;
  const storageKey = "pkom-theme";
  const stored = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  root.dataset.theme = stored || (prefersDark ? "dark" : "light");

  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const setIcon = (theme) => {
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  setIcon(root.dataset.theme);

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem(storageKey, next);
    setIcon(next);
  });
})();
