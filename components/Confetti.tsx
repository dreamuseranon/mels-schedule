"use client";

const SPARKLES = ["✦", "✧", "⋆", "★", "✨", "💫", "🌸", "✿"];
const COLORS = ["#FFB7D5","#C8B0F0","#A8D8F0","#FFD0A8","#B0ECD8","#FF86B8","#A98BE0"];

export function spawnConfetti(x: number, y: number) {
  for (let i = 0; i < 12; i++) {
    const el = document.createElement("div");
    el.className = "sparkle-particle";
    el.textContent = SPARKLES[Math.floor(Math.random() * SPARKLES.length)];
    const angle = (Math.random() * 360 * Math.PI) / 180;
    const dist = 30 + Math.random() * 50;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--ty", `${Math.sin(angle) * dist - 20}px`);
    el.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    el.style.animationDelay = `${Math.random() * 0.12}s`;
    el.style.fontSize = `${10 + Math.random() * 10}px`;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
