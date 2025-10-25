import React from "react";
import ImageTrail from "../components/ImageTrail.jsx";

const Imaging = () => {
  const images = [
    "https://wallpapercave.com/w400/wp13320198.jpg",
    "https://wallpapercave.com/wp/wp13320197.jpg",
    "https://wallpapercave.com/wp/wp13320223.jpg",
    "https://wallpapercave.com/uwp/uwp3871671.jpeg",
    "https://wallpapercave.com/uwp/uwp3871671.jpeg",
    "https://wallpapercave.com/wp/wp2126141.jpg",
    "https://wallpapercave.com/w400/wp2126166.jpg",
    "https://wallpapercave.com/wp/wp2048470.jpg"
  ];

  return (
    <div style={{ 
      height: "100vh", 
      position: "relative", 
      overflow: "hidden",
      background: "#000000",
    }}>
      {/* Enhanced gradient overlays */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 1
      }} />
      
      {/* Vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)",
        pointerEvents: "none",
        zIndex: 2
      }} />

      {/* Floating particles */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none"
      }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: "#ffffff",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        textAlign: "center",
        maxWidth: "95%",
        padding: "0 20px",
        width: "100%"
      }}>
        {/* Main heading with enhanced styling */}
        <div style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: "300",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: "1.05",
          color: "#ffffff",
          marginBottom: "1.5rem",
          animation: "fadeInUp 1.2s ease-out var(--delay, 0s) backwards"
        }}>
          We are building{" "}
          <span style={{
            background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease infinite",
            fontWeight: "400"
          }}>
            AGI
          </span>
        </div>
        
        {/* Subtitle with creative layout */}
        <div style={{
          fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
          fontWeight: "300",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "-0.02em",
          lineHeight: "1.4",
          color: "rgba(255, 255, 255, 0.85)",
          marginBottom: "3rem",
          animation: "fadeInUp 1.2s ease-out 0.3s backwards",
          maxWidth: "800px",
          margin: "0 auto 3rem"
        }}>
          The future won't wait{" "}
          <span style={{
            display: "block",
            fontWeight: "400",
            color: "#ffffff",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            marginTop: "0.5rem",
            background: "linear-gradient(135deg, #ffffff 0%, #888888 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease infinite 1s"
          }}>
            Neither will we
          </span>
        </div>

        {/* Animated progress bar */}
        <div style={{
          width: "200px",
          height: "2px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "3rem auto 0",
          borderRadius: "2px",
          overflow: "hidden",
          animation: "fadeInUp 1.2s ease-out 0.6s backwards",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
            animation: "progressLoad 3s ease-in-out 1s forwards, progressGlow 2s ease-in-out infinite"
          }} />
        </div>

        {/* Decorative elements */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "3rem",
          animation: "fadeInUp 1.2s ease-out 0.8s backwards"
        }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.3)",
                animation: `pulse 2s ease-in-out infinite ${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Background image trail */}
      <ImageTrail
        key={images.length}
        items={images}
        variant={1}
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(1deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(-1deg); }
        }

        @keyframes progressLoad {
          0% { width: 0%; opacity: 0; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0.3; }
        }

        @keyframes progressGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
  
export default Imaging;