console.log("Andrew Portfolio Loaded Successfully");

window.addEventListener("DOMContentLoaded", () => {
    startF1Intro();
});

function startF1Intro() {
    const engineSound = new Audio("Audio/start-engine.mp3");
    engineSound.volume = 0.8;

    engineSound.play().catch(err => {
        console.warn("Autoplay blocked:", err);
    });

    // Flash / blur
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
    "INTELLIGENT SYSTEMS "
];

let index = 0, charIndex = 0, isDeleting = false;

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

    scrollLine.style.opacity = 1;

    let scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    scrollLine.style.height = (scrollPercent * 0.9) + "%";

    scrollTimeout = setTimeout(() => {
        scrollLine.style.opacity = 0;
    }, 250);
});
