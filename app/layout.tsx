import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "./components/Footer";
import Header from "./components/Header"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LPKA Kelas 1 Tangerang - Lembaga Pembinaan Khusus Anak",
  description:
    "Lembaga Pembinaan Khusus Anak Kelas 1 Tangerang - Melaksanakan pembinaan terhadap Anak Berhadapan dengan Hukum secara humanis dan berkelanjutan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <div className="w-full">
            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <main className="flex-1 pt-32">
              {children}
            </main>
          </div>

          {/* FOOTER */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
