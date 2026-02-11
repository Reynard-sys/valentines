"use client";

import Image from "next/image";

export default function SakuraBranch({ position, className = "" }) {
  const isTopLeft = position === "top-left";
  
  return (
    <div 
      className={`
        fixed z-10 pointer-events-none
        w-50 sm:w-50 md:w-60 lg:w-56 xl:w-100
        ${isTopLeft ? 'rotate-25' : 'rotate-50 -scale-x-100'}
        ${className}
      `}
    >
      <Image
        src="/sakura-branch.png"
        alt={`Sakura Branch ${position}`}
        width={500}
        height={500}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  );
}