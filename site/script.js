(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Show a placeholder for any highlight photo that hasn't been added yet
  document.querySelectorAll(".highlight img").forEach(function (img) {
    function markMissing() {
      img.closest(".highlight").classList.add("missing");
    }
    if (img.complete && img.naturalWidth === 0) markMissing();
    else img.addEventListener("error", markMissing);
  });

  // Theme toggle (remembers choice; otherwise follows the OS setting)
  var themeBtn = document.querySelector(".theme-toggle");
  themeBtn.addEventListener("click", function () {
    var current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!links.classList.contains("open"));
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Header border once scrolled
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, {passive: true});
  onScroll();

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {rootMargin: "0px 0px -40px 0px"}
  );
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Highlight the nav link for the section in view
  var navLinks = links.querySelectorAll('a[href^="#"]');
  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    {rootMargin: "-45% 0px -50% 0px"}
  );
  document.querySelectorAll("main section[id]").forEach(function (s) {
    sectionObserver.observe(s);
  });
})();
