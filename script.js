console.log("Andrew Portfolio Loaded Successfully");

// =========================================================
// TAP TO START (Unlock Audio + Start F1 Intro)
// =========================================================
let introStarted = false;

document.getElementById("tapStart").addEventListener("click", () => {
    if (introStarted) return;
    introStarted = true;

    document.getElementById("tapStart").style.display = "none";

    startF1Intro();
});

// =========================================================
// F1 INTRO SEQUENCE (Start sound → lights → engine sound)
// =========================================================
function startF1Intro() {
    const startSound = new Audio("Audio/start-sound.mp3");
    const engineSound = new Audio("Audio/start-engine.mp3");

    startSound.volume = 1.0;
    engineSound.volume = 1.0;

    // 1. Start sound immediately
    startSound.play();

    // 2. Activate light rows
    const redRow = document.querySelector(".red-row");
    const yellowRow = document.querySelector(".yellow-row");
    const greenRow = document.querySelector(".green-row");

    // Red lights on
    setTimeout(() => redRow.classList.add("active"), 600);
    setTimeout(() => redRow.classList.add("off"), 1600);

    // Yellow lights on
    setTimeout(() => yellowRow.classList.add("active"), 2000);
    setTimeout(() => yellowRow.classList.add("off"), 3000);

    // Green lights on
    setTimeout(() => greenRow.classList.add("active"), 3400);
    setTimeout(() => greenRow.classList.add("off"), 4400);

    // Show blur after green light
    setTimeout(() => {
        const blur = document.getElementById("carBlur");
        if (blur) {
            blur.style.animation = "blurFlash 0.35s ease forwards";
        }
    }, 4700);  // muncul sedikit setelah lampu hijau

    
    // 3. Slight fade-out before engine
    setTimeout(() => {
        startSound.volume = 0.4;
    }, 4200);

    // 4. Play engine sound right after green (F1 timing)
    setTimeout(() => {
        engineSound.play();
    }, 4600);
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

    // The more scroll → the longer the line
    let scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
    scrollLine.style.height = (scrollPercent * 0.9) + "%";

    // Auto fade-out
    scrollTimeout = setTimeout(() => {
        scrollLine.style.opacity = 0;
    }, 250);
});
