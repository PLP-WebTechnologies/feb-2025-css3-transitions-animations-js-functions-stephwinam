document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("box");
  const btn = document.getElementById("animateBtn");

  // Load saved color
  const savedColor = localStorage.getItem("boxColor");
  if (savedColor) {
    box.style.backgroundColor = savedColor;
    box.style.opacity = 1;
    box.style.transform = "scale(1)";
  }

  btn.addEventListener("click", () => {
    box.style.opacity = 1;
    box.style.transform = "scale(1)";

    const newColor = getRandomColor();
    box.style.backgroundColor = newColor;
    localStorage.setItem("boxColor", newColor);

    // Particle burst
    particleBurst();
    // Sparkle explosion function
    function createSparkle() {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");

      // Random position inside the box
      const x = Math.random() * box.offsetWidth;
      const y = Math.random() * box.offsetHeight;

      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;

      box.appendChild(sparkle);

      // Remove sparkle after animation
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }

    // 🚀 ADD: Trigger color pop
    box.classList.add("color-pop");
    setTimeout(() => {
      box.classList.remove("color-pop");
    }, 1000);

    // 🚀 ADD: Create sparkles
    for (let i = 0; i < 30; i++) {
      createSparkle();
    }
  });
});

// Generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Particle system
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      push: { particles_nb: 10 },
      repulse: { distance: 100 },
    },
  },
});

// Small explosion effect
function particleBurst() {
  const evt = new MouseEvent("click", { bubbles: true, cancelable: true });
  document.getElementById("particles-js").dispatchEvent(evt);
}
