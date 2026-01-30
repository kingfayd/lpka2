export default function Footer() {
  const waNumber = "6281327413926";
  const waMessage =
    "Halo LPKA Kelas 1 Tangerang, saya ingin mendapatkan informasi lebih lanjut.";

  return (
    <footer className="w-full bg-black text-gray-200 relative">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* INFO */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">
              LPKA
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
              {["Beranda", "Profil", "Program", "Kontak"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-yellow-400 transition"
                  >
                    {item}
                  </a>
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
              <li>📧 info@lpka.go.id</li>
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
                  0813-2741-3926 (WhatsApp)
                </a>
              </li>
            </ul>
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
