"use client";

const COLORS = ["#E89FB5", "#93AC7E", "#7FAFC9", "#D9A85C", "#F7D58B", "#B5C9A0"];

export function spawnConfetti(x: number, y: number) {
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.className = "confetti-particle";
    el.style.left = `${x + (Math.random() - 0.5) * 40}px`;
    el.style.top = `${y - 10}px`;
    el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.animationDelay = `${Math.random() * 0.15}s`;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
