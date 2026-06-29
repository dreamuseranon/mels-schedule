"use client";
export default function LandscapeBanner() {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ height: 130, background: "transparent" }}
      aria-hidden
    >
      {/* swirling blobs */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(120deg, #FFB5C8 0%, #FFD4A0 20%, #FFFAAA 35%, #A8F0DC 50%, #A0D8FF 65%, #D4B0FF 80%, #FFB5C8 100%)",
        backgroundSize: "300% 300%",
        animation: "auroraBg 10s ease infinite",
        opacity: 0.55,
      }} />

      {/* glitter dots */}
      {[
        [8,20],[15,60],[25,10],[40,80],[55,30],[70,70],[82,15],[90,55],[33,50],[60,5],[78,90],[48,65]
      ].map(([l,t],i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${l}%`, top: `${t}%`,
          width: i%3===0 ? 3 : 2, height: i%3===0 ? 3 : 2,
          borderRadius: "50%",
          background: "white",
          opacity: 0.9,
          animation: `twinkle ${2+i*0.3}s ease-in-out infinite`,
          animationDelay: `${i*0.25}s`,
        }} />
      ))}

      {/* 4-pointed sparkle stars */}
      {[
        { l:5,  t:25, s:18, c:"#FF7AAE", d:"0s"   },
        { l:18, t:55, s:14, c:"#A87AE8", d:"0.5s" },
        { l:30, t:15, s:22, c:"#5AAFE8", d:"1s"   },
        { l:45, t:65, s:16, c:"#FF9BE0", d:"0.2s" },
        { l:58, t:20, s:20, c:"#FFF0A0", d:"0.8s" },
        { l:70, t:50, s:14, c:"#A8F0DC", d:"1.3s" },
        { l:80, t:18, s:24, c:"#FFB5C8", d:"0.4s" },
        { l:92, t:62, s:16, c:"#D4B0FF", d:"1.1s" },
        { l:52, t:80, s:12, c:"#FF7AAE", d:"0.6s" },
      ].map((star, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${star.l}%`, top: `${star.t}%`,
          fontSize: star.s, color: star.c,
          animation: `twinkle 2.5s ease-in-out infinite`,
          animationDelay: star.d,
          lineHeight: 1, userSelect: "none",
          filter: "drop-shadow(0 0 4px currentColor)",
        }}>✦</div>
      ))}

      {/* butterfly left */}
      <div style={{
        position: "absolute", left: "12%", top: "18%",
        fontSize: 32, lineHeight: 1,
        animation: "floatUp 4s ease-in-out infinite",
        filter: "drop-shadow(0 0 6px rgba(255,150,220,0.6))",
      }}>🦋</div>

      {/* butterfly right */}
      <div style={{
        position: "absolute", right: "14%", top: "22%",
        fontSize: 24, lineHeight: 1,
        animation: "floatUp 5s ease-in-out infinite",
        animationDelay: "1.5s",
        filter: "drop-shadow(0 0 5px rgba(180,130,255,0.5))",
      }}>🦋</div>

      {/* flower */}
      <div style={{
        position: "absolute", left: "4%", bottom: "10%",
        fontSize: 22, lineHeight: 1,
        animation: "floatUp 3.5s ease-in-out infinite",
        animationDelay: "0.8s",
      }}>🌸</div>

      <div style={{
        position: "absolute", right: "5%", bottom: "15%",
        fontSize: 20, lineHeight: 1,
        animation: "floatUp 4.5s ease-in-out infinite",
        animationDelay: "2s",
      }}>✿</div>

      {/* center title area */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 4,
      }}>
        <div style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: 38,
          fontWeight: 600,
          background: "linear-gradient(90deg, #FF7AAE, #A87AE8, #5AAFE8, #A8F0DC, #FF9BE0)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "holoShift 4s ease infinite",
          filter: "drop-shadow(0 2px 8px rgba(168,122,232,0.3))",
          textShadow: "none",
          letterSpacing: "0.02em",
        }}>
          ✦ Mel&apos;s Schedule ✦
        </div>
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13,
          color: "rgba(90,56,128,0.75)",
          letterSpacing: "0.08em",
          fontWeight: 600,
        }}>
          NUR304 · NUR326 · NUR347 · Summer 2026
        </div>
      </div>
    </div>
  );
}
