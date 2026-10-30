"use client";

import React from "react";
import { Loader2, ShieldCheck, Lock } from "lucide-react";

interface BookingSkeletonProps {
  message?: string;
  isCompact?: boolean;
}

export function BookingSkeleton({
  message = "Conectando ao Motor de Reservas Oficial...",
  isCompact = false,
}: BookingSkeletonProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-[#0D1812]/95 backdrop-blur-xl p-4 sm:p-6 select-none overflow-hidden animate-fade-in pointer-events-none">
      {/* Top Status & Security Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C29D59] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C29D59]" />
          </div>
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-zinc-300">
            Recanto dos Pássaros • Reserva Segura
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400">
          <Lock className="w-3 h-3 text-[#C29D59]" />
          <span>256-bit SSL</span>
        </div>
      </div>

      {/* Central Loading Message with Glow Spinner */}
      <div className="my-auto flex flex-col items-center justify-center text-center py-6">
        <div className="relative mb-3.5">
          <div className="absolute -inset-2 rounded-full bg-[#C29D59]/20 blur-lg animate-pulse" />
          <div className="relative w-12 h-12 rounded-2xl bg-[#14221A] border border-[#C29D59]/40 flex items-center justify-center shadow-[0_0_25px_rgba(194,157,89,0.25)]">
            <Loader2 className="w-6 h-6 text-[#C29D59] animate-spin" />
          </div>
        </div>
        <p className="text-xs sm:text-sm font-medium text-white tracking-wide">
          {message}
        </p>
        <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 max-w-xs font-light">
          Sincronizando disponibilidade em tempo real com a recepção
        </p>
      </div>

      {/* Simulated UI Skeleton Cards (Visual Placeholders) */}
      <div className="space-y-3 opacity-30">
        <div className="h-10 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
        <div className="h-28 rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
        {!isCompact && (
          <div className="h-28 rounded-2xl bg-white/5 border border-white/5 animate-pulse hidden sm:block" />
        )}
      </div>
    </div>
  );
}
