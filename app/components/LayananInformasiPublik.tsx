export default function LayananInformasiPublik() {
    return (
      <section className="font-sans text-gray-900 antialiased bg-white">
        <div className="container px-5 pt-24 pb-12 mx-auto">
          {/* HEADER */}
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="text-center mb-2 text-2xl font-medium title-font">
              <span className="text-yellow-500 font-bold">Informasi </span> Publik
            </h1>
            <div className="w-12 mx-auto border-b-2 border-slate-300 mb-4"></div>
            <p className="mx-auto leading-relaxed text-base max-w-3xl">
              Berdasarkan UU 14 Tahun 2008 bahwa Informasi Publik adalah informasi
              yang dihasilkan, disimpan, dikelola, dikirim, dan/atau diterima oleh
              suatu badan publik yang berkaitan dengan penyelenggara dan
              penyelenggaraan negara dan/atau penyelenggara dan penyelenggaraan
              badan publik lainnya yang sesuai dengan Undang-Undang ini serta
              informasi lain yang berkaitan dengan kepentingan publik.
            </p>
          </div>
  
          {/* LIST LAYANAN */}
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {[
              "Layanan Integrasi",
              "Alur Kunjungan",
              "Informasi DIPA",
              "Informasi LAKIP",
            ].map((item, index) => (
              <div key={index} className="p-2 w-1/2 md:w-1/4">
                <div className="bg-gray-200 rounded flex p-4 h-full items-center hover:bg-gray-300 transition">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-gray-600 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium text-gray-800">
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  