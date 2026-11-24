(() => {
  const sidebar = document.querySelector("#sidebar");
  const toggle = document.querySelector("#sidebarToggle");
  const backdrop = document.querySelector("#navBackdrop");
  const mobileQuery = window.matchMedia("(max-width: 991.98px)");

  function setMobileState(open) {
    document.body.classList.toggle("mobile-nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (mobileQuery.matches) toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    sidebar.inert = mobileQuery.matches && !open;
  }

  toggle.addEventListener("click", () => {
    if (mobileQuery.matches) {
      const opening = !document.body.classList.contains("mobile-nav-open");
      setMobileState(opening);
      if (opening) sidebar.querySelector("[data-page].active").focus();
      return;
    }

    document.body.classList.toggle("sidebar-collapsed");
    const collapsed = document.body.classList.contains("sidebar-collapsed");
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  });

  backdrop.addEventListener("click", () => {
    setMobileState(false);
    toggle.focus();
  });
  sidebar.addEventListener("click", event => {
    if (event.target.closest("[data-page]") && mobileQuery.matches) {
      setMobileState(false);
      toggle.focus();
    }
  });

  mobileQuery.addEventListener("change", event => {
    document.body.classList.remove("mobile-nav-open");
    document.body.classList.remove("sidebar-collapsed");
    sidebar.inert = event.matches;
    toggle.setAttribute("aria-expanded", String(!event.matches));
    toggle.setAttribute("aria-label", event.matches ? "Open navigation" : "Collapse sidebar");
  });

  setMobileState(false);
})();
