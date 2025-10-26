"use client";

import React from "react";
import Beams from "../components/Beams.jsx";
import YCLogo from "../assets/ycc.svg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Beams background animation */}
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={0}
      />

      {/* Custom styles for gradient, shimmer, float */}
      <style>{`
        @keyframes gradientShift { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
        @keyframes fadeInUp { from{opacity:0; transform:translateY(20px);} to{opacity:1; transform:translateY(0);} }
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes shimmer { 0%{transform:translateX(-100%);}100%{transform:translateX(100%);} }

        .gradient-text {
          background: linear-gradient(135deg,#ffffff 0%,#a0a0a0 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Content centered on top of beams */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* Top badge - Removed floating animation */}
        <div className="mb-12"> {/* Added proper spacing */}
          <button className="bg-slate-800 group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
              <span>Not backed by</span>
              <img src={YCLogo} alt="Y Combinator" className="h-4 w-auto" />
            </div>
            <span className="absolute bottom-0 left-1.125rem h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </div>

        {/* Main Hero Text */}
        <h1 className="text-5xl md:text-7xl font-light mb-8 gradient-text drop-shadow-lg animate-fadeInUp tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Talk Like Sam Altman
        </h1>
        <p className="text-white text-lg md:text-2xl font-light max-w-2xl mx-auto mb-12 animate-fadeInUp leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          Ask questions and get answers in Sam Altman's style, based on his blogs and writings.
        </p>

        {/* Get Started Button */}
          <button
      onClick={() => navigate("/chat")}
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm md:text-base font-medium text-white backdrop-blur-3xl hover:scale-105 transition-transform duration-200">
        Get Started
      </span>
    </button>
      </div>
    </div>
  );
};

export default Hero;