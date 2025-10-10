// 1) Open external links in a new tab (keeps internal links unchanged)
(function () {
  const isExternal = (a) =>
    a.host && a.host !== window.location.host && !a.href.startsWith("mailto:");
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a[href]").forEach((a) => {
      if (isExternal(a)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  });
})();

// 2) Back-to-top button (appears after you scroll a bit)
(function () {
  const btn = document.createElement("button");
  btn.id = "backToTop";
  btn.title = "Back to top";
  btn.innerHTML = "↑";
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(btn);
    const toggle = () => (btn.style.display = window.scrollY > 320 ? "block" : "none");
    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    toggle();
  });
})();

// 3) Preserve active tabbed blocks via URL hash (nice for sharing links)
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // When a tab is clicked, append its id to the URL hash
    document.querySelectorAll(".tabbed-set > input").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.id) history.replaceState(null, "", `#${input.id}`);
      });
    });
    // On load, if a hash matches a tab input id, activate it
    const id = location.hash.replace("#", "");
    if (id) {
      const el = document.getElementById(id);
      if (el && el.type === "radio") el.checked = true;
    }
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  const headerInner = document.querySelector(".md-header__inner");
  if (!headerInner) return;

  // Toggle: set to true if you want logos only on the homepage
  const homeOnly = false;
  if (homeOnly) {
    const path = location.pathname.replace(/index\.html$/, "");
    const parts = path.split("/").filter(Boolean);
    const last = parts[parts.length - 1] || "";
    const isHome = path.endsWith("/") && (parts.length === 0 || last === "gha-python-ml-workshop-2025");
    if (!isHome) return;
  }

  // Helper to build a partner logo link
  const makeLogo = (cls) => {
    const a = document.createElement("a");
    a.href = "https://igad.int";
    a.target = "_blank";
    a.rel = "noopener";
    a.className = cls;
    a.title = "IGAD";
    const img = document.createElement("img");
    img.src = "assets/igad-logo.png";
    img.alt = "IGAD";
    a.appendChild(img);
    return a;
  };

  // RIGHT side logo
  if (!headerInner.querySelector(".header-partner")) {
    headerInner.appendChild(makeLogo("header-partner"));
  }

  // LEFT side logo (insert after the theme logo button if present; otherwise before the title)
  const logoBtn = headerInner.querySelector(".md-header__button.md-logo");
  const title = headerInner.querySelector(".md-header__title");
  if (!headerInner.querySelector(".header-partner-left")) {
    const left = makeLogo("header-partner-left");
    if (logoBtn) {
      logoBtn.insertAdjacentElement("afterend", left);
    } else if (title) {
      title.insertAdjacentElement("beforebegin", left);
    } else {
      headerInner.insertBefore(left, headerInner.firstChild);
    }
  }
});

