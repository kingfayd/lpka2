"use client";

import { useState } from "react";
import { Send, MessageCircle, Mail, CheckCircle } from "lucide-react";

export default function SaranSection() {
  const [form, setForm] = useState({ nama: "", kontak: "", pesan: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const waNumber = "6281386241976";
  const emailTujuan = "magangmanis59@gmail.com";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.pesan) return;

    const waText = `*Saran & Masukan untuk LPKA Kelas 1 Tangerang*\n\n👤 Nama: ${form.nama}\n📱 Kontak: ${form.kontak || "-"}\n\n💬 Pesan:\n${form.pesan}`;
    const mailSubject = `Saran & Masukan dari ${form.nama}`;
    const mailBody = `Nama: ${form.nama}\nKontak: ${form.kontak || "-"}\n\nPesan:\n${form.pesan}`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`,
      "_blank"
    );

    setTimeout(() => {
      window.open(
        `mailto:${emailTujuan}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`,
        "_blank"
      );
    }, 800);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ nama: "", kontak: "", pesan: "" });
    }, 4000);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-gray-50 to-white py-24 overflow-hidden">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Suara Anda Penting
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Saran &amp; Masukan
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
            Kami terbuka terhadap setiap masukan demi pelayanan yang lebih baik.
            Pesan Anda akan langsung kami terima melalui WhatsApp dan email.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <CheckCircle className="text-green-500" size={56} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-800">
                Terima kasih atas masukan Anda!
              </h3>
              <p className="text-gray-500 text-sm">
                Pesan Anda sedang diteruskan via WhatsApp dan email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama */}
              <div>
                <label
                  htmlFor="saran-nama"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  id="saran-nama"
                  name="nama"
                  type="text"
                  value={form.nama}
                  onChange={handleChange}
                  onFocus={() => setFocused("nama")}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="Masukkan nama Anda"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400
                    ${focused === "nama" ? "border-yellow-400 ring-2 ring-yellow-100 bg-white" : "border-gray-200 hover:border-gray-300"}`}
                />
              </div>

              {/* Kontak */}
              <div>
                <label
                  htmlFor="saran-kontak"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  No. HP / Email{" "}
                  <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  id="saran-kontak"
                  name="kontak"
                  type="text"
                  value={form.kontak}
                  onChange={handleChange}
                  onFocus={() => setFocused("kontak")}
                  onBlur={() => setFocused(null)}
                  placeholder="Contoh: 0812-xxxx-xxxx atau nama@email.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400
                    ${focused === "kontak" ? "border-yellow-400 ring-2 ring-yellow-100 bg-white" : "border-gray-200 hover:border-gray-300"}`}
                />
              </div>

              {/* Pesan */}
              <div>
                <label
                  htmlFor="saran-pesan"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Saran / Masukan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="saran-pesan"
                  name="pesan"
                  rows={5}
                  value={form.pesan}
                  onChange={handleChange}
                  onFocus={() => setFocused("pesan")}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="Tuliskan saran atau masukan Anda di sini..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 outline-none transition-all duration-200 bg-gray-50 placeholder-gray-400 resize-none
                    ${focused === "pesan" ? "border-yellow-400 ring-2 ring-yellow-100 bg-white" : "border-gray-200 hover:border-gray-300"}`}
                />
              </div>

              {/* Info kirim ke */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                  <MessageCircle size={14} className="text-green-500 shrink-0" />
                  <span>Dikirim via WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                  <Mail size={14} className="text-blue-500 shrink-0" />
                  <span>Dikirim via Email</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="saran-submit-btn"
                className="w-full flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-yellow-500 text-white hover:text-gray-900 font-semibold text-sm px-6 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-yellow-200 hover:shadow-lg active:scale-95"
              >
                <Send size={16} />
                Kirim Saran &amp; Masukan
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
