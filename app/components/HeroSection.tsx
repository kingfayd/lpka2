"use client";

export default function HeroSection() {
  const scrollToInovasi = () => {
    const el = document.getElementById("inovasi");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* WAVE BACKGROUND */}
      <svg
        className="absolute bottom-0 right-0 w-full h-full"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
        <linearGradient id="bg">
  <stop offset="0%" stopColor="rgba(248, 250, 252, 0.5)" />
  <stop offset="60%" stopColor="rgba(226, 232, 240, 0.45)" />
  <stop offset="100%" stopColor="rgba(203, 213, 225, 0.4)" />
</linearGradient>





          <path
            id="wave"
            fill="url(#bg)"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
            s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859
            s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>

        <g>
  <use xlinkHref="#wave" opacity={0.35}>
    <animateTransform
      attributeName="transform"
      type="translate"
      dur="10s"
      calcMode="spline"
      values="270 230; -334 180; 270 230"
      keyTimes="0; .5; 1"
      keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
      repeatCount="indefinite"
    />
  </use>

  <use xlinkHref="#wave" opacity={0.5}>
    <animateTransform
      attributeName="transform"
      type="translate"
      dur="8s"
      calcMode="spline"
      values="-270 230;243 220;-270 230"
      keyTimes="0; .6; 1"
      keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
      repeatCount="indefinite"
    />
  </use>

  <use xlinkHref="#wave" opacity={0.65}>
    <animateTransform
      attributeName="transform"
      type="translate"
      dur="6s"
      calcMode="spline"
      values="0 230;-140 200;0 230"
      keyTimes="0; .4; 1"
      keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
      repeatCount="indefinite"
    />
  </use>
</g>






      </svg>

      {/* HERO CONTENT */}
      <div className="relative mx-auto h-full flex justify-center items-center w-full px-4 pt-1 pb-16">

        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
          <div
            id="tagline"
            className="opacity-100 transition-opacity duration-1000 max-w-xl mb-10 mx-auto text-center lg:max-w-6xl md:mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src="/images/nipas.png"
                alt="Logo NIPAS"
                className="w-12 md:w-24 lg:w-28 h-auto"
              />

              <img
                src="/images/lpka3.png"
                alt="Logo LPKA"
                className="w-12 md:w-24 lg:w-28 h-auto"
              />
            </div>

            <h2 className="text-gray-400 uppercase text-sm md:text-lg">
              Kementerian Imigrasi dan Pemasyarakatan RI
            </h2>

            <h2 className="max-w-full mb-6 font-sans text-lg md:text-3xl font-bold leading-loose tracking-normal text-slate-200 md:mx-auto">
              <span className="inline-block uppercase">
                Lembaga Pembinaan Khusus Anak Kelas 1 Tangerang
              </span>
            </h2>

            <p className="text-sm inline-block text-gray-400 md:text-lg">
              Selamat datang di website Lembaga Pembinaan Khusus Anak Kelas 1
              Tangerang, kami berkomitmen untuk menjaga keamanan dan membangun
              kepribadian para anak binaan serta memberikan pelayanan yang
              optimal.
            </p>

            <div
              className="relative group mx-auto w-20 opacity-60 cursor-pointer"
              onClick={scrollToInovasi}
            >
              <svg
                className="mx-auto mt-12 md:mt-32 text-slate-200 w-12 h-12 group-hover:animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-1000 text-slate-200 text-xs block text-center">
                Click Me!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
