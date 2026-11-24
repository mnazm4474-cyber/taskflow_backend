(() => {
  const storedTheme = localStorage.getItem("taskflow-theme");
  const theme = storedTheme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("#themeToggle");
    const label = theme => `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

    toggle.setAttribute("aria-label", label(theme));
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("taskflow-theme", nextTheme);
      toggle.setAttribute("aria-label", label(nextTheme));
      toggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
    });
  });
})();
