/* ============================================================
   Malvern Madondo — Site Scripts
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Theme toggle (initial theme is set inline in <head>) ---- */
  var toggle = document.getElementById("theme-toggle");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(dark) {
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }

  function savedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") !== "dark";
      setTheme(dark);
      try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
    });
  }

  // Follow system changes until the visitor picks a theme explicitly
  if (media.addEventListener) {
    media.addEventListener("change", function (e) {
      if (!savedTheme()) setTheme(e.matches);
    });
  }

  /* ---- Fade sections in on scroll ---- */
  var items = document.querySelectorAll(".fade-in");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    items.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Gentle photo swap ---- */
  var img = document.getElementById("propic");
  if (img && !reduceMotion) {
    var photos = ["./img/face1.jpg", "./img/face2.jpg"];
    var i = 0;
    // Preload the second photo so the swap doesn't flash
    var pre = new Image();
    pre.src = photos[1];

    setInterval(function () {
      i = (i + 1) % photos.length;
      img.style.opacity = "0";
      setTimeout(function () {
        img.src = photos[i];
        img.style.opacity = "1";
      }, 400);
    }, 8000);
  }
})();