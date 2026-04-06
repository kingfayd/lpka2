import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/lpka_tangerang", // Sesuaikan dengan URL yang benar
    icon: <Instagram size={20} />,
    colorClass: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90 text-white",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/lpka", // Sesuaikan dengan URL yang benar
    icon: <Facebook size={20} />,
    colorClass: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@lpka_tangerang", // Sesuaikan dengan URL yang benar
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v8a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8v3a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5z"></path>
      </svg>
    ),
    colorClass: "bg-black hover:bg-neutral-800 text-white",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/lpka", // Sesuaikan dengan URL yang benar
    icon: <Twitter size={20} />,
    colorClass: "bg-sky-500 hover:bg-sky-600 text-white",
  },
];

export default function FloatingSocial() {
  return (
    <div className="fixed left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-12 items-center justify-end pr-3 rounded-r-xl shadow-lg transition-all duration-300 ease-in-out hover:w-16 hover:shadow-xl ${social.colorClass}`}
          aria-label={social.name}
          title={social.name}
        >
          <div className="transition-transform duration-300 hover:scale-110">
            {social.icon}
          </div>
        </Link>
      ))}
    </div>
  );
}
