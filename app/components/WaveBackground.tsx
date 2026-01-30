"use client";

export default function WaveBackground() {
  return (
    <svg
      className="absolute bottom-0 right-0 w-full h-full"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      style={{ overflow: 'hidden' }}
    >
      <defs>
        <path
          id="wave"
          fill="rgba(107, 114, 128, 0.5)"
          d="M-363.855,462.943c159.4,0,159.4,50,318.9,50s159.5-50,318.9-50s159.4,50,318.9,50s159.5-50,318.9-50s159.4,50,318.9,50s159.5-50,318.9-50s159.4,50,318.9,50s159.5-50,318.9-50V0H-363.855V462.943z"
        />
      </defs>
      <g>
        {/* Wave Layer 1 - opacity 0.3, dur 10s */}
        <use
          xlinkHref="#wave"
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="10s"
            calcMode="spline"
            values="270 230; -334 180; 270 230"
            keyTimes="0; 0.5; 1"
            keySplines="0.42, 0, 0.58, 1.0; 0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        
        {/* Wave Layer 2 - opacity 0.6, dur 8s */}
        <use
          xlinkHref="#wave"
          opacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="8s"
            calcMode="spline"
            values="-270 230; 243 220; -270 230"
            keyTimes="0; 0.6; 1"
            keySplines="0.42, 0, 0.58, 1.0; 0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        
        {/* Wave Layer 3 - opacity 0.9, dur 6s */}
        <use
          xlinkHref="#wave"
          opacity="0.9"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="6s"
            calcMode="spline"
            values="0 230; -140 200; 0 230"
            keyTimes="0; 0.4; 1"
            keySplines="0.42, 0, 0.58, 1.0; 0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
      </g>
    </svg>
  );
}