const celebrateText = document.getElementById("celebrateText");
const intro = document.getElementById("intro");

const startBtn = document.getElementById("start");
const box = document.getElementById("box");
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
// const final = document.getElementById("final");
const hearts = document.querySelector(".hearts");

/* Floating Hearts */
setInterval(() => {
  const h = document.createElement("span");
  h.innerHTML = "💗";
  h.style.left = Math.random() * 100 + "vw";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}, 350);

/* Intro to Question */
startBtn.onclick = () => {
  intro.style.display = "none";
  box.style.display = "block";
};

/* No Button – only bhagega */
noBtn.addEventListener("mouseover", () => {
  const padding = 20;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

/* YES = 5 sec celebration */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
let animation;

yesBtn.onclick = () => {
  box.style.display = "none";

  celebrateText.style.display = "block";
  blastEffect();
  
  setTimeout(() => {
    celebrateText.style.display = "none";
    document.getElementById("finalLove").style.display = "block";
  }, 3000);
};
const moveNoButton = () => {
  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
};

noBtn.addEventListener("mouseover", moveNoButton);   // desktop
noBtn.addEventListener("touchstart", moveNoButton); // mobile
function startConfetti() {
  confetti = [];
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360},100%,70%)`
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
  });
  animation = requestAnimationFrame(animate);
}
function blastEffect() {
  document.body.classList.add("shake");

  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.className = "blast";
    particle.innerHTML = Math.random() > 0.5 ? "💖" : "💥";

    const x = (Math.random() - 0.5) * 300 + "px";
    const y = (Math.random() - 0.5) * 300 + "px";

    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);
    particle.style.left = "50%";
    particle.style.top = "50%";

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1200);
  }

  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 500);
}

function stopConfetti() {
  cancelAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function goFullScreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); // Safari
}

function vibratePhone() {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 300]);
  }
}
