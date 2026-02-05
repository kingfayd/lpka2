"use client";

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function HeroSection() {
  const scrollToInovasi = () => {
    const el = document.getElementById("inovasi");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* SHADER GRADIENT BACKGROUND */}
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
  animate="on"
  brightness={1.2}
  cAzimuthAngle={180}
  cDistance={3.6}
  cPolarAngle={90}
  cameraZoom={1}
  color1="#042f66"
  color2="#1b97cf"
  color3="#a0a0a0"
  envPreset="city"
  grain="off"
  lightType="3d"
  positionX={-1.4}
  positionY={0}
  positionZ={0}
  reflection={0.1}
  rotationX={0}
  rotationY={10}
  rotationZ={50}
  shader="defaults"
  type="waterPlane"
  uAmplitude={1}
  uDensity={1.7}
  uFrequency={5.5}
  uSpeed={0.2}
  uStrength={4}
  wireframe={false}
/>
      </ShaderGradientCanvas>

      {/* HERO CONTENT */}
      <div className="relative mx-auto h-full flex justify-center items-center w-full px-4 pt-32 pb-16 z-10">

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

            <h2 className="text-gray-300 uppercase text-sm md:text-lg">
              Kementerian Imigrasi dan Pemasyarakatan RI
            </h2>

            <h2 className="max-w-full mb-6 font-sans text-lg md:text-3xl font-bold leading-loose tracking-normal text-white md:mx-auto">
              <span className="inline-block uppercase">
                Lembaga Pembinaan Khusus Anak Kelas 1 Tangerang
              </span>
            </h2>

            <p className="text-sm inline-block text-gray-200 md:text-lg">
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
                className="mx-auto mt-12 md:mt-32 text-white w-12 h-12 group-hover:animate-bounce"
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

              <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-1000 text-white text-xs block text-center">
                Click Me!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
