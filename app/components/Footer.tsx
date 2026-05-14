"use client";
 
 import { usePathname } from "next/navigation";
 import Link from "next/link";
 import { useState, useEffect } from "react";
 
 export default function Footer() {
   const pathname = usePathname();
   const [waNumber, setWaNumber] = useState("6281386241976");
   const [email, setEmail] = useState("lpkatangerang1@gmail.com");
   const [socials, setSocials] = useState<{
     instagram?: string;
     facebook?: string;
     twitter?: string;
     tiktok?: string;
   }>({});
 
   useEffect(() => {
     fetch('/api/kontak/settings')
       .then(res => res.json())
       .then(data => {
         if (data.whatsappNumber) setWaNumber(data.whatsappNumber);
         if (data.email) setEmail(data.email);
         setSocials({
           instagram: data.instagram,
           facebook: data.facebook,
           twitter: data.twitter,
           tiktok: data.tiktok,
         });
       })
       .catch(err => console.error("Error fetching contact settings:", err));
   }, []);
 
   const waMessage =
     "Halo LPKA Kelas 1 Tangerang, saya ingin mendapatkan informasi lebih lanjut.";
 
   const hideFooterPaths = ["/admin", "/login", "/register", "/auth", "/berita", "/marketplace"];
   if (hideFooterPaths.some(path => pathname?.startsWith(path))) {
     return null;
   }
 
   return (
     <footer className="w-full bg-black text-gray-200 relative">
       <div className="max-w-7xl mx-auto px-6 py-10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 
           {/* INFO */}
           <div>
             <h2 className="text-xl font-semibold mb-3 text-white">
               LPKA KELAS 1 TANGERANG
             </h2>
             <p className="text-sm text-gray-400 leading-relaxed">
               Lembaga Pembinaan Khusus Anak yang berkomitmen
               dalam pembinaan, pendidikan, dan masa depan anak bangsa.
             </p>
           </div>
 
           {/* MENU */}
           <div>
             <h3 className="text-lg font-medium mb-3 text-white">
               Menu
             </h3>
             <ul className="space-y-2 text-sm">
               {[
                 { name: "Beranda", path: "/" },
                 { name: "Profil", path: "/profil" },
                 { name: "Layanan Publik", path: "/layananpublik" },
                 { name: "Kegiatan", path: "/kegiatan/perikanan" },
                 { name: "Marketplace", path: "/marketplace" }
               ].map((item) => (
                 <li key={item.name}>
                   <Link
                     href={item.path}
                     className="hover:text-yellow-400 transition"
                   >
                     {item.name}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* KONTAK */}
           <div>
             <h3 className="text-lg font-medium mb-3 text-white">
               Kontak
             </h3>
             <ul className="text-sm text-gray-400 space-y-2">
               <li>📍 Indonesia</li>
               <li>📧 {email}</li>
               <li className="flex items-center gap-2">
                 <span>📞</span>
                 <a
                   href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                     waMessage
                   )}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="hover:text-green-500 transition font-medium"
                 >
                   {waNumber.startsWith('62') ? `0${waNumber.slice(2)}` : waNumber} (WhatsApp)
                 </a>
               </li>
             </ul>
 
             {/* Social Media Links */}
             {(socials.instagram || socials.facebook || socials.twitter || socials.tiktok) && (
               <div className="mt-4 flex gap-4">
                 {socials.instagram && (
                   <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition" title="Instagram">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                   </a>
                 )}
                 {socials.facebook && (
                   <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition" title="Facebook">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                   </a>
                 )}
                 {socials.twitter && (
                   <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition" title="Twitter (X)">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                   </a>
                 )}
                 {socials.tiktok && (
                   <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" title="TikTok">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v8a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8v3a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5z"></path></svg>
                   </a>
                 )}
               </div>
             )}
           </div>
 
         </div>
 
         {/* COPYRIGHT */}
         <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500">
           © {new Date().getFullYear()} LPKA Kelas 1 Tangerang. All rights reserved.
         </div>
       </div>
 
       {/* FLOATING WHATSAPP BUTTON */}
       <a
         href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
         target="_blank"
         rel="noopener noreferrer"
         className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300"
       >
         <span className="text-xl">💬</span>
         <span className="hidden md:block text-sm font-medium">
           Hubungi Kami
         </span>
       </a>
     </footer>
   );
 }
