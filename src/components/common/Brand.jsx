import React from "react";
import { BRAND } from "@/config/brandConfig";

export const BrandLogo = ({ className = "text-2xl" }) => {
  const parts = BRAND.name.split(" ");
  const firstWord = parts[0];
  const restOfName = parts.slice(1).join(" ");

  return (
    <div className={`font-extrabold tracking-wide flex items-center gap-1 select-none ${className}`}>
      <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
        {firstWord}
      </span>
      {restOfName && <span className="text-white">{restOfName}</span>}
      <span className="text-cyan-400">.</span>
    </div>
  );
};

export const BrandName = () => <span>{BRAND.name}</span>;
export const BrandTagline = () => <span>{BRAND.tagline}</span>;