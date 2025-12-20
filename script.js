console.log("Andrew Portfolio Loaded Successfully");

// =========================================================
// INTRO VISUAL (tetap auto jalan pas load)
// =========================================================
window.addEventListener("DOMContentLoaded", () => {
  startF1IntroVisual(); // blur/flash tetap sama seperti sekarang
});

// =========================================================
// AUDIO (baru nyala setelah user interaksi pertama)
// =========================================================
const engineSound = new Audio("start-engine.mp3");
engineSound.volume = 0.8;
engineSound.preload = "auto";

let audioUnlocked = false;

function playEngineOnce() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  // reset biar pasti mulai dari awal
  engineSound.currentTime = 0;

  engineSound.play().catch((err) => {
    console.warn("Audio still blocked:", err);
  });
}

// Tap/click di mana pun → sound nyala
window.addEventListener("pointerdown", playEngineOnce, { once: true });

// Optional: kalau user pencet keyboard dulu
window.addEventListener("keydown", playEngineOnce, { once: true });

// =========================================================
// FLASH / BLUR (JANGAN DIUBAH feel-nya)
// =========================================================
function startF1IntroVisual() {
  setTimeout(() => {
    const blur = document.getElementById("carBlur");
    if (blur) {
      blur.style.animation =
        "blurFlash 0.35s ease forwards, carSlide 1.2s ease-out forwards";
    }
  }, 100);
}

// =========================================================
// TYPING EFFECT
// =========================================================
const words = [
  "DATA ENTHUSIAST ",
  "MACHINE LEARNING ",
  "DEEP LEARNING ",
  "INTELLIGENT SYSTEMS ",
];

let index = 0,
  charIndex = 0,
  isDeleting = false;

function typeEffect() {
  const text = words[index];
  document.getElementById("typing").textContent = text.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex === text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 55 : 90);
}
typeEffect();

// =========================================================
// NAVBAR SMOOTH SCROLL
// =========================================================
document.querySelector("a[href='#projects']")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("a[href='#contact']")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

// =========================================================
// RIGHT SIDE F1 SPEED LINE SCROLL EFFECT
// =========================================================
const scrollLine = document.getElementById("scrollLineRight");
let scrollTimeout;

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);

  if (!scrollLine) return;
  scrollLine.style.opacity = 1;

  const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
  scrollLine.style.height = scrollPercent * 0.9 + "%";

  scrollTimeout = setTimeout(() => {
    scrollLine.style.opacity = 0;
  }, 250);
});
