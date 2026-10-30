"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, MapPin, Calendar, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useBooking } from "@/context/booking-context";

export function ScrollytellingWalkthrough() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openBooking } = useBooking();

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track scroll through this section (300vh for natural, leisurely pacing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Story step opacities based on scroll position
  const step1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.28, 0.35], [1, 1, 0.2, 0]);
  const step1Y = useTransform(scrollYProgress, [0, 0.28], [0, -30]);

  const step2Opacity = useTransform(scrollYProgress, [0.32, 0.42, 0.60, 0.68], [0, 1, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.32, 0.42, 0.68], [30, 0, -30]);

  const step3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 0.95, 1], [0, 1, 1, 1]);
  const step3Y = useTransform(scrollYProgress, [0.68, 0.78], [30, 0]);

  // Scrub video smoothly to matching frame on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetProgress = scrollYProgress.get();
    let currentProgress = targetProgress;
    let rafId: number | null = null;
    let isSeeking = false;
    let pendingTime: number | null = null;

    const applySeek = (time: number) => {
      if (!video || !video.duration || !Number.isFinite(video.duration)) return;
      const clamped = Math.max(0.001, Math.min(time, video.duration - 0.04));

      if (isSeeking) {
        pendingTime = clamped;
        return;
      }

      if (Math.abs(video.currentTime - clamped) < 0.03) {
        return;
      }

      isSeeking = true;
      try {
        if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(clamped);
        } else {
          video.currentTime = clamped;
        }
      } catch {
        video.currentTime = clamped;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const next = pendingTime;
        pendingTime = null;
        applySeek(next);
      }
    };

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      if (video.duration && Number.isFinite(video.duration)) {
        applySeek(targetProgress * video.duration);
      }
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    const tick = () => {
      if (!video || !video.duration || !Number.isFinite(video.duration) || isPlayingAuto) {
        rafId = null;
        return;
      }

      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0003) {
        currentProgress += diff * 0.22;
        applySeek(currentProgress * video.duration);
        rafId = requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        applySeek(currentProgress * video.duration);
        rafId = null;
      }
    };

    const startLoop = () => {
      if (rafId === null && !isPlayingAuto) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollPercent(Math.round(latest * 100));
      targetProgress = latest;
      startLoop();
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      unsubscribe();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [scrollYProgress, isPlayingAuto]);

  const toggleAutoPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingAuto) {
      video.pause();
      setIsPlayingAuto(false);
    } else {
      video.play();
      setIsPlayingAuto(true);
    }
  };

  return (
    <section
      ref={containerRef}
      id="experiencia-trilha"
      className="relative h-[280vh] sm:h-[320vh] bg-[#07100A] text-white"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Video (Hardware-Accelerated Scrollytelling Canvas) */}
        <div className="absolute inset-0 w-full h-full bg-[#050B07] flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/trilha-walkthrough.mp4"
            poster="/videos/trilha-poster.jpg"
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover sm:object-contain md:object-cover scale-100 filter brightness-[0.88] contrast-[1.08] saturate-[1.12]"
          />

          {/* Cinematic Vignettes & Biophilic Gradients for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07100A] via-transparent to-[#07100A]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07100A]/85 via-transparent to-[#07100A]/85 sm:opacity-75 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#07100A_95%)] pointer-events-none" />
        </div>

        {/* Ambient Mist Drift Animation */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 animate-pulse"
          aria-hidden="true"
        />

        {/* Floating Scrollytelling HUD Overlays */}
        <div className="relative z-20 max-w-5xl mx-auto w-full px-5 sm:px-8 py-10 pointer-events-none flex flex-col justify-between h-full">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-[#C29D59]/30 text-xs font-semibold text-[#E6C994] shadow-lg">
              <Compass className="w-3.5 h-3.5 text-[#C29D59] animate-spin" style={{ animationDuration: "12s" }} />
              <span>Pousada Recanto dos Pássaros • Trilha do Sana</span>
            </div>

            {/* Scrubber Progress Chip */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAutoPlay}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/15 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
                title={isPlayingAuto ? "Pausar reprodução" : "Reproduzir vídeo"}
              >
                {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#C29D59]" />}
                <span>{isPlayingAuto ? "Pausar" : "Auto Play"}</span>
              </button>

              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs font-mono text-zinc-300">
                <span>{scrollPercent}%</span>
              </div>
            </div>
          </div>

          {/* Central Editorial Narrative (Transforms smoothly with Scroll) */}
          <div className="relative my-auto min-h-[220px] sm:min-h-[260px] flex items-center">
            
            {/* Step 1: Initial Arrival / Path Entrance */}
            <motion.div
              style={{ opacity: step1Opacity, y: step1Y }}
              className="absolute inset-x-0 space-y-3 sm:space-y-4 max-w-2xl text-left"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B3B2B]/80 backdrop-blur-md border border-[#C29D59]/40 text-xs font-semibold text-[#E6C994]">
                <Sparkles className="w-3.5 h-3.5 text-[#C29D59]" />
                <span>Chegando ao seu Paraíso</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                Deixe a correria para trás.{" "}
                <span className="italic font-normal text-[#E6C994]">
                  O Sana começa aqui.
                </span>
              </h2>

              <p className="text-sm sm:text-lg text-zinc-200 font-light leading-relaxed max-w-[52ch] drop-shadow-sm">
                Deslize a tela para caminhar pelo nosso acesso cercado de Mata Atlântica virgem, árvores centenárias e a brisa fresca da serra.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="animate-bounce">↓</span>
                <span>Deslize para avançar pela trilha</span>
              </div>
            </motion.div>

            {/* Step 2: The Forest Immersion */}
            <motion.div
              style={{ opacity: step2Opacity, y: step2Y }}
              className="absolute inset-x-0 space-y-3 sm:space-y-4 max-w-2xl text-left"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B3B2B]/80 backdrop-blur-md border border-[#C29D59]/40 text-xs font-semibold text-[#E6C994]">
                <MapPin className="w-3.5 h-3.5 text-[#C29D59]" />
                <span>Paz em Cada Degrau</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                O som das águas{" "}
                <span className="italic font-normal text-[#E6C994]">
                  e o aroma da terra molhada.
                </span>
              </h2>

              <p className="text-sm sm:text-lg text-zinc-200 font-light leading-relaxed max-w-[52ch] drop-shadow-sm">
                A cada passo em direção aos chalés, o silêncio ganha espaço. Um refúgio pensado para desconectar do mundo e reconectar com o que importa.
              </p>
            </motion.div>

            {/* Step 3: Destination Reached / Chalets Invitation */}
            <motion.div
              style={{ opacity: step3Opacity, y: step3Y }}
              className="absolute inset-x-0 space-y-4 sm:space-y-5 max-w-2xl text-left pointer-events-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C29D59]/25 backdrop-blur-md border border-[#C29D59]/50 text-xs font-semibold text-[#F4EFEA]">
                <Sparkles className="w-3.5 h-3.5 text-[#C29D59]" />
                <span>Você Chegou ao Recanto dos Pássaros</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                Seu chalé exclusivo{" "}
                <span className="italic font-normal text-[#E6C994]">
                  está te esperando.
                </span>
              </h2>

              <p className="text-sm sm:text-lg text-zinc-200 font-light leading-relaxed max-w-[52ch] drop-shadow-sm">
                Varanda privativa com rede, café da roça artesanal pela manhã e rio cristalino no quintal. Reserve com garantia de melhor tarifa oficial.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="min-h-[46px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C29D59] hover:bg-[#D4AF67] text-[#07100A] font-bold text-sm shadow-[0_0_25px_rgba(194,157,89,0.4)] transition-all cursor-pointer active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-[#07100A]" />
                  <span>Verificar Disponibilidade ao Vivo</span>
                </button>

                <a
                  href="#chales"
                  className="min-h-[46px] inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold transition-all"
                >
                  <span>Explorar Acomodações</span>
                </a>
              </div>
            </motion.div>

          </div>

          {/* Bottom Interactive Scroll Indicator Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C29D59] animate-ping" />
              <span>Experiência Imersiva • Deslize para navegar</span>
            </div>

            {/* Visual Timeline Track */}
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C29D59] to-[#E6C994] transition-all duration-150"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
