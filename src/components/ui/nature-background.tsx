"use client";

import React from "react";

export function NatureBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 0. REAL PHOTOGRAPHIC MATA ATLÂNTICA & CACHOEIRA LAYER (Continuous Canvas) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.45] sm:opacity-[0.50] filter brightness-[0.82] contrast-[1.12] saturate-[1.2] scale-[1.02]"
          style={{
            backgroundImage: "url('/sana-mata-atlantica-cachoeira.jpg')",
          }}
        />
        {/* Soft vignette to ensure 100% typography contrast while keeping the waterfall clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/85 via-[#050806]/40 to-[#050806]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050806_90%)]" />
      </div>

      {/* 1. AMBIENT BIOPHILIC LIGHTING (Mata Atlântica Emerald + Cachoeira Turquoise) */}
      <div className="absolute -top-32 -left-32 w-[550px] sm:w-[900px] h-[550px] sm:h-[900px] bg-[#1B3B2B]/20 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute top-[28%] -right-40 w-[450px] sm:w-[850px] h-[450px] sm:h-[850px] bg-teal-900/16 rounded-full blur-[180px]" />
      <div className="absolute top-[60%] -left-36 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-cyan-950/20 rounded-full blur-[170px]" />
      <div className="absolute bottom-10 right-[15%] w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-[#14221A]/30 rounded-full blur-[150px]" />
      
      {/* Warm sunbeam canopy accent (Komorebi) */}
      <div className="absolute top-[45%] left-[20%] w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-amber-500/[0.04] rounded-full blur-[140px]" />

      {/* 2. WATERFALL & RIVERBED TOPOGRAPHIC FLOWLINES (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 2400"
      >
        <defs>
          <linearGradient id="river-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="waterfall-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="foliage-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Riverbed flowing currents (Sana stream path) */}
        <path
          d="M 100 0 C 350 400, 100 800, 300 1200 C 500 1600, 150 2000, 250 2400"
          fill="none"
          stroke="url(#river-gradient-1)"
          strokeWidth="1.2"
          strokeDasharray="8 12"
        />
        <path
          d="M 140 0 C 390 400, 140 800, 340 1200 C 540 1600, 190 2000, 290 2400"
          fill="none"
          stroke="url(#river-gradient-1)"
          strokeWidth="0.8"
        />

        {/* Right slope river and waterfall cascade line */}
        <path
          d="M 1350 0 C 1150 500, 1380 1000, 1200 1500 C 1050 1900, 1320 2200, 1280 2400"
          fill="none"
          stroke="url(#waterfall-cyan)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <path
          d="M 1390 0 C 1190 500, 1420 1000, 1240 1500 C 1090 1900, 1360 2200, 1320 2400"
          fill="none"
          stroke="url(#river-gradient-1)"
          strokeWidth="0.8"
        />

        {/* Topographic mountain contours (Peito do Pombo mountain folds) */}
        <path
          d="M 0 320 Q 380 260 720 340 T 1440 280"
          fill="none"
          stroke="#10b981"
          strokeOpacity="0.04"
          strokeWidth="1"
        />
        <path
          d="M 0 360 Q 420 300 760 380 T 1440 320"
          fill="none"
          stroke="#06b6d4"
          strokeOpacity="0.03"
          strokeWidth="0.8"
        />
        <path
          d="M 0 980 Q 480 880 920 990 T 1440 940"
          fill="none"
          stroke="#14b8a6"
          strokeOpacity="0.04"
          strokeWidth="1"
        />
        <path
          d="M 0 1680 Q 360 1620 800 1720 T 1440 1650"
          fill="none"
          stroke="#10b981"
          strokeOpacity="0.04"
          strokeWidth="1"
        />

        {/* Plunge pool waterfall ripples (Cachoeira plunge circles) */}
        <circle cx="280" cy="1180" r="140" fill="none" stroke="url(#river-gradient-1)" strokeWidth="0.8" strokeOpacity="0.2" />
        <circle cx="280" cy="1180" r="220" fill="none" stroke="url(#river-gradient-1)" strokeWidth="0.6" strokeDasharray="3 6" strokeOpacity="0.15" />
        <circle cx="1220" cy="1480" r="160" fill="none" stroke="url(#waterfall-cyan)" strokeWidth="0.8" strokeOpacity="0.2" />
        <circle cx="1220" cy="1480" r="260" fill="none" stroke="url(#waterfall-cyan)" strokeWidth="0.6" strokeDasharray="4 8" strokeOpacity="0.12" />
      </svg>

      {/* 3. BOTANICAL CANOPY SILHOUETTES (Samambaias da Mata Atlântica nos cantos) */}
      {/* Top Right Canopy Silhouette */}
      <div className="absolute -top-12 -right-12 w-72 sm:w-96 h-72 sm:h-96 opacity-35 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Main fern stem */}
          <path d="M 210 -10 Q 150 70 80 130 Q 30 170 -10 190" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
          {/* Fern fronds / leaves */}
          <path d="M 190 10 Q 160 25 150 15 Q 170 3 190 10 Z" fill="#059669" fillOpacity="0.08" />
          <path d="M 170 30 Q 140 45 130 35 Q 150 20 170 30 Z" fill="#10b981" fillOpacity="0.09" />
          <path d="M 150 50 Q 120 70 110 58 Q 130 40 150 50 Z" fill="#059669" fillOpacity="0.08" />
          <path d="M 130 75 Q 95 95 90 82 Q 110 65 130 75 Z" fill="#10b981" fillOpacity="0.07" />
          <path d="M 105 105 Q 70 125 65 112 Q 85 95 105 105 Z" fill="#059669" fillOpacity="0.07" />
          <path d="M 80 135 Q 45 155 42 142 Q 62 125 80 135 Z" fill="#10b981" fillOpacity="0.06" />
        </svg>
      </div>

      {/* Mid-Left Botanical Frond */}
      <div className="absolute top-[48%] -left-14 w-64 sm:w-80 h-64 sm:h-80 opacity-25 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full transform -rotate-12">
          <path d="M -10 50 Q 70 90 140 140" stroke="#14b8a6" strokeWidth="1.2" strokeOpacity="0.15" fill="none" />
          <path d="M 15 65 Q 45 50 50 62 Q 30 75 15 65 Z" fill="#0d9488" fillOpacity="0.08" />
          <path d="M 45 80 Q 80 65 85 78 Q 60 92 45 80 Z" fill="#14b8a6" fillOpacity="0.08" />
          <path d="M 75 100 Q 115 85 120 98 Q 95 112 75 100 Z" fill="#0d9488" fillOpacity="0.07" />
          <path d="M 105 120 Q 145 105 150 118 Q 125 132 105 120 Z" fill="#14b8a6" fillOpacity="0.06" />
        </svg>
      </div>

      {/* 4. WATERFALL MIST & ORVALHO / VAGA-LUMES (Micro-gotas e luciérnagas da floresta) */}
      <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#C29D59]/40 blur-[0.5px] animate-firefly-1" />
      <div className="absolute top-[28%] right-[18%] w-2 h-2 rounded-full bg-teal-300/35 blur-[1px] animate-firefly-2" />
      <div className="absolute top-[42%] left-[25%] w-1 h-1 rounded-full bg-cyan-300/40 blur-[0.5px] animate-firefly-3" />
      <div className="absolute top-[58%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#C29D59]/35 blur-[0.5px] animate-firefly-1" />
      <div className="absolute top-[72%] left-[8%] w-2 h-2 rounded-full bg-teal-400/30 blur-[1px] animate-firefly-2" />
      <div className="absolute top-[85%] right-[22%] w-1 h-1 rounded-full bg-cyan-200/40 blur-[0.5px] animate-firefly-3" />
      <div className="absolute top-[92%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#C29D59]/30 blur-[0.5px] animate-firefly-1" />
    </div>
  );
}
