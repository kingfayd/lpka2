"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X, Languages } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const hideHeaderPaths = ["/admin", "/login", "/register", "/auth", "/berita", "/marketplace"];
  const isAdminPage = hideHeaderPaths.some(path => pathname?.startsWith(path));

  if (isAdminPage) {
    return null;
  }

  const toggleLanguage = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border border-gray-100/50 mx-6 mt-3 rounded-3xl shadow-md">
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
            <div className="text-sm font-light text-gray-500"> LPKA Kelas I</div>
            <div className="text-base font-semibold text-gray-900">TANGERANG</div>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            title={t('language')}
          >
            <Languages size={16} />
            <span className="uppercase">{locale === 'id' ? 'EN' : 'ID'}</span>
          </button>

          {/* Menu Items */}
          <Link
            href="/"
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
          >
            {t('home')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown("profil")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors flex items-center gap-1.5">
              {t('profile')}
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <Link href="/profil" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg transition-colors">
                {t('profileInstitution')}
              </Link>
              <Link href="/profil#visi-misi" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                {t('visionMission')}
              </Link>
              <Link href="/profil#pejabat" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                {t('officials')}
              </Link>
              <Link href="/profil#struktur" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-b-lg transition-colors">
                {t('structure')}
              </Link>
            </div>
          </div>

          <Link
            href="/layananpublik"
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
          >
            {t('publicService')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown("kegiatan")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors flex items-center gap-1.5">
              {t('activities')}
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <Link href="/kegiatan/perikanan" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg transition-colors">
                {t('fisheries')}
              </Link>
              <Link href="/kegiatan/pertanian" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                {t('agriculture')}
              </Link>
              <Link href="/kegiatan/pendidikan" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                {t('education')}
              </Link>
              <Link href="/kegiatan/keagamaan" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                {t('religious')}
              </Link>
              <Link href="/kegiatan/kewirausahaan" className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-b-lg transition-colors">
                Kewirausahaan
              </Link>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors relative group"
          >
            {t('marketplace')}
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
            {/* Language Toggle Mobile */}
            <button
              onClick={() => { toggleLanguage(); setOpen(false); }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <Languages size={16} />
              <span className="uppercase">{locale === 'id' ? 'EN' : 'ID'}</span>
            </button>

            <Link
              href="/"
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {t('home')}
            </Link>

            <button
              onClick={() => setActiveDropdown(activeDropdown === "profil" ? null : "profil")}
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
            >
              {t('profile')}
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
                  {t('profileInstitution')}
                </Link>
                <Link
                  href="/profil#visi-misi"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('visionMission')}
                </Link>
                <Link
                  href="/profil#pejabat"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('officials')}
                </Link>
                <Link
                  href="/profil#struktur"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('structure')}
                </Link>
              </div>
            )}

            <Link
              href="/layananpublik"
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {t('publicService')}
            </Link>

            <button
              onClick={() => setActiveDropdown(activeDropdown === "kegiatan" ? null : "kegiatan")}
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between w-full"
            >
              {t('activities')}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${activeDropdown === "kegiatan" ? "rotate-180" : ""}`}
              />
            </button>
            {activeDropdown === "kegiatan" && (
              <div className="bg-gray-50 rounded-lg">
                <Link
                  href="/kegiatan/perikanan"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('fisheries')}
                </Link>
                <Link
                  href="/kegiatan/pertanian"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('agriculture')}
                </Link>
                <Link
                  href="/kegiatan/pendidikan"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('education')}
                </Link>
                <Link
                  href="/kegiatan/keagamaan"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  {t('religious')}
                </Link>
                <Link
                  href="/kegiatan/kewirausahaan"
                  className="block px-6 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => { setOpen(false); setActiveDropdown(null); }}
                >
                  Kewirausahaan
                </Link>
              </div>
            )}

            <Link
              href="/marketplace"
              className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {t('marketplace')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
