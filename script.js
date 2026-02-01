const celebrateText = document.getElementById("celebrateText");
const intro         = document.getElementById("intro");
const startBtn      = document.getElementById("start");
const box           = document.getElementById("box");
const noBtn         = document.getElementById("no");
const yesBtn        = document.getElementById("yes");
const finalLove     = document.getElementById("finalLove");
const hearts        = document.querySelector(".hearts");

/* ─── Floating Hearts ─── */
setInterval(() => {
  const h = document.createElement("span");
  h.innerHTML = "💗";
  h.style.left = Math.random() * 100 + "vw";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}, 350);

/* ─── Intro → Question ─── */
startBtn.onclick = () => {
  intro.style.display = "none";
  box.style.display   = "block";
};

/* ─── No Button – runs away ─── */
const moveNoButton = () => {
  const padding = 20;
  const maxX = window.innerWidth  - noBtn.offsetWidth  - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;
  noBtn.style.left = (Math.random() * maxX) + "px";
  noBtn.style.top  = (Math.random() * maxY) + "px";
};

noBtn.addEventListener("mouseover",  moveNoButton); // desktop
noBtn.addEventListener("touchstart", moveNoButton); // mobile

/* ─── Yes Button → Celebrate → Final Screen ─── */
yesBtn.onclick = () => {
  box.style.display = "none";

  // 1) Show "yaaay" popup
  celebrateText.style.display = "block";

  // 2) Blast + confetti + vibrate all at once
  blastEffect();
  startConfetti();
  vibratePhone();

  // 3) After 3 seconds → hide popup, show the love screen
  setTimeout(() => {
    celebrateText.style.display = "none";
    stopConfetti();
    finalLove.style.display = "flex";   // ← this actually shows it now
  }, 3000);
};

/* ─── Confetti ─── */
const canvas = document.getElementById("confetti");
const ctx    = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let confetti  = [];
let animation;

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 120; i++) {
    confetti.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height - canvas.height,
      r:     Math.random() * 6 + 2,
      d:     Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 65%)`
    });
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += c.d;
    // wrap around when it falls off bottom
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
  animation = requestAnimationFrame(animate);
}

function stopConfetti() {
  cancelAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ─── Blast Effect ─── */
function blastEffect() {
  document.body.classList.add("shake");

  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.className = "blast";
    particle.innerHTML = Math.random() > 0.5 ? "💖" : "💥";
    particle.style.setProperty("--x", (Math.random() - 0.5) * 300 + "px");
    particle.style.setProperty("--y", (Math.random() - 0.5) * 300 + "px");
    particle.style.left = "50%";
    particle.style.top  = "50%";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1200);
  }

  setTimeout(() => document.body.classList.remove("shake"), 500);
}

/* ─── Vibrate (mobile) ─── */
function vibratePhone() {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 300]);
  }
}

/* ─── Fullscreen helper (call whenever you want) ─── */
function goFullScreen() {
  const el = document.documentElement;
  if (el.requestFullscreen)       el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}
