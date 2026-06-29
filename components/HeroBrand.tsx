"use client";

export default function HeroBrand() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(135deg, #fce4f3 0%, #e8d5fb 30%, #d4e8fc 60%, #fce4f3 100%)",
        backgroundSize: "300% 300%",
        animation: "auroraBg 14s ease infinite",
        borderBottom: "1px solid rgba(180,140,240,0.18)",
        paddingBottom: "0",
      }}
    >
      {/* Decorative blurred orbs */}
      <div style={{
        position: "absolute", top: "-40px", left: "8%",
        width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(186,130,255,0.28) 0%, transparent 70%)",
        filter: "blur(2px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "10px", right: "12%",
        width: 160, height: 160, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(107,184,224,0.3) 0%, transparent 70%)",
        filter: "blur(2px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-20px", left: "50%",
        width: 240, height: 120, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,182,193,0.22) 0%, transparent 70%)",
        filter: "blur(4px)", pointerEvents: "none",
      }} />

      {/* Content row */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "28px 40px 24px",
        gap: 24,
        flexWrap: "wrap",
      }}>
        {/* Left: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* SVG logo mark */}
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#b87fe8" />
                <stop offset="50%" stopColor="#6bb8e0" />
                <stop offset="100%" stopColor="#f093c0" />
              </linearGradient>
              <linearGradient id="crossGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f8e8ff" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {/* Outer circle */}
            <circle cx="26" cy="26" r="24" fill="url(#logoGrad)" opacity="0.92" />
            {/* Inner glow ring */}
            <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            {/* Medical cross */}
            <rect x="21" y="14" width="10" height="24" rx="3" fill="url(#crossGrad)" />
            <rect x="14" y="21" width="24" height="10" rx="3" fill="url(#crossGrad)" />
            {/* EKG pulse line */}
            <polyline
              points="8,34 13,34 16,28 19,38 22,30 25,36 28,34 44,34"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Typography wordmark */}
          <div>
            <div style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: "2.1rem",
              fontWeight: 700,
              lineHeight: 1,
              background: "linear-gradient(100deg, #9b59d4 0%, #5aa8d8 45%, #e070a8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.5px",
            }}>
              Luminary
            </div>
            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(130,90,180,0.7)",
              marginTop: 2,
            }}>
              Nursing Student OS
            </div>
          </div>
        </div>

        {/* Center: decorative tag line */}
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "0.82rem",
          color: "rgba(100,70,150,0.65)",
          fontStyle: "italic",
          textAlign: "center",
          letterSpacing: "0.04em",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}>
          <span style={{ opacity: 0.4 }}>✦</span>
          <span>Study smarter. Care better. Graduate brighter.</span>
          <span style={{ opacity: 0.4 }}>✦</span>
        </div>

        {/* Right: decorative constellation */}
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none" style={{ opacity: 0.45 }}>
          <circle cx="10" cy="25" r="2.5" fill="#b87fe8" />
          <circle cx="30" cy="12" r="1.8" fill="#6bb8e0" />
          <circle cx="50" cy="30" r="2.2" fill="#f093c0" />
          <circle cx="70" cy="18" r="1.5" fill="#b87fe8" />
          <circle cx="40" cy="42" r="1.2" fill="#6bb8e0" />
          <line x1="10" y1="25" x2="30" y2="12" stroke="rgba(180,130,240,0.35)" strokeWidth="1" />
          <line x1="30" y1="12" x2="50" y2="30" stroke="rgba(107,184,224,0.35)" strokeWidth="1" />
          <line x1="50" y1="30" x2="70" y2="18" stroke="rgba(240,147,192,0.35)" strokeWidth="1" />
          <line x1="50" y1="30" x2="40" y2="42" stroke="rgba(107,184,224,0.3)" strokeWidth="1" />
          {/* sparkle */}
          <path d="M65 8 L66.2 11 L69 12 L66.2 13 L65 16 L63.8 13 L61 12 L63.8 11 Z" fill="#b87fe8" opacity="0.7" />
          <path d="M20 38 L20.8 40 L23 41 L20.8 42 L20 44 L19.2 42 L17 41 L19.2 40 Z" fill="#6bb8e0" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: 3,
        background: "linear-gradient(90deg, transparent 0%, #c49ae8 20%, #6bb8e0 50%, #f093c0 80%, transparent 100%)",
        opacity: 0.5,
      }} />
    </div>
  );
}
