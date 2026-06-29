"use client";
export default function LandscapeBanner() {
  return (
    <svg
      viewBox="0 0 900 140"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ display: "block" }}
      aria-hidden
    >
      {/* sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#EED8FF" />
          <stop offset="100%" stopColor="#D8EEFF" />
        </linearGradient>
        <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#E8BFEE" />
          <stop offset="100%" stopColor="#D4A8E8" />
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#C8B0F0" />
          <stop offset="100%" stopColor="#B09AE0" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#F8C8E8" />
          <stop offset="100%" stopColor="#F0B0D8" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF0A0" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFD8B0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="900" height="140" fill="url(#skyGrad)" />

      {/* sun glow */}
      <ellipse cx="760" cy="38" rx="38" ry="38" fill="url(#sunGlow)" opacity="0.6" />
      <circle cx="760" cy="38" r="20" fill="#FFE880" opacity="0.9" />

      {/* sparkle stars */}
      {[[120,18],[300,12],[480,22],[650,10],[820,20],[200,35],[550,8]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity="0.7">
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFB7D5" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFB7D5" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="-3" y1="-3" x2="3" y2="3" stroke="#C8B0F0" strokeWidth="1" strokeLinecap="round"/>
          <line x1="3" y1="-3" x2="-3" y2="3" stroke="#C8B0F0" strokeWidth="1" strokeLinecap="round"/>
        </g>
      ))}

      {/* cloud 1 — big fluffy */}
      <g className="cloud-drift" transform="translate(80, 22)">
        <ellipse cx="0"   cy="0"  rx="36" ry="22" fill="white" opacity="0.92"/>
        <ellipse cx="28"  cy="5"  rx="28" ry="18" fill="white" opacity="0.88"/>
        <ellipse cx="-26" cy="5"  rx="22" ry="15" fill="white" opacity="0.82"/>
        <ellipse cx="10"  cy="-8" rx="20" ry="14" fill="white" opacity="0.9"/>
      </g>

      {/* cloud 2 */}
      <g className="cloud-drift-slow" transform="translate(480, 18)">
        <ellipse cx="0"   cy="0"  rx="30" ry="18" fill="white" opacity="0.85"/>
        <ellipse cx="24"  cy="4"  rx="22" ry="14" fill="white" opacity="0.8"/>
        <ellipse cx="-20" cy="4"  rx="18" ry="12" fill="white" opacity="0.75"/>
        <ellipse cx="6"   cy="-7" rx="16" ry="11" fill="white" opacity="0.88"/>
      </g>

      {/* cloud 3 — small */}
      <g className="cloud-drift" transform="translate(700, 28)" style={{animationDelay:"3s"}}>
        <ellipse cx="0"  cy="0" rx="22" ry="13" fill="white" opacity="0.78"/>
        <ellipse cx="16" cy="3" rx="16" ry="10" fill="white" opacity="0.72"/>
        <ellipse cx="-14" cy="3" rx="13" ry="9" fill="white" opacity="0.68"/>
      </g>

      {/* back hill – light lavender */}
      <path d="M0 95 Q150 55 300 80 Q450 58 600 78 Q720 58 900 72 L900 140 L0 140 Z"
        fill="url(#hillGrad1)" opacity="0.85"/>

      {/* mid hill – lavender */}
      <path d="M0 112 Q100 80 220 100 Q350 78 500 105 Q640 82 780 100 Q860 90 900 96 L900 140 L0 140 Z"
        fill="url(#hillGrad2)"/>

      {/* front ground – pink */}
      <path d="M0 128 Q200 118 450 125 Q680 115 900 122 L900 140 L0 140 Z"
        fill="url(#groundGrad)"/>

      {/* tiny kawaii flowers */}
      {[[60,132],[170,128],[290,130],[420,126],[560,129],[700,127],[830,131]].map(([x,y],i) => {
        const colors = ["#FFB7D5","#C8B0F0","#A8D8F0","#FFB7D5","#FFD0A8","#C8B0F0","#B0ECD8"];
        return (
          <g key={i} transform={`translate(${x},${y})`}>
            {[0,60,120,180,240,300].map((angle, j) => (
              <ellipse
                key={j}
                cx={Math.cos((angle*Math.PI)/180)*4}
                cy={Math.sin((angle*Math.PI)/180)*4}
                rx="3" ry="2"
                fill={colors[i]}
                opacity="0.9"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="2" fill="#FFF0A0"/>
            <line x1="0" y1="2" x2="0" y2="8" stroke="#A98BE0" strokeWidth="1.5"/>
          </g>
        );
      })}

      {/* holographic shimmer strip at bottom */}
      <rect x="0" y="136" width="900" height="4" fill="url(#skyGrad)" opacity="0.5"/>
    </svg>
  );
}
