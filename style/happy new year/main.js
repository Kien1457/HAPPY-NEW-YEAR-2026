const starsContainer = document.getElementById("stars");
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 70 + "%";
  star.style.width = star.style.height = Math.random() * 3 + 1 + "px";
  star.style.animationDelay = Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

const cityscape = document.getElementById("cityscape");
for (let i = 0; i < 20; i++) {
  const building = document.createElement("div");
  building.className = "building";
  building.style.left = i * 5 + "%";
  building.style.width = Math.random() * 80 + 40 + "px";
  building.style.height = Math.random() * 120 + 60 + "px";
  cityscape.appendChild(building);
}

function createStaticFirework(container, color) {
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";
    spark.style.color = color;
    spark.style.left = "50%";
    spark.style.top = "50%";
    spark.style.transform = `rotate(${i * 30}deg)`;
    spark.style.animation = `sparkle 1.5s ease-out ${i * 0.1}s infinite`;
    container.appendChild(spark);
  }
}

const fireworkLeft = document.getElementById("fireworkLeft");
const fireworkRight = document.getElementById("fireworkRight");
createStaticFirework(fireworkLeft, "#ff1744");
createStaticFirework(fireworkRight, "#69f0ae");

const targetDate = new Date().getTime() + 15 * 1000;
let celebrationStarted = false;
let finalCountdownStarted = false;
const messages = [
  "Chúc bạn một năm mới",
  "Sức khỏe dồi dào",
  "Thành công rực rỡ",
  "An khang thịnh vượng",
  "Vạn sự như ý",
  "Tiền vô như nước",
  "Mọi điều tốt đẹp sẽ đến",
  "Gia đình hạnh phúc",
  "Ước mơ thành sự thật",
  "Niềm vui nối tiếp niềm vui",
];
let messageIndex = 0;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0 && !celebrationStarted) {
    celebrationStarted = true;
    startCelebration();
    return;
  }

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (seconds <= 3 && seconds > 0 && !finalCountdownStarted) {
    finalCountdownStarted = true;
    document.getElementById("countdown").style.opacity = "0";
    document.querySelector("h1").style.opacity = "0";
    document.getElementById("fireworkLeft").style.display = "none";
    document.getElementById("fireworkRight").style.display = "none";
    setTimeout(() => {
      document.getElementById("finalCountdown").classList.add("active");
    }, 500);
  }

  if (finalCountdownStarted && seconds > 0) {
    const bigNumber = document.getElementById("bigNumber");
    bigNumber.textContent = seconds;
    bigNumber.style.animation = "none";
    setTimeout(() => {
      bigNumber.style.animation = "flipDown 0.6s ease-in-out";
    }, 10);
  } else if (!finalCountdownStarted) {
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }
}

function createGlowText(element, text) {
  element.textContent = "";

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";

  for (let char of text) {
    const charSpan = document.createElement("span");
    charSpan.textContent = char;
    charSpan.style.position = "relative";
    charSpan.style.display = "inline-block";
    charSpan.style.color = "#fff";
    charSpan.style.textShadow = "0 0 10px #fff, 0 0 20px #fff";

    if (char === " ") {
      charSpan.style.marginRight = "15px";
    } else {
      charSpan.style.marginRight = "2px";
    }

    wrapper.appendChild(charSpan);
  }

  element.appendChild(wrapper);
}

function launchFirework(color) {
  const rocket = document.createElement("div");
  rocket.className = "firework-rocket";
  rocket.style.left = 20 + Math.random() * 60 + "%";
  rocket.style.background = color;
  rocket.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`;
  document.body.appendChild(rocket);

  setTimeout(() => {
    const rect = rocket.getBoundingClientRect();
    createBurst(rect.left, rect.top, color);
    rocket.remove();
  }, 800 + Math.random() * 300);
}

function createBurst(x, y, color) {
  const flash = document.getElementById("screenFlash");
  flash.style.background = `radial-gradient(circle at ${x}px ${y}px, ${color} 0%, rgba(0,0,0,0) 60%)`;
  flash.style.opacity = "0.8";

  setTimeout(() => {
    flash.style.opacity = "0";
  }, 200);

  // Tạo nhiều lớp pháo hoa với độ trễ để tạo hiệu ứng nổ liên tiếp
  const layers = 2 + Math.floor(Math.random() * 2);
  const particlesPerLayer = 80 + Math.floor(Math.random() * 40);

  for (let layer = 0; layer < layers; layer++) {
    setTimeout(() => {
      for (let i = 0; i < particlesPerLayer; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-burst";

        // Màu sắc thay đổi tùy theo layer để tạo hiệu ứng gradient
        let particleColor = color;
        if (layer > 0) {
          const lightColor = addLightToColor(color, 30 * layer);
          particleColor = lightColor;
        }

        particle.style.background = particleColor;
        particle.style.boxShadow = `0 0 10px ${particleColor}, 0 0 20px ${particleColor}, 0 0 30px ${particleColor}`;
        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const angle =
          (Math.PI * 2 * i) / particlesPerLayer + (Math.random() - 0.5) * 0.3;
        const velocity = (50 + Math.random() * 150) * (1 - layer * 0.2);
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - layer * 20;

        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");
        particle.style.animation = `burst ${
          1.2 + layer * 0.3
        }s ease-out forwards`;
        particle.style.transform = `translate(var(--tx), var(--ty)) scale(0)`;

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), (1.2 + layer * 0.3) * 1000);
      }
    }, layer * 100);
  }
}

function addLightToColor(color, amount) {
  // Chuyển đổi hex color sang RGB và làm sáng hơn
  let hex = color.replace("#", "");
  let r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
  let g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
  let b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);

  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function startCelebration() {
  document.body.classList.add("celebration-mode");

  document.getElementById("creatorInfo").classList.add("show");

  const finalCountdown = document.getElementById("finalCountdown");
  finalCountdown.style.opacity = "0";

  setTimeout(() => {
    finalCountdown.style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("stars").style.display = "none";
    document.getElementById("cityscape").style.display = "none";

    document.getElementById("celebration").classList.add("active");

    setTimeout(() => {
      createGlowText(
        document.getElementById("mainText"),
        "HAPPY NEW YEAR 2026"
      );
      const colors = [
        "#ff1744",
        "#69f0ae",
        "#ffd700",
        "#00ffff",
        "#ff6347",
        "#ff00ff",
      ];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          launchFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 200);
      }
    }, 500);

    setTimeout(() => {
      const messageEl = document.getElementById("message");
      createGlowText(messageEl, messages[messageIndex]);
      messageEl.classList.add("show");

      const colors = ["#ff1744", "#69f0ae", "#ffd700", "#00ffff"];
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          launchFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 300);
      }
    }, 2000);

    setInterval(() => {
      const colors = [
        "#ff1744",
        "#69f0ae",
        "#ffd700",
        "#00ffff",
        "#ff6347",
        "#ff00ff",
        "#00ff00",
        "#ff69b4",
      ];
      const numFireworks = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < numFireworks; i++) {
        setTimeout(() => {
          launchFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 200);
      }
    }, 2500);

    setInterval(() => {
      const messageEl = document.getElementById("message");
      messageEl.classList.remove("show");

      setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        createGlowText(messageEl, messages[messageIndex]);
        messageEl.classList.add("show");
      }, 1000);
    }, 4000);
  }, 500);
}

updateCountdown();
setInterval(updateCountdown, 1000);
