"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SakuraFalling from "../components/SakuraFalling";
import SakuraBranch from "../components/SakuraBranch";
import Image from "next/image";
import Link from "next/link";

export default function Letter() {
  const [isExploding, setIsExploding] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setIsExploding(true);

    const heartElement = e.currentTarget.querySelector(".heart-center");
    const rect = heartElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const explosionContainer = document.createElement("div");
    explosionContainer.className = "sakura-explosion";
    explosionContainer.style.position = "fixed";
    explosionContainer.style.inset = "0";
    explosionContainer.style.pointerEvents = "none";
    explosionContainer.style.zIndex = "9999";
    document.body.appendChild(explosionContainer);

    for (let i = 0; i < 267; i++) {
      const sakura = document.createElement("img");
      sakura.src = "/sakura-leaf.png";
      sakura.style.position = "absolute";
      sakura.style.width = "30px";
      sakura.style.height = "30px";
      sakura.style.left = centerX + "px";
      sakura.style.top = centerY + "px";

      const angle = (Math.PI * 2 * i) / 100;
      const velocity = 200 + Math.random() * 1000;
      const endX = centerX + Math.cos(angle) * velocity;
      const endY = centerY + Math.sin(angle) * velocity;
      const rotation = Math.random() * 720;

      sakura.style.transition = "all 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      explosionContainer.appendChild(sakura);

      setTimeout(() => {
        sakura.style.left = endX + "px";
        sakura.style.top = endY + "px";
        sakura.style.transform = `rotate(${rotation}deg)`;
        sakura.style.opacity = "0";
      }, 10);
    }

    setTimeout(() => {
      router.push("/memories");
    }, 1200);
  };
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-[#ffeef8] via-[#fff5f7] to-[#f0ffe0] overflow-hidden">
      <SakuraFalling />

      <SakuraBranch
        position="top-left"
        className="-top-1 -left-5 sm:-top-1 sm:-left-5 md:-top-1 md:-left-6 lg:-top-1 lg:-left-6 xl:-top-1 xl:-left-10"
      />

      <SakuraBranch
        position="bottom-right"
        className="-bottom-1 -right-5 sm:-bottom-1 sm:-right-5 md:-bottom-1 md:-right-6 lg:-bottom-1 lg:-right-6 xl:-bottom-1 xl:-right-10"
      />

      <div onClick={handleClick} className="cursor-pointer relative block">
        <div className="w-75 h-50 relative">
          <Image
            src="/envelope.png"
            alt="Envelope"
            width={300}
            height={200}
            className="w-full h-full object-contain"
          />
          {!isExploding && (
            <Image
              src="/heart.png"
              alt="Heart Seal"
              width={200}
              height={200}
              className="heart-center absolute top-3/4 left-4/5 -translate-x-1/2 -translate-y-1/2 w-45 h-20 object-contain"
              style={{
                animation: "heartbeat 1.5s ease-in-out infinite",
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
