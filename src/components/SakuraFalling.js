"use client";

import { useEffect } from "react";

export default function SakuraFalling() {
  useEffect(() => {
    const container = document.getElementById("sakuraContainer");
    if (!container) return;

    for (let i = 0; i < 67; i++) {
      const sakura = document.createElement("img");
      sakura.src = "/sakura-leaf.png";
      sakura.className = "sakura";
      sakura.style.left = Math.random() * 100 + "%";
      sakura.style.top = "-50px";
      sakura.style.animationDuration = Math.random() * 10 + 10 + "s";
      sakura.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(sakura);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id="sakuraContainer"
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
