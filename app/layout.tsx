import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FloatingSocial from "./components/FloatingSocial";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="w-full">
              {/* HEADER */}
              <Header />

              {/* CONTENT */}
              <main className="flex-1">
                {children}
              </main>
            </div>

            {/* FOOTER */}
            <Footer />

            {/* FLOATING SOCIAL */}
            <FloatingSocial />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
