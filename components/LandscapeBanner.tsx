"use client";
export default function LandscapeBanner() {
  return (
    <svg
      viewBox="0 0 900 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ display: "block" }}
      aria-hidden
    >
      {/* sky */}
      <rect width="900" height="120" fill="#F5EFE2" />

      {/* sun */}
      <circle cx="760" cy="38" r="22" fill="#F7D58B" opacity="0.85" />

      {/* clouds */}
      <ellipse cx="160" cy="28" rx="42" ry="16" fill="white" opacity="0.75" />
      <ellipse cx="190" cy="22" rx="28" ry="13" fill="white" opacity="0.65" />
      <ellipse cx="135" cy="30" rx="22" ry="11" fill="white" opacity="0.6" />

      <ellipse cx="540" cy="22" rx="36" ry="13" fill="white" opacity="0.65" />
      <ellipse cx="565" cy="16" rx="22" ry="10" fill="white" opacity="0.55" />

      {/* back hills – sage */}
      <path d="M0 90 Q120 50 240 80 Q360 60 480 78 Q600 55 720 75 Q820 58 900 70 L900 120 L0 120 Z"
        fill="#B5C9A0" />

      {/* mid hills – darker sage */}
      <path d="M0 105 Q80 75 180 95 Q300 78 420 100 Q520 82 640 98 Q760 80 900 95 L900 120 L0 120 Z"
        fill="#93AC7E" />

      {/* front ground – warm */}
      <path d="M0 115 Q200 105 450 112 Q680 106 900 113 L900 120 L0 120 Z"
        fill="#C8AD87" opacity="0.6" />

      {/* tiny flowers */}
      {[60, 200, 340, 500, 660, 820].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={112} r={3} fill={["#E89FB5","#F7D58B","#E89FB5","#FFFFFF","#F7D58B","#E89FB5"][i]} opacity="0.9" />
          <line x1={x} y1={115} x2={x} y2={120} stroke="#93AC7E" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
