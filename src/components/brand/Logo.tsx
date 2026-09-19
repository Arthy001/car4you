import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand Icon */}
      <div className={`relative ${iconSizes[size]} rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          {/* Stylized Modern Car / Steering / Pin mark */}
          <circle cx="12" cy="12" r="8" fill="white" fillOpacity="0.15" />
          <path d="M7 16l5-9 5 9" stroke="white" strokeWidth="2.4" />
          <path d="M9 13h6" stroke="white" strokeWidth="2.4" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-baseline">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white ${textSizes[size]}`}>
            Aura<span className="text-indigo-600">Drive</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 ml-0.5 self-center" />
        </div>
      )}
    </Link>
  );
}

export default Logo;
