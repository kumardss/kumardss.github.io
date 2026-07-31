document.addEventListener("DOMContentLoaded", function () {
  // Basic copy/save deterrents. This is friction, not real protection —
  // anyone determined can still view source or use dev tools.
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    var k = e.key ? e.key.toLowerCase() : "";
    var blockCombo = (e.ctrlKey || e.metaKey) && ["s", "u", "c", "p"].indexOf(k) !== -1;
    var blockDevtools = e.key === "F12" || ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].indexOf(k) !== -1);
    if (blockCombo || blockDevtools) { e.preventDefault(); }
  });

  // Typewriter effect for hero name — JS-driven so it never depends on a
  // fixed character width (that approach clipped on narrower columns).
  var typedEl = document.querySelector(".typed-text");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typedEl && !reduceMotion) {
    var fullText = typedEl.getAttribute("data-full-text") || typedEl.textContent;
    typedEl.textContent = "";
    var i = 0;
    setTimeout(function typeNext() {
      typedEl.textContent = fullText.slice(0, i);
      i++;
      if (i <= fullText.length) {
        setTimeout(typeNext, 55);
      }
    }, 300);
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Scroll-to-top button
  var scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      scrollBtn.classList.toggle("visible", window.scrollY > 500);
    });
  }
});
