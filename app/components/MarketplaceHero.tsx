"use client";

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function MarketplaceHero() {
  return (
    <header className="relative w-full overflow-hidden py-16 px-4 text-center">
      {/* SHADER GRADIENT BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen pointer-events-none">
        <ShaderGradientCanvas
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
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
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Karya Kreatif Anak Binaan LPKA
        </h1>
        <p className="text-blue-50 text-lg max-w-2xl mx-auto drop-shadow-md">
          Setiap produk adalah bukti semangat dan transformasi anak-anak binaan LPKA. 
          Dukung kemandirian mereka dengan mengapresiasi karya tangan berkualitas tinggi.
        </p>
      </div>
    </header>
  );
}
