/* ============================================================
   Malvern Madondo — Site Scripts
   ============================================================ */

(function () {
  "use strict";

  initDarkMode();
  initScrollAnimations();
  initPhotoSwap();
})();

/* Set current year in footer */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Dark Mode ---- */
function initDarkMode() {
  const toggler = document.getElementById("toggler");
  if (!toggler) return;

  // Respect system preference on first visit
  const saved = localStorage.getItem("dark-mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "true" || (saved === null && prefersDark)) {
    document.body.classList.add("dark-mode");
    toggler.checked = true;
  }

  toggler.addEventListener("change", (e) => {
    const isDark = e.target.checked;
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("dark-mode", isDark);
  });

  // Listen for system changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("dark-mode") === null) {
        document.body.classList.toggle("dark-mode", e.matches);
        toggler.checked = e.matches;
      }
    });
}

/* ---- Scroll Animations (IntersectionObserver) ---- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  // If browser doesn't support IntersectionObserver, show everything
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---- Subtle Photo Swap ---- */
function initPhotoSwap() {
  const img = document.getElementById("propic");
  if (!img) return;

  const photos = ["./img/face1.jpg", "./img/face2.jpg"];
  let current = 0;

  // smooth opacity transitions
  img.style.transition = "opacity 0.3s ease";

  function swap() {
    current = (current + 1) % photos.length;
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = photos[current];
      img.style.opacity = "1";
    }, 300);
  }

  setInterval(swap, 7000);
}