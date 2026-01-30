"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 mx-6 mt-3 rounded-3xl">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LOGO + TITLE */}
        <Link
          href="/"
          className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/lpka3.png"
            alt="Logo LPKA Kelas I Tangerang"
            width={42}
            height={42}
            priority
            className="w-[42px] h-[42px]"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-light text-gray-500">LPKA TANGERANG</div>
            <div className="text-base font-semibold text-gray-900">Kelas I</div>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Menu Items */}
          <Link 
            href="/" 
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
          >
            Beranda
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </Link>

          <div 
            className="relative group"
            onMouseEnter={() => setActiveDropdown("profil")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors flex items-center gap-1.5">
              Profil
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <Link href="/profil" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg transition-colors">
                Profil Lembaga
              </Link>
              <Link href="/profil#visi-misi" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                Visi & Misi
              </Link>
              <Link href="/profil#struktur" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-b-lg transition-colors">
                Struktur Organisasi
              </Link>
            </div>
          </div>

          <Link 
            href="/layananpublik" 
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
          >
            Layanan Publik
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link 
            href="/kontak" 
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
          >
            Kontak
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-6 py-4 gap-2">
            <Link 
              href="/" 
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Beranda
            </Link>

            <button
              onClick={() => setActiveDropdown(activeDropdown === "profil" ? null : "profil")}
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
            >
              Profil
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${activeDropdown === "profil" ? "rotate-180" : ""}`}
              />
            </button>
            {activeDropdown === "profil" && (
              <div className="bg-gray-50 rounded-lg">
                <Link 
                  href="/profil" 
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  Profil Lembaga
                </Link>
                <Link 
                  href="/profil#visi-misi" 
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  Visi & Misi
                </Link>
                <Link 
                  href="/profil#struktur" 
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  Struktur Organisasi
                </Link>
              </div>
            )}

            <Link 
              href="/layananpublik" 
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Layanan Publik
            </Link>

            <Link 
              href="/kontak" 
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Kontak
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
